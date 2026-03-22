import React from 'react';
import type { TicketType, TicketState } from '../data/types';
import { TICKET_LABELS, TICKET_COLORS } from '../data/types';

interface TicketPanelProps {
  tickets: TicketState;
  selectedTicket: TicketType;
  onSelectTicket: (ticket: TicketType) => void;
}

const ticketTypes: TicketType[] = ['local', 'express', 'jr'];

const TICKET_DESCRIPTIONS: Record<TicketType, string> = {
  local: '隣の駅へ1駅移動',
  express: '快速停車駅まで移動',
  jr: 'JR停車駅まで移動',
};

const TicketPanel: React.FC<TicketPanelProps> = ({
  tickets,
  selectedTicket,
  onSelectTicket,
}) => {
  return (
    <div className="panel ticket-panel">
      <h3 className="panel-title">チケット選択</h3>
      <div className="ticket-grid">
        {ticketTypes.map(type => {
          const isSelected = selectedTicket === type;
          const isEmpty = tickets[type] === 0;
          return (
            <button
              key={type}
              onClick={() => onSelectTicket(type)}
              disabled={isEmpty}
              className={`ticket-btn ${isSelected ? 'selected' : ''} ${isEmpty ? 'empty' : ''}`}
              style={{
                '--ticket-color': TICKET_COLORS[type],
              } as React.CSSProperties}
              title={TICKET_DESCRIPTIONS[type]}
            >
              <span className="ticket-label">{TICKET_LABELS[type]}</span>
              <span className="ticket-count">{tickets[type]}</span>
              <span className="ticket-desc">{TICKET_DESCRIPTIONS[type]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TicketPanel;
