'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const teamMembers = [
  { name: "Adithya V", position: "Secretary General", imageUrl: "https://placehold.co/400x400/00334E/E8E8E8.png?text=AV" },
  { name: "Meenakshi S", position: "Director General", imageUrl: "https://placehold.co/400x400/00334E/E8E8E8.png?text=MS" },
  { name: "Rohan Mathew", position: "USG Finance", imageUrl: "https://placehold.co/400x400/00334E/E8E8E8.png?text=RM" },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 sm:py-32">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-medium text-text-primary mb-16">
          The Secretariat
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.imageUrl}
                  alt={`Photo of ${member.name}`}
                  layout="fill"
                  objectFit="cover"
                  className="grayscale"
                />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">{member.name}</h3>
              <p className="text-accent">{member.position}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

