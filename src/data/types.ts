export type StationType = 'local' | 'express' | 'limited_express';
export type TicketType = 'local' | 'express' | 'limited_express';

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
  stations: string[]; // station ids in order
}

export interface TicketState {
  local: number;
  express: number;
  limited_express: number;
}

export const INITIAL_TICKETS: TicketState = {
  local: 11,
  express: 7,
  limited_express: 4,
};

export const TICKET_LABELS: Record<TicketType, string> = {
  local: '各停',
  express: '快速',
  limited_express: '特急',
};

export const TICKET_COLORS: Record<TicketType, string> = {
  local: '#666666',
  express: '#2196F3',
  limited_express: '#E91E63',
};
