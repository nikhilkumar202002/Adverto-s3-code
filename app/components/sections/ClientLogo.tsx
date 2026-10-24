"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "../common/Container";
import InnerBannerHeading from "../common/InnerBannerHeading";
import usePageTransitionReady from "../common/usePageTransitionReady";
import { clientLogos, createLogoItem } from "../../data/logos";

type LogoItem = {
  id: string | number;
  fileName: string;
  name: string;
  src: string;
  fallbackSrc?: string;
  icon: (props: any) => React.ReactNode;
};

const headingWords = ["Brands", "We", "Helped", "Grow"];
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sectionRevealViewport = {
  once: true,
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

const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.25,
      ease: smoothEase,
    },
  },
};

function StaticHeading() {
  return (
    <h2
      className="section-breakpoint-heading text-[clamp(32px,9vw,40px)] md:text-[clamp(46px,5.6vw,54px)] lg:text-[60px] font-medium leading-[1.1] text-[#EDEDED]"
    >
      <span className="block pb-[0.08em]">
        {headingWords.map((word) => (
          <span
            key={word}
            className="mr-[0.18em] inline-block"
          >
            {word}
          </span>
        ))}
      </span>
    </h2>
  );
}

export default function ClientLogo({
  waitForPageTransition = false,
}: {
  waitForPageTransition?: boolean;
}) {
  const isReady = usePageTransitionReady(waitForPageTransition);
  const [logos, setLogos] = useState<LogoItem[]>(clientLogos as LogoItem[]);

  useEffect(() => {
    let isMounted = true;

    async function fetchLatestLogos() {
      try {
        const res = await fetch(
          "https://adverto.jinskadamthodu2k15.workers.dev/api/list-all"
        );
        if (!res.ok) return;
        const data = await res.json();
        const objects: Array<{ key: string; uploaded?: string; url?: string }> = Array.isArray(data)
          ? data
          : data.objects || data.files || [];

        const bucketLogos = objects.filter(
          (f) =>
            f.key.startsWith("client_logos/") &&
            !f.key.endsWith("/") &&
            !f.key.includes(".DS_Store")
        );
        if (!bucketLogos.length || !isMounted) return;

        const urlMap = new Map<string, string>();
        bucketLogos.forEach((f) => {
          const fileName = f.key.replace(/^client_logos\//, "");
          if (f.url) {
            urlMap.set(fileName, f.url);
          }
        });

        // Top 3 priority logos
        const top3Names = ["tiara logo1y.png", "fira logoy.png", "Asset 2@4x.png"];

        // New logos uploaded in the latest batch, sorted newest first
        const newLogos = bucketLogos
          .filter((f) => {
            const fileName = f.key.replace(/^client_logos\//, "");
            return (
              !top3Names.includes(fileName) &&
              new Date(f.uploaded || 0).getTime() >
                new Date("2026-10-23T15:10:00Z").getTime()
            );
          })
          .sort(
            (a, b) =>
              new Date(b.uploaded || 0).getTime() -
              new Date(a.uploaded || 0).getTime()
          )
          .map((f) => f.key.replace(/^client_logos\//, ""));

        // Remaining logos from earlier batch
        const remainingLogos = bucketLogos
          .filter((f) => {
            const fileName = f.key.replace(/^client_logos\//, "");
            return !top3Names.includes(fileName) && !newLogos.includes(fileName);
          })
          .map((f) => f.key.replace(/^client_logos\//, ""));

        const orderedFiles = [...top3Names, ...newLogos, ...remainingLogos];
        const dynamicList = orderedFiles.map((fileName, idx) =>
          createLogoItem(fileName, idx + 1, urlMap.get(fileName) || null)
        );

        if (isMounted && dynamicList.length > 0) {
          setLogos(dynamicList);
        }
      } catch (err) {
        console.error("Failed to dynamically fetch client logos:", err);
      }
    }

    fetchLatestLogos();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className="relative z-10 bg-[#050505] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden border-t border-white/5"
    >
      <Container className="relative z-10">
          {/* --- SECTION HEADER --- */}
          <motion.div
            className="flex flex-col items-center text-center mb-10 sm:mb-12 md:mb-16 lg:mb-24"
            initial="hidden"
            whileInView={isReady ? "visible" : "hidden"}
            viewport={sectionRevealViewport}
            variants={fadeFromLeft}
          >
            <p 
              className="text-[#0000FF] uppercase text-[11px] md:text-[13px] lg:text-[14px] tracking-[0.15em] mb-3 md:mb-4 flex items-center gap-3 justify-center"
            >
              <span className="w-[20px] md:w-[30px] h-[1px] bg-[#0000FF]"></span>
              OUR CLIENTS
              <span className="w-[20px] md:w-[30px] h-[1px] bg-[#0000FF]"></span>
            </p>
            <div>
              {waitForPageTransition ? (
                <InnerBannerHeading
                  as="h2"
                  text={headingWords.join(" ")}
                  variant="custom"
                  className="section-breakpoint-heading text-[clamp(32px,9vw,40px)] md:text-[clamp(46px,5.6vw,54px)] lg:text-[60px] font-medium leading-[1.1] text-[#EDEDED]"
                  active={isReady}
                  waitForPageTransition={waitForPageTransition}
                />
              ) : (
                <StaticHeading />
              )}
            </div>
          </motion.div>

          {/* --- LOGOS GRID --- */}
          <motion.div
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-8 sm:gap-y-10 md:gap-y-14 lg:gap-y-16 items-center justify-items-center"
            initial="hidden"
            whileInView={isReady ? "visible" : "hidden"}
            viewport={sectionRevealViewport}
            variants={fadeIn}
          >
            {logos.map((logo) => {
              const Icon = logo.icon;

              return (
                <div
                  key={logo.id}
                  className="group flex items-center justify-center w-full h-full p-2 sm:p-3 md:p-4 transition-transform duration-300 xl:hover:scale-110"
                >
                  <Icon 
                    size={100} 
                    className="max-w-[88px] max-h-[56px] sm:max-w-[104px] sm:max-h-[68px] md:max-w-[112px] md:max-h-[74px] lg:max-w-[120px] lg:max-h-[80px] w-auto h-auto object-contain opacity-80 grayscale transition-all duration-300 xl:group-hover:opacity-100 xl:group-hover:grayscale-0" 
                  />
                </div>
              );
            })}
          </motion.div>
      </Container>
    </section>
  );
}
