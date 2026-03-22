import { useState, useCallback } from 'react';
import type { TicketType, TicketState } from '../data/types';
import { INITIAL_TICKETS } from '../data/types';
import { getReachableStations } from '../data/graph';

export interface ReachableInfo {
  stationId: string;
  viaLine: string;
  path: string[];
}

export function useGameState() {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<TicketType>('local');
  const [tickets, setTickets] = useState<TicketState>({ ...INITIAL_TICKETS });
  const [reachable, setReachable] = useState<ReachableInfo[]>([]);
  const [moveHistory, setMoveHistory] = useState<
    { from: string; to: string; ticket: TicketType; line: string }[]
  >([]);
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);
  const [hoveredReachable, setHoveredReachable] = useState<ReachableInfo | null>(null);

  const selectStation = useCallback(
    (stationId: string) => {
      if (selectedStation && reachable.some(r => r.stationId === stationId)) {
        // Move to this station
        const info = reachable.find(r => r.stationId === stationId)!;
        if (tickets[selectedTicket] > 0) {
          setTickets(prev => ({
            ...prev,
            [selectedTicket]: prev[selectedTicket] - 1,
          }));
          setMoveHistory(prev => [
            ...prev,
            {
              from: selectedStation,
              to: stationId,
              ticket: selectedTicket,
              line: info.viaLine,
            },
          ]);
          setSelectedStation(stationId);
          setReachable(getReachableStations(stationId, selectedTicket));
        }
      } else {
        setSelectedStation(stationId);
        setReachable(getReachableStations(stationId, selectedTicket));
      }
      setHoveredReachable(null);
    },
    [selectedStation, selectedTicket, tickets, reachable]
  );

  const changeTicket = useCallback(
    (ticket: TicketType) => {
      setSelectedTicket(ticket);
      if (selectedStation) {
        setReachable(getReachableStations(selectedStation, ticket));
      }
      setHoveredReachable(null);
    },
    [selectedStation]
  );

  const resetGame = useCallback(() => {
    setSelectedStation(null);
    setSelectedTicket('local');
    setTickets({ ...INITIAL_TICKETS });
    setReachable([]);
    setMoveHistory([]);
    setHoveredStation(null);
    setHoveredReachable(null);
  }, []);

  const undoMove = useCallback(() => {
    if (moveHistory.length === 0) return;
    const lastMove = moveHistory[moveHistory.length - 1];
    setMoveHistory(prev => prev.slice(0, -1));
    setTickets(prev => ({
      ...prev,
      [lastMove.ticket]: prev[lastMove.ticket] + 1,
    }));
    setSelectedStation(lastMove.from);
    setReachable(getReachableStations(lastMove.from, selectedTicket));
    setHoveredReachable(null);
  }, [moveHistory, selectedTicket]);

  return {
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
  };
}
