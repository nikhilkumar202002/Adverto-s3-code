"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import InnerBannerHeading from "../components/common/InnerBannerHeading";
import usePageTransitionReady from "../components/common/usePageTransitionReady";

const headlineText = "Everything Behind Great Brands.";
const mobileHeadlineText = "Everything\nBehind Great\nBrands.";
const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.18,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: easeOut,
    },
  },
};

export default function ServiceHeroContent({
  waitForPageTransition = false,
}: {
  waitForPageTransition?: boolean;
}) {
  const isReady = usePageTransitionReady(waitForPageTransition);

  return (
    <motion.div
      className="max-w-[980px]"
      variants={contentVariants}
      initial="hidden"
      animate={isReady ? "visible" : "hidden"}
    >
      <motion.p
        variants={itemVariants}
        className="mb-3 flex items-center gap-3 text-[12px] uppercase tracking-[0.1em] text-[#0000FF] sm:text-[13px] md:mb-4 md:text-[14px]"
      >
        <span className="h-[1px] w-[30px] bg-[#0000FF]" />
        Creative Services
      </motion.p>

      <InnerBannerHeading
        text={headlineText}
        active={isReady}
        className="hidden md:block md:max-w-[820px] lg:max-w-[940px]"
      />
      <InnerBannerHeading
        text={mobileHeadlineText}
        active={isReady}
        variant="custom"
        className="block text-[45px] font-medium leading-[0.94] text-[#EDEDED] md:hidden"
      />

      <motion.p
        variants={itemVariants}
        className="mt-5 max-w-[460px] text-[14px] leading-[1.5] text-white/55 sm:text-[15px] md:mt-6 md:max-w-[520px] md:text-[16px]"
      >
        From strategy and branding to campaigns, content, and production we
        build the creative systems that help businesses grow.
      </motion.p>
    </motion.div>
  );
}
