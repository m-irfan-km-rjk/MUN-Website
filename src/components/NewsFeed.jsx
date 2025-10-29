"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function NewsSlider({ newsList = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (newsList.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % newsList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [newsList.length]);

  if (newsList.length === 0) {
    return (
      <div className="p-6 bg-gray-600/40 backdrop-blur-md text-gray-400 text-center">
        No news to display.
      </div>
    );
  }

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + newsList.length) % newsList.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % newsList.length);
  };

  const currentNews = newsList[index];

  return (
    <div className="relative flex flex-col justify-center w-full h-[320px] p-8 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-xl backdrop-saturate-150">
      {/* Animated Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-center px-6"
        >
          <motion.h3
            className="text-3xl font-semibold text-white mb-4 drop-shadow-lg"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {currentNews.title}
          </motion.h3>
          <p className="text-gray-200 text-lg leading-relaxed max-w-3xl mx-auto">
            {currentNews.content}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all p-3 rounded-full shadow-md border border-white/20"
      >
        <FaChevronLeft className="text-white text-lg" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all p-3 rounded-full shadow-md border border-white/20"
      >
        <FaChevronRight className="text-white text-lg" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center absolute bottom-4 left-0 right-0 space-x-2">
        {newsList.map((_, i) => (
          <motion.div
            key={i}
            className={`h-2.5 w-2.5 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
            animate={{
              scale: i === index ? 1.3 : 1,
              opacity: i === index ? 1 : 0.6,
            }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        ))}
      </div>

      {/* Soft Gradient Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-400/10 via-transparent to-purple-500/10"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}