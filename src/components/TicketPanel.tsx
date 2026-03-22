import React from 'react';
import type { TicketType, TicketState } from '../data/types';
import { TICKET_LABELS, TICKET_COLORS } from '../data/types';

interface TicketPanelProps {
  tickets: TicketState;
  selectedTicket: TicketType;
  onSelectTicket: (ticket: TicketType) => void;
}

const ticketTypes: TicketType[] = ['local', 'express', 'limited_express'];

const TicketPanel: React.FC<TicketPanelProps> = ({
  tickets,
  selectedTicket,
  onSelectTicket,
}) => {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>チケット</h3>
      <div style={styles.tickets}>
        {ticketTypes.map(type => (
          <button
            key={type}
            onClick={() => onSelectTicket(type)}
            style={{
              ...styles.ticketButton,
              borderColor: TICKET_COLORS[type],
              backgroundColor:
                selectedTicket === type
                  ? TICKET_COLORS[type]
                  : 'transparent',
              color: selectedTicket === type ? '#fff' : TICKET_COLORS[type],
              opacity: tickets[type] === 0 ? 0.4 : 1,
            }}
            disabled={tickets[type] === 0}
          >
            <span style={styles.ticketLabel}>{TICKET_LABELS[type]}</span>
            <span style={styles.ticketCount}>×{tickets[type]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '12px 16px',
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: 14,
    color: '#333',
  },
  tickets: {
    display: 'flex',
    gap: 8,
  },
  ticketButton: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '8px 16px',
    border: '2px solid',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    minWidth: 72,
  },
  ticketLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  ticketCount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
};

export default TicketPanel;
