"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import InnerBannerHeading from "../components/common/InnerBannerHeading";
import usePageTransitionReady from "../components/common/usePageTransitionReady";

const titleReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AboutHeroTitle() {
  const isReady = usePageTransitionReady(true);

  return (
    <motion.div
      className="max-w-[760px]"
      initial="hidden"
      animate={isReady ? "visible" : "hidden"}
      variants={titleReveal}
    >
      <InnerBannerHeading text="Meet Adverto" active={isReady} />
    </motion.div>
  );
}
