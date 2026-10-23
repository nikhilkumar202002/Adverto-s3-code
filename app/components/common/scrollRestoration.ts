"use client";

const STORAGE_KEY = "adverto:scroll-entries:v2";
const HISTORY_KEY = "__advertoScrollKey";
const MAX_ENTRIES = 30;
const MAX_AGE_MS = 2 * 60 * 60 * 1000;
const PORTFOLIO_ENTRY_KEY = "adverto:portfolio-entry";
const SERVICE_ENTRY_KEY = "adverto:service-entry";
const SERVICE_RETURN_KEY = "adverto:service-return-target";
const SERVICE_RETURN_MAX_AGE_MS = 10 * 60 * 1000;

export type ServiceReturnTarget = {
  anchorId: string;
  anchorViewportTop: number;
  scrollY: number;
  sourcePath: string;
  savedAt: number;
};

const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

type SliderSnapshot = {
  progress: number;
};

export type ScrollSnapshot = {
  key: string;
  url: string;
  x: number;
  y: number;
  documentHeight: number;
  anchorId?: string;
  anchorViewportTop?: number;
  sliders: Record<string, SliderSnapshot>;
  savedAt: number;
};

type SnapshotStore = Record<string, ScrollSnapshot>;

const isBrowser = () => typeof window !== "undefined";

const createKey = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const readStore = (): SnapshotStore => {
  if (!isBrowser()) return {};

  try {
    const parsed = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") as SnapshotStore;
    const cutoff = Date.now() - MAX_AGE_MS;

    return Object.fromEntries(
      Object.entries(parsed).filter(([, snapshot]) => snapshot.savedAt >= cutoff),
    );
  } catch {
    return {};
  }
};

const writeStore = (store: SnapshotStore) => {
  const entries = Object.entries(store)
    .sort(([, a], [, b]) => b.savedAt - a.savedAt)
    .slice(0, MAX_ENTRIES);

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(entries)));
  } catch {
    // Scroll restoration is progressive enhancement when storage is unavailable.
  }
};

export const getHistoryScrollKey = (state: unknown = window.history.state) => {
  if (!state || typeof state !== "object") return null;

  const value = (state as Record<string, unknown>)[HISTORY_KEY];
  return typeof value === "string" ? value : null;
};

export const ensureHistoryScrollKey = () => {
  const existing = getHistoryScrollKey();
  const url = `${window.location.pathname}${window.location.search}`;
  const existingSnapshot = existing ? readStore()[existing] : null;

  // Next.js may copy custom history state into a newly pushed entry. A snapshot
  // belonging to another URL means this is a new entry and needs its own key.
  if (existing && (!existingSnapshot || existingSnapshot.url === url)) return existing;

  const key = createKey();
  const currentState =
    window.history.state && typeof window.history.state === "object"
      ? window.history.state
      : {};

  window.history.replaceState(
    { ...currentState, [HISTORY_KEY]: key },
    "",
    window.location.href,
  );

  return key;
};

const readTranslateX = (element: HTMLElement) => {
  const transform = window.getComputedStyle(element).transform;
  if (!transform || transform === "none") return 0;

  try {
    return new DOMMatrixReadOnly(transform).m41;
  } catch {
    return 0;
  }
};

const captureSliders = () => {
  const snapshots: Record<string, SliderSnapshot> = {};

  document.querySelectorAll<HTMLElement>("[data-scroll-slider-id]").forEach((slider) => {
    const id = slider.dataset.scrollSliderId;
    const track = slider.querySelector<HTMLElement>("[data-scroll-slider-track]");
    if (!id || !track) return;

    const loopWidth = track.scrollWidth / 2;
    if (loopWidth <= 0) return;

    const offset = ((-readTranslateX(track) % loopWidth) + loopWidth) % loopWidth;
    snapshots[id] = { progress: offset / loopWidth };
  });

  return snapshots;
};

export const saveScrollSnapshot = (
  key: string,
  url = `${window.location.pathname}${window.location.search}`,
  anchorId?: string,
) => {
  if (!isBrowser()) return;

  const anchor = anchorId
    ? document.querySelector<HTMLElement>(
        `[data-scroll-card-id="${CSS.escape(anchorId)}"]`,
      )
    : null;
  const store = readStore();
  store[key] = {
    key,
    url,
    x: window.scrollX,
    y: window.scrollY,
    documentHeight: document.documentElement.scrollHeight,
    anchorId: anchor ? anchorId : undefined,
    anchorViewportTop: anchor?.getBoundingClientRect().top,
    sliders: captureSliders(),
    savedAt: Date.now(),
  };
  writeStore(store);
};

export const readScrollSnapshot = (key: string | null) => {
  if (!key) return null;
  return readStore()[key] ?? null;
};

