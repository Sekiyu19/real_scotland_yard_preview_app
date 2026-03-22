import React from 'react';
import { stationMap } from '../data/stations';
import { lines } from '../data/lines';
import { TICKET_LABELS, TICKET_COLORS, STATION_TYPE_LABELS, STATION_TYPE_COLORS } from '../data/types';
import type { TicketType } from '../data/types';
import type { ReachableInfo } from '../hooks/useGameState';

interface InfoPanelProps {
  selectedStation: string | null;
  hoveredStation: string | null;
  reachable: ReachableInfo[];
  moveHistory: { from: string; to: string; ticket: string; line: string }[];
  onUndo: () => void;
  onReset: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({
  selectedStation,
  hoveredStation,
  reachable,
  moveHistory,
  onUndo,
  onReset,
}) => {
  const displayStation = hoveredStation || selectedStation;
  const station = displayStation ? stationMap.get(displayStation) : null;

  const getLineName = (lineId: string) =>
    lines.find(l => l.id === lineId)?.name || lineId;
  const getLineColor = (lineId: string) =>
    lines.find(l => l.id === lineId)?.color || '#999';

  return (
    <div className="panel info-panel">
      {/* Station Info */}
      <div className="info-section">
        <h3 className="panel-title">駅情報</h3>
        {station ? (
          <div className="station-info">
            <div className="station-info-name">{station.name}</div>
            <span
              className="station-type-badge"
              style={{
                background: STATION_TYPE_COLORS[station.type] + '20',
                color: STATION_TYPE_COLORS[station.type],
                border: `1px solid ${STATION_TYPE_COLORS[station.type]}40`,
              }}
            >
              {STATION_TYPE_LABELS[station.type]}停車駅
            </span>
          </div>
        ) : (
          <div className="info-hint">駅をクリックして選択してください</div>
        )}
      </div>

      {/* Reachable stations */}
      {selectedStation && reachable.length > 0 && (
        <div className="info-section">
          <h3 className="panel-title">
            移動可能 <span className="count-badge">{reachable.length}駅</span>
          </h3>
          <div className="reachable-list">
            {reachable.map(r => {
              const s = stationMap.get(r.stationId);
              return (
                <div key={r.stationId + r.viaLine} className="reachable-item">
                  <span
                    className="line-dot"
                    style={{ background: getLineColor(r.viaLine) }}
                  />
                  <span className="reachable-name">{s?.name}</span>
                  <span className="line-label">{getLineName(r.viaLine)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedStation && reachable.length === 0 && (
        <div className="info-section">
          <div className="info-hint">
            このチケットで移動可能な駅がありません
          </div>
        </div>
      )}

      {/* Move History */}
      {moveHistory.length > 0 && (
        <div className="info-section">
          <h3 className="panel-title">移動履歴</h3>
          <div className="history-list">
            {moveHistory.map((move, i) => (
              <div key={i} className="history-item">
                <span className="history-num">{i + 1}</span>
                <span className="history-route">
                  {stationMap.get(move.from)?.name}
                  <span className="history-arrow"> → </span>
                  {stationMap.get(move.to)?.name}
                </span>
                <span
                  className="history-ticket"
                  style={{
                    color: TICKET_COLORS[move.ticket as keyof typeof TICKET_COLORS],
                  }}
                >
                  {TICKET_LABELS[move.ticket as keyof typeof TICKET_LABELS]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="info-controls">
        <button
          onClick={onUndo}
          disabled={moveHistory.length === 0}
          className="ctrl-btn"
        >
          ↩ 戻す
        </button>
        <button onClick={onReset} className="ctrl-btn ctrl-btn-danger">
          リセット
        </button>
        {moveHistory.length > 0 && (
          <button
            className="ctrl-btn"
            onClick={() => {
              const data = moveHistory.map((m, i) => ({
                turn: i + 1,
                from: stationMap.get(m.from)?.name || m.from,
                to: stationMap.get(m.to)?.name || m.to,
                ticket: TICKET_LABELS[m.ticket as TicketType],
                line: getLineName(m.line),
              }));
              const json = JSON.stringify(data, null, 2);
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'scotland-yard-history.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            エクスポート
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
