"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      const cursorIgnored = target?.closest("[data-cursor-ignore='true']");

      if (target && !cursorIgnored && (target.closest("a") || target.closest("button"))) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      >
        <div className="h-2 w-2 rounded-full bg-[#0000FF]" />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:flex items-center justify-center"
        animate={{ x: position.x - 20, y: position.y - 20, scale: isHovering ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.2 }}
      >
        <motion.div
          className="h-10 w-10 rounded-full border border-[#0000FF]"
          animate={{
            backgroundColor: isHovering ? "rgba(0, 0, 255, 0.15)" : "rgba(0, 0, 255, 0)",
            borderColor: isHovering ? "rgba(0, 0, 255, 0.3)" : "rgba(0, 0, 255, 0.8)",
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
