"use client";

import { useRef } from "react";
import React from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px,0px)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={"inline-block transition-transform duration-300 " + className}
      role="button"
      tabIndex={0}
    >
      {children}
    </span>
  );
}
