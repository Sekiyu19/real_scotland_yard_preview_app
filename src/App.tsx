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
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>リアルスコットランドヤード</h1>
        <span style={styles.headerSub}>プレビューアプリ ver.共有β6</span>
      </header>

      <div style={styles.main}>
        <div style={styles.mapArea}>
          <GameMap
            selectedStation={selectedStation}
            reachable={reachable}
            hoveredReachable={hoveredReachable}
            onSelectStation={selectStation}
            onHoverStation={setHoveredStation}
            onHoverReachable={setHoveredReachable}
          />
        </div>

        <div style={styles.sidebar}>
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
        </div>
      </div>

      <div style={styles.rules}>
        <details>
          <summary style={styles.rulesSummary}>ルール</summary>
          <div style={styles.rulesContent}>
            <p>・表記駅全部 → 各停（全駅に停車）</p>
            <p>・青丸駅 → 快速（快速停車駅のみ移動可能）</p>
            <p>・ピンク囲み駅 → 特急/JR（特急停車駅のみ移動可能）</p>
            <p>・怪盗の移動チケット数: 各停×11, 快速×7, 特急×4</p>
            <p>・オレンジラインは4回まで特急扱いで利用可</p>
            <p>・つながっていない駅間は移動不可</p>
          </div>
        </details>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    fontFamily: '"Noto Sans JP", "Hiragino Sans", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: '#ECEAE4',
    color: '#333',
  },
  header: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    padding: '12px 20px',
    background: '#2C3E50',
    color: '#fff',
  },
  headerTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSub: {
    fontSize: 12,
    opacity: 0.7,
  },
  main: {
    display: 'flex',
    flex: 1,
    gap: 16,
    padding: 16,
    overflow: 'hidden',
  },
  mapArea: {
    flex: 1,
    minWidth: 0,
  },
  sidebar: {
    width: 280,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    flexShrink: 0,
  },
  rules: {
    padding: '8px 20px 12px',
  },
  rulesSummary: {
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555',
  },
  rulesContent: {
    fontSize: 12,
    color: '#666',
    lineHeight: 1.6,
    marginTop: 4,
  },
};

export default App;
