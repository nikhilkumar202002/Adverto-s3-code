"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "../common/Container";
import InfiniteProjectSlider from "../common/InfiniteProjectSlider";
import { moreProjects } from "../../data/moreProjects";
import { caseStudyCollageProjects } from "../../data/portfolio";
import { featuredPortfolioTiles } from "../../data/featuredportfolio";
import { s3CampaignImages, s3Videos } from "../../data/s3Assets.js";
import styles from "./CaseStudiesSection.module.css";

type FeaturedPortfolioProject = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
};

type RotatingPortfolioTileProps = {
  projects: FeaturedPortfolioProject[];
  intervalMs: number;
  className: string;
};

const koickalCampaignImages = s3CampaignImages;

const headingWords = [["Case", "Studies", "&"], ["Campaigns"]];
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sectionRevealViewport = {
  once: false,
  amount: 0.25,
};

const fadeFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -56,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.25,
      ease: smoothEase,
    },
  },
};

const fadeFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 56,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.25,
      ease: smoothEase,
    },
  },
};

const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: smoothEase,
    },
  },
};

const staggerGroup: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

function StaticHeading() {
  return (
    <h2
      className={`${styles.caseStudiesHeading} font-medium text-[#EDEDED]`}
    >
      {headingWords.map((line, lineIndex) => (
        <span key={lineIndex} className="block pb-[0.08em]">
          {line.map((word) => (
            <span
              key={`${lineIndex}-${word}`}
              className="mr-[0.18em] inline-block"
            >
              {word}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}

function RotatingPortfolioTile({
  projects,
  intervalMs,
  className,
}: RotatingPortfolioTileProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex] ?? projects[0];

  useEffect(() => {
    if (projects.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % projects.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, projects.length]);

  if (!activeProject) return null;

  return (
    <div className={`group relative w-full overflow-hidden rounded-[20px] border border-transparent transition-colors duration-300 group-hover:border-b-2 group-hover:border-b-[#0000FF] [perspective:1200px] ${className}`}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.img
          key={activeProject.image}
          src={activeProject.image}
          alt={activeProject.alt}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, rotateY: -82, scale: 0.98 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: 82, scale: 0.98 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 object-cover w-full h-full rounded-[20px] origin-left [backface-visibility:hidden] [transform-style:preserve-3d]"
        />
      </AnimatePresence>
    </div>
  );
}

function RotatingCampaignImage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = koickalCampaignImages[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % koickalCampaignImages.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={activeImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeIn" }}
        className="absolute inset-0"
      >
        <Image
          src={activeImage}
          alt="Koickal Gold & Diamonds campaign visual"
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default function CaseStudiesSection() {
  const centerProject = caseStudyCollageProjects[2];

  return (
    <section
      id="featured-work"
      data-scroll-section-id="featured-work"
      className="relative z-10 bg-[#050505] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
    >
      <Container>
        {/* --- 1. SECTION HEADER --- */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-8 md:mb-10 lg:mb-[50px]"
        >
          {/* Title (Left, spans 6 cols) */}
          <motion.div 
            className="md:col-span-7 lg:col-span-6"
            initial="hidden"
            whileInView="visible"
            viewport={sectionRevealViewport}
            variants={fadeFromLeft}
          >
            <p className="text-[#0000FF] uppercase text-[12px] md:text-[13px] lg:text-[14px] tracking-[0.12em] mb-2 flex items-center gap-2">
              <span className="w-[30px] h-[1px] bg-[#0000FF]"></span>SELECTED WORK
            </p>
            <StaticHeading />
          </motion.div>

          {/* Description & Link (Right, starts at col 9, spans 4 cols) */}
          <motion.div 
            className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9 flex flex-col items-start justify-end md:items-end"
            initial="hidden"
            whileInView="visible"
            viewport={sectionRevealViewport}
            variants={fadeFromRight}
          >
        
            <Link href="/portfolio" className="group flex items-center gap-2 text-sm text-[#EDEDED] transition-colors hover:text-[#0000FF]">
              View all works 
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* --- 2. FEATURED PROJECT 1 (KOICKAL) --- */}
        <div
          className={`${styles.featuredCaseStudy} group mb-5 grid grid-cols-1 items-center gap-4 overflow-hidden rounded-[16px] border border-[#252525] bg-[#080808] p-3 md:rounded-[20px] md:p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-6`}
        >
          <motion.div
            className="relative aspect-[3492/2000] w-full overflow-hidden rounded-[16px] bg-white/5 md:rounded-[20px]"
            initial="hidden"
            whileInView="visible"
            viewport={sectionRevealViewport}
            variants={fadeFromLeft}
          >
            <RotatingCampaignImage />
            <div className="pointer-events-none absolute inset-0 rounded-[16px] md:rounded-[20px] bg-black/10" />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={sectionRevealViewport}
            variants={fadeFromRight}
          >
            <p className="mb-3 text-[11px] uppercase tracking-[0.15em] text-[#0000FF] md:text-xs">Grand Reopening Campaign</p>
            <h3 className={`${styles.featuredCaseStudyTitle} mb-4 max-w-[720px] text-[25px] font-medium leading-[1.08] text-[#EDEDED] sm:text-[30px] md:text-[22px] lg:text-[35px] xl:text-4xl`}>
              Koickal Gold & Diamonds | Harippadinte Puthiya Thilakkam
            </h3>
            <p className={`${styles.featuredCaseStudyDescription} mb-4 max-w-[720px] text-[14px] leading-[1.65] text-white/50 md:text-[15px] lg:text-[14px] xl:text-[15px]`}>
              For the grand reopening of Koickal Gold & Diamonds, Harippad, we created &quot;Harippadinte
              Puthiya Thilakkam&quot; as the central idea of the campaign, reflecting both the renewed spirit
              of the brand and the pride of the town it serves. More than just a tagline, it was crafted
              to celebrate a new chapter while staying true to the brand&apos;s legacy of trust and elegance.
            </p>
            <p className={`${styles.featuredCaseStudyLastDescription} mb-0 max-w-[720px] text-[14px] leading-[1.65] text-white/50 md:text-[15px] lg:text-[14px] xl:text-[15px]`}>
              To give the campaign a distinctive identity, we custom-designed the typography from the
              ground up, transforming the concept into a memorable visual statement. From ideation to
              execution, every element was carefully crafted to capture the essence of celebration,
              sophistication, and renewal.
            </p>
            <Link
              href="/campigns/koickal-gold-diamonds"
              scroll={false}
              data-scroll-card-id="campaign-koickal-gold-diamonds"
              data-campaign-card="koickal-gold-diamonds"
              className={`${styles.featuredCaseStudyReadMore} group mt-5 items-center gap-2 text-sm text-[#EDEDED] transition-colors hover:text-[#0000FF]`}
            >
              Read more
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* --- 3. COLLAGE GRID (3 Columns) --- */}
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
        >
          {/* Col 1 */}
          <motion.div
            className="flex flex-col gap-4 md:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={sectionRevealViewport}
            variants={staggerGroup}
          >
            <motion.div variants={fadeFromLeft}>
              <RotatingPortfolioTile
                projects={featuredPortfolioTiles.leftTop.projects}
                intervalMs={featuredPortfolioTiles.leftTop.intervalMs}
                className="aspect-square"
              />
            </motion.div>
            <motion.div variants={fadeFromLeft}>
              <RotatingPortfolioTile
                projects={featuredPortfolioTiles.leftBottom.projects}
                intervalMs={featuredPortfolioTiles.leftBottom.intervalMs}
                className="aspect-[4/3]"
              />
            </motion.div>
          </motion.div>
          {/* Col 2 (Hero image in center) */}
          <motion.div
            className="group relative min-h-[340px] md:min-h-[420px] lg:min-h-[400px] h-full w-full overflow-hidden rounded-[16px] md:rounded-[20px] border border-transparent transition-colors duration-300 group-hover:border-b-2 group-hover:border-b-[#0000FF] md:row-span-2 lg:row-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={sectionRevealViewport}
            variants={fadeIn}
          >
            <video
              src={s3Videos.centerVideo}
              aria-label={centerProject.alt}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="object-cover w-full h-full rounded-[16px] md:rounded-[20px]"
            />
          </motion.div>
          {/* Col 3 */}
          <motion.div
            className="flex flex-col gap-4 md:gap-5 md:col-span-2 md:grid md:grid-cols-2 lg:col-span-1 lg:flex lg:grid-cols-none"
            initial="hidden"
            whileInView="visible"
            viewport={sectionRevealViewport}
            variants={staggerGroup}
          >
            <motion.div variants={fadeFromRight}>
              <RotatingPortfolioTile
                projects={featuredPortfolioTiles.rightTop.projects}
                intervalMs={featuredPortfolioTiles.rightTop.intervalMs}
                className="aspect-[4/3]"
              />
            </motion.div>
            <motion.div variants={fadeFromRight}>
              <RotatingPortfolioTile
                projects={featuredPortfolioTiles.rightBottom.projects}
                intervalMs={featuredPortfolioTiles.rightBottom.intervalMs}
                className="aspect-square"
              />
            </motion.div>
          </motion.div>
        </div>

        <div
          className="mt-12 md:mt-24"
        >
          <InfiniteProjectSlider projects={moreProjects} />
        </div>
      </Container>

     
    </section>
  );
}
