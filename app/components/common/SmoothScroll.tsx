"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
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

    // 1. Turn off autoRaf to stop independent frame looping
    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // 2. Synchronize Lenis with GSAP's master ticker
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

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

    // 3. Listen for scroll lock/unlock events dispatched by the Preloader
    const lockScroll = () => lenis.stop();
    const unlockScroll = () => lenis.start();

    window.addEventListener("adverto:scroll-to", handleScrollTo);
    window.addEventListener("adverto:lock-scroll", lockScroll);
    window.addEventListener("adverto:unlock-scroll", unlockScroll);

    return () => {
      gsap.ticker.remove(updateLenis);
      window.removeEventListener("adverto:scroll-to", handleScrollTo);
      window.removeEventListener("adverto:lock-scroll", lockScroll);
      window.removeEventListener("adverto:unlock-scroll", unlockScroll);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}