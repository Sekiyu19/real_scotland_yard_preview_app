import { useState } from 'react';
import GameMap from './components/GameMap';
import TicketPanel from './components/TicketPanel';
import InfoPanel from './components/InfoPanel';
import ReplayPanel from './components/ReplayPanel';
import { useGameState } from './hooks/useGameState';
import { useReplayState } from './hooks/useReplayState';

type AppMode = 'explore' | 'replay';

function App() {
  const [mode, setMode] = useState<AppMode>('replay');

  const {
    selectedStation,
    selectedTicket,
    tickets,
    reachable,
    moveHistory,
    hoveredStation,
    hoveredReachable,
    selectStation,
    changeTicket,
    resetGame,
    undoMove,
    setHoveredStation,
    setHoveredReachable,
  } = useGameState();

  const replay = useReplayState();

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <h1 className="header-title">リアルスコットランドヤード</h1>
          <span className="header-version">ver.共有β6</span>
        </div>
        <div className="header-center">
          <div className="mode-switch">
            <button
              className={`mode-btn ${mode === 'replay' ? 'active' : ''}`}
              onClick={() => setMode('replay')}
            >
              リプレイ
            </button>
            <button
              className={`mode-btn ${mode === 'explore' ? 'active' : ''}`}
              onClick={() => setMode('explore')}
            >
              探索
            </button>
          </div>
        </div>
        <div className="header-right">
          <span className="header-hint">Alt+ドラッグでパン / スクロールでズーム</span>
        </div>
      </header>

      <div className="main-layout">
        <div className="map-area">
          <GameMap
            selectedStation={selectedStation}
            reachable={mode === 'explore' ? reachable : []}
            hoveredReachable={mode === 'explore' ? hoveredReachable : null}
            onSelectStation={selectStation}
            onHoverStation={setHoveredStation}
            onHoverReachable={setHoveredReachable}
            playerPositions={mode === 'replay' ? replay.currentPositions : []}
            players={mode === 'replay' ? replay.players : []}
            turns={mode === 'replay' ? replay.turns : []}
            currentTurn={mode === 'replay' ? replay.currentTurn : 0}
          />
        </div>

        <div className="sidebar">
          {mode === 'explore' ? (
            <>
              <TicketPanel
                tickets={tickets}
                selectedTicket={selectedTicket}
                onSelectTicket={changeTicket}
              />
              <InfoPanel
                selectedStation={selectedStation}
                hoveredStation={hoveredStation}
                reachable={reachable}
                moveHistory={moveHistory}
                onUndo={undoMove}
                onReset={resetGame}
              />
            </>
          ) : (
            <ReplayPanel
              players={replay.players}
              turns={replay.turns}
              currentTurn={replay.currentTurn}
              onSetCurrentTurn={replay.setCurrentTurn}
              onAddTurn={replay.addTurn}
              onUpdateTurn={replay.updateTurn}
              onDeleteTurn={replay.deleteTurn}
              onAddPlayer={replay.addPlayer}
              onRemovePlayer={replay.removePlayer}
              onUpdatePlayer={replay.updatePlayer}
              onReset={replay.resetReplay}
              onSetPlayers={replay.setPlayers}
            />
          )}

          {/* Rules */}
          <div className="panel rules-panel">
            <details>
              <summary className="rules-summary">ルール</summary>
              <div className="rules-content">
                <p>・表記駅全部 → <strong>各停</strong></p>
                <p>・青丸駅 → <strong>快速</strong></p>
                <p>・ピンク囲み駅 → <strong>JR</strong></p>
                <p>・※一部抜いた駅があるので注意</p>
                <p>・警察の移動チケット数は <strong>各停×10, 快速×8, JR×4</strong></p>
                <p>・つながっていない駅間は移動不可</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
