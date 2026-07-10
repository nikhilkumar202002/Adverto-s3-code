"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Cookie } from "lucide-react";
import useCookieConsent from "../../hooks/useCookieConsent";
import styles from "./CookieBanner.module.css";

export default function CookieBanner() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { acceptAll, closeBanner, openModal, rejectAll } = useCookieConsent();

  const animateOut = useCallback(
    (onComplete?: () => void) => {
      const card = cardRef.current;

      if (!card) {
        onComplete?.();
        closeBanner();
        return;
      }

      gsap.to(card, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          onComplete?.();
          closeBanner();
        },
        y: 30,
      });
    },
    [closeBanner],
  );

  const handleAcceptAll = useCallback(() => {
    animateOut(acceptAll);
  }, [acceptAll, animateOut]);

  const handleReject = useCallback(() => {
    animateOut(rejectAll);
  }, [animateOut, rejectAll]);

  const handleManage = useCallback(() => {
    openModal();
  }, [openModal]);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    gsap.fromTo(
      card,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        duration: 0.7,
        ease: "power3.out",
        y: 0,
      },
    );
  }, []);

  return (
    <section
      ref={cardRef}
      aria-label="Cookie consent"
      className={styles.banner}
    >
      <div className={styles.header}>
        <span aria-hidden className={styles.icon}>
          <Cookie size={18} strokeWidth={1.8} />
        </span>
        <h2 className={styles.title}>Cookies & Privacy</h2>
      </div>

      <p className={styles.copy}>
        We use cookies to improve your experience, analyze website traffic, and
        personalize content. You can accept all cookies or manage your
        preferences.
      </p>

      <div className={styles.actions}>
        <button
          className={`${styles.button} ${styles.primary}`}
          type="button"
          onClick={handleAcceptAll}
        >
          Accept All
        </button>
        <button
          className={`${styles.button} ${styles.secondary}`}
          type="button"
          onClick={handleManage}
        >
          Manage
        </button>
        <button
          className={`${styles.button} ${styles.textButton}`}
          type="button"
          onClick={handleReject}
        >
          Reject
        </button>
      </div>
    </section>
  );
}
