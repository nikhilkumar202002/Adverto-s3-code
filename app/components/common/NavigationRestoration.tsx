"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  hasRememberedScrollForPath,
  rememberScrollPosition,
  restoreRememberedScroll,
  useRestoreScroll,
} from "./scrollRestoration";

const isModifiedClick = (event: MouseEvent) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

const getAnchorFromEventTarget = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return null;

  return target.closest<HTMLAnchorElement>("a[href]");
};

export default function NavigationRestoration() {
  const pathname = usePathname();
  const router = useRouter();

  useRestoreScroll();

  useLayoutEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    const handlePointerEnter = (event: PointerEvent) => {
      const anchor = getAnchorFromEventTarget(event.target);

      if (!anchor) return;

      const nextUrl = new URL(anchor.href, window.location.origin);

      if (nextUrl.origin === window.location.origin) {
        router.prefetch(nextUrl.pathname);
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (isModifiedClick(event)) return;

      const anchor = getAnchorFromEventTarget(event.target);

      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const nextUrl = new URL(anchor.href, window.location.origin);
      const currentUrl = new URL(window.location.href);

      if (nextUrl.origin !== currentUrl.origin) return;
      if (nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search) {
        return;
      }

      if (hasRememberedScrollForPath(nextUrl.pathname)) return;

      rememberScrollPosition(anchor);
    };

    document.addEventListener("pointerenter", handlePointerEnter, true);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("pointerenter", handlePointerEnter, true);
      document.removeEventListener("click", handleClick, true);
    };
  }, [router]);

  useEffect(() => {
    const handlePageShow = () => {
      void restoreRememberedScroll(pathname);
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [pathname]);

  return null;
}
