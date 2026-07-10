"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { gsap } from "gsap";
import useCookieConsent from "../../hooks/useCookieConsent";
import { defaultPreferences, type CookiePreferences } from "./cookieStore";
import styles from "./CookieModal.module.css";

const focusableSelector = [
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "a[href]",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function CookieModal() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const { closeModal, consent, savePreferences, closeBanner } =
    useCookieConsent();
  const [preferences, setPreferences] = useState<CookiePreferences>(() => ({
    analytics: consent?.analytics ?? defaultPreferences.analytics,
    marketing: consent?.marketing ?? defaultPreferences.marketing,
    preferences: consent?.preferences ?? defaultPreferences.preferences,
  }));

  const updatePreference = useCallback(
    (key: keyof CookiePreferences) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        setPreferences((current) => ({
          ...current,
          [key]: event.target.checked,
        }));
      },
    [],
  );

  const handleSave = useCallback(() => {
    savePreferences(preferences);
    closeModal();
    closeBanner();
  }, [closeBanner, closeModal, preferences, savePreferences]);

  useEffect(() => {
    const card = cardRef.current;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    if (card) {
      gsap.fromTo(
        card,
        { autoAlpha: 0, scale: 0.9, y: 36 },
        {
          autoAlpha: 1,
          duration: 0.42,
          ease: "power3.out",
          scale: 1,
          y: 0,
        },
      );

      const firstFocusable = card.querySelector<HTMLElement>(focusableSelector);
      firstFocusable?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      if (event.key !== "Tab" || !card) return;

      const focusable = Array.from(
        card.querySelectorAll<HTMLElement>(focusableSelector),
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [closeModal]);

  return (
    <div
      aria-labelledby="cookie-preferences-title"
      aria-modal="true"
      className={styles.overlay}
      role="dialog"
    >
      <div ref={cardRef} className={styles.modal}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Privacy controls</p>
          <h2 id="cookie-preferences-title" className={styles.title}>
            Cookie Preferences
          </h2>
        </div>

        <div className={styles.options}>
          <label className={`${styles.option} ${styles.disabled}`}>
            <input checked disabled type="checkbox" />
            <span>
              <strong>Essential</strong>
              <small>Always Enabled</small>
            </span>
          </label>

          <label className={styles.option}>
            <input
              checked={preferences.analytics}
              type="checkbox"
              onChange={updatePreference("analytics")}
            />
            <span>
              <strong>Analytics</strong>
              <small>Traffic and performance measurement</small>
            </span>
          </label>

          <label className={styles.option}>
            <input
              checked={preferences.marketing}
              type="checkbox"
              onChange={updatePreference("marketing")}
            />
            <span>
              <strong>Marketing</strong>
              <small>Campaign pixels and remarketing</small>
            </span>
          </label>

          <label className={styles.option}>
            <input
              checked={preferences.preferences}
              type="checkbox"
              onChange={updatePreference("preferences")}
            />
            <span>
              <strong>Preferences</strong>
              <small>Remembered website choices</small>
            </span>
          </label>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancel} type="button" onClick={closeModal}>
            Cancel
          </button>
          <button className={styles.save} type="button" onClick={handleSave}>
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
