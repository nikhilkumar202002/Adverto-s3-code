"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import usePageTransitionReady from "./usePageTransitionReady";

type InnerBannerHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3";
  active?: boolean;
  className?: string;
  highlightPrefix?: string;
  revealOnScroll?: boolean;
  variant?: "banner" | "custom";
  waitForPageTransition?: boolean;
};

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headingVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.16,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
    scale: 0.94,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.18,
      ease: easeOut,
    },
  },
};

export default function InnerBannerHeading({
  text,
  as = "h1",
  active = true,
  className = "",
  highlightPrefix,
  revealOnScroll = true,
  variant = "banner",
  waitForPageTransition = true,
}: InnerBannerHeadingProps) {
  const isReady = usePageTransitionReady(waitForPageTransition);
  const lines = text.split("\n").map((line) => line.split(" ").filter(Boolean));
  const allLines =
    highlightPrefix && lines.length > 0
      ? [[highlightPrefix, ...lines[0]], ...lines.slice(1)]
      : lines;
  const label = allLines.map((line) => line.join(" ")).join(" ");
  const MotionHeading =
    as === "h2" ? motion.h2 : as === "h3" ? motion.h3 : motion.h1;
  const variantClassName =
    variant === "banner"
      ? "w-full text-[55px] font-medium leading-[1.04] text-[#EDEDED] min-[1320px]:text-[100px]"
      : "";

  return (
    <MotionHeading
      className={`${variantClassName} ${className}`}
      aria-label={label}
      initial="hidden"
      animate={revealOnScroll ? undefined : active && isReady ? "visible" : "hidden"}
      whileInView={revealOnScroll && active && isReady ? "visible" : undefined}
      viewport={revealOnScroll ? { once: false, amount: 0.35 } : undefined}
      variants={headingVariants}
    >
      {allLines.map((line, lineIndex) => (
        <span key={`${line.join("-")}-${lineIndex}`} className="block">
          {line.map((word, wordIndex) => (
            <span
              key={`${word}-${lineIndex}-${wordIndex}`}
              className="inline-block overflow-hidden align-bottom pb-[0.12em]"
              aria-hidden="true"
            >
              <motion.span
                className={`inline-block origin-bottom will-change-transform ${
                  highlightPrefix && lineIndex === 0 && wordIndex === 0
                    ? "text-[#0000FF]"
                    : ""
                }`}
                variants={wordVariants}
              >
                {word}
              </motion.span>
              {wordIndex < line.length - 1 ? "\u00A0" : null}
            </span>
          ))}
        </span>
      ))}
    </MotionHeading>
  );
}
