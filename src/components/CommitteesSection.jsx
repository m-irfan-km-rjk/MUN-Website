'use client';

import { motion } from 'framer-motion';
import { Globe, Shield, Users, Landmark, Newspaper } from 'lucide-react';
import Image from 'next/image';

const committees = [
  {
    icon: <Globe size={28} />,
    name: "UNHRC",
    fullName: "United Nations Human Rights Council",
    imageUrl: "https://placehold.co/600x800/145374/E8E8E8.png?text=UNHRC"
  },
  {
    icon: <Shield size={28} />,
    name: "UNSC",
    fullName: "United Nations Security Council",
    imageUrl: "https://placehold.co/600x800/145374/E8E8E8.png?text=UNSC"
  },
  {
    icon: <Landmark size={28} />,
    name: "ECOSOC",
    fullName: "United Nations Economic and Social Council",
    imageUrl: "https://placehold.co/600x800/145374/E8E8E8.png?text=ECOSOC"
  },
  {
    icon: <Users size={28} />,
    name: "AKPM",
    fullName: "All Kerala Political Meet",
    imageUrl: "https://placehold.co/600x800/145374/E8E8E8.png?text=AKPM"
  },
  {
    icon: <Newspaper size={28} />,
    name: "IP",
    fullName: "International Press",
    imageUrl: "https://placehold.co/600x800/145374/E8E8E8.png?text=IP"
  },
];

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const CommitteesSection = () => {
  return (
    <section id="committees" className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Spotlight effect */}
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
              className="relative h-96 w-full rounded-lg overflow-hidden group transition-all duration-300 hover:scale-105"
            >
              <Image
                src={committee.imageUrl}
                alt={committee.fullName}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-110"
              />
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
                <div className="text-accent mb-3">{committee.icon}</div>
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

