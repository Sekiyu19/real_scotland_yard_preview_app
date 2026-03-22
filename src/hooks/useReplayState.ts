import { useState, useCallback, useMemo } from 'react';
import type { Player, Turn, TurnMove, TicketType, ReplayData } from '../data/types';
import { DEFAULT_PLAYERS } from '../data/types';

export interface PlayerPosition {
  playerId: string;
  stationId: string;
}

export function useReplayState() {
  const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS.slice(0, 5));
  const [turns, setTurns] = useState<Turn[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0); // 0 = initial positions
  const [isReplayMode, setIsReplayMode] = useState(false);

  // Compute positions at a given turn
  const getPositionsAtTurn = useCallback(
    (turnIdx: number): PlayerPosition[] => {
      const positions = new Map<string, string>();
      // Apply all turns up to turnIdx
      for (let i = 0; i <= turnIdx && i < turns.length; i++) {
        for (const move of turns[i].moves) {
          positions.set(move.playerId, move.stationId);
        }
      }
      return Array.from(positions.entries()).map(([playerId, stationId]) => ({
        playerId,
        stationId,
      }));
    },
    [turns]
  );

  const currentPositions = useMemo(
    () => getPositionsAtTurn(currentTurn - 1),
    [getPositionsAtTurn, currentTurn]
  );

  const addTurn = useCallback(
    (moves: TurnMove[]) => {
      const newTurn: Turn = {
        turnNumber: turns.length + 1,
        moves,
      };
      setTurns(prev => [...prev, newTurn]);
      setCurrentTurn(turns.length + 1);
    },
    [turns.length]
  );

  const updateTurn = useCallback(
    (turnIndex: number, moves: TurnMove[]) => {
      setTurns(prev => {
        const updated = [...prev];
        updated[turnIndex] = { ...updated[turnIndex], moves };
        return updated;
      });
    },
    []
  );

  const deleteTurn = useCallback(
    (turnIndex: number) => {
      setTurns(prev => {
        const updated = prev.filter((_, i) => i !== turnIndex);
        return updated.map((t, i) => ({ ...t, turnNumber: i + 1 }));
      });
      setCurrentTurn(prev => Math.min(prev, turns.length - 1));
    },
    [turns.length]
  );

  const addPlayer = useCallback((player: Player) => {
    setPlayers(prev => [...prev, player]);
  }, []);

  const removePlayer = useCallback(
    (playerId: string) => {
      setPlayers(prev => prev.filter(p => p.id !== playerId));
      // Also remove this player's moves from all turns
      setTurns(prev =>
        prev.map(t => ({
          ...t,
          moves: t.moves.filter(m => m.playerId !== playerId),
        }))
      );
    },
    []
  );

  const updatePlayer = useCallback((playerId: string, updates: Partial<Player>) => {
    setPlayers(prev =>
      prev.map(p => (p.id === playerId ? { ...p, ...updates } : p))
    );
  }, []);

  // Get remaining tickets for a player at the current turn
  const getPlayerTickets = useCallback(
    (playerId: string) => {
      const player = players.find(p => p.id === playerId);
      if (!player) return { local: 0, express: 0, limited_express: 0, orange_line: 0 };

      const counts = { local: 11, express: 7, limited_express: 4, orange_line: 4 };
      for (const turn of turns) {
        for (const move of turn.moves) {
          if (move.playerId === playerId && move.ticket in counts) {
            counts[move.ticket as keyof typeof counts]--;
          }
        }
      }
      return counts;
    },
    [players, turns]
  );

  const resetReplay = useCallback(() => {
    setTurns([]);
    setCurrentTurn(0);
    setPlayers(DEFAULT_PLAYERS.slice(0, 5));
  }, []);

  return {
    players,
    turns,
    currentTurn,
    currentPositions,
    isReplayMode,
    setIsReplayMode,
    setCurrentTurn,
    addTurn,
    updateTurn,
    deleteTurn,
    addPlayer,
    removePlayer,
    updatePlayer,
    getPlayerTickets,
    resetReplay,
    setPlayers,
  };
}
