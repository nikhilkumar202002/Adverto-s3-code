"use client";

import { useLayoutEffect } from "react";
import { hasSnapshotForCurrentHistoryEntry } from "../components/common/scrollRestoration";

export default function TeamScrollReset() {
  useLayoutEffect(() => {
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
