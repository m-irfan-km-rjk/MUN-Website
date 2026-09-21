'use client';

import { motion } from 'framer-motion';

const contacts = [
  ['Arundhathy San', 'Secretary General', '+91 90748 47881'],
  ['Heloise Jose', 'Deputy Secretary General', '+91 81380 10368'],
  ['Aashika', 'Director General', '+91 90748 47881'],
  ['Sreyas Warrier', 'Chief Advisor', '+91 95623 50219'],
];

const ContactSection = () => {
  return (
    <section id="contact" className="max-w-7xl mx-auto py-24 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-parchment text-ink border-2 border-gold p-8 rounded space-y-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
        >
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-gold-dark font-bold mb-2">Correspondence Desk</p>
            <h2 className="text-3xl font-semibold uppercase">Official Dispatch &amp; Inquiries</h2>
            <p className="text-lg text-ink/75 mt-2">
              Submit correspondence, delegation enquiry, or accommodation protocols to the Grand Secretariat.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-gold-dark">mail</span>
            <a href="mailto:dlgtkmmun@gmail.com" className="hover:underline">dlgtkmmun@gmail.com</a>
          </div>

          <div className="space-y-3">
            {contacts.map(([name, role, phone]) => (
              <div key={role} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-gold-dark">call</span>
                <p><span className="font-semibold">{name}</span>, {role}: {phone}</p>
              </div>
            ))}
          </div>

          <a
            href="https://www.instagram.com/munsoc_tkmce/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="wax-gold-btn inline-flex items-center gap-2 border border-gold-dark px-6 py-2 rounded font-display text-[10px] uppercase tracking-[0.2em] text-maroon-dark hover:bg-gold/30"
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span> Follow Us
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="border-2 border-gold bg-maroon-dark p-3 rounded flex flex-col shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
        >
          <div className="w-full grow min-h-75 overflow-hidden rounded">
            <iframe
              title="TKM College of Engineering map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.654303498822!2d76.6346215750172!3d8.911333091129929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05e3a24f33664d%3A0x452435ac35e1b12b!2sTKM%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1728645719888!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 300 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="pt-3 text-center">
            <p className="font-display text-[10px] uppercase tracking-[0.25em] text-gold-light font-bold">Ceremonial Anchor</p>
            <p className="text-lg text-cream">TKM College of Engineering, Karikode, Kollam, Kerala</p>
            <p className="text-muted">December 5th, 6th &amp; 7th, 2025</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
