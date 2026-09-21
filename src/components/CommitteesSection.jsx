'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const committees = [
  {
    name: 'UNGA',
    fullName: 'United Nations General Assembly',
    agenda: 'Revisiting Multilateral Sovereignty and Climate Reparations in Post-Colonial Maritime Corridors.',
    allocations: 'Double / Single',
    logoUrl: '/UNGA.png',
  },
  {
    name: 'UNHRC',
    fullName: 'United Nations Human Rights Council',
    agenda: 'Safeguarding Indigenous Liberties and Regulating Algorithmic Surveillance in Disputed Territories.',
    allocations: 'Single Delegate',
    logoUrl: '/UNHRC.png',
  },
  {
    name: 'UNSC',
    fullName: 'United Nations Security Council',
    agenda: 'Defusing Asymmetric Escalations and Nuclear Proliferation in the Indo-Pacific Basin.',
    allocations: 'Specialized Cabinet',
    logoUrl: '/UNSC.png',
  },
  {
    name: 'IP',
    fullName: 'International Press Corps',
    agenda: 'Unrestricted Investigative Journalism, Propaganda Counter-Intelligence, and Press Communiqués.',
    allocations: 'Individual Correspondents',
    logoUrl: '/IP.png',
  },
  {
    name: 'KLA',
    fullName: 'Kerala Legislative Assembly',
    agenda: 'Decentralized Coastal Resilience, Maritime Infrastructure, and Sustainable Riverine Policy for Peninsular Sovereignty.',
    allocations: 'Regional Plenipotentiaries (Regional Dialect Allowed)',
    logoUrl: '/KLA.png',
  },
];

const CommitteeCard = ({ committee, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
    whileHover={{ y: -6 }}
    className="filigree-card group relative flex flex-col justify-between overflow-hidden rounded-lg border border-gold bg-maroon-card p-8 text-left shadow-xl hover:border-gold-light hover:shadow-[0_16px_36px_rgba(0,0,0,0.6),0_0_24px_rgba(201,164,76,0.3)] transition-[border-color,box-shadow] duration-500 w-full md:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.7rem)]"
  >
    <div className="card-filigree corner-tl" />
    <div className="card-filigree corner-br" />
    <div>
      <div className="relative w-14 h-14 rounded-full bg-maroon-dark border-2 border-gold mb-4 shadow-md group-hover:scale-105 group-hover:border-blush transition-all duration-500">
        <Image src={committee.logoUrl} alt={`${committee.name} emblem`} fill sizes="56px" className="object-contain p-2" />
      </div>
      <span className="font-display text-xs text-gold-light font-bold tracking-[0.2em]">{committee.name}</span>
      <h3 className="text-xl text-cream mt-1 font-bold leading-snug">{committee.fullName}</h3>
      <div className="w-full h-px bg-gold/40 my-3" />
      <p className="text-[15px] leading-relaxed text-muted italic">Agenda: “{committee.agenda}”</p>
    </div>
    <div className="mt-6 pt-3 border-t border-gold/30 flex items-center justify-between gap-3">
      <span className="font-display text-[10px] text-gold-light uppercase tracking-wider">Allocations: {committee.allocations}</span>
      <span className="material-symbols-outlined text-gold-light text-[20px] group-hover:translate-x-1.5 transition-transform duration-300">arrow_outward</span>
    </div>
  </motion.div>
);

const CommitteesSection = () => {
  return (
    <section id="assemblies" className="max-w-7xl mx-auto py-24 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 mb-1">
          <span className="w-8 h-px bg-gold" />
          <span className="font-display text-[10px] text-gold-light tracking-[0.25em] uppercase font-bold">Chambers of Consensus</span>
          <span className="w-8 h-px bg-gold" />
        </div>
        <h2 className="text-4xl text-gold-light font-semibold tracking-wide uppercase">The Five Sovereign Assemblies</h2>
        <p className="text-lg text-muted mt-3">
          Select your delegation beneath the emblems of multilateral law, high military strategy, legislative advocacy, and investigative press.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {committees.map((c, i) => (
          <CommitteeCard key={c.name} committee={c} index={i} />
        ))}
      </div>
    </section>
  );
};

export default CommitteesSection;
