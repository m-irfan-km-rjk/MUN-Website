"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaBell } from "react-icons/fa";

const REGISTER_URL = "https://forms.gle/yFk2MuzPctFHQC5g9";

// Shown whenever there is no live news (loading, error or empty), so the bar is never blank.
const FALLBACK = {
  title: "Registrations open",
  content: "4–6 December · TKM College of Engineering, Kollam",
};

export default function NewsSlider({ newsList = [], loading = false, error = false }) {
  const [index, setIndex] = useState(0);
  const hasNews = !loading && !error && newsList.length > 0;
  const count = hasNews ? newsList.length : 0;

  useEffect(() => {
    if (count < 2) return;
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % count), 5000);
    return () => clearInterval(timer);
  }, [count]);

  const go = (step) => setIndex((prev) => (prev + step + count) % count);
  const current = hasNews ? newsList[index % count] : FALLBACK;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className="relative flex items-center bg-parchment/95 border border-gold/60 px-4 py-3 md:px-6 shadow-lg overflow-hidden"
        role="region"
        aria-label="Latest dispatches"
        aria-live="polite"
      >
        <div className="flex items-center gap-2 bg-maroon-dark text-gold-light px-3 py-1 font-display text-xs tracking-[0.2em] mr-4 shrink-0">
          <FaBell className="animate-pulse" />
          <span>DISPATCH</span>
        </div>

        <div className="flex-1 min-w-0 text-base md:text-lg text-maroon-dark">
          <AnimatePresence mode="wait">
            <motion.p
              key={hasNews ? index : "fallback"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="line-clamp-2 md:line-clamp-1"
            >
              <span className="font-bold mr-2">{current.title}:</span>
              <span>{current.content}</span>
              {!hasNews && (
                <a href={REGISTER_URL} className="ml-3 font-semibold underline underline-offset-4 decoration-gold hover:text-[#6f4a2f]">
                  Register now
                </a>
              )}
            </motion.p>
          </AnimatePresence>
        </div>

        {count > 1 && (
          <div className="hidden md:flex shrink-0 items-center gap-2 ml-2 border-l border-maroon-dark/20 pl-3">
            <button onClick={() => go(-1)} aria-label="Previous dispatch" className="p-2 rounded-full text-maroon-dark/70 hover:bg-maroon-dark/10 hover:text-maroon-dark transition-colors">
              <FaChevronLeft size={12} />
            </button>
            <button onClick={() => go(1)} aria-label="Next dispatch" className="p-2 rounded-full text-maroon-dark/70 hover:bg-maroon-dark/10 hover:text-maroon-dark transition-colors">
              <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
