"use client";

import { useLayoutEffect } from "react";

type PortfolioProjectScrollResetProps = {
  slug: string;
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
  window.dispatchEvent(
    new CustomEvent("adverto:scroll-to", { detail: { top: 0 } }),
  );
};

export default function PortfolioProjectScrollReset({
  slug,
}: PortfolioProjectScrollResetProps) {
  useLayoutEffect(() => {
    const previousScrollRestoration =
      "scrollRestoration" in window.history
        ? window.history.scrollRestoration
        : null;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    let frameId = 0;

    scrollToTop();

    frameId = window.requestAnimationFrame(() => {
      scrollToTop();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      if (previousScrollRestoration) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, [slug]);

  return null;
}
