"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import InnerBannerHeading from "../components/common/InnerBannerHeading";
import { s3ServiceVideos, s3Asset } from "../data/s3Assets.js";

const initialHorizontalVideos = s3ServiceVideos.horizontal;
const initialVerticalVideos = s3ServiceVideos.vertical;

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const titleText = "Frames That\nMove Brands";

const labelReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: smoothEase },
  },
};

const videoGridReveal: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.62, staggerChildren: 0.08 },
  },
};

const videoFromLeft: Variants = {
  hidden: { opacity: 0, x: -56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: smoothEase },
  },
};

const videoFromRight: Variants = {
  hidden: { opacity: 0, x: 56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: smoothEase },
  },
};

function createShuffledIndexes(length: number, previousIndex?: number) {
  const indexes = Array.from({ length }, (_, index) => index);
  for (let index = indexes.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [indexes[index], indexes[swapIndex]] = [indexes[swapIndex], indexes[index]];
  }
  if (length > 1 && indexes[0] === previousIndex) {
    [indexes[0], indexes[1]] = [indexes[1], indexes[0]];
  }
  return indexes;
}

function createInitialPlaybackOrder(length: number, priorityCount = 1) {
  if (length <= 1) return Array.from({ length }, (_, index) => index);
  const count = Math.min(Math.max(1, priorityCount), length);
  const priorityIndices = Array.from({ length: count }, (_, index) => index);
  const remaining = Array.from(
    { length: length - count },
    (_, index) => index + count
  );
  for (let index = remaining.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [remaining[index], remaining[swapIndex]] = [
      remaining[swapIndex],
      remaining[index],
    ];
  }
  return [...priorityIndices, ...remaining];
}

