"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const REGISTER_URL = "https://forms.gle/qSLJsRoFC8UTxHL99";
const REFRESH_MS = 60000;
const TOP = 5;
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light";
const medal = ["text-[#E6C873]", "text-[#d8d8d8]", "text-[#cd8f5a]"]; // gold, silver, bronze

const norm = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();

function Row({ a, highlight = false }) {
  const podium = a.rank <= 3 && a.points > 0;
  return (
    <li
      className={`grid grid-cols-[56px_1fr_84px] items-center gap-2 px-4 py-3 md:grid-cols-[70px_1fr_100px] md:px-6 ${
        highlight ? "bg-gold/10" : ""
      }`}
    >
      <span className="flex items-center gap-1.5 font-display text-base font-bold text-gold-light">
        {podium ? (
          <span className={`material-symbols-outlined text-[20px] ${medal[a.rank - 1]}`} aria-hidden="true">
            emoji_events
          </span>
        ) : (
          <span className="inline-block w-5" aria-hidden="true" />
        )}
        <span aria-label={`Rank ${a.rank}`}>{a.rank}</span>
      </span>
      <span className="min-w-0">
        <span className="block truncate text-base font-semibold text-cream">{a.name}</span>
        {a.college ? <span className="block truncate text-xs text-muted">{a.college}</span> : null}
      </span>
      <span className="text-right">
        <span className="font-display text-xl font-bold text-gold-light">{a.points}</span>
        <span className="sr-only">{a.points === 1 ? " point" : " points"}</span>
      </span>
    </li>
  );
}

export default function CampusAmbassadorLeaderboard() {
  const [list, setList] = useState(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");

  // Live data from the Google Sheet (via /api/ambassadors), refreshed once a minute.
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/ambassadors", { cache: "no-store" });
        if (!res.ok) throw new Error("load failed");
        const data = await res.json();
        if (cancelled) return;
        setList(Array.isArray(data) ? data : []);
        setFailed(false);
      } catch {
        if (!cancelled) setFailed(true);
      }
    };
    load();
    const t = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  // Top 5 by rank. Ambassadors tied on the last place all show, so nobody is dropped arbitrarily.
  const top = useMemo(() => (list ? list.filter((a) => a.rank <= TOP) : []), [list]);

  const q = norm(query);
  const matches = useMemo(() => {
    if (!list || !q) return [];
    return list.filter((a) => norm(a.name).includes(q) || norm(a.college).includes(q) || a.code.toLowerCase() === q).slice(0, 8);
  }, [list, q]);

  return (
    <section id="campus-ambassadors" className="relative z-10 mx-auto max-w-7xl py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-gold-light">TKM MUN Programme</span>
        <h2 className="mt-1 text-4xl font-semibold uppercase text-cream">Campus Ambassador Leaderboard</h2>
        <p className="mt-3 text-muted">The top ambassadors by delegates registered through them. Search your name to check your points.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-gold/50 bg-panel shadow-2xl"
      >
        <div className="grid grid-cols-[56px_1fr_84px] border-b border-gold/30 px-4 py-4 font-display text-[10px] uppercase tracking-wider text-gold-light md:grid-cols-[70px_1fr_100px] md:px-6">
          <span>Rank</span>
          <span>Ambassador</span>
          <span className="text-right">Points</span>
        </div>

        {list === null && !failed ? (
          <p className="px-6 py-12 text-center text-muted">Loading the leaderboard…</p>
        ) : failed && list === null ? (
          <p className="px-6 py-12 text-center text-muted">The leaderboard couldn’t be loaded right now. Please try again shortly.</p>
        ) : top.length === 0 ? (
          <div className="flex min-h-40 flex-col items-center justify-center px-6 py-10 text-center">
            <span className="material-symbols-outlined text-5xl text-gold-light/70" aria-hidden="true">emoji_events</span>
            <p className="mt-3 text-lg font-semibold text-cream">Standings will appear here as registrations come in.</p>
          </div>
        ) : (
          <ol className="divide-y divide-gold/15" aria-label="Top campus ambassadors">
            {top.map((a) => (
              <Row key={a.code} a={a} />
            ))}
          </ol>
        )}

        {/* Find yourself */}
        <div className="border-t border-gold/30 bg-black/10 px-4 py-5 md:px-6">
          <label htmlFor="ca-search" className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-gold-light">
            Check your points
          </label>
          <div className="relative mt-2">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-maroon-dark/70" aria-hidden="true">search</span>
            <input
              id="ca-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your name or college"
              autoComplete="off"
              disabled={!list}
              className={`w-full rounded border border-gold bg-cream py-3 pl-10 pr-4 text-maroon-dark outline-none focus:ring-2 focus:ring-gold-light ${ring}`}
            />
          </div>

          <div aria-live="polite" className="mt-3">
            {q && list ? (
              matches.length ? (
                <ul className="divide-y divide-gold/15 overflow-hidden rounded-lg border border-gold/30 bg-panel">
                  {matches.map((a) => (
                    <Row key={a.code} a={a} highlight />
                  ))}
                </ul>
              ) : (
                <p className="rounded-lg border border-dashed border-gold/40 px-4 py-4 text-center text-sm text-muted">
                  No ambassador found for “{query.trim()}”. Check the spelling, or try your college name.
                </p>
              )
            ) : null}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-gold/30 px-6 py-6 text-center">
          <p className="text-sm text-muted">Points are the delegates who registered through each ambassador. Equal points share a rank.</p>
          <a
            href={REGISTER_URL}
            className={`mt-1 inline-flex items-center gap-2 rounded border border-gold px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-gold-light hover:bg-gold hover:text-maroon-dark ${ring}`}
          >
            Become a Campus Ambassador <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
