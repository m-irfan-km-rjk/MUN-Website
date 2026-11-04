"use client";

import { motion } from "framer-motion";

const REGISTER_URL = "https://forms.gle/qSLJsRoFC8UTxHL99";

export default function CampusAmbassadorLeaderboard() {
  return (
    <section id="campus-ambassadors" className="relative z-10 mx-auto max-w-7xl py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-gold-light">TKM MUN Programme</span>
        <h2 className="mt-1 text-4xl font-semibold uppercase text-cream">Campus Ambassador Leaderboard</h2>
        <p className="mt-3 text-muted">Represent TKM MUN on your campus and track ambassador activity here.</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 overflow-hidden rounded-2xl border border-gold/50 bg-panel shadow-2xl"
      >
        <div className="grid grid-cols-[70px_1fr_100px] border-b border-gold/30 px-4 py-4 font-display text-[10px] uppercase tracking-wider text-gold-light md:px-6">
          <span>Rank</span><span>Ambassador</span><span className="text-right">Points</span>
        </div>
        <div className="flex min-h-52 flex-col items-center justify-center px-6 py-12 text-center">
          <span className="material-symbols-outlined text-5xl text-gold-light/70">emoji_events</span>
          <p className="mt-3 text-lg font-semibold text-cream">Leaderboard standings will be announced soon.</p>
          <p className="mt-1 max-w-lg text-sm text-muted">Verified ambassador registrations and points will appear here as the programme begins.</p>
          <a href={REGISTER_URL} className="mt-6 inline-flex items-center gap-2 rounded border border-gold px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-gold-light hover:bg-gold hover:text-maroon-dark">
            Become a Campus Ambassador <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
