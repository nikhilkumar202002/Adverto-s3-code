"use client";

import { motion } from "framer-motion";
import Container from "../common/Container";
import Button from "../common/Button";
import Reveal from "../common/Reveal";

export default function CtaSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] bg-black overflow-hidden py-32 border-t border-white/5">
      
      {/* Deep Blue Radial Glow */}
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[600px] -translate-x-1/2 translate-y-1/2 bg-[#0000FF]/20 blur-[120px] rounded-full pointer-events-none z-0" />

      <Container className="relative z-10 flex flex-col items-center justify-center text-center">
        <Reveal>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="w-8 h-[1px] bg-[#0000FF]" />
          <p className="text-[#0000FF] uppercase text-[12px] tracking-[0.2em] font-medium">
            Ready to Begin
          </p>
          <span className="w-8 h-[1px] bg-[#0000FF]" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[50px] md:text-[80px] lg:text-[100px] font-medium leading-[1] text-[#EDEDED] mb-12 tracking-tight"
        >
          Let&apos;s Create <br />
          <span className="text-white/30 italic font-light">Something</span> <br />
          Unforgettable.
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/contact">Start your project</Button>
          <Button href="/portfolio" variant="secondary">Explore Portfolio</Button>
        </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}
