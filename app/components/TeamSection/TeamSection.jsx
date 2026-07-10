"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { s3TeamImage } from "../../data/s3Assets.js";
import styles from "./TeamSection.module.css";

gsap.registerPlugin(ScrollTrigger);

/* ── Team Data ──────────────────────────────────────────────────────────────── */
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Fabis",
    role: "Co-Founder & Creative Director",
    image: s3TeamImage("fabis.jpg"),
    accent: "#0000FF",
    tagline: "Creative Lead",
    // Direction the card FLIES OUT when dismissed
    exitX:    "-115vw",
    exitY:    "-22vh",
    exitRot:  -14,
  },
  {
    id: 2,
    name: "Shihab",
    role: "Co-Founder & Managing Director",
    image: s3TeamImage("shihab.jpg"),
    accent: "#3b82ff",
    tagline: "Business Lead",
    exitX:    "120vw",
    exitY:    "-18vh",
    exitRot:  16,
  },
  {
    id: 3,
    name: "Ashif",
    role: "Digital Marketer & Project Manager",
    image: s3TeamImage("ASHIF.jpeg"),
    accent: "#5d5dff",
    tagline: "Digital Strategy",
    exitX:    "-108vw",
    exitY:    "20vh",
    exitRot:  -12,
  },
  {
    id: 4,
    name: "Aby",
    role: "Senior Video Editor",
    image: s3TeamImage("ABY.jpg"),
    accent: "#4a65ff",
    tagline: "Edit Lead",
    exitX:    "118vw",
    exitY:    "16vh",
    exitRot:  18,
  },
  {
    id: 5,
    name: "Ajin",
    role: "Graphic Designer",
    image: s3TeamImage("AJIN.jpg"),
    accent: "#5f6cff",
    tagline: "Visual Design",
    exitX:    "-112vw",
    exitY:    "-14vh",
    exitRot:  -10,
  },
  {
    id: 6,
    name: "Ashish",
    role: "Director",
    image: s3TeamImage("ashi.jpg"),
    accent: "#6e8ec8",
    tagline: "Direction",
    exitX:    "116vw",
    exitY:    "-10vh",
    exitRot:  14,
  },
  {
    id: 7,
    name: "Ameen",
    role: "Cinematographer",
    image: s3TeamImage("ameen.jpg"),
    accent: "#4f79ff",
    tagline: "Cinematography",
    exitX:    "-118vw",
    exitY:    "18vh",
    exitRot:  -16,
  },
  {
    id: 8,
    name: "Alphya",
    role: "HR Manager",
    image: s3TeamImage("ALPHY.jpg"),
    accent: "#7a72ff",
    tagline: "People Ops",
    exitX:    "115vw",
    exitY:    "22vh",
    exitRot:  15,
  },
  {
    id: 9,
    name: "Nawaz",
    role: "Graphic Designer & Video Editor",
    image: s3TeamImage("navas ..jpg"),
    accent: "#3a35ff",
    tagline: "Design & Edit",
    exitX:    "115vw",
    exitY:    "22vh",
    exitRot:  15,
  },
];

const ZOOM_POSITIONS = [
  { top: 30, left: 16 },
  { top: 30, left: 84 },
  { top: 24, left: 32 },
  { top: 38, left: 68 },
  { top: 42, left: 24 },
  { top: 24, left: 76 },
  { top: 32, left: 35 },
  { top: 32, left: 65 },
  { top: 40, left: 50 },
];

const MOBILE_ZOOM_POSITIONS = [
  { top: 26, left: 50 },
  { top: 26, left: 50 },
  { top: 26, left: 50 },
  { top: 26, left: 50 },
  { top: 26, left: 50 },
  { top: 26, left: 50 },
  { top: 26, left: 50 },
  { top: 26, left: 50 },
  { top: 26, left: 50 },
];

