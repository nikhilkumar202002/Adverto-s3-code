"use client";

const STORAGE_KEY = "adverto:scroll-entries:v2";
const HISTORY_KEY = "__advertoScrollKey";
const MAX_ENTRIES = 30;
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

type SliderSnapshot = {
  progress: number;
};

export type ScrollSnapshot = {
  key: string;
  url: string;
  x: number;
  y: number;
  documentHeight: number;
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

export const saveScrollSnapshot = (key: string, url = `${window.location.pathname}${window.location.search}`) => {
  if (!isBrowser()) return;

  const store = readStore();
  store[key] = {
    key,
    url,
    x: window.scrollX,
    y: window.scrollY,
    documentHeight: document.documentElement.scrollHeight,
    sliders: captureSliders(),
    savedAt: Date.now(),
  };
  writeStore(store);
};

export const readScrollSnapshot = (key: string | null) => {
  if (!key) return null;
  return readStore()[key] ?? null;
};

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

export const restoreSliderSnapshots = (snapshot: ScrollSnapshot) => {
  Object.entries(snapshot.sliders).forEach(([id, sliderSnapshot]) => {
    const slider = document.querySelector<HTMLElement>(
      `[data-scroll-slider-id="${CSS.escape(id)}"]`,
    );
    const track = slider?.querySelector<HTMLElement>("[data-scroll-slider-track]");
    if (!track) return;

    const duration = animationDurationMs(track);
    if (duration > 0) {
      track.style.animationDelay = `${-(duration * sliderSnapshot.progress)}ms`;
    }
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

  const apply = () => {
    restoreSliderSnapshots(snapshot);
    window.dispatchEvent(
      new CustomEvent("adverto:scroll-to", {
        detail: { left: snapshot.x, top: snapshot.y, behavior: "auto" },
      }),
    );
    window.scrollTo({ left: snapshot.x, top: snapshot.y, behavior: "auto" });
  };

  apply();

  const check = () => {
    if (cancelled) return;

    const height = document.documentElement.scrollHeight;
    const atTarget = Math.abs(window.scrollY - snapshot.y) < 1;
    const heightStable = height === previousHeight;

    stableFrames = heightStable && relevantImagesReady() && atTarget
      ? stableFrames + 1
      : 0;
    previousHeight = height;

    if (!atTarget || !heightStable) apply();

    if (stableFrames >= 3 || performance.now() - startedAt >= timeoutMs) {
      apply();
      onStable?.();
      return;
    }

    frameId = window.requestAnimationFrame(check);
  };

  frameId = window.requestAnimationFrame(check);

  return () => {
    cancelled = true;
    window.cancelAnimationFrame(frameId);
  };
};

// Compatibility helper for card components that explicitly save before navigation.
export const rememberScrollPosition = () => {
  if (!isBrowser()) return;
  saveScrollSnapshot(ensureHistoryScrollKey());
};
