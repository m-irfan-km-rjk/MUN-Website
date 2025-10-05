'use client';

import { motion } from 'framer-motion';

const committees = [
  {
    name: "UNSC",
    description: "United Nations Security Council, addressing threats to international peace and security.",
  },
  {
    name: "DISEC",
    description: "Disarmament and International Security Committee, focusing on global disarmament affairs.",
  },
  {
    name: "ICC",
    description: "The International Criminal Court, simulating trials on crimes against humanity and war crimes.",
  },
];

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const CommitteesSection = () => {
  return (
    <section id="committees" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-medium text-text-primary mb-16"
        >
          Committees
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
        >
          {committees.map((committee, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="border border-mid-blue/30 p-8 rounded-lg transition-all duration-300 hover:border-mid-blue hover:bg-dark-blue/20"
            >
              <h3 className="text-2xl font-semibold text-accent mb-4">{committee.name}</h3>
              <p className="text-text-primary/80">{committee.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CommitteesSection;
