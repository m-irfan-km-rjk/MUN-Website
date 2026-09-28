'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const REGISTER_URL = 'https://forms.gle/yFk2MuzPctFHQC5g9';

const committees = [
  {
    name: 'UNGA',
    fullName: 'United Nations General Assembly',
    description: 'The principal deliberative, policymaking, and representative organ of the United Nations, bringing together all 193 member states to discuss and coordinate on international peace, security, and development.',
    agenda: 'Revisiting Multilateral Sovereignty and Climate Reparations in Post-Colonial Maritime Corridors.',
    allocations: 'Single or double delegations',
    logoUrl: '/UNGA.png',
  },
  {
    name: 'UNHRC',
    fullName: 'United Nations Human Rights Council',
    description: 'The UN body responsible for strengthening the promotion and protection of human rights around the globe, addressing violations and making recommendations on human rights situations worldwide.',
    agenda: 'Safeguarding Indigenous Liberties and Regulating Algorithmic Surveillance in Disputed Territories.',
    allocations: 'Single Delegate',
    logoUrl: '/UNHRC.png',
  },
  {
    name: 'UNSC',
    fullName: 'United Nations Security Council',
    description: 'The most powerful body of the United Nations, charged with maintaining international peace and security, settling disputes, and authorizing the use of force when necessary.',
    agenda: 'Defusing Asymmetric Escalations and Nuclear Proliferation in the Indo-Pacific Basin.',
    allocations: 'Specialized Cabinet',
    logoUrl: '/UNSC.png',
  },
  {
    name: 'IP',
    fullName: 'International Press Corps',
    description: 'The media wing of the conference, where correspondents gather intelligence, file dispatches, and hold delegations accountable through rigorous investigative journalism and press briefings.',
    agenda: 'Unrestricted Investigative Journalism, Propaganda Counter-Intelligence, and Press Communiqués.',
    allocations: 'Individual Correspondents',
    logoUrl: '/IP.png',
  },
  {
    name: 'KLA',
    fullName: 'Kerala Legislative Assembly',
    description: 'A simulation of the state legislature of Kerala, debating regional policy, governance, and development with regional dialect and local parliamentary procedure.',
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
      <p className="text-base leading-relaxed text-cream/90 italic">Agenda: “{committee.agenda}”</p>
      <div className="mt-4 overflow-hidden">
        <span className="font-display text-[10px] uppercase tracking-wider text-gold-light">About</span>
        <div className="max-h-0 overflow-hidden transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:max-h-48">
          <p className="text-sm text-cream/85 leading-relaxed mt-1 translate-y-4 opacity-0 transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:translate-y-0 group-hover:opacity-100">
            {committee.description}
          </p>
        </div>
      </div>
    </div>
    <div className="mt-6 pt-4 border-t border-gold/30 space-y-3">
      <p className="text-base text-cream">
        <span className="font-display text-xs uppercase tracking-wider text-gold-light mr-2">Allocations</span>
        {committee.allocations}
      </p>
      <a
        href={REGISTER_URL}
        className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-wider text-gold-light hover:text-white underline-offset-4 hover:underline"
      >
        Register for this committee
        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform duration-300" aria-hidden="true">arrow_forward</span>
      </a>
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
