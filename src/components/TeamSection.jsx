'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { mainMembers, otherMembers } from '../data/people';

const titleCase = (s) => s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const ArchCard = ({ name, position, tagline, imageUrl, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.96 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="secretariat-frame group bg-maroon-dark border border-gold rounded-t-full rounded-b-lg p-4 flex flex-col items-center text-center shadow-2xl hover:border-blush transition-colors duration-500"
  >
    <div className="w-36 h-48 rounded-t-full rounded-b-md overflow-hidden border-2 border-gold mb-4 relative mt-2 bg-ink shadow-inner group-hover:border-blush transition-colors duration-500">
      <Image src={imageUrl} alt={name} fill sizes="150px" className="object-cover sepia-[.15] saturate-[.9]" />
    </div>
    <span className="font-display text-xs text-gold-light font-bold tracking-widest uppercase">{name}</span>
    <span className="text-xl text-cream mt-1 font-semibold">{position}</span>
    {tagline && <span className="italic text-[15px] text-gold mt-1">{tagline}</span>}
  </motion.div>
);

const TeamSection = () => {
  const [showMore, setShowMore] = useState(false);

  const extras = Object.entries(otherMembers).flatMap(([category, members]) =>
    Object.entries(members).map(([key, imageUrl]) => ({
      name: titleCase(key),
      position: titleCase(category),
      imageUrl,
    }))
  );

  return (
    <section id="secretariat" className="max-w-7xl mx-auto py-24 relative z-10">
      <div className="flex items-center justify-center gap-4 max-w-4xl mx-auto mb-20 text-gold">
        <div className="flex-1 h-px bg-gold/40" />
        <span className="material-symbols-outlined text-2xl text-gold-light">auto_awesome</span>
        <div className="flex-1 h-px bg-gold/40" />
      </div>

      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-display text-[10px] text-gold-light tracking-[0.25em] uppercase font-bold">Executive Board</span>
        <h2 className="text-4xl text-gold-light font-semibold mt-1 uppercase">The High Secretariat</h2>
        <p className="text-base text-muted mt-2">
          The Stewards of Parliamentary Procedure, Sovereign Decorum, and Assembly Governance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {mainMembers.map((m, i) => (
          <ArchCard key={m.name} {...m} index={i} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => setShowMore(!showMore)}
          className="wax-gold-btn inline-flex items-center gap-2 border border-gold text-gold-light font-display text-[10px] uppercase tracking-[0.2em] px-10 py-2 rounded bg-maroon-dark/60 hover:bg-maroon-dark hover:text-cream transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">group</span>
          {showMore ? 'Show Fewer Members' : 'Show More Secretariat Members'}
        </button>
      </div>

      {showMore && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-10">
          {extras.map((m, i) => (
            <ArchCard key={m.position + m.name} {...m} index={i % 4} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TeamSection;
