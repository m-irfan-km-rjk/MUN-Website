'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { mainMembers, otherMembers } from '../data/people';

const titleCase = (s) => s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const MemberCard = ({ member, index, featured = false }) => {
  const offsets = ['translate-y-12 lg:translate-y-16', 'translate-y-3 lg:translate-y-6', 'lg:-translate-y-4', 'translate-y-3 lg:translate-y-6', 'translate-y-12 lg:translate-y-16'];
  const widths = ['w-[210px] lg:w-[230px]', 'w-[210px] lg:w-[230px]', 'w-[220px] lg:w-[250px]', 'w-[210px] lg:w-[230px]', 'w-[210px] lg:w-[230px]'];
  const overlap = featured || index === 0 ? '' : '-ml-[18px] lg:-ml-[42px]';

  return (
    <motion.article
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`secretariat-frame group relative shrink-0 ${featured ? 'w-[220px] lg:w-[250px]' : widths[index % 5]} ${featured ? 'lg:-translate-y-4' : offsets[index % 5]} ${overlap} snap-center`}
    >
      <div className={`relative h-[300px] lg:h-[360px] overflow-hidden rounded-[22px] border border-gold/80 bg-ink shadow-[0_22px_45px_rgba(20,8,6,0.48)] transition-transform duration-500 group-hover:-translate-y-2 ${featured || index % 5 === 2 ? 'lg:h-[390px]' : ''}`}>
        {member.imageUrl ? (
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            sizes="250px"
            className="object-cover object-top sepia-[.08] saturate-[.92] transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#315A49] to-maroon-dark">
            <span className="font-display text-4xl text-gold-light">{member.name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#24100d] via-transparent to-transparent opacity-95" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-5 text-center">
          <p className="font-display text-[13px] font-bold uppercase tracking-[0.12em] text-gold-light drop-shadow-md">
            {member.name}
          </p>
          <p className="mt-1 text-sm font-semibold text-cream">
            {member.position}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

const TeamSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const extras = Object.entries(otherMembers).flatMap(([category, members]) =>
    Object.entries(members).map(([key, imageUrl]) => ({
      name: titleCase(key),
      position: titleCase(category),
      category,
      imageUrl,
    }))
  );

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'main', label: 'Secretariat' },
    ...Object.keys(otherMembers).map((key) => ({ key, label: titleCase(key) })),
  ];

  const filteredMembers = activeCategory === 'all'
    ? [...mainMembers, ...extras]
    : activeCategory === 'main'
      ? mainMembers
      : extras.filter((member) => member.category === activeCategory);

  return (
    <section id="secretariat" className="max-w-7xl mx-auto py-24 relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-display text-[10px] text-gold-light tracking-[0.25em] uppercase font-bold">Executive Board</span>
        <h2 className="text-4xl text-gold-light font-semibold mt-1 uppercase">The High Secretariat</h2>
        <p className="text-base text-muted mt-2">
          The Stewards of Parliamentary Procedure, Sovereign Decorum, and Assembly Governance
        </p>
      </div>

      <div className="mb-12 flex justify-center">
        <div className="secretariat-scroll flex max-w-full gap-2 overflow-x-auto px-4 pb-3 snap-x snap-mandatory">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setActiveCategory(category.key)}
              className={`shrink-0 snap-center rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                activeCategory === category.key
                  ? 'border-gold bg-gold text-maroon-dark shadow-[0_8px_24px_rgba(201,164,76,0.25)]'
                  : 'border-gold/60 bg-transparent text-gold-light hover:border-gold-light hover:text-cream'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div
          className={`secretariat-scroll flex min-h-[410px] items-start overflow-x-auto py-8 snap-x snap-mandatory ${
            filteredMembers.length <= 3
              ? filteredMembers.length === 1
                ? 'justify-start px-[calc(50%-105px)] lg:justify-center lg:px-4'
                : filteredMembers.length === 2
                  ? 'justify-start px-[calc(50%-192px)] lg:justify-center lg:px-4'
                  : 'justify-start px-[calc(50%-375px)] lg:justify-center lg:px-4'
              : 'justify-start px-[calc(50%-105px)] lg:px-8'
          }`}
        >
          {filteredMembers.map((member, index) => (
            <MemberCard
              key={`${member.name}-${member.position}`}
              member={member}
              index={index}
              featured={activeCategory === 'main' && member.position === 'Secretary General'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
