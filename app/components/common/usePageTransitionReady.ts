"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __advertoPageTransitionComplete?: boolean;
  }
}

export default function usePageTransitionReady(waitForPageTransition = false) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const finishOnNextFrame = () => {
      frameId = window.requestAnimationFrame(() => {
        setIsReady(true);
      });
    };

    const isTransitionReady = () => {
      if (!waitForPageTransition) return true;

      const pageTransitionComplete =
        window.__advertoPageTransitionComplete !== false;

      return pageTransitionComplete;
    };

    const handleReadyEvent = () => {
      if (isTransitionReady()) {
        finishOnNextFrame();
      }
    };

    if (isTransitionReady()) {
      finishOnNextFrame();
    }

    window.addEventListener(
      "adverto:page-transition-complete",
      handleReadyEvent,
    );

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener(
        "adverto:page-transition-complete",
        handleReadyEvent,
      );
    };
  }, [waitForPageTransition]);

  return isReady;
}
