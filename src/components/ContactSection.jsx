'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Instagram } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-background border-t border-mid-blue/20">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-medium text-text-primary text-center mb-16"
        >
          Get in Touch
        </motion.h2>

        {/* Reverted to the more aesthetic two-card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card: Contact & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="bg-dark-blue/20 border border-mid-blue/30 p-8 rounded-lg space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-accent mb-6">Contact Information</h3>
              <div className="space-y-4 text-text-primary/80">
                <div className="flex items-center gap-4">
                  <Mail size={20} className="text-accent flex-shrink-0" />
                  <span>contact@tkmmun.in</span>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={20} className="text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p>Adithya V, Secretary General: +91 12345 67890</p>
                    <p>Meenakshi S, Director General: +91 09876 54321</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-accent mb-6">Follow Us</h3>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/munsoc_tkmce/?hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 border border-mid-blue/30 rounded-lg text-accent hover:bg-dark-blue/40 transition-colors"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Card: Event Details & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="bg-dark-blue/20 border border-mid-blue/30 p-8 rounded-lg flex flex-col"
          >
            <h3 className="text-2xl font-semibold text-accent mb-6">Event Details</h3>
            <div className="space-y-4 text-text-primary/80 mb-8">
              <div>
                <p className="font-bold text-text-primary">Date:</p>
                <p>December 5th, 6th & 7th, 2025</p>
              </div>
              <div>
                <p className="font-bold text-text-primary">Venue:</p>
                <p>TKM College of Engineering, Karikode, Kollam, Kerala</p>
              </div>
            </div>
            <div className="w-full flex-grow rounded-lg overflow-hidden min-h-[250px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.654303498822!2d76.6346215750172!3d8.911333091129929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05e3a24f33664d%3A0x452435ac35e1b12b!2sTKM%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1728645719888!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* Simple Footer */}
        <footer className="text-center text-text-primary/60 mt-24 border-t border-mid-blue/20 pt-8">
          <p>&copy; {new Date().getFullYear()} TKM MUN Society. All Rights Reserved.</p>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;

