import React from 'react';
import type { Line } from '../data/types';
import { stationMap } from '../data/stations';

interface MapLineProps {
  line: Line;
  highlightPath?: string[] | null;
}

const MapLine: React.FC<MapLineProps> = ({ line, highlightPath }) => {
  const validStations = line.stations.filter(s => stationMap.has(s));
  if (validStations.length < 2) return null;

  const points = validStations.map(sid => {
    const s = stationMap.get(sid)!;
    return `${s.x},${s.y}`;
  });

  // Check if path segments should be highlighted
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

  return (
    <g>
      {/* Base line */}
      {validStations.slice(0, -1).map((sid, i) => {
        const s1 = stationMap.get(sid)!;
        const s2 = stationMap.get(validStations[i + 1])!;
        const highlighted = isSegmentHighlighted(sid, validStations[i + 1]);
        return (
          <line
            key={`${line.id}-seg-${i}`}
            x1={s1.x}
            y1={s1.y}
            x2={s2.x}
            y2={s2.y}
            stroke={highlighted ? '#FFD700' : line.color}
            strokeWidth={highlighted ? 5 : 3}
            strokeOpacity={highlighted ? 1 : 0.7}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
};

export default React.memo(MapLine);
