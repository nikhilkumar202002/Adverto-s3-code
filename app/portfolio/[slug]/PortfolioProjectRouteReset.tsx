"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { hasSnapshotForCurrentHistoryEntry } from "../../components/common/scrollRestoration";

export default function PortfolioProjectRouteReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Forward navigation owns an existing project snapshot. Every fresh
    // project navigation must start at the skeleton/page header before paint.
    if (hasSnapshotForCurrentHistoryEntry()) return;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const scrollToTop = () => {
      window.dispatchEvent(
        new CustomEvent("adverto:scroll-to", {
          detail: { left: 0, top: 0, behavior: "auto" },
        }),
      );
      window.scrollTo({ left: 0, top: 0, behavior: "auto" });
    };

    scrollToTop();
    const frameId = window.requestAnimationFrame(scrollToTop);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [pathname]);

  return null;
}
