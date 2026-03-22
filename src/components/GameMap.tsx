import React, { useState, useRef, useCallback, useEffect } from 'react';
import { stations, stationMap } from '../data/stations';
import { lines } from '../data/lines';
import type { Player, Turn } from '../data/types';
import MapLine from './MapLine';
import MapStation from './MapStation';
import PlayerMarker from './PlayerMarker';
import type { ReachableInfo } from '../hooks/useGameState';
import type { PlayerPosition } from '../hooks/useReplayState';
import { getReachableStations } from '../data/graph';

interface GameMapProps {
  selectedStation: string | null;
  reachable: ReachableInfo[];
  hoveredReachable: ReachableInfo | null;
  onSelectStation: (id: string) => void;
  onHoverStation: (id: string | null) => void;
  onHoverReachable: (info: ReachableInfo | null) => void;
  playerPositions?: PlayerPosition[];
  players?: Player[];
  turns?: Turn[];
  currentTurn?: number;
}

const MAP_WIDTH = 1200;
const MAP_HEIGHT = 780;
const PADDING = 40;
const ANIMATION_DURATION = 600; // ms

// Given a from station and to station with a ticket type, find the path of station coordinates
function findMovePath(
  fromStation: string,
  toStation: string,
  ticket: string
): { x: number; y: number }[] {
  // Try to find a matching path using getReachableStations
  const ticketType = ticket as 'local' | 'express' | 'jr';
  const reachable = getReachableStations(fromStation, ticketType);
  const match = reachable.find(r => r.stationId === toStation);

  if (match && match.path.length >= 2) {
    return match.path
      .map(sid => stationMap.get(sid))
      .filter((s): s is NonNullable<typeof s> => s != null)
      .map(s => ({ x: s.x, y: s.y }));
  }

  // Fallback: straight line
  const from = stationMap.get(fromStation);
  const to = stationMap.get(toStation);
  if (from && to) {
    return [{ x: from.x, y: from.y }, { x: to.x, y: to.y }];
  }
  return [];
}

// Compute positions at a given turn from turns data
function getPositionsAtTurn(
  turns: Turn[],
  turnIdx: number
): Map<string, string> {
  const positions = new Map<string, string>();
  for (let i = 0; i <= turnIdx && i < turns.length; i++) {
    for (const move of turns[i].moves) {
      positions.set(move.playerId, move.stationId);
    }
  }
  return positions;
}

