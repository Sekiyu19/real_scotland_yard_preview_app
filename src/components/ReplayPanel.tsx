import React, { useState, useRef } from 'react';
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

const ticketOptions: TicketType[] = ['local', 'express', 'jr'];

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

  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resolve station name to ID
  const resolveStationId = (nameOrId: string): string | null => {
    if (stationMap.has(nameOrId)) return nameOrId;
    const found = stations.find(s => s.name === nameOrId);
    return found?.id ?? null;
  };

  // Resolve ticket name to type
  const resolveTicket = (t: string): TicketType | null => {
    const map: Record<string, TicketType> = {
      '各停': 'local', 'local': 'local',
      '快速': 'express', 'express': 'express',
      'JR': 'jr', 'jr': 'jr', 'JR・オレンジ': 'jr',
      // Backwards compatibility
      '特急': 'jr', 'limited_express': 'jr',
      'オレンジ': 'jr', 'orange_line': 'jr',
    };
    return map[t] ?? null;
  };

  const handleImport = () => {
    try {
      setImportError('');
      const data = JSON.parse(importText);

      // Support multiple formats
      if (data.players && data.turns) {
        // Full format: { players: [...], turns: [...] }
        const importedPlayers: Player[] = data.players.map((p: any, i: number) => ({
          id: p.id || `p${i}`,
          name: p.name || `Player${i}`,
          color: p.color || PLAYER_COLORS[i % PLAYER_COLORS.length],
          isThief: p.isThief ?? (i === 0),
        }));
        onSetPlayers(importedPlayers);

        const importedTurns: Turn[] = data.turns.map((t: any, ti: number) => ({
          turnNumber: t.turnNumber ?? ti + 1,
          moves: (t.moves || []).map((m: any) => {
            const stationId = resolveStationId(m.station || m.stationId || '') || '';
            const ticket = resolveTicket(m.ticket || 'local') || 'local';
            // Resolve player name to ID
            const playerRef = m.player || m.playerId || '';
            const matchedPlayer = importedPlayers.find(p => p.name === playerRef || p.id === playerRef);
            const playerId = matchedPlayer?.id || playerRef;
            return { playerId, stationId, ticket };
          }).filter((m: TurnMove) => m.stationId && m.playerId),
        }));
        // Use onAddTurn for each turn (the hook handles it)
        onReset();
        setTimeout(() => {
          onSetPlayers(importedPlayers);
          for (const t of importedTurns) {
            onAddTurn(t.moves);
          }
        }, 0);
      } else if (Array.isArray(data)) {
        // Simple array format: [{ player, turn, station, ticket }, ...]
        const playerNames = new Set<string>();
        for (const item of data) {
          playerNames.add(item.player || item.playerId || '');
        }
        const importedPlayers: Player[] = Array.from(playerNames).map((name, i) => ({
          id: name,
          name,
          color: PLAYER_COLORS[i % PLAYER_COLORS.length],
          isThief: i === 0,
        }));

        // Group by turn
        const turnGroups = new Map<number, TurnMove[]>();
        for (const item of data) {
          const turnNum = item.turn ?? 1;
          const stationId = resolveStationId(item.station || item.stationId || '') || '';
          const ticket = resolveTicket(item.ticket || 'local') || 'local';
          const playerId = item.player || item.playerId || '';
          if (stationId && playerId) {
            if (!turnGroups.has(turnNum)) turnGroups.set(turnNum, []);
            turnGroups.get(turnNum)!.push({ playerId, stationId, ticket });
          }
        }

        onReset();
        setTimeout(() => {
          onSetPlayers(importedPlayers);
          const sortedTurns = Array.from(turnGroups.entries()).sort(([a], [b]) => a - b);
          for (const [, moves] of sortedTurns) {
            onAddTurn(moves);
          }
        }, 0);
      } else {
        setImportError('対応していないJSON形式です');
        return;
      }

      setShowImport(false);
      setImportText('');
    } catch {
      setImportError('JSONの解析に失敗しました');
    }
  };

  const getExportJson = () => {
    const data = {
      players: players.map(p => ({ id: p.id, name: p.name, color: p.color, isThief: p.isThief })),
      turns: turns.map(t => ({
        turnNumber: t.turnNumber,
        moves: t.moves.map(m => ({
          player: players.find(p => p.id === m.playerId)?.name || m.playerId,
          station: stationMap.get(m.stationId)?.name || m.stationId,
          ticket: TICKET_LABELS[m.ticket],
        })),
      })),
    };
    return JSON.stringify(data, null, 2);
  };

  const handleExport = () => {
    const json = getExportJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scotland-yard-replay.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const [copySuccess, setCopySuccess] = useState(false);
  const handleCopyExport = async () => {
    const json = getExportJson();
    await navigator.clipboard.writeText(json);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImportText(reader.result as string);
      setShowImport(true);
    };
    reader.readAsText(file);
    e.target.value = '';
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
          {players.map((p) => (
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

      {/* Import/Export */}
      <div className="import-export-row">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleFileImport}
        />
        <button
          className="ctrl-btn ctrl-btn-sm"
          onClick={() => setShowImport(!showImport)}
        >
          インポート
        </button>
        <button
          className="ctrl-btn ctrl-btn-sm"
          onClick={() => fileInputRef.current?.click()}
        >
          ファイル読込
        </button>
        {turns.length > 0 && (
          <>
            <button className="ctrl-btn ctrl-btn-sm" onClick={handleCopyExport}>
              {copySuccess ? 'コピー済!' : 'エクスポート'}
            </button>
            <button className="ctrl-btn ctrl-btn-sm" onClick={handleExport}>
              ファイル書出
            </button>
          </>
        )}
      </div>

      {showImport && (
        <div className="import-section">
          <textarea
            className="import-textarea"
            placeholder={'JSONデータを貼り付け...\n\n形式1: [{"player":"怪盗","turn":1,"station":"新宿","ticket":"各停"}, ...]\n\n形式2: {"players":[...],"turns":[...]}'}
            value={importText}
            onChange={(e) => { setImportText(e.target.value); setImportError(''); }}
            rows={6}
          />
          {importError && <div className="import-error">{importError}</div>}
          <div className="import-actions">
            <button className="ctrl-btn ctrl-btn-sm" onClick={() => { setShowImport(false); setImportText(''); }}>
              キャンセル
            </button>
            <button className="ctrl-btn ctrl-btn-sm ctrl-btn-primary" onClick={handleImport}>
              読み込み
            </button>
          </div>
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
