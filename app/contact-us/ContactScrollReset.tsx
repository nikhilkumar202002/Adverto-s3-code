"use client";

import { useLayoutEffect } from "react";
import { hasSnapshotForCurrentHistoryEntry } from "../components/common/scrollRestoration";

export default function ContactScrollReset() {
  useLayoutEffect(() => {
    // Fresh visits must start above the skeleton/content. Back/Forward visits
    // keep the saved contact-page position managed by NavigationRestoration.
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
