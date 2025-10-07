'use client';

import { motion } from 'framer-motion';

const highlights = [
  { value: "150+", label: "Delegates" },
  { value: "5", label: "Committees" },
  { value: "Dec 5-7", label: "Dates" },
  { value: "TKMCE", label: "Kollam" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-medium text-text-primary">
            About The Conference
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side: About Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-text-primary/80 leading-relaxed">
              TKM College of Engineering Model United Nations 2025 sets the stage for a groundbreaking simulation of the International Cricket Council (ICC). This conference invites delegates to step into the shoes of global cricket administrators to debate the future of the sport. Topics will range from regulating T20 leagues and balancing international schedules to promoting cricket in emerging nations. Prepare for a dynamic committee experience that blends sports governance with international diplomacy.
            </p>
          </motion.div>

          {/* Right Side: Conference Highlights Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="bg-dark-blue/20 border border-mid-blue/30 p-8 rounded-lg"
          >
            <h3 className="text-2xl font-semibold text-accent mb-6">Conference Highlights</h3>
            <div className="grid grid-cols-2 gap-8">
              {highlights.map((highlight) => (
                <div key={highlight.label}>
                  <p className="text-3xl font-bold text-text-primary">{highlight.value}</p>
                  <p className="text-text-primary/60">{highlight.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

