"use client";

import React from "react";

interface MarqueeTextProps {
  items?: string[];
}

export default function MarqueeText({ items = [] }: MarqueeTextProps) {
  return (
    <div className="relative flex w-full overflow-hidden border-y border-white/10 bg-black py-3.5 md:py-5">

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="animate-marquee flex w-max items-center">

        {[...Array(2)].map((_, setIndex) => (
          <div key={setIndex} className="flex shrink-0 items-center">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <span className="mx-5 md:mx-8 text-[12px] md:text-[15px] font-regular tracking-[0.10em] text-[#9A9A9A] uppercase">
                  {item}
                </span>

                <span className="text-base md:text-xl leading-none text-[#0000FF]">•</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