export const readCurrentScrollSnapshot = () =>
  readScrollSnapshot(getHistoryScrollKey());

export const hasSnapshotForCurrentHistoryEntry = () => {
  if (!isBrowser()) return false;

  const snapshot = readScrollSnapshot(getHistoryScrollKey());
  const url = `${window.location.pathname}${window.location.search}`;
  return snapshot?.url === url;
};

const animationDurationMs = (track: HTMLElement) => {
  const raw = window.getComputedStyle(track).animationDuration.split(",")[0]?.trim();
  if (!raw) return 0;

  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value)) return 0;
  return raw.endsWith("ms") ? value : value * 1000;
};

export const restoreSliderElement = (
  snapshot: ScrollSnapshot,
  id: string,
  track: HTMLElement,
) => {
  const sliderSnapshot = snapshot.sliders[id];
  if (!sliderSnapshot) return;

  const duration = animationDurationMs(track);
  if (duration > 0) {
    track.style.animationDelay = `${-(duration * sliderSnapshot.progress)}ms`;
  }
};

export const restoreSliderSnapshots = (snapshot: ScrollSnapshot) => {
  Object.keys(snapshot.sliders).forEach((id) => {
    const slider = document.querySelector<HTMLElement>(
      `[data-scroll-slider-id="${CSS.escape(id)}"]`,
    );
    const track = slider?.querySelector<HTMLElement>("[data-scroll-slider-track]");
    if (!track || track.dataset.scrollSliderHydrated !== "true") return;

    restoreSliderElement(snapshot, id, track);
  });
};

const relevantImagesReady = () => {
  const viewportBottom = window.innerHeight * 1.5;
  return Array.from(document.images).every((image) => {
    const rect = image.getBoundingClientRect();
    const affectsViewport = rect.bottom >= -window.innerHeight / 2 && rect.top <= viewportBottom;
    return !affectsViewport || image.complete;
  });
};

export const restoreScrollSnapshot = (
  snapshot: ScrollSnapshot,
  onStable?: () => void,
) => {
  let cancelled = false;
  let frameId = 0;
  let stableFrames = 0;
  let previousHeight = -1;
  const startedAt = performance.now();
  const timeoutMs = 2000;

  const removeUserIntentListeners = () => {
    window.removeEventListener("touchstart", cancelForUserIntent);
    window.removeEventListener("wheel", cancelForUserIntent);
    window.removeEventListener("pointerdown", cancelForUserIntent);
    window.removeEventListener("keydown", cancelForUserIntent);
  };

  const cancelForUserIntent = () => {
    cancelled = true;
    window.cancelAnimationFrame(frameId);
    removeUserIntentListeners();
  };

  const apply = () => {
    restoreSliderSnapshots(snapshot);
    const anchor = snapshot.anchorId
      ? document.querySelector<HTMLElement>(
          `[data-scroll-card-id="${CSS.escape(snapshot.anchorId)}"]`,
        )
      : null;
    const top =
      anchor && snapshot.anchorViewportTop !== undefined
        ? window.scrollY +
          anchor.getBoundingClientRect().top -
          snapshot.anchorViewportTop
        : snapshot.y;
    window.dispatchEvent(
      new CustomEvent("adverto:scroll-to", {
        detail: { left: snapshot.x, top, behavior: "auto" },
      }),
    );
    window.scrollTo({ left: snapshot.x, top, behavior: "auto" });
  };

  apply();
  window.addEventListener("touchstart", cancelForUserIntent, { passive: true });
  window.addEventListener("wheel", cancelForUserIntent, { passive: true });
  window.addEventListener("pointerdown", cancelForUserIntent, { passive: true });
  window.addEventListener("keydown", cancelForUserIntent);

  const check = () => {
    if (cancelled) return;

    const height = document.documentElement.scrollHeight;
    const anchor = snapshot.anchorId
      ? document.querySelector<HTMLElement>(
          `[data-scroll-card-id="${CSS.escape(snapshot.anchorId)}"]`,
        )
      : null;
    const atTarget = anchor && snapshot.anchorViewportTop !== undefined
      ? Math.abs(anchor.getBoundingClientRect().top - snapshot.anchorViewportTop) < 1
      : Math.abs(window.scrollY - snapshot.y) < 1;
    const heightStable = height === previousHeight;

    stableFrames = heightStable && relevantImagesReady() && atTarget
      ? stableFrames + 1
      : 0;
    previousHeight = height;

    // Next can reset scroll after the route's layout effects. Keep correcting
    // until the saved position is reached; the intent listeners above cancel
    // restoration immediately when the user starts interacting.
    if (!heightStable || !atTarget) apply();

    if (stableFrames >= 3 || performance.now() - startedAt >= timeoutMs) {
      apply();
      removeUserIntentListeners();
      onStable?.();
      return;
    }

    frameId = window.requestAnimationFrame(check);
  };

  frameId = window.requestAnimationFrame(check);

  return () => {
    cancelled = true;
    window.cancelAnimationFrame(frameId);
    removeUserIntentListeners();
  };
};

