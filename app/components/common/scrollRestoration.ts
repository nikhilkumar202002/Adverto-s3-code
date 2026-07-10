"use client";

import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

export type NavigationMemory = {
  pathname: string;
  sectionId: string | null;
  cardId: string | null;
  scrollY: number;
  sliderId: string | null;
  sliderIndex: number | null;
  sliderProgress: number | null;
  sliderTranslateX: number | null;
  savedAt: number;
};

type RememberScrollOptions = {
  cardId?: string | null;
  sectionId?: string | null;
  sliderId?: string | null;
  sliderIndex?: number | null;
};

const memoryKey = "adverto:navigation-memory";
const maxAge = 30 * 60 * 1000;

const isBrowser = () => typeof window !== "undefined";

const safeEscape = (value: string) => {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(value);
  }

  return value.replace(/["\\]/g, "\\$&");
};

const getTranslateX = (element: Element) => {
  const transform = window.getComputedStyle(element).transform;

  if (!transform || transform === "none") return 0;

  return new DOMMatrixReadOnly(transform).m41;
};

const getAnimationDuration = (element: Element) => {
  const duration = window.getComputedStyle(element).animationDuration;
  const firstDuration = duration.split(",")[0]?.trim() ?? "0s";
  const seconds = firstDuration.endsWith("ms")
    ? Number.parseFloat(firstDuration) / 1000
    : Number.parseFloat(firstDuration);

  return Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
};

const getCardId = (element: HTMLElement | null) => {
  const explicitCard = element?.closest<HTMLElement>("[data-scroll-card-id]");

  if (explicitCard?.dataset.scrollCardId) {
    return explicitCard.dataset.scrollCardId;
  }

  const card = element?.closest<HTMLElement>(
    [
      "[data-home-service-card]",
      "[data-home-project-card]",
      "[data-service-card-link]",
      "[data-works-project]",
      "[data-about-featured-project]",
      "[data-campaign-card]",
    ].join(","),
  );

  if (!card) return null;

  return (
    card.dataset.homeServiceCard ??
    card.dataset.homeProjectCard ??
    card.dataset.serviceCardLink ??
    card.dataset.worksProject ??
    card.dataset.aboutFeaturedProject ??
    card.dataset.campaignCard ??
    null
  );
};

const getSectionId = (element: HTMLElement | null) => {
  const section = element?.closest<HTMLElement>("[data-scroll-section-id], section[id]");

  return section?.dataset.scrollSectionId ?? section?.id ?? null;
};

const getSlider = (element: HTMLElement | null) => {
  const card = element?.closest<HTMLElement>("[data-scroll-slider-card-id]");
  const slider = card?.closest<HTMLElement>("[data-scroll-slider-id]");
  const track = slider?.querySelector<HTMLElement>("[data-scroll-slider-track]");

  if (!card || !slider || !track) return null;

  const cards = Array.from(
    slider.querySelectorAll<HTMLElement>("[data-scroll-slider-card-id]"),
  );
  const sliderIndex = cards.findIndex((item) => item === card);
  const translateX = getTranslateX(track);
  const loopWidth = Math.max(track.scrollWidth / 2, 1);

  return {
    sliderId: slider.dataset.scrollSliderId ?? null,
    sliderIndex: sliderIndex >= 0 ? sliderIndex : null,
    sliderProgress: Math.min(Math.max(Math.abs(translateX) / loopWidth, 0), 1),
    sliderTranslateX: translateX,
  };
};

const getActiveSliderCard = (sliderId: string | null) => {
  if (!sliderId) return null;

  const slider = document.querySelector<HTMLElement>(
    `[data-scroll-slider-id="${safeEscape(sliderId)}"]`,
  );
  const cards = Array.from(
    slider?.querySelectorAll<HTMLElement>("[data-scroll-slider-card-id]") ?? [],
  );

  if (cards.length === 0) return null;

  const viewportCenter = window.innerWidth / 2;

  return cards.reduce<{ id: string | null; index: number | null; distance: number }>(
    (closest, card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - viewportCenter);

      if (distance >= closest.distance) return closest;

      return {
        id: card.dataset.scrollSliderCardId ?? getCardId(card),
        index,
        distance,
      };
    },
    { id: null, index: null, distance: Number.POSITIVE_INFINITY },
  );
};

