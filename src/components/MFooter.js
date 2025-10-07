"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function MFooter() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      className="bg-gray-900 text-gray-300 py-10 mt-24 w-full"
    >
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-8 text-center sm:text-left">
        {/* Logo / Title */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Model United Nations
          </h2>
          <p className="text-sm text-gray-400">
            Inspiring leadership, diplomacy, and global collaboration.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Committees</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 text-lg">
          <a href="#" className="hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="hover:text-white transition"><i className="fab fa-instagram"></i></a>
          <a href="#" className="hover:text-white transition"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Model United Nations. All rights reserved.
      </div>
    </motion.footer>
  );
}