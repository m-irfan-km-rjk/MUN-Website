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
              TKM Model United Nations is a flagship diplomatic conference hosted by TKM College of Engineering, designed to inspire young leaders to engage with global challenges. The conference brings together passionate delegates to debate international issues, practise negotiation, and develop strong communication skills. With well-structured committees, experienced chairs, and a vibrant learning environment, TKM MUN offers a meaningful platform that blends academic excellence with real-world diplomacy.
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

