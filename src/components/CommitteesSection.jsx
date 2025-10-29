'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// All icons are now replaced with custom logos
import Image from 'next/image';

const committees = [
  {
    icon: null,
    name: "UNGA",
    fullName: "United Nations General Assembly",
    description:
      "Deliberate on wide-ranging global concerns, from peace and security to sustainable development and human rights.",
    logoUrl: "/UNGA.png",
  },
  {
    icon: null,
    name: "UNHRC",
    fullName: "United Nations Human Rights Council",
    description:
      "Champion and critique human-rights practices worldwide while drafting resolutions to protect vulnerable communities.",
    logoUrl: "/UNHRC.png",
  },
  {
    icon: null,
    name: "UNSC",
    fullName: "United Nations Security Council",
    description:
      "Respond to urgent conflicts with binding resolutions, sanctions, and peacekeeping mandates that reshape geopolitics.",
    logoUrl: "/UNSC.png",
    customScale: "scale-150",
  },
  {
    icon: null,
    name: "IP",
    fullName: "International Press",
    description:
      "Investigate proceedings, craft compelling narratives, and deliver real-time reporting that influences public perception.",
    logoUrl: "/IP.png",
  },
  {
    // UPDATED: Set icon to null
    icon: null,
    name: "ICC",
    fullName: "International Cricket Council",
    description:
      "Strategize over fixtures, regulations, and the spirit of cricket while mediating international sporting diplomacy.",
    // UPDATED: Added the logo URL
    logoUrl: "/ICC.png",
    // ADDED: Custom scale to match the others
    customScale: "scale-150",
  },
];

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const overlayVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1.08,
    transition: { type: "spring", stiffness: 210, damping: 18, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.97,
    transition: { duration: 0.22, ease: "easeInOut" },
  },
};

