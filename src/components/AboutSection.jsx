'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const highlights = [
  { icon: 'verified_user', value: '150+', label: 'Delegates & Dignitaries across the subcontinent' },
  { icon: 'account_balance', value: '5', label: 'Distinct Sovereign Assemblies & Councils' },
  { icon: 'event_note', value: '4–6 DEC', label: '4th, 5th and 6th December' },
  { icon: 'apartment', value: 'TKMCE', label: 'Karikode, Kollam, Kerala, India' },
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
            className="lg:col-span-6 flex flex-col gap-4 text-[#F3E9DC]"
          >
            <div className="inline-flex items-center gap-2 text-gold-light">
              <span className="font-display text-[10px] uppercase tracking-[0.25em] font-bold">About TKM MUN</span>
              <span className="w-12 h-px bg-gold" />
            </div>
            <h2 className="text-4xl font-semibold text-gold-light leading-tight uppercase">
              A Space for Diplomacy, Debate &amp; Discussion
            </h2>
            <div className="space-y-3 text-lg text-[#F3E9DC] leading-relaxed">
              <p>
                Hosted at TKM College of Engineering, Kollam, TKM MUN brings together students from diverse backgrounds to discuss global issues, exchange ideas and explore different perspectives.
              </p>
              <p>
                Through committee simulations, delegates step into the roles of diplomats, policymakers and journalists, taking part in debates, negotiations and discussions on matters of international importance. More than just a debate, TKM MUN is a space to build confidence, think critically, develop leadership skills and experience the true spirit of diplomacy and collaboration.
              </p>
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
              <div className="mt-3 h-9 bg-gradient-to-r from-gold via-gold-light to-gold rounded shadow-inner border border-gold-dark" />
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
