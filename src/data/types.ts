export type StationType = 'local' | 'express' | 'limited_express';
export type TicketType = 'local' | 'express' | 'limited_express' | 'orange_line';

export interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  type: StationType;
}

export interface Line {
  id: string;
  name: string;
  color: string;
  stations: string[];
  isLoop?: boolean;
}

export interface TicketState {
  local: number;
  express: number;
  limited_express: number;
  orange_line: number;
}

export const INITIAL_TICKETS: TicketState = {
  local: 11,
  express: 7,
  limited_express: 4,
  orange_line: 4,
};

export const TICKET_LABELS: Record<TicketType, string> = {
  local: '各停',
  express: '快速',
  limited_express: '特急',
  orange_line: 'オレンジ',
};

export const TICKET_COLORS: Record<TicketType, string> = {
  local: '#666666',
  express: '#2196F3',
  limited_express: '#E91E63',
  orange_line: '#FF8C00',
};

// ===== Replay Types =====

export interface Player {
  id: string;
  name: string;
  color: string;
  isThief: boolean;
}

export interface TurnMove {
  playerId: string;
  stationId: string;
  ticket: TicketType;
}

export interface Turn {
  turnNumber: number;
  moves: TurnMove[];
}

export interface ReplayData {
  players: Player[];
  turns: Turn[];
}

export const DEFAULT_PLAYERS: Player[] = [
  { id: 'thief', name: '怪盗', color: '#1a1a2e', isThief: true },
  { id: 'detective1', name: '刑事1', color: '#1976D2', isThief: false },
  { id: 'detective2', name: '刑事2', color: '#388E3C', isThief: false },
  { id: 'detective3', name: '刑事3', color: '#F57C00', isThief: false },
  { id: 'detective4', name: '刑事4', color: '#7B1FA2', isThief: false },
];

export const PLAYER_COLORS = [
  '#1a1a2e', '#1976D2', '#388E3C', '#F57C00', '#7B1FA2',
  '#C62828', '#00838F', '#4E342E',
];
