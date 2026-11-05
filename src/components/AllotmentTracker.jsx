'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { COMMITTEES, STATUSES, countByStatus, filterSeats, relativeTime } from '@/lib/filterSeats';
import StatTiles from './allotments/StatTiles';
import CommitteeTabs from './allotments/CommitteeTabs';
import ProgressBar from './allotments/ProgressBar';
import SeatGrid from './allotments/SeatGrid';
import Legend from './allotments/Legend';

const REFRESH_MS = 15000;
const PAGE_SIZE = 12;
const validCommittee = (c) => c === 'all' || COMMITTEES.some((x) => x.key === c);
const validStatus = (s) => STATUSES.some((x) => x.key === s);

export default function AllotmentTracker() {
  /** @type {[import('@/lib/filterSeats').Seat[], Function]} */
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [fetchedAt, setFetchedAt] = useState(null);
  const [now, setNow] = useState(() => Date.now());

  const [committee, setCommittee] = useState('all');
  const [bloc, setBloc] = useState(null); // War Cabinet only: 'Western Bloc' | 'Eastern Bloc'
  const [status, setStatus] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Live data: one request for every committee, refreshed on an interval (same endpoint as before).
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await fetch('/api/allotments/sheet?committee=others', { cache: 'no-store' });
        if (!response.ok) throw new Error('Unable to load allotments');
        const data = await response.json();
        if (cancelled) return;
        setSeats(Array.isArray(data) ? data : []);
        setFetchedAt(Date.now());
        setFailed(false);
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(tick);
  }, []);

  // Restore filters from the URL once on mount.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const c = p.get('c');
    const s = p.get('s');
    const q = p.get('q') ?? '';
    if (c && validCommittee(c)) setCommittee(c);
    if (s && validStatus(s)) setStatus(s);
    if (p.get('b')) setBloc(p.get('b'));
    if (p.get('all') === '1') setShowAll(true);
    setInput(q);
    setQuery(q);
    setHydrated(true);
  }, []);

  // Keep the URL shareable.
  useEffect(() => {
    if (!hydrated) return;
    const p = new URLSearchParams(window.location.search);
    const set = (k, v) => (v ? p.set(k, v) : p.delete(k));
    set('c', committee !== 'all' ? committee : '');
    set('s', status ?? '');
    set('b', bloc ?? '');
    set('q', query);
    set('all', showAll ? '1' : '');
    const qs = p.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`);
  }, [hydrated, committee, status, query, showAll, bloc]);

  // Debounce the search box.
  useEffect(() => {
    const t = setTimeout(() => setQuery(input), 250);
    return () => clearTimeout(t);
  }, [input]);

  // Collapse back to one page only when a filter changes (not when live data refreshes).
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [committee, status, query, showAll, bloc]);

  const showLess = useCallback(() => {
    setVisibleCount(PAGE_SIZE);
    document.getElementById('allotments')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const result = useMemo(() => filterSeats(seats, { committee, status, query, showAll, bloc: committee === 'war-cabinet' ? bloc : null }), [seats, committee, status, query, showAll, bloc]);

  const openByCommittee = useMemo(() => {
    const out = {};
    for (const c of COMMITTEES) out[c.key] = seats.filter((s) => s.committee === c.key && s.status === 'available').length;
    return out;
  }, [seats]);
  const openTotal = Object.values(openByCommittee).reduce((a, b) => a + b, 0);

  const committeeLabelText = committee === 'all' ? 'All committees' : COMMITTEES.find((c) => c.key === committee)?.label;
  const progressCounts = useMemo(
    () => countByStatus((committee === 'all' ? seats : seats.filter((s) => s.committee === committee)).filter((s) => !(committee === 'war-cabinet' && bloc) || s.bloc === bloc)),
    [seats, committee, bloc]
  );

  const clearAll = useCallback(() => {
    setInput('');
    setQuery('');
    setStatus(null);
    setShowAll(false);
    setBloc(null);
    setCommittee('all');
  }, []);

  const onSelectSeat = (seat) => {
    if (result.mode === 'search') {
      setInput('');
      setQuery('');
      setCommittee(seat.committee);
      setBloc(null);
      setShowAll(true);
    } else {
      setInput(seat.name);
      setQuery(seat.name);
    }
  };

  const searching = result.mode === 'search';
  const animateKey = `${committee}|${status}|${query}|${showAll}|${bloc}`;

  // War Cabinet is split into blocs; offer a filter for them with open-seat counts.
  const blocs = useMemo(() => {
    const out = new Map();
    for (const s of seats) {
      if (s.committee !== 'war-cabinet' || !s.bloc) continue;
      const cur = out.get(s.bloc) ?? { total: 0, open: 0 };
      cur.total += 1;
      if (s.status === 'available') cur.open += 1;
      out.set(s.bloc, cur);
    }
    return [...out.entries()].map(([name, c]) => ({ name, ...c }));
  }, [seats]);

  return (
    <section id="allotments" className="max-w-6xl mx-auto px-5 md:px-12 py-24 relative z-10">
      <div className="text-center mb-9">
        <span className="font-display text-[10px] text-gold-light tracking-[0.25em] uppercase font-bold">Live Delegate Register</span>
        <h2 className="text-4xl text-cream font-semibold mt-1 uppercase">Allotment Tracker</h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gold/50 bg-panel/95 shadow-2xl">
        <div className="space-y-4 border-b border-gold/25 bg-black/10 p-4 md:p-6">
          <div className="relative">
            <label htmlFor="seat-search" className="sr-only">Search country or portfolio</label>
            <input
              id="seat-search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search country across all committees"
              autoComplete="off"
              className="w-full rounded border border-gold bg-cream px-4 py-3 pr-11 text-maroon-dark outline-none focus:ring-2 focus:ring-gold-light"
            />
            {input ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setInput('');
                  setQuery('');
                }}
                className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded text-maroon-dark hover:bg-gold/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-dark"
              >
                ✕
              </button>
            ) : null}
          </div>

          <StatTiles
            counts={result.counts}
            active={status}
            onToggle={(key) => setStatus((cur) => (cur === key ? null : key))}
            updatedLabel={fetchedAt ? relativeTime(fetchedAt, now) : 'Loading…'}
            failed={failed}
          />
        </div>

        <div className="space-y-4 p-4 md:p-6">
          {searching ? (
            <p className="text-sm text-cream/80">
              Showing results for “{query.trim()}” across all committees.
              <button type="button" onClick={() => { setInput(''); setQuery(''); }} className="ml-2 text-gold-light underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light">
                Clear search
              </button>
            </p>
          ) : (
            <>
              <CommitteeTabs openByCommittee={openByCommittee} openTotal={openTotal} active={committee} onChange={(c) => { setCommittee(c); setBloc(null); }} />
              {committee === 'war-cabinet' && blocs.length > 0 && (
                <div role="group" aria-label="War Cabinet bloc" className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-gold-light">Bloc</span>
                  {[{ name: null, label: 'Both blocs', open: blocs.reduce((n, b) => n + b.open, 0) }, ...blocs.map((b) => ({ name: b.name, label: b.name, open: b.open }))].map((b) => {
                    const on = bloc === b.name;
                    return (
                      <button
                        key={b.label}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setBloc(b.name)}
                        className={`rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light ${
                          on ? 'border-gold-light bg-gold font-semibold text-maroon-dark' : 'border-gold/40 text-cream hover:bg-maroon-hover'
                        }`}
                      >
                        {b.label}
                        <span className={`ml-2 text-xs ${on ? 'text-maroon-dark/80' : 'text-[#8fe3a0]'}`}>{b.open} open</span>
                      </button>
                    );
                  })}
                </div>
              )}
              <ProgressBar label={committeeLabelText} counts={progressCounts} />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-cream/80" aria-live="polite">
                  {status
                    ? `Showing ${STATUSES.find((s) => s.key === status).label} seats (${result.seats.length})`
                    : showAll
                    ? `Showing all seats (${result.seats.length}), available first`
                    : `Showing available seats (${result.seats.length})`}
                </p>
                <button
                  type="button"
                  role="switch"
                  aria-checked={showAll || Boolean(status)}
                  disabled={Boolean(status)}
                  onClick={() => setShowAll((v) => !v)}
                  className="rounded border border-gold/60 px-3 py-1.5 text-sm text-gold-light hover:bg-maroon-hover disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
                >
                  {showAll ? 'Show available only' : 'Show all'}
                </button>
              </div>
            </>
          )}

          {loading ? (
            <p className="py-10 text-center text-cream/70">Loading allotments…</p>
          ) : (
            <SeatGrid
              result={result}
              committee={committee}
              animateKey={animateKey}
              onSelectSeat={onSelectSeat}
              onClear={clearAll}
              visibleCount={visibleCount}
              pageSize={PAGE_SIZE}
              onShowMore={() => setVisibleCount((n) => n + PAGE_SIZE)}
              onShowLess={showLess}
            />
          )}

          <Legend />
        </div>
      </div>
    </section>
  );
}
