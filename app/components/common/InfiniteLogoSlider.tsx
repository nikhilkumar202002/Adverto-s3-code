"use client";

import React, { useEffect, useState } from "react";
import { clientLogos, createLogoItem } from "../../data/logos";

type LogoItem = {
  id: string | number;
  fileName: string;
  name: string;
  src: string;
  fallbackSrc?: string;
  icon: (props: any) => React.ReactNode;
};

export default function InfiniteLogoSlider() {
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
        console.error("Failed to dynamically fetch slider logos:", err);
      }
    }

    fetchLatestLogos();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full bg-[#050505] overflow-hidden flex flex-col items-center">

      {/* The Container with Edge Fading */}
      <div 
        className="relative flex w-full max-w-[1200px] overflow-hidden"
        style={{
          // This creates the seamless fade on the left and right edges
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        }}
      >
        <style>{`
          @keyframes logo-marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-logo-marquee {
            /* slower marquee for easier reading */
            animation: logo-marquee 60s linear infinite;
            will-change: transform;
          }
        `}</style>

        {/* The scrolling track */}
        <div className="animate-logo-marquee flex w-max items-center">
          {/* Duplicate the array twice to create the seamless loop */}
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0 items-center gap-[30px]">
              {logos.map((logo) => {
                const Icon = logo.icon;
                return (
                  <div
                    key={`${setIndex}-${logo.id}`}
                    // Width is calculated to show exactly 6 on desktop, 4 on tablet, 3 on mobile
                    className="flex w-[33vw] md:w-[25vw] lg:w-[calc(1200px/7)] shrink-0 items-center justify-center opacity-100 grayscale-0 transition-all duration-300 xl:opacity-40 xl:grayscale xl:hover:opacity-100 xl:hover:grayscale-0"
                  >
                    <div className="flex items-center transition-transform duration-300 ease-out xl:hover:scale-110">
                      <Icon size={100} className="text-white" />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
