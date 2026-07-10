"use client";

import { useEffect, useRef } from "react";
import { s3Videos } from "../../data/s3Assets.js";

declare global {
  interface Window {
    __advertoPreloaderComplete?: boolean;
  }
}

export default function HeroSection() {
  const portraitVideoRef = useRef<HTMLVideoElement>(null);
  const landscapeVideoRef = useRef<HTMLVideoElement>(null);
  const videoClassName = "h-full w-full object-cover";

  useEffect(() => {
    const portraitVideo = portraitVideoRef.current;
    const landscapeVideo = landscapeVideoRef.current;
    const desktopVideoQuery = window.matchMedia("(min-width: 821px)");
    let isPreloaderComplete = window.__advertoPreloaderComplete === true;

    const resetVideo = (video: HTMLVideoElement) => {
      video.pause();

      try {
        video.currentTime = 0;
      } catch {
        // Some browsers only allow seeking after metadata is ready.
      }
    };

    const playVisibleVideoFromStart = () => {
      if (!portraitVideo || !landscapeVideo) return;

      resetVideo(portraitVideo);
      resetVideo(landscapeVideo);

      const visibleVideo = desktopVideoQuery.matches
        ? landscapeVideo
        : portraitVideo;

      const playVideo = () => {
        visibleVideo.play().catch(() => {
          // Muted autoplay is expected to pass, but browser policy can still block it.
        });
      };

      if (visibleVideo.readyState >= HTMLMediaElement.HAVE_METADATA) {
        playVideo();
        return;
      }

      visibleVideo.addEventListener("loadedmetadata", playVideo, {
        once: true,
      });
    };

    const handlePreloaderComplete = () => {
      isPreloaderComplete = true;
      window.requestAnimationFrame(playVisibleVideoFromStart);
    };

    const handleVideoBreakpointChange = () => {
      if (isPreloaderComplete) playVisibleVideoFromStart();
    };

    if (portraitVideo && landscapeVideo) {
      resetVideo(portraitVideo);
      resetVideo(landscapeVideo);
    }

    if (isPreloaderComplete) {
      playVisibleVideoFromStart();
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
    };
  }, []);

  return (
    <section
      id="hero"
      data-scroll-section-id="hero"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-black"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <video
          ref={portraitVideoRef}
          className={`${videoClassName} block min-[821px]:hidden`}
          src={s3Videos.heroPortrait}
          muted
          loop
          playsInline
          preload="auto"
        />
        <video
          ref={landscapeVideoRef}
          className={`${videoClassName} hidden min-[821px]:block`}
          src={s3Videos.heroLandscape}
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
    </section>
  );
}
