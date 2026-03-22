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

const typeConfig: Record<StationType, { r: number; stroke: string; strokeWidth: number }> = {
  local: { r: 3.5, stroke: '#888', strokeWidth: 1.2 },
  express: { r: 5.5, stroke: '#2196F3', strokeWidth: 2 },
  limited_express: { r: 7, stroke: '#E91E63', strokeWidth: 2.5 },
};

const MapStation: React.FC<MapStationProps> = ({
  station,
  isSelected,
  isReachable,
  isHovered,
  onSelect,
  onHover,
}) => {
  const config = typeConfig[station.type];
  let { r } = config;

  // 青丸（express）は青塗りつぶし、ピンク囲み（limited_express）は白抜き+ピンク枠
  let fill = station.type === 'express' ? '#2196F3' : '#fff';
  let stroke = config.stroke;
  let strokeWidth = config.strokeWidth;
  let glowColor = '';
  let labelColor = '#333';
  let labelWeight = station.type === 'limited_express' ? 700 : station.type === 'express' ? 600 : 400;

  if (isSelected) {
    fill = '#FF3D00';
    stroke = '#BF360C';
    strokeWidth = 2.5;
    r = r + 3;
    glowColor = 'rgba(255, 61, 0, 0.4)';
    labelColor = '#BF360C';
    labelWeight = 700;
  } else if (isReachable) {
    fill = '#66BB6A';
    stroke = '#2E7D32';
    strokeWidth = 2;
    r = r + 2;
    glowColor = 'rgba(76, 175, 80, 0.35)';
    labelColor = '#1B5E20';
    labelWeight = 600;
  } else if (isHovered) {
    fill = '#FFF8E1';
    stroke = '#FFA000';
    strokeWidth = 2;
    r = r + 1;
    labelColor = '#E65100';
  }

  const fontSize = station.type === 'limited_express' ? 9.5 : 7.5;
  const isLimitedExpress = station.type === 'limited_express';

  // limited_express 用のラベル計測（ピンク囲みの幅を推定）
  const labelY = station.y - r - 5;
  const estimatedTextWidth = station.name.length * (isLimitedExpress ? 9.5 : 7.5);
  const boxPadX = 4;
  const boxPadY = 2.5;

  return (
    <g
      onClick={(e) => { e.stopPropagation(); onSelect(station.id); }}
      onMouseEnter={() => onHover(station.id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      {/* Hit area */}
      <circle
        cx={station.x}
        cy={station.y}
        r={Math.max(r + 10, 14)}
        fill="transparent"
      />
      {/* Glow effect */}
      {glowColor && (
        <circle
          cx={station.x}
          cy={station.y}
          r={r + 5}
          fill={glowColor}
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* ピンク囲み: 特急(JR)駅の名前にピンク枠 + JRバッジ */}
      {isLimitedExpress && !isSelected && !isReachable && (
        <>
          {/* ピンク囲み（駅名の背景ボックス） */}
          <rect
            x={station.x - estimatedTextWidth / 2 - boxPadX}
            y={labelY - fontSize / 2 - boxPadY - 1}
            width={estimatedTextWidth + boxPadX * 2}
            height={fontSize + boxPadY * 2 + 2}
            rx={3}
            ry={3}
            fill="#FFF0F3"
            stroke="#E91E63"
            strokeWidth={1.5}
            style={{ pointerEvents: 'none' }}
          />
          {/* JRバッジ */}
          <rect
            x={station.x + estimatedTextWidth / 2 + boxPadX + 2}
            y={labelY - fontSize / 2 - boxPadY}
            width={16}
            height={fontSize + boxPadY * 2}
            rx={2}
            ry={2}
            fill="#FF8C00"
            style={{ pointerEvents: 'none' }}
          />
          <text
            x={station.x + estimatedTextWidth / 2 + boxPadX + 10}
            y={labelY + 1}
            textAnchor="middle"
            fontSize={7}
            fontWeight={800}
            fill="#fff"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            JR
          </text>
        </>
      )}

      {/* Station circle */}
      <circle
        cx={station.x}
        cy={station.y}
        r={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {/* Inner dot for express */}
      {!isSelected && !isReachable && station.type === 'express' && (
        <circle
          cx={station.x}
          cy={station.y}
          r={1.5}
          fill="#fff"
          style={{ pointerEvents: 'none' }}
        />
      )}
      {/* Label */}
      <text
        x={station.x}
        y={labelY + 1}
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight={labelWeight}
        fill={isLimitedExpress && !isSelected && !isReachable ? '#C2185B' : labelColor}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        {...(isLimitedExpress && !isSelected && !isReachable ? {} : {
          stroke: '#F8F6F0',
          strokeWidth: 2.5,
          paintOrder: 'stroke' as const,
        })}
      >
        {station.name}
      </text>
    </g>
  );
};

export default React.memo(MapStation);
