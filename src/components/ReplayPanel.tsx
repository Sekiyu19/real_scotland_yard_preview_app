import React, { useState } from 'react';
import type { Player, Turn, TurnMove, TicketType } from '../data/types';
import { TICKET_LABELS, TICKET_COLORS, PLAYER_COLORS } from '../data/types';
import { stationMap, stations } from '../data/stations';

interface ReplayPanelProps {
  players: Player[];
  turns: Turn[];
  currentTurn: number;
  onSetCurrentTurn: (turn: number) => void;
  onAddTurn: (moves: TurnMove[]) => void;
  onUpdateTurn: (index: number, moves: TurnMove[]) => void;
  onDeleteTurn: (index: number) => void;
  onAddPlayer: (player: Player) => void;
  onRemovePlayer: (id: string) => void;
  onUpdatePlayer: (id: string, updates: Partial<Player>) => void;
  onReset: () => void;
  onSetPlayers: (players: Player[]) => void;
}

const ticketOptions: TicketType[] = ['local', 'express', 'limited_express', 'orange_line'];

const ReplayPanel: React.FC<ReplayPanelProps> = ({
  players,
  turns,
  currentTurn,
  onSetCurrentTurn,
  onAddTurn,
  onUpdateTurn,
  onDeleteTurn,
  onAddPlayer,
  onRemovePlayer,
  onUpdatePlayer,
  onReset,
  onSetPlayers,
}) => {
  const [editingTurn, setEditingTurn] = useState<number | null>(null);
  const [newMoves, setNewMoves] = useState<Record<string, { station: string; ticket: TicketType }>>({});
  const [showPlayerSetup, setShowPlayerSetup] = useState(false);
  const [stationSearch, setStationSearch] = useState<Record<string, string>>({});

  // Initialize new moves for all players
  const initNewMoves = () => {
    const moves: Record<string, { station: string; ticket: TicketType }> = {};
    for (const p of players) {
      moves[p.id] = { station: '', ticket: 'local' };
    }
    setNewMoves(moves);
    setStationSearch({});
  };

  const startNewTurn = () => {
    initNewMoves();
    setEditingTurn(-1); // -1 = new turn
  };

  const startEditTurn = (turnIndex: number) => {
    const turn = turns[turnIndex];
    const moves: Record<string, { station: string; ticket: TicketType }> = {};
    for (const p of players) {
      const move = turn.moves.find(m => m.playerId === p.id);
      moves[p.id] = move
        ? { station: move.stationId, ticket: move.ticket }
        : { station: '', ticket: 'local' };
    }
    setNewMoves(moves);
    setEditingTurn(turnIndex);
    setStationSearch({});
  };

  const saveTurn = () => {
    const moves: TurnMove[] = [];
    for (const [playerId, data] of Object.entries(newMoves)) {
      if (data.station) {
        moves.push({
          playerId,
          stationId: data.station,
          ticket: data.ticket,
        });
      }
    }
    if (moves.length === 0) return;

    if (editingTurn === -1) {
      onAddTurn(moves);
    } else if (editingTurn !== null) {
      onUpdateTurn(editingTurn, moves);
    }
    setEditingTurn(null);
    setNewMoves({});
  };

  const getFilteredStations = (searchText: string) => {
    if (!searchText) return [];
    const lower = searchText.toLowerCase();
    return stations
      .filter(s => s.name.includes(searchText) || s.id.includes(lower))
      .slice(0, 8);
  };

  const playerCount = players.length;

  return (
    <div className="panel replay-panel">
      <div className="replay-header">
        <h3 className="panel-title">ゲームリプレイ</h3>
        <div className="replay-header-btns">
          <button
            className="ctrl-btn ctrl-btn-sm"
            onClick={() => setShowPlayerSetup(!showPlayerSetup)}
          >
            {showPlayerSetup ? '閉じる' : `プレイヤー(${playerCount})`}
          </button>
          <button className="ctrl-btn ctrl-btn-sm ctrl-btn-danger" onClick={onReset}>
            リセット
          </button>
        </div>
      </div>

      {/* Player Setup */}
      {showPlayerSetup && (
        <div className="player-setup">
          {players.map((p, i) => (
            <div key={p.id} className="player-setup-row">
              <span
                className="player-color-dot"
                style={{ background: p.color }}
              />
              <input
                className="player-name-input"
                value={p.name}
                onChange={(e) => onUpdatePlayer(p.id, { name: e.target.value })}
              />
              <span className="player-role">{p.isThief ? '怪盗' : '刑事'}</span>
              {!p.isThief && (
                <button
                  className="player-remove-btn"
                  onClick={() => onRemovePlayer(p.id)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {players.length < 8 && (
            <button
              className="ctrl-btn ctrl-btn-sm"
              onClick={() => {
                const id = `detective${Date.now()}`;
                const color = PLAYER_COLORS[players.length % PLAYER_COLORS.length];
                onAddPlayer({ id, name: `刑事${players.length}`, color, isThief: false });
              }}
            >
              + 刑事を追加
            </button>
          )}
        </div>
      )}

      {/* Timeline */}
      {turns.length > 0 && (
        <div className="timeline">
          <div className="timeline-label">
            ターン: <strong>{currentTurn}</strong> / {turns.length}
          </div>
          <input
            type="range"
            min={0}
            max={turns.length}
            value={currentTurn}
            onChange={(e) => onSetCurrentTurn(Number(e.target.value))}
            className="timeline-slider"
          />
          <div className="timeline-btns">
            <button
              className="ctrl-btn ctrl-btn-sm"
              disabled={currentTurn === 0}
              onClick={() => onSetCurrentTurn(currentTurn - 1)}
            >
              ◀
            </button>
            <button
              className="ctrl-btn ctrl-btn-sm"
              disabled={currentTurn >= turns.length}
              onClick={() => onSetCurrentTurn(currentTurn + 1)}
            >
              ▶
            </button>
          </div>
        </div>
      )}

      {/* Turn List */}
      <div className="turn-list">
        {turns.map((turn, i) => (
          <div
            key={i}
            className={`turn-item ${i + 1 === currentTurn ? 'active' : ''}`}
            onClick={() => onSetCurrentTurn(i + 1)}
          >
            <div className="turn-item-header">
              <span className="turn-number">T{turn.turnNumber}</span>
              <div className="turn-item-actions">
                <button
                  className="turn-edit-btn"
                  onClick={(e) => { e.stopPropagation(); startEditTurn(i); }}
                >
                  編集
                </button>
                <button
                  className="turn-edit-btn turn-delete-btn"
                  onClick={(e) => { e.stopPropagation(); onDeleteTurn(i); }}
                >
                  ×
                </button>
              </div>
            </div>
            <div className="turn-moves">
              {turn.moves.map(m => {
                const player = players.find(p => p.id === m.playerId);
                const station = stationMap.get(m.stationId);
                return (
                  <div key={m.playerId} className="turn-move-item">
                    <span
                      className="player-color-dot-sm"
                      style={{ background: player?.color }}
                    />
                    <span className="turn-move-name">{player?.name}</span>
                    <span className="turn-move-arrow">→</span>
                    <span className="turn-move-station">{station?.name || m.stationId}</span>
                    <span
                      className="turn-move-ticket"
                      style={{ color: TICKET_COLORS[m.ticket] }}
                    >
                      {TICKET_LABELS[m.ticket]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Turn Form */}
      {editingTurn !== null ? (
        <div className="turn-form">
          <div className="turn-form-title">
            {editingTurn === -1 ? `ターン ${turns.length + 1}` : `ターン ${editingTurn + 1} を編集`}
          </div>
          {players.map(p => (
            <div key={p.id} className="turn-form-player">
              <div className="turn-form-player-header">
                <span className="player-color-dot" style={{ background: p.color }} />
                <span className="turn-form-player-name">{p.name}</span>
              </div>
              <div className="turn-form-inputs">
                {/* Station input with search */}
                <div className="station-search-container">
                  <input
                    className="station-search-input"
                    placeholder="駅名を入力..."
                    value={stationSearch[p.id] ?? (newMoves[p.id]?.station ? stationMap.get(newMoves[p.id].station)?.name || '' : '')}
                    onChange={(e) => {
                      setStationSearch(prev => ({ ...prev, [p.id]: e.target.value }));
                      // Clear selected if typing
                      if (newMoves[p.id]?.station) {
                        setNewMoves(prev => ({
                          ...prev,
                          [p.id]: { ...prev[p.id], station: '' },
                        }));
                      }
                    }}
                  />
                  {stationSearch[p.id] && (
                    <div className="station-dropdown">
                      {getFilteredStations(stationSearch[p.id]).map(s => (
                        <div
                          key={s.id}
                          className="station-dropdown-item"
                          onClick={() => {
                            setNewMoves(prev => ({
                              ...prev,
                              [p.id]: { ...prev[p.id], station: s.id },
                            }));
                            setStationSearch(prev => ({ ...prev, [p.id]: '' }));
                          }}
                        >
                          {s.name}
                        </div>
                      ))}
                    </div>
                  )}
                  {newMoves[p.id]?.station && (
                    <span className="station-selected">
                      {stationMap.get(newMoves[p.id].station)?.name}
                    </span>
                  )}
                </div>
                {/* Ticket selector */}
                <div className="ticket-mini-selector">
                  {ticketOptions.map(t => (
                    <button
                      key={t}
                      className={`ticket-mini-btn ${newMoves[p.id]?.ticket === t ? 'selected' : ''}`}
                      style={{ '--tc': TICKET_COLORS[t] } as React.CSSProperties}
                      onClick={() =>
                        setNewMoves(prev => ({
                          ...prev,
                          [p.id]: { ...prev[p.id], ticket: t },
                        }))
                      }
                    >
                      {TICKET_LABELS[t]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="turn-form-actions">
            <button className="ctrl-btn" onClick={() => setEditingTurn(null)}>
              キャンセル
            </button>
            <button className="ctrl-btn ctrl-btn-primary" onClick={saveTurn}>
              保存
            </button>
          </div>
        </div>
      ) : (
        <button className="ctrl-btn ctrl-btn-primary add-turn-btn" onClick={startNewTurn}>
          + ターンを追加
        </button>
      )}
    </div>
  );
};

export default ReplayPanel;
