"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import type { NavItem } from "./Navbar";

export default function MobileMenu({
  isOpen,
  setIsOpen,
  navItems,
  activePath,
  onNavigate,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  navItems: NavItem[];
  activePath: string;
  onNavigate: (href: string) => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    
    // Pause Lenis scrolling while menu is open
    window.dispatchEvent(new CustomEvent("adverto:lock-scroll"));
    
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      
      // Resume Lenis scrolling
      window.dispatchEvent(new CustomEvent("adverto:unlock-scroll"));
      
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      data-lenis-prevent // Added to prevent Lenis from hijacking touch/scroll events here
      className="fixed inset-0 z-[100] flex min-h-dvh flex-col overscroll-contain bg-black md:bg-black/95 md:backdrop-blur-xl"
    >
      {/* Top */}
      <div className="flex items-center justify-between border-b border-white/10 px-[24px] py-6">
        <Link
          href="/"
          aria-label="Adverto home"
          className="inline-block transition hover:opacity-90"
          onNavigate={() => setIsOpen(false)}
        >
          <Image
            src="/main-logo.svg"
            alt="Adverto"
            width={128}
            height={32}
            loading="eager"
            decoding="async"
            className="h-8 w-auto"
          />
        </Link>

        <button ref={closeButtonRef} type="button" aria-label="Close navigation menu" onClick={() => setIsOpen(false)}>
          <X size={30} className="text-[#EDEDED]" />
        </button>
      </div>

      {/* Links */}
      <nav className="flex min-h-0 flex-1 flex-col items-center justify-center gap-8 overflow-y-auto px-6 py-10 sm:gap-10">
        {navItems.map((item) => {
          const activePaths = item.activePaths ?? [item.href];
          const isActive = activePaths.some((path) => {
            return activePath === path || activePath.startsWith(`${path}/`);
          });

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setIsOpen(false)}
              onNavigate={() => {
                onNavigate(item.href);
              }}
              className={`relative text-[14px] font-normal uppercase tracking-wider transition hover:text-[#0000FF] ${
                isActive ? "text-white" : "text-[#EDEDED]"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-2 left-0 h-[1px] bg-[#0000FF] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0"
                }`}
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
