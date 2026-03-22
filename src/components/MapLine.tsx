import React from 'react';
import type { Line } from '../data/types';
import { stationMap } from '../data/stations';

interface MapLineProps {
  line: Line;
  highlightPath?: string[] | null;
}

const JR_LINE_IDS = new Set(['yamanote', 'chuo', 'sobu', 'keihin_tohoku']);

const MapLine: React.FC<MapLineProps> = ({ line, highlightPath }) => {
  const validStations = line.stations.filter(s => stationMap.has(s));
  if (validStations.length < 2) return null;

  const isJR = JR_LINE_IDS.has(line.id);

  const isSegmentHighlighted = (s1: string, s2: string): boolean => {
    if (!highlightPath || highlightPath.length < 2) return false;
    for (let i = 0; i < highlightPath.length - 1; i++) {
      if (
        (highlightPath[i] === s1 && highlightPath[i + 1] === s2) ||
        (highlightPath[i] === s2 && highlightPath[i + 1] === s1)
      ) {
        return true;
      }
    }
    return false;
  };

  // Determine line offset for parallel lines (avoid overlap)
  const lineOffset = getLineOffset(line.id);

  return (
    <g>
      {validStations.slice(0, -1).map((sid, i) => {
        const s1 = stationMap.get(sid)!;
        const s2 = stationMap.get(validStations[i + 1])!;
        const highlighted = isSegmentHighlighted(sid, validStations[i + 1]);

        // Calculate perpendicular offset for parallel lines
        const dx = s2.x - s1.x;
        const dy = s2.y - s1.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const nx = len > 0 ? (-dy / len) * lineOffset : 0;
        const ny = len > 0 ? (dx / len) * lineOffset : 0;

        return (
          <React.Fragment key={`${line.id}-seg-${i}`}>
            {/* Shadow for highlighted segments */}
            {highlighted && (
              <line
                x1={s1.x + nx}
                y1={s1.y + ny}
                x2={s2.x + nx}
                y2={s2.y + ny}
                stroke="#FFD700"
                strokeWidth={8}
                strokeOpacity={0.4}
                strokeLinecap="round"
              />
            )}
            <line
              x1={s1.x + nx}
              y1={s1.y + ny}
              x2={s2.x + nx}
              y2={s2.y + ny}
              stroke={highlighted ? '#FFD700' : line.color}
              strokeWidth={highlighted ? 4 : isJR ? 4.5 : 2.5}
              strokeOpacity={highlighted ? 1 : isJR ? 0.85 : 0.75}
              strokeLinecap="round"
            />
          </React.Fragment>
        );
      })}
    </g>
  );
};

// Small perpendicular offset so parallel lines don't overlap
function getLineOffset(lineId: string): number {
  const offsets: Record<string, number> = {
    ginza: -2,
    marunouchi: 2,
    hibiya: -1,
    tozai: 1,
    chiyoda: -2,
    yurakucho: 2,
    fukutoshin: -1,
    hanzomon: 1,
    namboku: -2,
    mita: 2,
    shinjuku_line: -1,
    oedo: 1,
    asakusa_line: -2,
    yamanote: 5,
    chuo: -5,
  };
  return offsets[lineId] ?? 0;
}

export default React.memo(MapLine);