const buildMemory = (
  trigger?: HTMLElement | null,
  options: RememberScrollOptions = {},
): NavigationMemory => {
  const sourceElement = trigger ?? null;
  const sliderState = getSlider(sourceElement);
  const activeSliderCard = getActiveSliderCard(options.sliderId ?? sliderState?.sliderId ?? null);

  return {
    pathname: window.location.pathname,
    sectionId: options.sectionId ?? getSectionId(sourceElement),
    cardId: options.cardId ?? getCardId(sourceElement) ?? activeSliderCard?.id ?? null,
    scrollY: window.scrollY,
    sliderId: options.sliderId ?? sliderState?.sliderId ?? null,
    sliderIndex:
      options.sliderIndex ?? sliderState?.sliderIndex ?? activeSliderCard?.index ?? null,
    sliderProgress: sliderState?.sliderProgress ?? null,
    sliderTranslateX: sliderState?.sliderTranslateX ?? null,
    savedAt: Date.now(),
  };
};

export const rememberScrollPosition = (
  trigger?: HTMLElement | null,
  options: RememberScrollOptions = {},
) => {
  if (!isBrowser()) return;

  sessionStorage.setItem(memoryKey, JSON.stringify(buildMemory(trigger, options)));
};

const readNavigationMemory = () => {
  if (!isBrowser()) return null;

  const serialized = sessionStorage.getItem(memoryKey);

  if (!serialized) return null;

  try {
    const memory = JSON.parse(serialized) as NavigationMemory;

    if (Date.now() - memory.savedAt > maxAge) {
      sessionStorage.removeItem(memoryKey);
      return null;
    }

    return memory;
  } catch {
    sessionStorage.removeItem(memoryKey);
    return null;
  }
};

export const hasRememberedScrollForPath = (pathname: string) => {
  const memory = readNavigationMemory();

  return memory?.pathname === pathname;
};

const clearNavigationMemory = () => {
  sessionStorage.removeItem(memoryKey);
};

const dispatchScrollTo = (top: number, behavior: ScrollBehavior = "auto") => {
  window.dispatchEvent(
    new CustomEvent("adverto:scroll-to", { detail: { top, behavior } }),
  );
};

const waitForImages = async (root: ParentNode, targetOnly = false) => {
  const images = Array.from(root.querySelectorAll("img")).filter((image) => {
    if (targetOnly) return true;
    if (image.loading !== "lazy") return true;

    const rect = image.getBoundingClientRect();

    return rect.top < window.innerHeight * 1.5;
  });

  await Promise.all(
    images.map((image) => {
      if (image.complete) return Promise.resolve();

      return new Promise<void>((resolve) => {
        const finish = () => {
          image.removeEventListener("load", finish);
          image.removeEventListener("error", finish);
          resolve();
        };

        image.addEventListener("load", finish, { once: true });
        image.addEventListener("error", finish, { once: true });
      });
    }),
  );
};

