"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ensureHistoryScrollKey,
  getHistoryScrollKey,
  readScrollSnapshot,
  restoreScrollSnapshot,
  saveScrollSnapshot,
} from "./scrollRestoration";

type PendingTraversal = {
  key: string;
  url: string;
};

let pendingTraversal: PendingTraversal | null = null;

const currentUrl = () => `${window.location.pathname}${window.location.search}`;

export default function NavigationRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeKey = useRef<string | null>(null);
  const activeUrl = useRef<string | null>(null);

  useLayoutEffect(() => {
    const key = ensureHistoryScrollKey();
    activeKey.current = key;
    activeUrl.current = currentUrl();

    const pending = pendingTraversal;
    const snapshot = readScrollSnapshot(key);
    if (!snapshot || snapshot.url !== currentUrl()) return;

    // The destination history entry is the source of truth. Next may commit a
    // route before application popstate listeners run on the first traversal,
    // so requiring pendingTraversal here creates a first-Back race. Fresh push
    // entries receive a new key and have no matching snapshot.
    if (pending?.key === key && pending.url === currentUrl()) {
      pendingTraversal = null;
    }

    return restoreScrollSnapshot(snapshot);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    const saveActiveEntry = () => {
      if (activeKey.current && activeUrl.current) {
        saveScrollSnapshot(activeKey.current, activeUrl.current);
      }
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(saveActiveEntry);
    };

    const handleClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (`${destination.pathname}${destination.search}` === currentUrl()) return;

      saveActiveEntry();
    };

    const handlePopState = (event: PopStateEvent) => {
      saveActiveEntry();

      const destinationKey = getHistoryScrollKey(event.state);
      pendingTraversal = destinationKey
        ? { key: destinationKey, url: currentUrl() }
        : null;
      activeKey.current = destinationKey;
      activeUrl.current = currentUrl();
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;

      const key = ensureHistoryScrollKey();
      activeKey.current = key;
      activeUrl.current = currentUrl();
      const snapshot = readScrollSnapshot(key);
      if (snapshot?.url === currentUrl()) restoreScrollSnapshot(snapshot);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pagehide", saveActiveEntry);
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleClick, true);

    return () => {
      window.cancelAnimationFrame(frameId);
      saveActiveEntry();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pagehide", saveActiveEntry);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}
