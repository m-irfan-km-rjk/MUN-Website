'use client';

import { motion } from 'framer-motion';
// All icons are now replaced with custom logos
import Image from 'next/image';

const committees = [
  {
    icon: null,
    name: "UNGA",
    fullName: "United Nations General Assembly",
    logoUrl: "/UNGA.png" 
  },
  {
    icon: null, 
    name: "UNHRC",
    fullName: "United Nations Human Rights Council",
    logoUrl: "/UNHRC.png" 
  },
  {
    icon: null,
    name: "UNSC",
    fullName: "United Nations Security Council",
    logoUrl: "/UNSC.png",
    customScale: "scale-150" 
  },
  {
    icon: null,
    name: "IP",
    fullName: "International Press",
    logoUrl: "/IP.png",
  },
  {
    // UPDATED: Set icon to null
    icon: null,
    name: "ICC",
    fullName: "International Cricket Council",
    // UPDATED: Added the logo URL
    logoUrl: "/ICC.png",
    // ADDED: Custom scale to match the others
    customScale: "scale-150"
  },
];

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const CommitteesSection = () => {
  return (
    <section id="committees" className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 top-[-10rem] flex items-center justify-center">
        <div className="w-[80rem] h-[30rem] bg-mid-blue/10 blur-[10rem] rounded-full" />
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-medium text-text-primary mb-4"
        >
          Committees
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-primary/70 mb-16 max-w-2xl mx-auto"
        >
          Engage in dynamic debate across a diverse range of domestic and international councils.
        </motion.p>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {committees.map((committee) => (
            <motion.div
              key={committee.name}
              variants={cardVariants}
              // ADDED: Framer Motion hover animation
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              // ADDED: cursor-pointer to show it's interactive
              className="relative h-80 w-full rounded-lg overflow-hidden group p-6 flex flex-col justify-end text-left bg-dark-blue/20 border border-mid-blue/30 hover:border-mid-blue hover:bg-dark-blue/40 cursor-pointer"
            >
              {/* Conditionally render the watermark logo if it exists */}
              {committee.logoUrl && (
                <Image
                  src={committee.logoUrl}
                  alt={`${committee.name} logo`}
                  layout="fill"
                  objectFit="contain"
                  // Using a scale transform for specific logos, and default padding for others
                  className={`absolute inset-0 w-full h-full opacity-25 p-8 pb-20 ${committee.customScale || ''}`}
                />
              )}
              <div className="relative z-10">
                {/* Conditionally render the small icon if it exists */}
                {committee.icon && (
                  <div className="text-accent mb-3">{committee.icon}</div>
                )}
                <h3 className="text-xl font-bold text-text-primary">{committee.name}</h3>
                <p className="text-text-primary/80 text-sm">{committee.fullName}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CommitteesSection;

