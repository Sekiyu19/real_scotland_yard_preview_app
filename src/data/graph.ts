import { lines } from './lines';
import { stationMap } from './stations';
import type { TicketType } from './types';

// Build adjacency graph from line data
// For each line, adjacent stations in the station list are connected

export interface Connection {
  to: string;
  line: string;
}

// adjacency: stationId -> list of { to: stationId, line: lineId }
const adjacency = new Map<string, Connection[]>();

function addConnection(from: string, to: string, lineId: string) {
  if (!stationMap.has(from) || !stationMap.has(to)) return;
  if (!adjacency.has(from)) adjacency.set(from, []);
  adjacency.get(from)!.push({ to, line: lineId });
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
 * - Local (各停): move to any directly adjacent station (1 stop on any line)
 * - Express (快速): travel along a line, skipping local-only stations,
 *   stop at the next express or limited_express station
 * - Limited Express (特急): travel along a line, skipping non-limited_express stations,
 *   stop at the next limited_express station
 */
export function getReachableStations(
  fromId: string,
  ticketType: TicketType
): { stationId: string; viaLine: string; path: string[] }[] {
  const results: { stationId: string; viaLine: string; path: string[] }[] = [];
  const seen = new Set<string>();

  if (ticketType === 'local') {
    // Local: just move one stop on any line
    const connections = adjacency.get(fromId) || [];
    for (const conn of connections) {
      if (!seen.has(conn.to)) {
        seen.add(conn.to);
        results.push({ stationId: conn.to, viaLine: conn.line, path: [fromId, conn.to] });
      }
    }
    return results;
  }

  // Express / Limited Express: travel along each line through the station
  // Find which lines pass through this station
  const stationLines = new Set<string>();
  const connections = adjacency.get(fromId) || [];
  for (const conn of connections) {
    stationLines.add(conn.line);
  }

  const canStop = (stationId: string): boolean => {
    const station = stationMap.get(stationId);
    if (!station) return false;
    if (ticketType === 'express') {
      return station.type === 'express' || station.type === 'limited_express';
    }
    // limited_express
    return station.type === 'limited_express';
  };

  // For each line, explore in both directions along the line
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
