"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const useNativeTouchScroll = window.matchMedia(
      "(max-width: 767px), (pointer: coarse), (prefers-reduced-motion: reduce)",
    ).matches;

    if (useNativeTouchScroll) {
      const handleNativeScrollTo = (event: Event) => {
        const { left = 0, top = 0, behavior = "auto" } =
          (event as CustomEvent<{
            left?: number;
            top?: number;
            behavior?: ScrollBehavior;
          }>).detail ?? {};

        window.scrollTo({ left, top, behavior });
      };

      window.addEventListener("adverto:scroll-to", handleNativeScrollTo);
      return () => {
        window.removeEventListener("adverto:scroll-to", handleNativeScrollTo);
      };
    }

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
    });

    const updateScrollTrigger = () => {
      if (ScrollTrigger.getAll().length > 0) {
        ScrollTrigger.update();
      }
    };
    const scrollToPosition = (top = 0, left = 0) => {
      if (typeof window === "undefined") return;
      window.scrollTo(left, top);
      lenis.scrollTo(top, { immediate: true, force: true });
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const handleScrollTo = (event: Event) => {
      const { left = 0, top = 0, behavior = "auto" } =
        (event as CustomEvent<{ left?: number; top?: number; behavior?: ScrollBehavior }>).detail ?? {};

      if (behavior === "smooth") {
        lenis.scrollTo(top, { immediate: false, force: true });
        return;
      }

      scrollToPosition(top, left);
    };

    lenis.on("scroll", updateScrollTrigger);
    window.addEventListener("adverto:scroll-to", handleScrollTo);

    return () => {
      window.removeEventListener("adverto:scroll-to", handleScrollTo);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
    };
  }, []);

  return children;
}
