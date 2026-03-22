import GameMap from './components/GameMap';
import TicketPanel from './components/TicketPanel';
import InfoPanel from './components/InfoPanel';
import { useGameState } from './hooks/useGameState';

function App() {
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

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <h1 className="header-title">リアルスコットランドヤード</h1>
          <span className="header-version">ver.共有β6</span>
        </div>
        <div className="header-right">
          <span className="header-hint">Alt+ドラッグでパン / スクロールでズーム</span>
        </div>
      </header>

      <div className="main-layout">
        <div className="map-area">
          <GameMap
            selectedStation={selectedStation}
            reachable={reachable}
            hoveredReachable={hoveredReachable}
            onSelectStation={selectStation}
            onHoverStation={setHoveredStation}
            onHoverReachable={setHoveredReachable}
          />
        </div>

        <div className="sidebar">
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

          {/* Rules */}
          <div className="panel rules-panel">
            <details>
              <summary className="rules-summary">ルール</summary>
              <div className="rules-content">
                <p>・表記駅全部 → <strong>各停</strong>（全駅に停車）</p>
                <p>・青丸駅 → <strong>快速</strong>（快速停車駅のみ移動可能）</p>
                <p>・ピンク囲み駅 → <strong>特急/JR</strong>（特急停車駅のみ移動可能）</p>
                <p>・怪盗の移動チケット: 各停×11, 快速×7, 特急×4</p>
                <p>・<strong>オレンジライン</strong>（山手線）は4回まで特急扱いで利用可</p>
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
