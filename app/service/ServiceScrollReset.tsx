"use client";

import { useLayoutEffect } from "react";
import {
  consumeServiceReturnTarget,
  hasSnapshotForCurrentHistoryEntry,
} from "../components/common/scrollRestoration";

export default function ServiceScrollReset() {
  useLayoutEffect(() => {
    const returnTarget = consumeServiceReturnTarget("/service");
    if (returnTarget) {
      let frameId = 0;
      let attempts = 0;

      const restoreCard = () => {
        const anchor = document.querySelector<HTMLElement>(
          `[data-scroll-card-id="${CSS.escape(returnTarget.anchorId)}"]`,
        );
        const top = anchor
          ? window.scrollY +
            anchor.getBoundingClientRect().top -
            returnTarget.anchorViewportTop
          : returnTarget.scrollY;

        window.dispatchEvent(
          new CustomEvent("adverto:scroll-to", {
            detail: { left: 0, top, behavior: "auto" },
          }),
        );
        window.scrollTo({ left: 0, top, behavior: "auto" });

        attempts += 1;
        if (attempts < 12) frameId = window.requestAnimationFrame(restoreCard);
      };

      restoreCard();
      return () => window.cancelAnimationFrame(frameId);
    }

    if (hasSnapshotForCurrentHistoryEntry()) return;

    window.dispatchEvent(
      new CustomEvent("adverto:scroll-to", {
        detail: { left: 0, top: 0, behavior: "auto" },
      }),
    );
    window.scrollTo({ left: 0, top: 0, behavior: "auto" });
  }, []);

  return null;
}
