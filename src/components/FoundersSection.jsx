"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const founders = [
  { name: "Rithwik", imageUrl: "/people/Rithwik.jpg" },
  { name: "Nebu", imageUrl: "/people/Nebu.jpg" },
  { name: "Nakul", imageUrl: "/people/Nakul.jpg" },
];

export default function FoundersSection() {
  return (
    <section className="relative z-10 w-full bg-transparent px-5 pb-12 pt-12 md:px-12 md:pb-16 md:pt-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-gold-light/80">
            Our Origins
          </span>
          <h2 className="mt-1 font-display text-3xl font-semibold uppercase text-gold-light md:text-4xl">
            Founders of MUN
          </h2>
        </div>

        <div className="flex justify-center gap-4 md:gap-8">
          {founders.map((founder, index) => (
            <motion.article
              key={founder.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              className="w-[105px] text-center sm:w-[150px] md:w-[210px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] border border-gold/80 bg-maroon-dark shadow-[0_18px_40px_rgba(20,8,6,0.45)]">
                <Image
                  src={founder.imageUrl}
                  alt={founder.name}
                  fill
                  sizes="210px"
                  className="object-cover object-top"
                />
              </div>
              <p className="mt-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-gold-light md:text-base">
                {founder.name}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
