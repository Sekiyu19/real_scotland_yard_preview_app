import React from 'react';
import { stationMap } from '../data/stations';
import { lines } from '../data/lines';
import { TICKET_LABELS, TICKET_COLORS } from '../data/types';
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

  const getLineName = (lineId: string) => {
    return lines.find(l => l.id === lineId)?.name || lineId;
  };

  const getLineColor = (lineId: string) => {
    return lines.find(l => l.id === lineId)?.color || '#999';
  };

  return (
    <div style={styles.container}>
      {/* Station Info */}
      <div style={styles.section}>
        <h3 style={styles.title}>駅情報</h3>
        {station ? (
          <div>
            <div style={styles.stationName}>{station.name}</div>
            <div
              style={{
                ...styles.stationType,
                color:
                  TICKET_COLORS[
                    station.type as keyof typeof TICKET_COLORS
                  ],
              }}
            >
              {TICKET_LABELS[station.type as keyof typeof TICKET_LABELS]}停車駅
            </div>
          </div>
        ) : (
          <div style={styles.hint}>駅をクリックして選択</div>
        )}
      </div>

      {/* Reachable stations */}
      {selectedStation && reachable.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.title}>
            移動可能な駅 ({reachable.length}駅)
          </h3>
          <div style={styles.reachableList}>
            {reachable.map(r => {
              const s = stationMap.get(r.stationId);
              return (
                <div key={r.stationId + r.viaLine} style={styles.reachableItem}>
                  <span
                    style={{
                      ...styles.lineDot,
                      background: getLineColor(r.viaLine),
                    }}
                  />
                  <span>{s?.name}</span>
                  <span style={styles.lineLabel}>
                    {getLineName(r.viaLine)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Move History */}
      {moveHistory.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.title}>移動履歴</h3>
          <div style={styles.historyList}>
            {moveHistory.map((move, i) => (
              <div key={i} style={styles.historyItem}>
                <span style={styles.historyNum}>{i + 1}.</span>
                <span>{stationMap.get(move.from)?.name}</span>
                <span style={styles.arrow}>→</span>
                <span>{stationMap.get(move.to)?.name}</span>
                <span
                  style={{
                    ...styles.historyTicket,
                    color:
                      TICKET_COLORS[
                        move.ticket as keyof typeof TICKET_COLORS
                      ],
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
      <div style={styles.controls}>
        <button
          onClick={onUndo}
          disabled={moveHistory.length === 0}
          style={{
            ...styles.button,
            opacity: moveHistory.length === 0 ? 0.4 : 1,
          }}
        >
          戻す
        </button>
        <button onClick={onReset} style={styles.button}>
          リセット
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '12px 16px',
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto',
  },
  section: {
    marginBottom: 16,
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: 14,
    color: '#333',
    borderBottom: '1px solid #eee',
    paddingBottom: 4,
  },
  stationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  stationType: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  hint: {
    color: '#999',
    fontSize: 13,
  },
  reachableList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    maxHeight: 200,
    overflowY: 'auto',
  },
  reachableItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    padding: '2px 0',
  },
  lineDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    flexShrink: 0,
  },
  lineLabel: {
    fontSize: 10,
    color: '#888',
    marginLeft: 'auto',
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    maxHeight: 150,
    overflowY: 'auto',
  },
  historyItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 12,
  },
  historyNum: {
    color: '#999',
    width: 20,
  },
  arrow: {
    color: '#999',
  },
  historyTicket: {
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  controls: {
    display: 'flex',
    gap: 8,
    marginTop: 12,
  },
  button: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: 8,
    background: '#f5f5f5',
    cursor: 'pointer',
    fontSize: 13,
    fontFamily: 'inherit',
  },
};

export default InfoPanel;
