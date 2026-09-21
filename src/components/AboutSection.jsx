'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const pillars = [
  { icon: 'balance', label: 'Sovereign Diplomacy' },
  { icon: 'gavel', label: 'Parliamentary Precision' },
  { icon: 'handshake', label: 'Bilateral Resolution' },
];

const highlights = [
  { icon: 'verified_user', value: '150+', label: 'Delegates & Dignitaries across the subcontinent' },
  { icon: 'account_balance', value: '5', label: 'Distinct Sovereign Assemblies & Councils' },
  { icon: 'event_note', value: 'DEC 5–7', label: 'Three Days of Rigorous Parliamentary Debate' },
  { icon: 'apartment', value: 'TKMCE', label: 'Karikode, Kollam Campus, Malabar Coast' },
];

const Corner = ({ className }) => <div className={`absolute w-6 h-6 border-blush ${className}`} />;

const AboutSection = () => {
  return (
    <>
      <section id="about" className="max-w-7xl mx-auto px-6 md:px-12 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col gap-4 text-cream"
          >
            <div className="inline-flex items-center gap-2 text-gold-light">
              <span className="font-display text-[10px] uppercase tracking-[0.25em] font-bold">The Convocation</span>
              <span className="w-12 h-px bg-gold" />
            </div>
            <h2 className="drop-cap-illuminated text-4xl font-semibold text-gold-light leading-tight uppercase">
              A Sanctum for Diplomatic Discourse &amp; Statecraft
            </h2>
            <div className="space-y-3 text-lg text-parchment/90 leading-relaxed text-justify">
              <p>
                Founded upon the venerated halls of TKM College of Engineering, Kollam, TKM MUN convenes the most formidable minds to debate the fate of global geopolitics. Delegates assume the mantle of ambassadors, sovereign ministers, and investigative journalists, navigating international crises, negotiating delicate bilateral treaties, and formulating binding resolutions.
              </p>
              <p>
                Steeped in intellectual rigor and parliamentary decorum, this convocation tests rhetoric, strategic poise, and moral conviction beneath the grandeur of formal consensus.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {pillars.map((p) => (
                <div key={p.label} className="p-4 rounded bg-maroon-dark/80 border border-gold/50 text-center flex flex-col items-center shadow-md hover:border-gold-light hover:-translate-y-1 transition-all duration-500">
                  <span className="material-symbols-outlined text-gold-light text-3xl mb-1">{p.icon}</span>
                  <span className="font-display text-[10px] text-gold-light uppercase tracking-wider font-bold">{p.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-6 relative group"
          >
            <div className="p-3 bg-ink border-2 border-gold rounded-lg shadow-[0_12px_36px_rgba(0,0,0,0.6)] relative group-hover:border-gold-light transition-colors duration-700">
              <Corner className="-top-2 -left-2 border-t-2 border-l-2" />
              <Corner className="-top-2 -right-2 border-t-2 border-r-2" />
              <Corner className="-bottom-2 -left-2 border-b-2 border-l-2" />
              <Corner className="-bottom-2 -right-2 border-b-2 border-r-2" />
              <div className="overflow-hidden rounded border border-gold/60 relative h-80 lg:h-96 w-full bg-[#1e130d]">
                <Image
                  src="/assets/event1.jpg"
                  alt="TKM MUN plenary session"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 saturate-95 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
              <div className="mt-3 py-2 px-4 bg-gradient-to-r from-gold via-gold-light to-gold text-maroon-dark rounded text-center shadow-inner border border-gold-dark">
                <span className="font-display text-[10px] uppercase font-bold tracking-[0.2em] block">
                  The Grand Council Chamber · Session of Plenipotentiaries
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {highlights.map((h, i) => (
            <motion.div
              key={h.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="filigree-card bg-maroon-card border border-gold rounded p-7 flex flex-col items-center text-center relative overflow-hidden shadow-lg group hover:bg-maroon-hover transition-colors duration-700"
            >
              <div className="card-filigree corner-tl" />
              <div className="card-filigree corner-br" />
              <span className="material-symbols-outlined text-gold-light text-4xl mb-1 group-hover:scale-110 transition-transform">{h.icon}</span>
              <span className="text-4xl font-semibold text-gold-light leading-none my-2">{h.value}</span>
              <p className="text-base text-cream mt-2 font-medium">{h.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutSection;
