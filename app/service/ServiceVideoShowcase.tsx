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

function getBrandCluster(urlOrName: string): string {
  if (!urlOrName) return "";
  const decoded = decodeURIComponent(urlOrName).toLowerCase();
  const filename = decoded.split("/").pop() || "";

  // IMG_1816, 1817, 1818, 1820, 1821 (same client campaign)
  if (/img_18(16|17|18|20|21)/i.test(filename)) {
    return "img_18xx";
  }
  const match08 = filename.match(/img[_\s]*08(\d{2})/i);
  if (match08) {
    const num = parseInt(match08[1], 10);
    return num >= 80 ? "img_088x" : "img_086x";
  }
  const match17 = filename.match(/img[_\s]*17(\d{2})/i);
  if (match17) {
    return "img_17xx";
  }
  return filename;
}

function findLatestVideoIndex(videos: string[], pattern: RegExp): number {
  const idx = videos.findIndex((v) => pattern.test(v));
  return idx >= 0 ? idx : 0;
}

function shuffleArray(arr: number[]): number[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function createPairedPlaybackOrders(
  hVideos: string[],
  vVideos: string[]
): { hOrder: number[]; vOrder: number[] } {
  // 1. Horizontal: keep the latest video first
  const latestHIdx = findLatestVideoIndex(hVideos, /img_1816/i);
  const remainingH = shuffleArray(
    Array.from({ length: hVideos.length }, (_, i) => i).filter(
      (i) => i !== latestHIdx
    )
  );
  const hOrder = [latestHIdx, ...remainingH];

  // 2. Vertical: keep the latest video on the 3rd one
  const latestVIdx = findLatestVideoIndex(vVideos, /img_1818/i);
  const remainingV = shuffleArray(
    Array.from({ length: vVideos.length }, (_, i) => i).filter(
      (i) => i !== latestVIdx
    )
  );

  // Avoid placing other videos of the same brand (e.g. IMG_1820, IMG_1821) in the first 2 slots of vertical
  const hFirstBrand = getBrandCluster(hVideos[latestHIdx]);
  for (let slot = 0; slot < Math.min(2, remainingV.length); slot++) {
    if (getBrandCluster(vVideos[remainingV[slot]]) === hFirstBrand) {
      const nonCollidingIdx = remainingV.findIndex(
        (idx, i) => i >= 2 && getBrandCluster(vVideos[idx]) !== hFirstBrand
      );
      if (nonCollidingIdx >= 0) {
        [remainingV[slot], remainingV[nonCollidingIdx]] = [
          remainingV[nonCollidingIdx],
          remainingV[slot],
        ];
      }
    }
  }

  const vOrder =
    remainingV.length >= 2
      ? [remainingV[0], remainingV[1], latestVIdx, ...remainingV.slice(2)]
      : remainingV.length === 1
      ? [remainingV[0], latestVIdx]
      : [latestVIdx];

  return { hOrder, vOrder };
}

// ─── DUAL BUFFER PLAYLIST VIDEO COMPONENT ────────────────────────────────────
function PlaylistVideo({
  videos,
  label,
  className,
  initialOrder,
}: {
  videos: string[];
  label: string;
  className: string;
  initialOrder?: number[];
}) {
  const [playbackOrder, setPlaybackOrder] = useState<number[]>(() =>
    initialOrder && initialOrder.length === videos.length
      ? initialOrder
      : Array.from({ length: videos.length }, (_, index) => index)
  );
  const [orderIndex, setOrderIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [preloadNext, setPreloadNext] = useState(false);

  // Track which of the two <video> tags is currently active and visible
  const [activeBuffer, setActiveBuffer] = useState<0 | 1>(0);

  const videoRef0 = useRef<HTMLVideoElement | null>(null);
  const videoRef1 = useRef<HTMLVideoElement | null>(null);

  const AudioIcon = isMuted ? VolumeX : Volume2;

  // Sync playback order when initialOrder or videos change
  useEffect(() => {
    if (videos.length === 0) return;
    setPlaybackOrder(
      initialOrder && initialOrder.length === videos.length
        ? initialOrder
        : createShuffledIndexes(videos.length)
    );
    setOrderIndex(0);
    setActiveBuffer(0);
  }, [initialOrder, videos]);

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
        suppressHydrationWarning
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
        suppressHydrationWarning
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
  const [orders, setOrders] = useState<{ hOrder: number[]; vOrder: number[] }>(
    () => ({
      hOrder: Array.from(
        { length: initialHorizontalVideos.length },
        (_, i) => i
      ),
      vOrder: Array.from({ length: initialVerticalVideos.length }, (_, i) => i),
    })
  );

  useEffect(() => {
    let isMounted = true;

    // Randomize paired playback orders on client mount to avoid SSR hydration mismatch
    setOrders(
      createPairedPlaybackOrders(initialHorizontalVideos, initialVerticalVideos)
    );

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

        const hUrls = hObjects.map((f) => f.url || s3Asset(f.key));
        const vUrls = vObjects.map((f) => f.url || s3Asset(f.key));

        const currentHSet = new Set(initialHorizontalVideos);
        const currentVSet = new Set(initialVerticalVideos);
        const hasNewHVideos = hUrls.some((u) => !currentHSet.has(u));
        const hasNewVVideos = vUrls.some((u) => !currentVSet.has(u));

        if (hasNewHVideos || hasNewVVideos) {
          const finalH = Array.from(
            new Set([...hUrls, ...initialHorizontalVideos])
          );
          const finalV = Array.from(
            new Set([...vUrls, ...initialVerticalVideos])
          );
          setHorizontalVideos(finalH);
          setVerticalVideos(finalV);
          setOrders(createPairedPlaybackOrders(finalH, finalV));
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
            initialOrder={orders.hOrder}
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
            initialOrder={orders.vOrder}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
