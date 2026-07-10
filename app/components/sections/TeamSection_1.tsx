"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import { teamData } from "../../data/team";

// Custom Behance Icon (since lucide-react no longer includes brand icons)
const Behance = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
  </svg>
);

// Inline social icons (avoid lucide-react brand exports mismatch)
const Linkedin = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.2 8.5H4.8V24H.2zM8.9 8.5h4.3v2.1h.1c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.4 3 5.4 6.8V24h-4.6v-7.2c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8V24H8.9z" />
  </svg>
);

const Instagram = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const Facebook = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.5c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.1h-1.07c-1.05 0-1.37.65-1.37 1.32v1.58h2.33l-.37 2.9h-1.96v7A10 10 0 0022 12z" />
  </svg>
);

const socialIcons = [
  { id: 'be', Icon: Behance, href: '#' },
  { id: 'in', Icon: Linkedin, href: '#' },
  { id: 'ig', Icon: Instagram, href: '#' },
  { id: 'fb', Icon: Facebook, href: '#' },
];

export default function TeamSection() {
  return (
    <section className="relative z-10 bg-[#050505] py-24 md:py-32 border-t border-white/5 overflow-hidden">
      <Container>
        <Reveal>
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#0000FF] uppercase text-[14px] tracking-[1] mb-1 flex items-center gap-2">
              <span className="w-[30px] h-[1px] bg-[#0000FF]"></span>THE TEAM
            </p>
            <h2 className="text-[45px] md:text-[65px] font-medium leading-[1.1] text-[#EDEDED]">
              Creative Minds
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/team"
              className="group flex items-center gap-2 text-[12px] font-medium tracking-[0.1em] text-white/70 uppercase transition-colors duration-300 hover:text-white pb-2"
            >
              Meet Everyone
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* --- TEAM GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {teamData.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              // Trigger the staggered hover animation on the entire card
              whileHover="hover"
              className="group flex flex-col gap-4 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#1A1A1A]">
                {/* Background Dimmer on Hover */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500 z-10 pointer-events-none" />
                
                {/* Social Icons Overlay */}
                <motion.div 
                  variants={{
                    initial: { opacity: 0 },
                    hover: { 
                      opacity: 1, 
                      transition: { staggerChildren: 0.1 } // This staggers the icons one by one
                    }
                  }}
                  className="absolute inset-0 flex items-end justify-center pb-8 gap-3 z-20"
                >
                  {socialIcons.map(({ id, Icon, href }) => (
                    <motion.a
                      key={id}
                      href={href}
                      variants={{
                        initial: { opacity: 0, y: 20 },
                        hover: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
                      }}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:bg-[#0000FF] hover:border-[#0000FF] hover:-translate-y-1"
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </motion.div>

                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Info */}
              <div>
                <h4 className="text-lg font-medium text-white transition-colors duration-300 group-hover:text-[#0000FF]">
                  {member.name}
                </h4>
                <p className="text-[13px] text-white/50 tracking-wide">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
