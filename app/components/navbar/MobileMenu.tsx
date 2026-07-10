"use client";

import Link from "next/link";
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
  return (
    <div
      className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-xl transition-all duration-500 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      {/* Top */}
      <div className="flex items-center justify-between border-b border-white/10 px-[24px] py-6">
        <Link
          href="/"
          aria-label="Adverto home"
          className="inline-block transition hover:opacity-90"
          onClick={() => setIsOpen(false)}
        >
          <img
            src="/main-logo.svg"
            alt="Adverto"
            width={128}
            height={32}
            loading="lazy"
            decoding="async"
            className="h-8 w-auto"
          />
        </Link>

        <button onClick={() => setIsOpen(false)}>
          <X size={30} className="text-[#EDEDED]" />
        </button>
      </div>

      {/* Links */}
      <div className="flex h-[80vh] flex-col items-center justify-center gap-10">
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
              onClick={() => {
                onNavigate(item.href);
                setIsOpen(false);
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
      </div>
    </div>
  );
}
