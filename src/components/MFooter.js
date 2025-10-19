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
    <footer
      ref={ref}
      className="bg-[#00233E] text-[#E8E8E8] py-10 w-full border-t border-[#145374]"
    >
      {/* Animated Content Only */}
      <motion.div
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
        className="w-full max-w-6xl mx-auto px-8 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-8 text-center sm:text-left"
      >
        {/* Logo / Title */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Model United Nations
          </h2>
          <p className="text-sm text-[#E8E8E8]/80 leading-relaxed max-w-sm mx-auto sm:mx-0">
            Inspiring leadership, diplomacy, and global collaboration.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-8 text-base font-medium">
          <a
            href="#"
            className="hover:text-[#5588A3] transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#"
            className="hover:text-[#5588A3] transition-colors duration-200"
          >
            Committees
          </a>
          <a
            href="#"
            className="hover:text-[#5588A3] transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center sm:justify-end gap-6 text-xl">
          <a
            href="#"
            className="hover:text-[#5588A3] transition-colors duration-200"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="hover:text-[#5588A3] transition-colors duration-200"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            className="hover:text-[#5588A3] transition-colors duration-200"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </motion.div>

      {/* Divider & Copyright */}
      <div className="border-t border-[#145374] mt-10 pt-5 text-center text-sm text-[#E8E8E8]/70">
        © {new Date().getFullYear()} Model United Nations. All rights reserved.
      </div>
    </footer>
  );
}