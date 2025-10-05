'use client';

import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16 items-center"
        >
          {/* Changed to col-span-2 to give the heading more space */}
          <div className="md:col-span-2">
            <h2 className="text-3xl sm:text-4xl font-medium text-text-primary leading-tight">
              About The Conference
            </h2>
          </div>
          {/* Changed to col-span-3 for the text content */}
          <div className="md:col-span-3">
            <p className="text-lg text-text-primary/80 leading-relaxed">
              TKM College of Engineering Model United Nations 2025 sets the stage for a groundbreaking simulation of the International Cricket Council (ICC). This conference invites delegates to step into the shoes of global cricket administrators to debate the future of the sport. Topics will range from regulating T20 leagues and balancing international schedules to promoting cricket in emerging nations. Prepare for a dynamic committee experience that blends sports governance with international diplomacy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

