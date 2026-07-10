"use client";

import styles from "./Preloader.module.css";
import usePreloader from "./usePreloader";

export default function Preloader() {
  const { isVisible, container, background, logoGroup, rectangle, circle } =
    usePreloader();

  if (!isVisible) return null;

  return (
    <div
      ref={container}
      className={styles.preloader}
      role="status"
      aria-label="Loading"
    >
      <div ref={background} className={styles.background} />

      <div ref={logoGroup} className={styles.logoGroup} aria-hidden="true">
        <div ref={rectangle} className={styles.rectangle} />
        <div ref={circle} className={styles.circle} />
      </div>
    </div>
  );
}
