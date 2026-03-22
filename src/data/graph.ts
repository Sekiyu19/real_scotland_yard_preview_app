import { lines } from './lines';
import { stationMap } from './stations';
import type { TicketType } from './types';

export interface Connection {
  to: string;
  line: string;
}

const JR_LINE_IDS = new Set(['yamanote', 'chuo', 'keihin_tohoku', 'sobu']);

// adjacency: stationId -> list of { to: stationId, line: lineId }
const adjacency = new Map<string, Connection[]>();

function addConnection(from: string, to: string, lineId: string) {
  if (!stationMap.has(from) || !stationMap.has(to)) return;
  if (!adjacency.has(from)) adjacency.set(from, []);
  const existing = adjacency.get(from)!;
  // Avoid duplicates
  if (!existing.some(c => c.to === to && c.line === lineId)) {
    existing.push({ to, line: lineId });
  }
}

for (const line of lines) {
  const validStations = line.stations.filter(s => stationMap.has(s));
  for (let i = 0; i < validStations.length - 1; i++) {
    addConnection(validStations[i], validStations[i + 1], line.id);
    addConnection(validStations[i + 1], validStations[i], line.id);
  }
}

/**
 * Get reachable stations from a given station using a specific ticket type.
 *
 * - Local (各停): move 1 stop on non-JR lines to any adjacent station
 * - Express (快速): travel along non-JR lines, stop at next express/limited_express station
 * - JR・オレンジ: travel along JR lines only, stop at next limited_express station
 */
export function getReachableStations(
  fromId: string,
  ticketType: TicketType
): { stationId: string; viaLine: string; path: string[] }[] {
  const results: { stationId: string; viaLine: string; path: string[] }[] = [];
  const seen = new Set<string>();

  const isJRTicket = ticketType === 'jr';

  if (ticketType === 'local') {
    const connections = adjacency.get(fromId) || [];
    for (const conn of connections) {
      // Local cannot use JR lines
      if (JR_LINE_IDS.has(conn.line)) continue;
      if (!seen.has(conn.to)) {
        seen.add(conn.to);
        results.push({ stationId: conn.to, viaLine: conn.line, path: [fromId, conn.to] });
      }
    }
    return results;
  }

  const canStop = (stationId: string): boolean => {
    const station = stationMap.get(stationId);
    if (!station) return false;
    if (ticketType === 'express') {
      return station.type === 'express' || station.type === 'limited_express';
    }
    // JR stops at limited_express stations only
    return station.type === 'limited_express';
  };

  // Find which lines pass through this station
  const stationLines = new Set<string>();
  const connections = adjacency.get(fromId) || [];
  for (const conn of connections) {
    const isJRLine = JR_LINE_IDS.has(conn.line);
    // JR ticket: only JR lines. Express ticket: only non-JR lines.
    if (isJRTicket && isJRLine) {
      stationLines.add(conn.line);
    } else if (!isJRTicket && !isJRLine) {
      stationLines.add(conn.line);
    }
  }

  for (const lineId of stationLines) {
    const line = lines.find(l => l.id === lineId);
    if (!line) continue;
    const validStations = line.stations.filter(s => stationMap.has(s));
    const indices = validStations
      .map((s, i) => (s === fromId ? i : -1))
      .filter(i => i >= 0);

    for (const idx of indices) {
      // Forward direction
      const pathForward: string[] = [fromId];
      for (let i = idx + 1; i < validStations.length; i++) {
        const sid = validStations[i];
        if (sid === fromId) break; // loop back
        pathForward.push(sid);
        if (canStop(sid)) {
          const key = `${sid}-${lineId}`;
          if (!seen.has(key)) {
            seen.add(key);
            results.push({ stationId: sid, viaLine: lineId, path: [...pathForward] });
          }
          break;
        }
      }

      // Backward direction
      const pathBackward: string[] = [fromId];
      for (let i = idx - 1; i >= 0; i--) {
        const sid = validStations[i];
        if (sid === fromId) break; // loop back
        pathBackward.push(sid);
        if (canStop(sid)) {
          const key = `${sid}-${lineId}`;
          if (!seen.has(key)) {
            seen.add(key);
            results.push({ stationId: sid, viaLine: lineId, path: [...pathBackward] });
          }
          break;
        }
      }
    }
  }

  return results;
}
