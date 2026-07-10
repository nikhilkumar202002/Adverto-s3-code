"use client";

import { motion } from "framer-motion";
import React from "react";
import usePageTransitionReady from "./usePageTransitionReady";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  scale?: number;
  amount?: number;
  once?: boolean;
  waitForPageTransition?: boolean;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  x = 0,
  y = 80,
  scale = 1,
  amount = 0.18,
  once = true,
  waitForPageTransition = true,
}: RevealProps) {
  const isReady = usePageTransitionReady(waitForPageTransition);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, scale }}
      whileInView={
        isReady
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, x, y, scale }
      }
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
