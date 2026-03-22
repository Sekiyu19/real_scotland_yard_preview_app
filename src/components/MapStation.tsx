import React from 'react';
import type { Station, StationType } from '../data/types';

interface MapStationProps {
  station: Station;
  isSelected: boolean;
  isReachable: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

const typeRadius: Record<StationType, number> = {
  local: 4,
  express: 6,
  limited_express: 8,
};

const typeStroke: Record<StationType, string> = {
  local: '#666',
  express: '#2196F3',
  limited_express: '#E91E63',
};

const MapStation: React.FC<MapStationProps> = ({
  station,
  isSelected,
  isReachable,
  isHovered,
  onSelect,
  onHover,
}) => {
  const r = typeRadius[station.type];
  const baseStroke = typeStroke[station.type];

  let fill = '#fff';
  let stroke = baseStroke;
  let strokeWidth = station.type === 'local' ? 1.5 : 2.5;
  let currentR = r;

  if (isSelected) {
    fill = '#FF4444';
    stroke = '#CC0000';
    strokeWidth = 3;
    currentR = r + 3;
  } else if (isReachable) {
    fill = '#4CAF50';
    stroke = '#2E7D32';
    strokeWidth = 2.5;
    currentR = r + 2;
  } else if (isHovered) {
    fill = '#FFF3E0';
    stroke = '#FF9800';
    strokeWidth = 2;
    currentR = r + 1;
  }

  return (
    <g
      onClick={() => onSelect(station.id)}
      onMouseEnter={() => onHover(station.id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      {/* Hit area (larger invisible circle for easier clicking) */}
      <circle
        cx={station.x}
        cy={station.y}
        r={Math.max(currentR + 8, 12)}
        fill="transparent"
      />
      {/* Station dot */}
      <circle
        cx={station.x}
        cy={station.y}
        r={currentR}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {/* Station name label */}
      <text
        x={station.x}
        y={station.y - currentR - 4}
        textAnchor="middle"
        fontSize={station.type === 'limited_express' ? 10 : 8}
        fontWeight={station.type === 'limited_express' ? 'bold' : 'normal'}
        fill={isSelected ? '#CC0000' : isReachable ? '#2E7D32' : '#333'}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {station.name}
      </text>
    </g>
  );
};

export default React.memo(MapStation);