// Easing function for smooth animation
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const GameMap: React.FC<GameMapProps> = ({
  selectedStation,
  reachable,
  hoveredReachable,
  onSelectStation,
  onHoverStation,
  playerPositions = [],
  players = [],
  turns = [],
  currentTurn = 0,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewBox, setViewBox] = useState({
    x: -PADDING,
    y: -PADDING,
    w: MAP_WIDTH + PADDING * 2,
    h: MAP_HEIGHT + PADDING * 2,
  });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Animation state
  const [animatedCoords, setAnimatedCoords] = useState<Map<string, { x: number; y: number }>>(new Map());
  const prevTurnRef = useRef(currentTurn);
  const animFrameRef = useRef<number>(0);

  // Animate player movement along railway lines
  useEffect(() => {
    const prevTurn = prevTurnRef.current;
    if (currentTurn === prevTurn) return;

    const direction = currentTurn > prevTurn ? 1 : -1;
    prevTurnRef.current = currentTurn;

    // Determine which turn's moves to animate
    // Going forward: animate the moves of the turn we're entering
    // Going backward: reverse-animate the moves of the turn we're leaving
    const turnIndex = direction > 0 ? currentTurn - 1 : prevTurn - 1;

    if (turnIndex < 0 || turnIndex >= turns.length) return;

    const turn = turns[turnIndex];
    if (!turn || turn.moves.length === 0) return;

    // Get positions before this turn's moves (to know where players started)
    const prevPositions = getPositionsAtTurn(turns, turnIndex - 1);

    // Compute waypoints for each player in this turn
    const playerWaypoints = new Map<string, { x: number; y: number }[]>();

    for (const move of turn.moves) {
      const fromStation = prevPositions.get(move.playerId);
      if (!fromStation) continue;

      let waypoints = findMovePath(fromStation, move.stationId, move.ticket);
      if (waypoints.length < 2) continue;

      // If going backward, reverse the path
      if (direction < 0) {
        waypoints = [...waypoints].reverse();
      }

      playerWaypoints.set(move.playerId, waypoints);
    }

    if (playerWaypoints.size === 0) return;

    // Start animation
    cancelAnimationFrame(animFrameRef.current);
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / ANIMATION_DURATION, 1);
      const progress = easeInOutCubic(rawProgress);

      const coords = new Map<string, { x: number; y: number }>();

      for (const [playerId, waypoints] of playerWaypoints) {
        if (waypoints.length < 2) continue;

        // Calculate total path length for uniform speed
        let totalLength = 0;
        const segmentLengths: number[] = [];
        for (let i = 0; i < waypoints.length - 1; i++) {
          const dx = waypoints[i + 1].x - waypoints[i].x;
          const dy = waypoints[i + 1].y - waypoints[i].y;
          const len = Math.sqrt(dx * dx + dy * dy);
          segmentLengths.push(len);
          totalLength += len;
        }

        // Find position along the path at current progress
        const targetDist = progress * totalLength;
        let accumulated = 0;

        for (let i = 0; i < segmentLengths.length; i++) {
          if (accumulated + segmentLengths[i] >= targetDist || i === segmentLengths.length - 1) {
            const segProgress = segmentLengths[i] > 0
              ? (targetDist - accumulated) / segmentLengths[i]
              : 0;
            const clampedProgress = Math.min(Math.max(segProgress, 0), 1);
            coords.set(playerId, {
              x: waypoints[i].x + (waypoints[i + 1].x - waypoints[i].x) * clampedProgress,
              y: waypoints[i].y + (waypoints[i + 1].y - waypoints[i].y) * clampedProgress,
            });
            break;
          }
          accumulated += segmentLengths[i];
        }
      }

      setAnimatedCoords(coords);

      if (rawProgress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete - clear animated coords
        setAnimatedCoords(new Map());
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [currentTurn, turns]);

  const reachableSet = new Set(reachable.map(r => r.stationId));

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const scaleFactor = e.deltaY > 0 ? 1.08 : 0.92;
      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * viewBox.w + viewBox.x;
      const mouseY = ((e.clientY - rect.top) / rect.height) * viewBox.h + viewBox.y;

      const newW = Math.min(Math.max(viewBox.w * scaleFactor, 250), MAP_WIDTH * 2);
      const newH = Math.min(Math.max(viewBox.h * scaleFactor, 160), MAP_HEIGHT * 2);

      setViewBox({
        x: mouseX - ((mouseX - viewBox.x) / viewBox.w) * newW,
        y: mouseY - ((mouseY - viewBox.y) / viewBox.h) * newH,
        w: newW,
        h: newH,
      });
    },
    [viewBox]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const dx = ((e.clientX - panStart.x) / rect.width) * viewBox.w;
      const dy = ((e.clientY - panStart.y) / rect.height) * viewBox.h;
      setViewBox(prev => ({ ...prev, x: prev.x - dx, y: prev.y - dy }));
      setPanStart({ x: e.clientX, y: e.clientY });
    },
    [isPanning, panStart, viewBox]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const resetZoom = useCallback(() => {
    setViewBox({
      x: -PADDING,
      y: -PADDING,
      w: MAP_WIDTH + PADDING * 2,
      h: MAP_HEIGHT + PADDING * 2,
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handler = (e: WheelEvent) => e.preventDefault();
    container.addEventListener('wheel', handler, { passive: false });
    return () => container.removeEventListener('wheel', handler);
  }, []);

  // Line legend data
  const lineLegend = lines.map(l => ({ name: l.name, color: l.color }));

  return (
    <div ref={containerRef} className="map-container">
      <svg
        ref={svgRef}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        className="map-svg"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#E8E4DC" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Background */}
        <rect x={-200} y={-200} width={MAP_WIDTH + 400} height={MAP_HEIGHT + 400} fill="#F8F6F0" />
        <rect x={-200} y={-200} width={MAP_WIDTH + 400} height={MAP_HEIGHT + 400} fill="url(#grid)" />

        {/* Lines (render before stations) */}
        {lines.map(line => (
          <MapLine
            key={line.id}
            line={line}
            highlightPath={hoveredReachable?.viaLine === line.id ? hoveredReachable.path : null}
          />
        ))}

        {/* Stations */}
        {stations.map(station => (
          <MapStation
            key={station.id}
            station={station}
            isSelected={station.id === selectedStation}
            isReachable={reachableSet.has(station.id)}
            isHovered={false}
            onSelect={onSelectStation}
            onHover={onHoverStation}
          />
        ))}

        {/* Player Markers */}
        {playerPositions.length > 0 && (() => {
          // Group by station for offset calculation
          const stationGroups = new Map<string, PlayerPosition[]>();
          for (const pos of playerPositions) {
            const group = stationGroups.get(pos.stationId) || [];
            group.push(pos);
            stationGroups.set(pos.stationId, group);
          }
          return playerPositions.map(pos => {
            const player = players.find(p => p.id === pos.playerId);
            if (!player) return null;
            const group = stationGroups.get(pos.stationId) || [];
            const idx = group.indexOf(pos);
            const animated = animatedCoords.get(pos.playerId);
            return (
              <PlayerMarker
                key={pos.playerId}
                player={player}
                stationId={pos.stationId}
                offsetIndex={idx}
                totalAtStation={group.length}
                animatedX={animated?.x}
                animatedY={animated?.y}
              />
            );
          });
        })()}

        {/* Title */}
        <text x={60} y={35} fontSize="18" fontWeight="bold" fill="#555" opacity={0.6}>
          路線図
        </text>
      </svg>

      {/* Zoom controls */}
      <div className="zoom-controls">
        <button
          className="zoom-btn"
          onClick={() =>
            setViewBox(prev => ({
              ...prev,
              x: prev.x + prev.w * 0.1,
              y: prev.y + prev.h * 0.1,
              w: prev.w * 0.8,
              h: prev.h * 0.8,
            }))
          }
        >
          +
        </button>
        <button
          className="zoom-btn"
          onClick={() =>
            setViewBox(prev => ({
              ...prev,
              x: prev.x - prev.w * 0.125,
              y: prev.y - prev.h * 0.125,
              w: Math.min(prev.w * 1.25, MAP_WIDTH * 2),
              h: Math.min(prev.h * 1.25, MAP_HEIGHT * 2),
            }))
          }
        >
          -
        </button>
        <button className="zoom-btn" onClick={resetZoom}>
          ⟲
        </button>
      </div>

      {/* Line Legend */}
      <div className="map-legend">
        <div className="legend-title">路線</div>
        <div className="legend-lines">
          {lineLegend.map(l => (
            <div key={l.name} className="legend-line-item">
              <span className="legend-line-color" style={{ background: l.color }} />
              <span className="legend-line-name">{l.name}</span>
            </div>
          ))}
        </div>
        <div className="legend-title" style={{ marginTop: 8 }}>駅タイプ</div>
        <div className="legend-stations">
          <div className="legend-station-item">
            <span className="legend-dot legend-dot-local" />
            <span>各停</span>
          </div>
          <div className="legend-station-item">
            <span className="legend-dot legend-dot-express" />
            <span>快速</span>
          </div>
          <div className="legend-station-item">
            <span className="legend-dot legend-dot-limited" />
            <span>JR</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMap;
