"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import {
  createPreloaderTimeline,
  type PreloaderRefs,
} from "../../lib/preloaderTimeline";

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

function markPreloaderComplete() {
  window.__advertoPreloaderComplete = true;
  window.dispatchEvent(new Event("adverto:preloader-complete"));
}

export default function usePreloader(): UsePreloaderResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<HTMLDivElement>(null);
  const rectangleRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useLayoutEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const container = containerRef.current;
    const background = backgroundRef.current;
    const logoGroup = logoGroupRef.current;
    const rectangle = rectangleRef.current;
    const circle = circleRef.current;
    let context: gsap.Context | undefined;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const restoreScroll = () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };

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
            markPreloaderComplete();
            restoreScroll();
            setIsVisible(false);
          },
          timeScale: prefersReducedMotion ? 2.5 : 1,
        });

        timeline.play();
      }, container);
    }

    return () => {
      restoreScroll();
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
