"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { hasSnapshotForCurrentHistoryEntry } from "../../components/common/scrollRestoration";

export default function ServiceDetailsScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (hasSnapshotForCurrentHistoryEntry()) return;

    window.dispatchEvent(
      new CustomEvent("adverto:scroll-to", {
        detail: { left: 0, top: 0, behavior: "auto" },
      }),
    );
    window.scrollTo({ left: 0, top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
