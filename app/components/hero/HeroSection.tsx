"use client";

import { useEffect, useRef } from "react";
import { s3Videos } from "../../data/s3Assets.js";

declare global {
  interface Window {
    __advertoPreloaderComplete?: boolean;
  }
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const setVideoSource = () => {
      if (!video) return;

      const source = window.matchMedia("(min-width: 821px)").matches
        ? s3Videos.heroLandscape
        : s3Videos.heroPortrait;

      // Assigning one source directly avoids browsers retaining the wrong
      // media-qualified <source> after the first client render.
      if (video.src !== source) {
        video.src = source;
        video.load();
      }
    };
    const desktopVideoQuery = window.matchMedia("(min-width: 821px)");
    let isPreloaderComplete = window.__advertoPreloaderComplete === true;
    let isHeroVisible = true;
    let pendingPlayListener: (() => void) | null = null;

    const resetVideo = (video: HTMLVideoElement) => {
      video.pause();

      try {
        video.currentTime = 0;
      } catch {
      }
    };

    const playVideoFromStart = () => {
      if (!video || !isHeroVisible) return;

      resetVideo(video);

      const playVideo = () => {
        pendingPlayListener = null;
        if (!isHeroVisible || !isPreloaderComplete) return;

        video.play().catch(() => {
          // Muted autoplay is expected to pass, but browser policy can still block it.
        });
      };

      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        playVideo();
        return;
      }

      if (pendingPlayListener) {
        video.removeEventListener("canplay", pendingPlayListener);
      }

      pendingPlayListener = playVideo;
      video.addEventListener("canplay", playVideo, {
        once: true,
      });
    };

    const handlePreloaderComplete = () => {
      isPreloaderComplete = true;
      window.requestAnimationFrame(playVideoFromStart);
    };

    const handleVideoBreakpointChange = () => {
      if (!video) return;

      if (pendingPlayListener) {
        video.removeEventListener("canplay", pendingPlayListener);
        pendingPlayListener = null;
      }

      setVideoSource();

      if (isPreloaderComplete) playVideoFromStart();
    };

    const hero = video?.closest("section");
    const visibilityObserver = hero
      ? new IntersectionObserver(
          ([entry]) => {
            isHeroVisible = entry.isIntersecting;
            if (isHeroVisible && isPreloaderComplete) {
              playVideoFromStart();
            } else {
              video?.pause();
            }
          },
          { rootMargin: "100px 0px", threshold: 0.01 },
        )
      : null;

    if (hero) visibilityObserver?.observe(hero);

    if (video) {
      setVideoSource();
      resetVideo(video);
    }

    if (isPreloaderComplete) {
      playVideoFromStart();
    }

    window.addEventListener(
      "adverto:preloader-complete",
      handlePreloaderComplete,
    );
    desktopVideoQuery.addEventListener("change", handleVideoBreakpointChange);

    return () => {
      window.removeEventListener(
        "adverto:preloader-complete",
        handlePreloaderComplete,
      );
      desktopVideoQuery.removeEventListener(
        "change",
        handleVideoBreakpointChange,
      );
      if (video && pendingPlayListener) {
        video.removeEventListener("canplay", pendingPlayListener);
      }
      visibilityObserver?.disconnect();
      video?.pause();
    };
  }, []);

  return (
    <section
      id="hero"
      data-scroll-section-id="hero"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-black"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          className="h-auto w-auto max-w-full object-contain min-[821px]:h-full min-[821px]:w-full min-[821px]:object-cover"
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
    </section>
  );
}
