"use client";

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "../common/Container";
import { useEffect, useRef, useState } from "react";
// import InfiniteLogoSlider from "../common/InfiniteLogoSlider";

const headingWords = [["Two", "friends."], ["One", "shared", "vision."]];
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sectionRevealViewport = {
  once: false,
  amount: 0.25,
};

const fadeFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -56,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.25,
      ease: smoothEase,
    },
  },
};

const fadeFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 56,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.25,
      ease: smoothEase,
    },
  },
};

const staggerGroup: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

function StaticHeading() {
  return (
    <h2
      className="section-breakpoint-heading mb-4 text-[clamp(36px,11vw,45px)] font-medium leading-[1.08] tracking-tight text-[#EDEDED] md:text-[clamp(50px,6.5vw,60px)] lg:text-[70px]"
    >
      {headingWords.map((line, lineIndex) => (
        <span key={lineIndex} className="block pb-[0.08em]">
          {line.map((word) => (
            <span
              key={`${lineIndex}-${word}`}
              className="mr-[0.18em] inline-block"
            >
              {word}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}

function useCount(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let rafId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration]);

  return value;
}

export default function StorySection() {
  const stats = [
    { value: "120+", label: "Campaigns Delivered" },
    { value: "40+", label: "Brand Launches" },
    { value: "3+", label: "Years Experience" },
    { value: "96%", label: "Client Retention" },
  ];
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const parsedStats = stats.map((stat) => {
    const match = stat.value.match(/(\d+)/);
    const num = match ? Number(match[1]) : 0;
    const suffix = stat.value.replace(/\d+/g, "");

    return { num, suffix, label: stat.label };
  });
  const count0 = useCount(parsedStats[0].num, inView);
  const count1 = useCount(parsedStats[1].num, inView);
  const count2 = useCount(parsedStats[2].num, inView);
  const count3 = useCount(parsedStats[3].num, inView);
  const counts = [count0, count1, count2, count3];

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#050505] border-t border-white/5 py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <Container>
        <div
          className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 lg:gap-8"
        >
          
          {/* --- LEFT COLUMN: Header & Story --- */}
          <motion.div 
            className="md:col-span-6 flex flex-col justify-start"
            initial="hidden"
            whileInView="visible"
            viewport={sectionRevealViewport}
            variants={fadeFromLeft}
          >
            <p className="text-[#0000FF] uppercase text-[12px] md:text-[13px] lg:text-[14px] tracking-[0.12em] mb-2 flex items-center gap-2">
              <span className="w-[30px] h-[1px] bg-[#0000FF]"></span>OUR STORY
            </p>
            
            <StaticHeading />
            
            <p className="text-[#888888] text-[15px] md:text-[16px] leading-[1.5] max-w-[500px]">
              Founded in 2023, Adverto was built around one belief: that extraordinary creative work changes business outcomes. We combine strategic intelligence with bold visual thinking to create brands that lead categories.
            </p>
          </motion.div>

          {/* --- RIGHT COLUMN: Quote & Stats --- */}
          <motion.div 
            className="md:col-span-6 lg:col-span-5 lg:col-start-8 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={sectionRevealViewport}
            variants={staggerGroup}
          >
            <motion.h3
              className="text-[18px] md:text-[19px] lg:text-[20px] font-medium text-white mb-1 leading-snug"
              variants={fadeFromRight}
            >
              &ldquo;Built on Trust. Proven Through Results.&rdquo;
            </motion.h3>
            
            <motion.p
              className="text-[#888888] text-[15px] md:text-[16px] lg:text-[17px] leading-[1.5] mb-6"
              variants={fadeFromRight}
            >
              Behind every number is a project delivered, a challenge solved, and a relationship built on trust.
            </motion.p>

            {/* Blue Divider */}
            <motion.div
              className="w-12 h-[2px] bg-[#0000FF] mb-7 md:mb-8 lg:mb-10"
              variants={fadeFromRight}
            />

            {/* Stats start counting when this section enters the viewport. */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {parsedStats.map((p, i) => (
                <motion.div
                  key={i}
                  variants={fadeFromRight}
                  className="bg-[#0000FF] border border-[#0000FF] rounded-[12px] md:rounded-[15px] p-4 sm:p-5 md:p-6 lg:p-8 flex min-h-[116px] flex-col justify-center transition-colors duration-300 hover:bg-[#0000D6] hover:border-[#0000D6]"
                >
                  <h4 className="text-white text-2xl sm:text-3xl md:text-[34px] lg:text-4xl font-medium mb-1">
                    {counts[i]}{p.suffix}
                  </h4>
                  <p className="text-white text-[12px] md:text-[13px] leading-[1.25] tracking-wide">
                    {p.label}
                  </p>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>

        {/* --- INFINITE LOGO SLIDER --- */}
        {/* <div className="mt-20">
          <InfiniteLogoSlider />
        </div> */}
      </Container>
    </section>
  );
}
