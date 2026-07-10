"use client";

import { motion } from "framer-motion";
import React from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  delay?: number;
}

export default function BlurFade({ children, delay = 0 }: BlurFadeProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(10px)",
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}
