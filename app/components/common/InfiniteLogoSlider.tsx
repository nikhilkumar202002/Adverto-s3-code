"use client";

import React from "react";
import { clientLogos } from "../../data/logos";

export default function InfiniteLogoSlider() {
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
              {clientLogos.map((logo) => {
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
