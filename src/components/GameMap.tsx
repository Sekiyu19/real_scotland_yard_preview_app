import React, { useState, useRef, useCallback, useEffect } from 'react';
import { stations } from '../data/stations';
import { lines } from '../data/lines';
import MapLine from './MapLine';
import MapStation from './MapStation';
import type { ReachableInfo } from '../hooks/useGameState';

interface GameMapProps {
  selectedStation: string | null;
  reachable: ReachableInfo[];
  hoveredReachable: ReachableInfo | null;
  onSelectStation: (id: string) => void;
  onHoverStation: (id: string | null) => void;
  onHoverReachable: (info: ReachableInfo | null) => void;
}

const MAP_WIDTH = 1200;
const MAP_HEIGHT = 780;

const GameMap: React.FC<GameMapProps> = ({
  selectedStation,
  reachable,
  hoveredReachable,
  onSelectStation,
  onHoverStation,
  onHoverReachable,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: MAP_WIDTH, h: MAP_HEIGHT });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const reachableSet = new Set(reachable.map(r => r.stationId));

  // Zoom with wheel
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const scaleFactor = e.deltaY > 0 ? 1.1 : 0.9;
      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * viewBox.w + viewBox.x;
      const mouseY = ((e.clientY - rect.top) / rect.height) * viewBox.h + viewBox.y;

      const newW = Math.min(Math.max(viewBox.w * scaleFactor, 300), MAP_WIDTH * 1.5);
      const newH = Math.min(Math.max(viewBox.h * scaleFactor, 200), MAP_HEIGHT * 1.5);

      setViewBox({
        x: mouseX - ((mouseX - viewBox.x) / viewBox.w) * newW,
        y: mouseY - ((mouseY - viewBox.y) / viewBox.h) * newH,
        w: newW,
        h: newH,
      });
    },
    [viewBox]
  );

  // Pan
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 1 || e.button === 0 && e.altKey) {
        setIsPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY });
        e.preventDefault();
      }
    },
    []
  );

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

  // Reset zoom
  const resetZoom = useCallback(() => {
    setViewBox({ x: 0, y: 0, w: MAP_WIDTH, h: MAP_HEIGHT });
  }, []);

  // Prevent default wheel behavior on container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handler = (e: WheelEvent) => e.preventDefault();
    container.addEventListener('wheel', handler, { passive: false });
    return () => container.removeEventListener('wheel', handler);
  }, []);

  return (
    <div ref={containerRef} style={styles.container}>
      <svg
        ref={svgRef}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        style={styles.svg}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Background */}
        <rect
          x={viewBox.x - 500}
          y={viewBox.y - 500}
          width={viewBox.w + 1000}
          height={viewBox.h + 1000}
          fill="#F8F6F0"
        />

        {/* Lines */}
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
      </svg>

      {/* Zoom controls */}
      <div style={styles.zoomControls}>
        <button
          style={styles.zoomBtn}
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
          style={styles.zoomBtn}
          onClick={() =>
            setViewBox(prev => ({
              ...prev,
              x: prev.x - prev.w * 0.125,
              y: prev.y - prev.h * 0.125,
              w: Math.min(prev.w * 1.25, MAP_WIDTH * 1.5),
              h: Math.min(prev.h * 1.25, MAP_HEIGHT * 1.5),
            }))
          }
        >
          -
        </button>
        <button style={styles.zoomBtn} onClick={resetZoom}>
          ⟲
        </button>
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <span style={{ ...styles.legendDot, border: '2px solid #666', width: 8, height: 8 }} />
          <span>各停</span>
        </div>
        <div style={styles.legendItem}>
          <span style={{ ...styles.legendDot, border: '2.5px solid #2196F3', width: 12, height: 12 }} />
          <span>快速</span>
        </div>
        <div style={styles.legendItem}>
          <span style={{ ...styles.legendDot, border: '2.5px solid #E91E63', width: 14, height: 14 }} />
          <span>特急</span>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    background: '#F8F6F0',
  },
  svg: {
    width: '100%',
    height: '100%',
    cursor: 'grab',
  },
  zoomControls: {
    position: 'absolute',
    top: 12,
    right: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  zoomBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    border: '1px solid #ddd',
    background: '#fff',
    fontSize: 18,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  },
  legend: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    background: 'rgba(255,255,255,0.95)',
    borderRadius: 8,
    padding: '8px 12px',
    display: 'flex',
    gap: 12,
    fontSize: 12,
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    borderRadius: '50%',
    background: '#fff',
    display: 'inline-block',
    boxSizing: 'border-box',
  },
};

export default GameMap;