// ─── DUAL BUFFER PLAYLIST VIDEO COMPONENT ────────────────────────────────────
function PlaylistVideo({
  videos,
  label,
  className,
  priorityCount = 1,
}: {
  videos: string[];
  label: string;
  className: string;
  priorityCount?: number;
}) {
  const [playbackOrder, setPlaybackOrder] = useState<number[]>(() =>
    createInitialPlaybackOrder(videos.length, priorityCount)
  );
  const [orderIndex, setOrderIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [preloadNext, setPreloadNext] = useState(false);

  // Track which of the two <video> tags is currently active and visible
  const [activeBuffer, setActiveBuffer] = useState<0 | 1>(0);

  const videoRef0 = useRef<HTMLVideoElement | null>(null);
  const videoRef1 = useRef<HTMLVideoElement | null>(null);

  const AudioIcon = isMuted ? VolumeX : Volume2;

  // Sync playback order when videos or priorityCount change
  useEffect(() => {
    if (videos.length === 0) return;
    setPlaybackOrder(createInitialPlaybackOrder(videos.length, priorityCount));
    setOrderIndex(0);
    setActiveBuffer(0);
  }, [videos, priorityCount]);

  // Determine current and next video indices based on the shuffled playlist
  const currentIndex = playbackOrder[orderIndex] ?? 0;

  // Calculate the next index to preload
  const nextOrderIndex = (orderIndex + 1) % (playbackOrder.length || 1);
  const nextIndex = playbackOrder[nextOrderIndex] ?? 0;

  // The active buffer gets the current video. The inactive buffer gets the next video.
  const src0 = activeBuffer === 0 ? videos[currentIndex] : videos[nextIndex];
  const src1 = activeBuffer === 1 ? videos[currentIndex] : videos[nextIndex];

  const handleVideoEnd = () => {
    // 1. Determine if we need to shuffle a new batch
    if (orderIndex >= playbackOrder.length - 1) {
      setPlaybackOrder(createShuffledIndexes(videos.length, currentIndex));
      setOrderIndex(0);
    } else {
      setOrderIndex((prev) => prev + 1);
    }

    // 2. Flip the active buffer to instantly show the preloaded video
    setActiveBuffer((prev) => (prev === 0 ? 1 : 0));
  };

  // Play the currently active buffer when it changes
  useEffect(() => {
    const activeRef =
      activeBuffer === 0 ? videoRef0.current : videoRef1.current;
    if (activeRef) {
      activeRef.play().catch(() => undefined);
    }
  }, [activeBuffer, currentIndex, playbackOrder.length]);

  // Avoid competing with the initial video request on a cold page load. Once
  // playback has started, allow the hidden buffer to download the next video.
  useEffect(() => {
    if (!preloadNext) return;

    const nextRef = activeBuffer === 0 ? videoRef1.current : videoRef0.current;
    nextRef?.load();
  }, [activeBuffer, nextIndex, preloadNext]);

  // Keep mute state synced across both videos
  useEffect(() => {
    if (videoRef0.current) videoRef0.current.muted = isMuted;
    if (videoRef1.current) videoRef1.current.muted = isMuted;
  }, [isMuted]);

  if (playbackOrder.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Video Buffer 0 */}
      <video
        ref={videoRef0}
        src={src0}
        aria-label={label}
        autoPlay={activeBuffer === 0}
        muted={isMuted}
        playsInline
        preload={activeBuffer === 0 || preloadNext ? "auto" : "metadata"}
        onPlaying={() => {
          if (activeBuffer === 0) setPreloadNext(true);
        }}
        onEnded={() => {
          if (activeBuffer === 0) handleVideoEnd();
        }}
        onError={() => {
          if (activeBuffer === 0) handleVideoEnd();
        }}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
          activeBuffer === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      />

      {/* Video Buffer 1 */}
      <video
        ref={videoRef1}
        src={src1}
        aria-label={label}
        autoPlay={activeBuffer === 1}
        muted={isMuted}
        playsInline
        preload={activeBuffer === 1 || preloadNext ? "auto" : "metadata"}
        onPlaying={() => {
          if (activeBuffer === 1) setPreloadNext(true);
        }}
        onEnded={() => {
          if (activeBuffer === 1) handleVideoEnd();
        }}
        onError={() => {
          if (activeBuffer === 1) handleVideoEnd();
        }}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
          activeBuffer === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      />

      <button
        type="button"
        aria-label={isMuted ? `Unmute ${label}` : `Mute ${label}`}
        onClick={(e) => {
          e.preventDefault();
          setIsMuted((prev) => !prev);
        }}
        className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition-colors duration-300 hover:border-[#0000FF] hover:bg-[#0000FF]"
      >
        <AudioIcon size={18} strokeWidth={2} />
      </button>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function ServiceVideoShowcase({
  motionReady = true,
}: {
  motionReady?: boolean;
}) {
  const animationState = motionReady ? "visible" : "hidden";

  const [horizontalVideos, setHorizontalVideos] = useState<string[]>(
    initialHorizontalVideos
  );
  const [verticalVideos, setVerticalVideos] =
    useState<string[]>(initialVerticalVideos);
  const [horizontalNewCount, setHorizontalNewCount] = useState(2);
  const [verticalNewCount, setVerticalNewCount] = useState(3);

  useEffect(() => {
    let isMounted = true;

    async function fetchLatestVideos() {
      try {
        const res = await fetch(
          "https://adverto.jinskadamthodu2k15.workers.dev/api/list-all"
        );
        if (!res.ok) return;
        const data = await res.json();
        const objects: Array<{
          key: string;
          uploaded?: string;
          url?: string;
        }> = Array.isArray(data) ? data : data.objects || data.files || [];

        const hObjects = objects
          .filter(
            (f) =>
              f.key.startsWith("videos/horizontal/") &&
              !f.key.endsWith("/") &&
              !f.key.includes(".DS_Store")
          )
          .sort(
            (a, b) =>
              new Date(b.uploaded || 0).getTime() -
              new Date(a.uploaded || 0).getTime()
          );

        const vObjects = objects
          .filter(
            (f) =>
              f.key.startsWith("videos/vertical/") &&
              !f.key.endsWith("/") &&
              !f.key.includes(".DS_Store")
          )
          .sort(
            (a, b) =>
              new Date(b.uploaded || 0).getTime() -
              new Date(a.uploaded || 0).getTime()
          );

        if (!isMounted) return;

        // Detect new videos uploaded in the latest batch (> 2026-10-23T16:00:00Z)
        const recentThreshold = new Date("2026-10-23T16:00:00Z").getTime();
        const hNew = hObjects.filter(
          (f) => new Date(f.uploaded || 0).getTime() > recentThreshold
        ).length;
        const vNew = vObjects.filter(
          (f) => new Date(f.uploaded || 0).getTime() > recentThreshold
        ).length;

        if (hObjects.length > 0) {
          setHorizontalVideos(
            hObjects.map((f) => f.url || s3Asset(f.key))
          );
          setHorizontalNewCount(Math.max(1, hNew));
        }

        if (vObjects.length > 0) {
          setVerticalVideos(
            vObjects.map((f) => f.url || s3Asset(f.key))
          );
          setVerticalNewCount(Math.max(1, vNew));
        }
      } catch (err) {
        console.error("Failed to dynamically fetch service videos:", err);
      }
    }

    fetchLatestVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <div className="mb-[25px] max-w-[1100px] md:mb-12">
        <motion.p
          className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]"
          initial="hidden"
          whileInView={motionReady ? "visible" : "hidden"}
          viewport={{ once: false, amount: 0.35 }}
          variants={labelReveal}
        >
          <span className="h-[1px] w-[30px] bg-[#0000FF]" />
          Video Work
        </motion.p>
        <InnerBannerHeading
          as="h2"
          text={titleText}
          active={motionReady}
          revealOnScroll
          variant="custom"
          className="max-w-[720px] text-[45px] font-medium leading-[0.94] text-[#EDEDED] min-[720px]:text-[50px] min-[920px]:text-[55px] lg:max-w-[1100px] lg:text-[76px] min-[1320px]:text-[100px]"
        />
      </div>

      <motion.div
        className="grid grid-cols-1 gap-5 lg:grid-cols-4"
        initial="hidden"
        animate={animationState}
        variants={videoGridReveal}
      >
        <motion.div
          className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] lg:col-span-3"
          variants={videoFromLeft}
        >
          <PlaylistVideo
            videos={horizontalVideos}
            label="Horizontal service video reel"
            className="aspect-video w-full"
            priorityCount={horizontalNewCount}
          />
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] lg:col-span-1"
          variants={videoFromRight}
        >
          <PlaylistVideo
            videos={verticalVideos}
            label="Vertical service video reel"
            className="aspect-[9/16] w-full"
            priorityCount={verticalNewCount}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
