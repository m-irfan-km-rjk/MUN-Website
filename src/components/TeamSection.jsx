'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { mainMembers, otherMembers } from '../data/people';

const TeamSection = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="team" className="py-24 sm:py-32">
      <div className="container mx-auto px-6 text-center">

        <h2 className="text-3xl sm:text-4xl font-medium text-text-primary mb-16">
          The Secretariat
        </h2>

        {/* -------------------------------------- */}
        {/* MAIN MEMBERS (Always Visible) */}
        {/* -------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {mainMembers.map((member, index) => (
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
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">{member.name}</h3>
              <p className="text-accent">{member.position}</p>
            </motion.div>
          ))}
        </div>

        <button
          className="px-6 py-3 mb-3 bg-accent text-white rounded-full shadow-md hover:opacity-90 transition"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>

        {/* -------------------------------------- */}
        {/* EXTRA MEMBERS (Visible only if showMore = true) */}
        {/* -------------------------------------- */}
        {showMore && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">

            {Object.entries(otherMembers).map(([category, members]) =>
              Object.entries(members).map(([key, imageUrl], index) => {
                const formattedName =
                  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

                return (
                  <motion.div
                    key={category + key}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={formattedName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <h3 className="text-xl font-semibold text-text-primary">
                      {formattedName}
                    </h3>

                    <p className="text-accent">
                      {category.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                    </p>
                  </motion.div>
                );
              })
            )}

          </div>
        )}

      </div>
    </section>
  );
};

export default TeamSection;