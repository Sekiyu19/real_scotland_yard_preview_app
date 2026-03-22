import { lines, ORANGE_LINE_ID } from './lines';
import { stationMap } from './stations';
import type { TicketType } from './types';

export interface Connection {
  to: string;
  line: string;
}

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
 * - Local (各停): move 1 stop on any line to any adjacent station
 * - Express (快速): travel along a line, stop at next express/limited_express station
 * - Limited Express (特急): travel along a line, stop at next limited_express station
 * - Orange Line (オレンジ): travel on the 山手線 only, stop at next limited_express station
 *   (uses its own 4-use counter, not 特急 tickets)
 */
export function getReachableStations(
  fromId: string,
  ticketType: TicketType
): { stationId: string; viaLine: string; path: string[] }[] {
  const results: { stationId: string; viaLine: string; path: string[] }[] = [];
  const seen = new Set<string>();

  if (ticketType === 'local') {
    const connections = adjacency.get(fromId) || [];
    for (const conn of connections) {
      if (!seen.has(conn.to)) {
        seen.add(conn.to);
        results.push({ stationId: conn.to, viaLine: conn.line, path: [fromId, conn.to] });
      }
    }
    return results;
  }

  // For orange_line, only travel on the 山手線
  const isOrangeLine = ticketType === 'orange_line';

  const canStop = (stationId: string): boolean => {
    const station = stationMap.get(stationId);
    if (!station) return false;
    if (ticketType === 'express') {
      return station.type === 'express' || station.type === 'limited_express';
    }
    // limited_express and orange_line both stop at limited_express stations
    return station.type === 'limited_express';
  };

  // Find which lines pass through this station
  const stationLines = new Set<string>();
  const connections = adjacency.get(fromId) || [];
  for (const conn of connections) {
    if (isOrangeLine) {
      // Only the orange line
      if (conn.line === ORANGE_LINE_ID) stationLines.add(conn.line);
    } else {
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
