/**
 * Pure filtering/sorting for the Allotment Tracker (no React, easy to unit test).
 *
 * @typedef {'available' | 'allotted-not-confirmed' | 'allotted'} SeatStatus
 * @typedef {{ committee: string, name: string, detail?: string, status: SeatStatus }} Seat
 * @typedef {{ committee?: string, status?: SeatStatus | null, query?: string, showAll?: boolean }} SeatFilters
 * @typedef {{ name: string, seats: Seat[], summary: string }} SeatGroup
 */

export const COMMITTEES = [
  { key: 'unga', label: 'UNGA' },
  { key: 'unhrc', label: 'UNHRC' },
  { key: 'war-cabinet', label: 'War Cabinet' },
  { key: 'ip', label: 'International Press' },
  { key: 'kla', label: 'KLA' },
];

/** Order here is the display sort order: available, then pending, then allotted. */
export const STATUSES = [
  { key: 'available', label: 'Available', short: 'Open', verb: 'open in' },
  { key: 'allotted-not-confirmed', label: 'Allotted, Not Confirmed', short: 'Not Confirmed', verb: 'not confirmed in' },
  { key: 'allotted', label: 'Allotted', short: 'Taken', verb: 'taken in' },
];

const statusRank = Object.fromEntries(STATUSES.map((s, i) => [s.key, i]));
const committeeRank = Object.fromEntries(COMMITTEES.map((c, i) => [c.key, i]));

export const committeeLabel = (key) => COMMITTEES.find((c) => c.key === key)?.label ?? key;

/** @param {Seat[]} seats @returns {Seat[]} */
export function sortSeats(seats) {
  return [...seats].sort(
    (a, b) =>
      statusRank[a.status] - statusRank[b.status] ||
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }) ||
      (committeeRank[a.committee] ?? 99) - (committeeRank[b.committee] ?? 99)
  );
}

/** @param {Seat[]} seats */
export function countByStatus(seats) {
  const counts = { available: 0, 'allotted-not-confirmed': 0, allotted: 0 };
  for (const seat of seats) counts[seat.status] += 1;
  return counts;
}

/** "open in UNGA, KLA, taken in UNHRC" */
function summarise(seats) {
  const parts = [];
  for (const { key, verb } of STATUSES) {
    const labels = seats
      .filter((s) => s.status === key)
      .sort((a, b) => (committeeRank[a.committee] ?? 99) - (committeeRank[b.committee] ?? 99))
      .map((s) => committeeLabel(s.committee));
    if (labels.length) parts.push(`${verb} ${labels.join(', ')}`);
  }
  return parts.join(', ');
}

/**
 * Grid mode (no query): one committee tab (or all), status filter, "available only" unless showAll.
 * Search mode (query): matches across every committee and groups by country name.
 *
 * @param {Seat[]} seats
 * @param {SeatFilters} filters
 * @returns {{ mode: 'grid' | 'search', seats: Seat[], groups: SeatGroup[], counts: Record<SeatStatus, number> }}
 */
export function filterSeats(seats, { committee = 'all', status = null, query = '', showAll = false } = {}) {
  const q = query.trim().toLowerCase();

  if (q) {
    const matches = seats.filter((s) => s.name.toLowerCase().includes(q));
    const byName = new Map();
    for (const seat of matches) {
      const key = seat.name.toLowerCase();
      if (!byName.has(key)) byName.set(key, []);
      byName.get(key).push(seat);
    }
    const groups = [...byName.values()]
      .filter((group) => !status || group.some((s) => s.status === status))
      .map((group) => ({ name: group[0].name, seats: group, summary: summarise(group) }))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    return { mode: 'search', seats: matches, groups, counts: countByStatus(matches) };
  }

  const scoped = committee === 'all' ? seats : seats.filter((s) => s.committee === committee);
  const wanted = status ? [status] : showAll ? null : ['available'];
  const visible = wanted ? scoped.filter((s) => wanted.includes(s.status)) : scoped;
  return { mode: 'grid', seats: sortSeats(visible), groups: [], counts: countByStatus(scoped) };
}

/** "just now", "2 min ago", "1 hr ago" */
export function relativeTime(then, now = Date.now()) {
  const secs = Math.max(0, Math.round((now - then) / 1000));
  if (secs < 45) return 'just now';
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins} min ago`;
  return `${Math.round(mins / 60)} hr ago`;
}
