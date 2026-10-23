"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const SAFETY_TIMEOUT_MS = 5000;

export default function NavigationCurtain() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const curtainRef = useRef<HTMLDivElement>(null);
  const safetyTimerRef = useRef(0);
  const leaveTimerRef = useRef(0);
  const activeRef = useRef(false);

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    const hide = () => {
      window.clearTimeout(safetyTimerRef.current);
      window.clearTimeout(leaveTimerRef.current);
      activeRef.current = false;
      window.__advertoPageTransitionComplete = true;
      window.dispatchEvent(new Event("adverto:page-transition-complete"));
      curtain.style.transition = "opacity 180ms ease-out";
      curtain.style.opacity = "0";
      leaveTimerRef.current = window.setTimeout(() => {
        curtain.style.pointerEvents = "none";
      }, 180);
    };

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(hide);
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    const start = () => {
      const curtain = curtainRef.current;
      if (!curtain || activeRef.current) return;

      window.clearTimeout(safetyTimerRef.current);
      window.clearTimeout(leaveTimerRef.current);
      activeRef.current = true;
      window.__advertoPageTransitionComplete = false;
      curtain.style.transition = "none";
      curtain.style.pointerEvents = "auto";
      curtain.style.opacity = "1";
      safetyTimerRef.current = window.setTimeout(() => {
        activeRef.current = false;
        window.__advertoPageTransitionComplete = true;
        window.dispatchEvent(new Event("adverto:page-transition-complete"));
        curtain.style.transition = "opacity 180ms ease-out";
        curtain.style.opacity = "0";
        leaveTimerRef.current = window.setTimeout(() => {
          curtain.style.pointerEvents = "none";
        }, 180);
      }, SAFETY_TIMEOUT_MS);
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      const currentRoute = `${window.location.pathname}${window.location.search}`;
      const destinationRoute = `${destination.pathname}${destination.search}`;
      if (destinationRoute === currentRoute) return;

      start();
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", start);
    window.addEventListener("adverto:navigation-start", start);
    return () => {
      window.clearTimeout(safetyTimerRef.current);
      window.clearTimeout(leaveTimerRef.current);
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", start);
      window.removeEventListener("adverto:navigation-start", start);
    };
  }, []);

  return (
    <div
      ref={curtainRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] bg-[#050505] opacity-0"
    />
  );
}