const CommitteesSection = () => {
  const [hoveredCommittee, setHoveredCommittee] = useState(null);
  const [delayedCommittee, setDelayedCommittee] = useState(null);
  const [activeMobileCommittee, setActiveMobileCommittee] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const showTimerRef = useRef(null);
  const hideTimerRef = useRef(null);
  const DELAY_MS = 200;

  const handleCardClick = (event, committee) => {
    if (!isTouchDevice) return;
    event.stopPropagation();
    setActiveMobileCommittee((previous) =>
      previous?.name === committee.name ? null : committee
    );
  };

  useEffect(() => {
    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const updateIsTouch = (event) => setIsTouchDevice(event.matches);

    setIsTouchDevice(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateIsTouch);
      return () => mediaQuery.removeEventListener("change", updateIsTouch);
    }

    mediaQuery.addListener(updateIsTouch);
    return () => mediaQuery.removeListener(updateIsTouch);
  }, []);

  useEffect(() => {
    if (!isTouchDevice && activeMobileCommittee) {
      setActiveMobileCommittee(null);
    }
  }, [isTouchDevice, activeMobileCommittee]);

  useEffect(() => {
    if (!isTouchDevice || !activeMobileCommittee) return;

    const handleDocumentClick = () => setActiveMobileCommittee(null);
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [isTouchDevice, activeMobileCommittee]);

  useEffect(() => {
    if (isTouchDevice) {
      setDelayedCommittee(null);
      return;
    }

    if (hoveredCommittee) {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      showTimerRef.current = setTimeout(() => {
        setDelayedCommittee(hoveredCommittee);
        showTimerRef.current = null;
      }, DELAY_MS);
    } else {
      if (showTimerRef.current) {
        clearTimeout(showTimerRef.current);
        showTimerRef.current = null;
      }
      hideTimerRef.current = setTimeout(() => {
        setDelayedCommittee(null);
        hideTimerRef.current = null;
      }, DELAY_MS);
    }
  }, [hoveredCommittee, isTouchDevice]);

  return (
    <section id="committees" className="relative overflow-hidden bg-gradient-to-b from-background via-background/90 to-dark-blue/40 py-24 sm:py-32">
      <div className="absolute inset-0 top-[-10rem] flex items-center justify-center">
        <div className="w-[80rem] h-[30rem] bg-mid-blue/10 blur-[10rem] rounded-full" />
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-medium text-text-primary mb-4"
        >
          Committees
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-primary/70 mb-16 max-w-2xl mx-auto"
        >
          Engage in dynamic debate across a diverse range of domestic and international councils.
        </motion.p>

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.15 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 md:grid-cols-3 lg:grid-cols-5"
          >
            {committees.map((committee) => (
              <motion.div
                key={committee.name}
                variants={cardVariants}
                whileHover={isTouchDevice ? undefined : { y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`group relative flex w-full flex-col justify-end overflow-hidden rounded-3xl border border-mid-blue/20 bg-dark-blue/30 p-6 text-left shadow-[0_18px_45px_-20px_rgba(44,106,185,0.55)] transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mid-blue hover:border-mid-blue/60 hover:bg-dark-blue/50 hover:shadow-[0_25px_60px_-25px_rgba(44,106,185,0.65)] ${isTouchDevice
                  ? "min-h-[15rem]"
                  : "h-80 hover:-translate-y-3"
                  }`}
                role="button"
                tabIndex={0}
                onMouseEnter={() => !isTouchDevice && setHoveredCommittee(committee)}
                onMouseLeave={() => !isTouchDevice && setHoveredCommittee(null)}
                onClick={(event) => handleCardClick(event, committee)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleCardClick(event, committee);
                  }
                }}
              >
                {/* Conditionally render the watermark logo if it exists */}
                {committee.logoUrl && (
                  <Image
                    src={committee.logoUrl}
                    alt={`${committee.name} logo`}
                    layout="fill"
                    objectFit="contain"
                    className={`absolute inset-0 h-full w-full opacity-[0.18] p-10 transition-transform duration-500 ease-out ${committee.customScale || ""} group-hover:scale-95 sm:p-8`}
                  />
                )}
                <div className="relative z-10 flex flex-col gap-2">
                  {/* Conditionally render the small icon if it exists */}
                  {committee.icon && (
                    <div className="mb-3 text-accent">{committee.icon}</div>
                  )}
                  <h3 className="text-xl font-bold text-text-primary">{committee.name}</h3>
                  <p className="text-sm text-text-primary/70">{committee.fullName}</p>
                </div>
                {isTouchDevice && activeMobileCommittee?.name === committee.name && (
                  <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end rounded-3xl bg-gradient-to-b from-dark-blue/75 via-dark-blue/80 to-dark-blue/90 p-6 text-left shadow-[0_24px_65px_-28px_rgba(44,106,185,0.7)]">
                    <div className="space-y-3 text-text-primary">
                      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-mid-blue/60">Committee Spotlight</p>
                      <div className="space-y-1">
                        <h3 className="text-2xl font-semibold">{committee.name}</h3>
                        <p className="text-sm text-text-primary/65">{committee.fullName}</p>
                      </div>
                      <p className="text-sm leading-relaxed text-text-primary/80">
                        {committee.description}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
          <AnimatePresence>
            {delayedCommittee && (
              <motion.div
                key={delayedCommittee.name}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={overlayVariants}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-96 w-full -translate-x-1/2 -translate-y-1/2 items-center rounded-3xl border border-mid-blue/25 bg-gradient-to-br from-dark-blue/85 via-dark-blue/65 to-mid-blue/40 p-12 text-left shadow-[0_32px_82px_-28px_rgba(44,106,185,0.6)] backdrop-blur-xl backdrop-saturate-150"
              >
                <div className="relative flex h-full w-full items-center gap-10 text-text-primary">
                  {delayedCommittee.logoUrl && (
                    <div className="relative hidden h-64 w-64 flex-shrink-0 overflow-hidden rounded-3xl border border-mid-blue/20 bg-dark-blue/40 p-6 shadow-[0_18px_45px_-22px_rgba(44,106,185,0.6)] sm:flex">
                      <Image
                        src={delayedCommittee.logoUrl}
                        alt={`${delayedCommittee.name} emblem`}
                        fill
                        sizes="256px"
                        className={`object-contain drop-shadow-[0_16px_30px_rgba(7,31,70,0.55)] ${delayedCommittee.customScale || ''}`}
                      />
                    </div>
                  )}
                  <div className="relative max-w-2xl space-y-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-mid-blue/60">
                      Committee Spotlight
                    </p>
                    <div className="space-y-1">
                      <h3 className="text-3xl font-semibold">{delayedCommittee.name}</h3>
                      <p className="text-base text-text-primary/60">{delayedCommittee.fullName}</p>
                    </div>
                    <p className="text-base leading-relaxed text-text-primary/80">
                      {delayedCommittee.description}
                    </p>

                    {/* Blinking text at bottom center */}

                  </div>
                  <style jsx>{`
                    @keyframes blink {
                      0%, 100% { opacity: 1; }
                      50% { opacity: 0; }
                    }
                    .animate-blink {
                      animation: blink 2s infinite;
                    }
                  `}</style>
                  <p className="hidden md:block     absolute bottom-0 left-1/2 -translate-x-1/2 text-sm text-white animate-blink">
                    ← Move your mouse left or right →
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CommitteesSection;