// Compatibility helper for card components that explicitly save before navigation.
export const rememberScrollPosition = () => {
  if (!isBrowser()) return;
  saveScrollSnapshot(ensureHistoryScrollKey());
};

export const rememberPortfolioEntry = (anchorId: string) => {
  if (!isBrowser()) return;

  saveScrollSnapshot(ensureHistoryScrollKey(), undefined, anchorId);
  try {
    sessionStorage.setItem(PORTFOLIO_ENTRY_KEY, "true");
  } catch {
    // History Back still works when storage is unavailable.
  }
};

export const beginPortfolioProjectNavigation = (anchorId: string) => {
  if (!isBrowser()) return;

  // Capture the source card before moving. Reset immediately so a slower
  // production navigation cannot paint the destination fallback at this
  // page's deep scroll offset before its client layout hydrates.
  rememberPortfolioEntry(anchorId);
  resetScrollForForwardNavigation();
};

const resetScrollForForwardNavigation = () => {
  window.dispatchEvent(new Event("adverto:navigation-start"));
  window.dispatchEvent(
    new CustomEvent("adverto:scroll-to", {
      detail: { left: 0, top: 0, behavior: "auto" },
    }),
  );
  window.scrollTo({ left: 0, top: 0, behavior: "auto" });
};

export const beginForwardNavigation = (anchorId?: string) => {
  if (!isBrowser()) return;

  saveScrollSnapshot(ensureHistoryScrollKey(), undefined, anchorId);
  resetScrollForForwardNavigation();
};

export const consumePortfolioEntry = () => {
  if (!isBrowser()) return false;

  try {
    const hasEntry = sessionStorage.getItem(PORTFOLIO_ENTRY_KEY) === "true";
    sessionStorage.removeItem(PORTFOLIO_ENTRY_KEY);
    return hasEntry;
  } catch {
    return false;
  }
};

export const rememberServiceEntry = (anchorId?: string) => {
  if (!isBrowser()) return;

  saveScrollSnapshot(ensureHistoryScrollKey(), undefined, anchorId);
  try {
    sessionStorage.setItem(SERVICE_ENTRY_KEY, "true");
    if (anchorId) {
      const anchor = document.querySelector<HTMLElement>(
        `[data-scroll-card-id="${CSS.escape(anchorId)}"]`,
      );
      if (anchor) {
        const target: ServiceReturnTarget = {
          anchorId,
          anchorViewportTop: anchor.getBoundingClientRect().top,
          scrollY: window.scrollY,
          sourcePath: normalizePath(window.location.pathname),
          savedAt: Date.now(),
        };
        sessionStorage.setItem(SERVICE_RETURN_KEY, JSON.stringify(target));
      }
    }
  } catch {
    // History Back still works when storage is unavailable.
  }
};

export const consumeServiceReturnTarget = (
  expectedSourcePath: string,
): ServiceReturnTarget | null => {
  if (!isBrowser()) return null;

  try {
    const raw = sessionStorage.getItem(SERVICE_RETURN_KEY);
    sessionStorage.removeItem(SERVICE_RETURN_KEY);
    if (!raw) return null;

    const target = JSON.parse(raw) as ServiceReturnTarget;
    if (
      !target.anchorId ||
      normalizePath(target.sourcePath) !== normalizePath(expectedSourcePath) ||
      !Number.isFinite(target.anchorViewportTop) ||
      !Number.isFinite(target.scrollY) ||
      Date.now() - target.savedAt > SERVICE_RETURN_MAX_AGE_MS
    ) {
      return null;
    }
    return target;
  } catch {
    return null;
  }
};

export const consumeServiceEntry = () => {
  if (!isBrowser()) return false;

  try {
    const hasEntry = sessionStorage.getItem(SERVICE_ENTRY_KEY) === "true";
    sessionStorage.removeItem(SERVICE_ENTRY_KEY);
    return hasEntry;
  } catch {
    return false;
  }
};

export const enableNativeBackRestoration = () => {
  if (!isBrowser() || !("scrollRestoration" in window.history)) return;

  const previousScrollRestoration = window.history.scrollRestoration;
  window.history.scrollRestoration = "auto";
  window.setTimeout(() => {
    window.history.scrollRestoration = previousScrollRestoration;
  }, 1000);
};