export const waitForPageStability = async (target?: HTMLElement | null) => {
  if (document.readyState === "loading") {
    await new Promise<void>((resolve) => {
      document.addEventListener("DOMContentLoaded", () => resolve(), { once: true });
    });
  }

  if (
    "fonts" in document &&
    typeof document.fonts?.ready?.then === "function"
  ) {
    await document.fonts.ready.catch(() => undefined);
  }

  await waitForImages(target ?? document, Boolean(target));

  let stableFrames = 0;
  let previousHeight = document.documentElement.scrollHeight;
  let previousTargetTop = target?.getBoundingClientRect().top ?? 0;

  await new Promise<void>((resolve) => {
    let frameId = 0;
    const observerOptions = { childList: true, subtree: true, attributes: true };
    const mutationObserver = new MutationObserver(() => {
      stableFrames = 0;
    });
    const resizeObserver = new ResizeObserver(() => {
      stableFrames = 0;
    });

    mutationObserver.observe(document.body, observerOptions);
    resizeObserver.observe(document.documentElement);
    if (target) resizeObserver.observe(target);

    const cleanup = () => {
      window.cancelAnimationFrame(frameId);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };

    const check = () => {
      const nextHeight = document.documentElement.scrollHeight;
      const nextTargetTop = target?.getBoundingClientRect().top ?? 0;

      if (
        Math.abs(nextHeight - previousHeight) < 1 &&
        Math.abs(nextTargetTop - previousTargetTop) < 1
      ) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
        previousHeight = nextHeight;
        previousTargetTop = nextTargetTop;
      }

      if (stableFrames >= 2) {
        cleanup();
        resolve();
        return;
      }

      frameId = window.requestAnimationFrame(check);
    };

    frameId = window.requestAnimationFrame(check);
  });
};

const findRestoreCard = (memory: NavigationMemory) => {
  if (!memory.cardId) return null;

  const cardId = safeEscape(memory.cardId);

  return document.querySelector<HTMLElement>(
    [
      `[data-scroll-card-id="${cardId}"]`,
      `[data-home-service-card="${cardId}"]`,
      `[data-home-project-card="${cardId}"]`,
      `[data-service-card-link="${cardId}"]`,
      `[data-works-project="${cardId}"]`,
      `[data-about-featured-project="${cardId}"]`,
      `[data-campaign-card="${cardId}"]`,
    ].join(","),
  );
};

const restoreSlider = (memory: NavigationMemory) => {
  if (!memory.sliderId) return;

  const slider = document.querySelector<HTMLElement>(
    `[data-scroll-slider-id="${safeEscape(memory.sliderId)}"]`,
  );
  const track = slider?.querySelector<HTMLElement>("[data-scroll-slider-track]");

  if (!slider || !track) return;

  if (Number.isFinite(memory.sliderProgress)) {
    const duration = getAnimationDuration(track);

    if (duration > 0) {
      track.style.animationDelay = `${-(duration * (memory.sliderProgress ?? 0))}s`;
      track.style.animationPlayState = "running";
    }
  }

  if (Number.isFinite(memory.sliderTranslateX)) {
    track.style.transform = `translate3d(${memory.sliderTranslateX}px, 0, 0)`;
    window.requestAnimationFrame(() => {
      track.style.transform = "";
    });
  }

};

export const restoreRememberedScroll = async (pathname: string) => {
  const memory = readNavigationMemory();

  if (!memory || memory.pathname !== pathname) return false;

  clearNavigationMemory();
  restoreSlider(memory);

  const target = findRestoreCard(memory);

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    await waitForPageStability(target);
    restoreSlider(memory);
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    return true;
  }

  dispatchScrollTo(memory.scrollY, "smooth");
  await waitForPageStability();
  dispatchScrollTo(memory.scrollY, "smooth");
  return true;
};

export const useRememberScroll = (options: RememberScrollOptions = {}) =>
  useCallback(
    (trigger?: HTMLElement | null) => {
      rememberScrollPosition(trigger, options);
    },
    [options],
  );

export const useRememberSlider = (sliderId: string) =>
  useCallback(
    (trigger?: HTMLElement | null, sliderIndex?: number | null) => {
      rememberScrollPosition(trigger, { sliderId, sliderIndex });
    },
    [sliderId],
  );

export const useRestoreScroll = () => {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const frameId = window.requestAnimationFrame(() => {
      void restoreRememberedScroll(pathname).then(() => {
        if (cancelled) return;
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);
};

export const useRestoreSlider = (sliderId: string) =>
  useCallback(() => {
    const memory = readNavigationMemory();

    if (memory?.sliderId === sliderId) {
      restoreSlider(memory);
    }
  }, [sliderId]);
