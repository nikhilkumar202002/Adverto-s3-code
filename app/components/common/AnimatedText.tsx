"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedTextProps {
  text: React.ReactNode;
  className?: string;
}

export default function AnimatedText({ text, className = "" }: AnimatedTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {text}
    </motion.span>
  );
}
