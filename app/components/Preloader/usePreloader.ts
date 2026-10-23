"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createPreloaderTimeline,
  type PreloaderRefs,
} from "../../lib/preloaderTimeline";

// Explicitly register ScrollTrigger to prevent internal GSAP initialization errors
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type UsePreloaderResult = {
  isVisible: boolean;
  container: RefObject<HTMLDivElement | null>;
  background: RefObject<HTMLDivElement | null>;
  logoGroup: RefObject<HTMLDivElement | null>;
  rectangle: RefObject<HTMLDivElement | null>;
  circle: RefObject<HTMLDivElement | null>;
};

declare global {
  interface Window {
    __advertoPreloaderComplete?: boolean;
  }
}

export default function usePreloader(): UsePreloaderResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<HTMLDivElement>(null);
  const rectangleRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const background = backgroundRef.current;
    const logoGroup = logoGroupRef.current;
    const rectangle = rectangleRef.current;
    const circle = circleRef.current;
    let context: gsap.Context | undefined;

    // 1. Disable native DOM scrolling immediately on mount
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // 2. Limit ScrollTrigger auto-refresh to prevent layout thrashing
    ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,load" });

    // 3. Dispatch event to lock Lenis smooth scroll if active
    window.dispatchEvent(new CustomEvent("adverto:lock-scroll"));

    if (container && background && logoGroup && rectangle && circle) {
      const refs: PreloaderRefs = {
        container,
        background,
        logoGroup,
        rectangle,
        circle,
      };
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      context = gsap.context(() => {
        const timeline = createPreloaderTimeline({
          refs,
          onComplete: () => {
            // Mark preloader complete globally
            window.__advertoPreloaderComplete = true;
            window.dispatchEvent(new Event("adverto:preloader-complete"));
            
            // Unlock Lenis smooth scroll
            window.dispatchEvent(new CustomEvent("adverto:unlock-scroll"));

            // Restore native DOM scrolling
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";

            // Refresh ScrollTrigger ONLY after layout is stable and preloader is removed
            ScrollTrigger.refresh();
            setIsVisible(false);
          },
          timeScale: prefersReducedMotion ? 2.5 : 1,
        });

        timeline.play();
      }, container);
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.dispatchEvent(new CustomEvent("adverto:unlock-scroll"));
      context?.revert();
    };
  }, []);

  return {
    isVisible,
    container: containerRef,
    background: backgroundRef,
    logoGroup: logoGroupRef,
    rectangle: rectangleRef,
    circle: circleRef,
  };
}