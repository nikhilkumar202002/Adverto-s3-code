"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUp } from "lucide-react";

const ScrollTopWhatsapp = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const whatsappMessage = encodeURIComponent(
    "Hi Adverto, I would like to know more about your services.",
  );
  const whatsappHref = `https://wa.me/917356560800?text=${whatsappMessage}`;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-5 right-4 z-[90] flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      <button
        type="button"
        aria-label="Scroll to top"
        data-cursor-ignore="true"
        onClick={scrollToTop}
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#050505]/90 text-white shadow-[0_12px_30px_rgba(0,0,0,0.32)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#0000FF] hover:text-[#0000FF] sm:h-12 sm:w-12 ${
          showScrollTop
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      </button>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Adverto on WhatsApp"
        data-cursor-ignore="true"
        className="flex h-12 w-12 items-center justify-center transition-transform duration-300 hover:-translate-y-1 sm:h-14 sm:w-14"
      >
        <Image
          src="/whatsapp-icon.png"
          alt="WhatsApp"
          width={60}
          height={60}
          loading="eager"
        />
      </a>
    </div>
  );
};

export default ScrollTopWhatsapp;
