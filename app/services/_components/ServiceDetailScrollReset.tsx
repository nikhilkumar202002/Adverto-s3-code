"use client";

import { useLayoutEffect } from "react";

type ServiceDetailScrollResetProps = {
  slug: string;
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
  window.dispatchEvent(
    new CustomEvent("adverto:scroll-to", { detail: { top: 0 } }),
  );
};

export default function ServiceDetailScrollReset({
  slug,
}: ServiceDetailScrollResetProps) {
  useLayoutEffect(() => {
    let frameId = 0;

    scrollToTop();

    frameId = window.requestAnimationFrame(() => {
      scrollToTop();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [slug]);

  return null;
}
