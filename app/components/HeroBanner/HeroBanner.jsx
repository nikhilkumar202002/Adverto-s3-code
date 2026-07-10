"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroBanner.module.css";
import Image from "next/image";
import { s3Banners } from "../../data/s3Assets.js";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE = s3Banners.squadHero;
const ROTATING_WORDS = [
  "Research",
  "Strategy",
  "Design",
  "Production",
  "Marketing",
  "Growth",
];

export default function HeroBanner() {
  const bannerRef = useRef(null);
  const photoRef = useRef(null);
  const arrowRef = useRef(null);
  const wordWheelRef = useRef(null);
  const wordRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordRefs.current.filter(Boolean);
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const slotGap = isMobile ? 208 : 154;

      if (!words.length) return;

      gsap.set(words, {
        yPercent: (index) => index * slotGap,
        opacity: (index) => (index === 0 ? 1 : index === 1 ? 0.24 : 0),
        scale: (index) => (index === 0 ? 1 : 0.82),
        visibility: "visible",
      });

      /* ── Entrance animation ───────────────────── */
      const entranceTl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: {
          id: "hero-banner-entrance",
          trigger: bannerRef.current,
          start: "top 72%",
          once: true,
        },
      });
      entranceTl
        .fromTo(
          photoRef.current,
          { scale: 1.12, filter: "blur(14px)" },
          { scale: 1, filter: "blur(0px)", duration: 1.6 },
          0
        )
        .fromTo(
          wordWheelRef.current,
          { opacity: 0, y: 28, rotateX: -18 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.1 },
          0.5
        )
        .fromTo(
          arrowRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          1.6
        );

      const stackTl = gsap.timeline({
        scrollTrigger: {
          id: "hero-banner-stack",
          trigger: bannerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.25,
          invalidateOnRefresh: true,
        },
      });

      ROTATING_WORDS.slice(1).forEach((_, stepIndex) => {
        const activeIndex = stepIndex + 1;

        stackTl.to(words, {
          yPercent: (index) => (index - activeIndex) * slotGap,
          opacity: (index) => {
            const distance = Math.abs(index - activeIndex);
            if (distance === 0) return 1;
            if (distance === 1) return 0.24;
            return 0;
          },
          scale: (index) => {
            const distance = Math.abs(index - activeIndex);
            return distance === 0 ? 1 : 0.82;
          },
          duration: 1,
          ease: "none",
        });
      });

      stackTl.to(
        arrowRef.current,
        { opacity: 0, y: 14, duration: 0.24, ease: "none" },
        0
      );

    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className={styles.banner}
      style={{ "--banner-steps": ROTATING_WORDS.length - 1 }}
    >
      <div className={styles.bannerFrame}>
        {/* Background photo */}
        <div ref={photoRef} className={styles.photo}>
          <Image
            src={HERO_IMAGE}
            alt="Adverto squad"
            fill
            sizes="100vw"
            loading="lazy"
            className={styles.photoImg}
            draggable={false}
          />
        </div>

        {/* Grain */}
        <div className={styles.grain} aria-hidden="true" />

        <div className={styles.rotatorContent}>
          <div
            ref={wordWheelRef}
            className={styles.wordWheel}
            aria-label="Adverto process"
          >
            {ROTATING_WORDS.map((word, index) => (
              <span
                key={word}
                ref={(el) => (wordRefs.current[index] = el)}
                className={styles.wheelWord}
              >
                <span className={styles.wordText}>
                  <span className={styles.italicLead}>{word.slice(0, 2)}</span>
                  {word.slice(2)}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Scroll arrow */}
        <div ref={arrowRef} className={styles.scrollArrow} aria-hidden="true">
          <div className={styles.arrowTrack}>
            <div className={styles.arrowDot} />
          </div>
          <span className={styles.arrowLabel}>Scroll</span>
        </div>
      </div>
    </section>
  );
}
