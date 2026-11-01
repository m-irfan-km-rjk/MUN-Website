'use client';

import { useEffect, useState } from "react";

const TARGET = new Date("2026-12-04T17:00:00+05:30");

export default function Countdown() {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const distance = Math.max(0, TARGET.getTime() - Date.now());
      setRemaining({
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance / 3600000) % 24),
        minutes: Math.floor((distance / 60000) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-12 relative z-10">
      <div className="grid grid-cols-4 gap-2 md:gap-4 bg-maroon-dark/95 border border-gold/70 rounded-lg px-3 py-5 md:px-8 md:py-7 shadow-[0_18px_50px_rgba(24,8,7,0.45)]">
        {Object.entries(remaining).map(([label, value], index) => (
          <div key={label} className={`text-center ${index ? "border-l border-gold/30" : ""}`}>
            <div className="font-cormorant text-3xl md:text-6xl text-gold-light tabular-nums">{String(value).padStart(2, "0")}</div>
            <div className="font-display text-[9px] md:text-xs uppercase tracking-[0.2em] text-cream/70 mt-1">{label}</div>
          </div>
        ))}
      </div>
      <p className="text-center mt-3 font-display text-[10px] uppercase tracking-[0.25em] text-maroon-dark/70">Until the convocation · 4 December 2026 · 5:00 PM IST</p>
    </section>
  );
}
