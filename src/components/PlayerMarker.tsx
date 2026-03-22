import React from 'react';
import type { Player } from '../data/types';
import { stationMap } from '../data/stations';

interface PlayerMarkerProps {
  player: Player;
  stationId: string;
  offsetIndex: number; // For stacking multiple players at same station
  totalAtStation: number;
}

const PlayerMarker: React.FC<PlayerMarkerProps> = ({
  player,
  stationId,
  offsetIndex,
  totalAtStation,
}) => {
  const station = stationMap.get(stationId);
  if (!station) return null;

  const r = 10;
  // Offset when multiple players on same station
  const angle = totalAtStation === 1
    ? 0
    : (2 * Math.PI * offsetIndex) / totalAtStation - Math.PI / 2;
  const offsetDist = totalAtStation === 1 ? 0 : 16;
  const cx = station.x + Math.cos(angle) * offsetDist;
  const cy = station.y + Math.sin(angle) * offsetDist;

  return (
    <g style={{ pointerEvents: 'none' }}>
      {/* Drop shadow */}
      <circle cx={cx + 1} cy={cy + 1} r={r + 1} fill="rgba(0,0,0,0.2)" />
      {/* Main circle */}
      <circle cx={cx} cy={cy} r={r} fill={player.color} stroke="#fff" strokeWidth={2} />
      {/* Icon: skull for thief, shield for detective */}
      {player.isThief ? (
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={11}
          fill="#fff"
          fontWeight="bold"
        >
          ?
        </text>
      ) : (
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={9}
          fill="#fff"
          fontWeight="bold"
        >
          {player.name.replace(/[^0-9]/g, '') || player.name[0]}
        </text>
      )}
      {/* Name label */}
      <text
        x={cx}
        y={cy + r + 10}
        textAnchor="middle"
        fontSize={8}
        fontWeight={600}
        fill={player.color}
        stroke="#fff"
        strokeWidth={2.5}
        paintOrder="stroke"
      >
        {player.name}
      </text>
    </g>
  );
};

export default React.memo(PlayerMarker);