/* ── Individual Card ─────────────────────────────────────────────────────────── */
function TeamCard({ member, deckIndex, cardRef }) {
  const position = ZOOM_POSITIONS[deckIndex] || ZOOM_POSITIONS[0];
  const mobilePosition = MOBILE_ZOOM_POSITIONS[deckIndex] || MOBILE_ZOOM_POSITIONS[0];

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${deckIndex < 2 ? styles.visibleStart : ""}`}
      style={{
        "--accent": member.accent,
        "--deck-index": deckIndex,
        "--card-top": `${position.top}%`,
        "--card-left": `${position.left}%`,
        "--mobile-card-top": `${mobilePosition.top}%`,
        "--mobile-card-left": `${mobilePosition.left}%`,
      }}
      aria-label={`${member.name}, ${member.role}`}
    >
      <div className={styles.imageWrap}>
        <div className={styles.imageParallaxInner}>
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className={styles.image}
            draggable={false}
          />
        </div>
      </div>
      <div className={styles.memberMeta}>
        <span className={styles.memberName}>{member.name}</span>
        <span className={styles.memberDivider} aria-hidden="true" />
        <span className={styles.memberRole}>{member.role}</span>
      </div>
    </article>
  );
}

/* ── Main Component ───────────────────────────────────────────────────────────── */
export default function TeamSection() {
  const sectionRef  = useRef(null);
  const stickyRef   = useRef(null);
  const deckRef     = useRef(null);
  const cardRefs    = useRef([]);
  const projectsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      const total = cards.length;
      let timeline;
      let resizeTimer;
      let viewportWidth = window.innerWidth;

      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });

      const setupAnimation = () => {
        const isMobile = window.innerWidth < 768;
        const scrollLength = isMobile ? total * 66 : total * 44;
        const scrub = isMobile ? 0.75 : 0.65;
        const firstPairDepth = isMobile ? "118vh" : "110vh";
        const nextPairDepth = isMobile ? "108vh" : "100vh";

        timeline?.scrollTrigger?.kill();
        timeline?.kill();
        gsap.killTweensOf([cards, projectsRef.current]);

        /* ── Set initial depth positions ─────────────────────────────── */
        cards.forEach((card, i) => {
          const z = isMobile
            ? i < 2 ? "-12vh" : `${-18 - i * 12}vh`
            : i < 2 ? "-20vh" : `${-4 - i * 20}vh`;
          const visibleAtStart = isMobile ? i === 0 : i < 2;

          gsap.set(card, {
            position: "absolute",
            zIndex: total - i,
            xPercent: -50,
            yPercent: 0,
            scale: 1,
            opacity: visibleAtStart ? 1 : 0,
            rotate: 0,
            rotationZ: 0,
            z,
            transformOrigin: "center center",
            transformPerspective: 900,
            force3D: true,
          });
        });

        gsap.set(projectsRef.current, {
          autoAlpha: 0,
        });

        /* ── Master scroll timeline ─────────────────────────────────── */
        timeline = gsap.timeline({
          scrollTrigger: {
            id: "team-zoom-scroll",
            trigger: sectionRef.current,
            start:   "top top",
            end:     `+=${scrollLength}%`,
            scrub,
            pin:     stickyRef.current,
            pinSpacing: true,
            pinType: "fixed",
            anticipatePin: 0.6,
            invalidateOnRefresh: true,
          },
        });

        if (isMobile) {
          cards.forEach((card, index) => {
            const cardTl = gsap.timeline();

            cardTl
              .set(card, { zIndex: total + index }, 0)
              .to(
                card,
                {
                  opacity: 1,
                  duration: 0.35,
                  ease: "none",
                },
                0
              )
              .to(
                card,
                {
                  z: index === 0 ? firstPairDepth : nextPairDepth,
                  duration: 2.8,
                  ease: "none",
                },
                0
              )
              .to(
                card,
                {
                  opacity: 0,
                  duration: 0.4,
                  ease: "none",
                },
                2.35
              );

            timeline.add(cardTl, index === 0 ? 0 : ">");
          });
        } else if (cards.length >= 2) {
          timeline.to(
            cards.slice(0, 2),
            {
              z: firstPairDepth,
              duration: 4,
              ease: "none",
            },
            0
          );

          cards.slice(2).forEach((card, offsetIndex) => {
            const index = offsetIndex + 2;
            const cardTl = gsap.timeline();
            const timelineSlot = Math.floor(offsetIndex / 2);

            cardTl
              .set(card, { zIndex: total + index }, 0)
              .to(
                card,
                {
                  z: nextPairDepth,
                  duration: 4,
                  ease: "none",
                },
                0
              )
              .to(
                card,
                {
                  opacity: 1,
                  duration: 1,
                  ease: "none",
                },
                0.4
              )
              .to(
                card,
                {
                  opacity: 0,
                  duration: 0.35,
                  ease: "none",
                },
                3.65
              );

            timeline.add(cardTl, timelineSlot);
          });
        }

        timeline.to(
          cards,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power1.out",
          },
          ">"
        );

        timeline.to(
          projectsRef.current,
          {
            autoAlpha: 1,
            duration: 0.2,
            ease: "none",
            overwrite: "auto",
          },
          ">"
        );

        timeline.to(
          projectsRef.current,
          {
            autoAlpha: 1,
            duration: isMobile ? 1.4 : 1.2,
            ease: "none",
          },
          ">"
        );

        ScrollTrigger.refresh();
      };

      const onResize = () => {
        if (window.innerWidth === viewportWidth) return;

        viewportWidth = window.innerWidth;
        clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(setupAnimation, 200);
      };

      setupAnimation();
      window.addEventListener("resize", onResize);

      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        timeline?.scrollTrigger?.kill(true);
        timeline?.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Ambient noise */}
      <div className={styles.sectionNoise} aria-hidden="true" />

      {/* Background orbs */}
      <div className={styles.orb} data-orb="1" aria-hidden="true" />
      <div className={styles.orb} data-orb="2" aria-hidden="true" />

      {/* Sticky viewport */}
      <div ref={stickyRef} className={styles.sticky}>

        {/* Card deck */}
        <div ref={deckRef} className={styles.deck}>
          {TEAM_MEMBERS.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              deckIndex={index}
              cardRef={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>

        {/* Projects Text */}
        <div
          ref={projectsRef}
          className={styles.projectsText}
          style={{ opacity: 0 }}
        >
          <div className={styles.projectsBackdrop} aria-hidden="true" />
          <h3 className={styles.projectsHeading}>The Quiet Force</h3>
   
        </div>
      </div>
    </section>
  );
}
