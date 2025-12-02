"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaBell } from "react-icons/fa";

export default function NewsSlider({ newsList = [], loading = false }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (newsList.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % newsList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [newsList.length]);

  const handlePrev = () => {
    if (newsList.length === 0) return;
    setIndex((prev) => (prev - 1 + newsList.length) % newsList.length);
  };

  const handleNext = () => {
    if (newsList.length === 0) return;
    setIndex((prev) => (prev + 1) % newsList.length);
  };

  const currentNews = newsList.length > 0 ? newsList[index] : null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative flex items-center bg-deep-navy/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg overflow-hidden">
        {/* Label Badge */}
        <div className="flex-shrink-0 flex items-center gap-2 bg-accent/20 text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold tracking-wider mr-4 border border-accent/20">
          <FaBell className="animate-pulse" />
          <span>LATEST</span>
        </div>

        {/* Content */}
        <div className="flex-1 relative h-6 md:h-8 overflow-hidden flex items-center">
          {/* Mobile Marquee View */}
          <div className="md:hidden w-full absolute inset-0 flex items-center overflow-hidden">
            {loading ? (
              <p className="text-white/70 text-xs font-medium italic">
                Loading updates...
              </p>
            ) : newsList.length === 0 ? (
              <p className="text-white/70 text-xs font-medium italic">
                No news available at the moment
              </p>
            ) : (
              <div className="animate-marquee whitespace-nowrap">
                {newsList.map((news, i) => (
                  <span key={i} className="inline-block mr-8">
                    <span className="font-bold text-white mr-2">{news.title}:</span>
                    <span className="opacity-80 text-white/90">{news.content}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Slider View */}
          <div className="hidden md:block w-full h-full relative">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 flex items-center"
                >
                  <p className="text-white/70 text-xs md:text-sm font-medium italic">
                    Loading updates...
                  </p>
                </motion.div>
              ) : newsList.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 flex items-center"
                >
                  <p className="text-white/70 text-xs md:text-sm font-medium italic">
                    No news available at the moment
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center"
                >
                  <p className="text-white/90 text-xs md:text-sm font-medium truncate pr-4">
                    <span className="font-bold text-white mr-2">
                      {currentNews?.title}:
                    </span>
                    <span className="opacity-80">{currentNews?.content}</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls - Desktop Only */}
        {!loading && newsList.length > 0 && (
          <div className="hidden md:flex flex-shrink-0 items-center gap-2 ml-2 border-l border-white/10 pl-3">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}