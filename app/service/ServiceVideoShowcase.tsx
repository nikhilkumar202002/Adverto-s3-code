"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import InnerBannerHeading from "../components/common/InnerBannerHeading";
import { s3ServiceVideos } from "../data/s3Assets.js";

const horizontalVideos = s3ServiceVideos.horizontal;
const verticalVideos = s3ServiceVideos.vertical;

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const titleText = "Frames That\nMove Brands";

const labelReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: smoothEase,
    },
  },
};

const videoGridReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.62,
      staggerChildren: 0.08,
    },
  },
};

const videoFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -56,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

const videoFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 56,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
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

function PlaylistVideo({
  videos,
  label,
  className,
}: {
  videos: string[];
  label: string;
  className: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playbackOrder, setPlaybackOrder] = useState([0]);
  const [orderIndex, setOrderIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const activeIndex = playbackOrder[orderIndex] ?? 0;
  const activeVideo = videos[activeIndex] ?? videos[0];
  const AudioIcon = isMuted ? VolumeX : Volume2;

  const playNextVideo = () => {
    if (videos.length < 2) {
      videoRef.current?.play().catch(() => undefined);
      return;
    }

    if (orderIndex < playbackOrder.length - 1) {
      setOrderIndex((currentValue) => currentValue + 1);
      return;
    }

    setPlaybackOrder(createShuffledIndexes(videos.length, activeIndex));
    setOrderIndex(0);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeVideo) return;

    video.load();
    video.play().catch(() => undefined);
  }, [activeVideo]);

  return (
    <>
      <video
        ref={videoRef}
        key={activeVideo}
        src={activeVideo}
        aria-label={label}
        autoPlay
        muted={isMuted}
        playsInline
        preload="auto"
        onEnded={playNextVideo}
        onError={playNextVideo}
        onStalled={playNextVideo}
        className={className}
      >
        Your browser does not support the video tag.
      </video>
      <button
        type="button"
        aria-label={isMuted ? `Unmute ${label}` : `Mute ${label}`}
        onClick={() => setIsMuted((currentValue) => !currentValue)}
        className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition-colors duration-300 hover:border-[#0000FF] hover:bg-[#0000FF]"
      >
        <AudioIcon size={18} strokeWidth={2} />
      </button>
    </>
  );
}

export default function ServiceVideoShowcase({
  motionReady = true,
}: {
  motionReady?: boolean;
}) {
  const animationState = motionReady ? "visible" : "hidden";

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
            className="aspect-video h-full w-full object-contain"
          />
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] lg:col-span-1"
          variants={videoFromRight}
        >
          <PlaylistVideo
            videos={verticalVideos}
            label="Vertical service video reel"
            className="aspect-[9/16] h-full w-full object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
