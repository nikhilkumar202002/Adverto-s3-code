"use client";

import Link from "next/link";

export default function NavLink({
  href,
  label,
  isActive,
  onNavigate,
}: {
  href: string;
  label: React.ReactNode;
  isActive: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onNavigate}
      className={`group relative text-[14px] font-regular tracking-wide transition duration-300 hover:text-white ${
        isActive ? "text-white" : "text-[#EDEDED]"
      }`}
    >
      {label}

      <span
        className={`absolute -bottom-2 left-0 h-[1px] bg-[#0000FF] transition-all duration-300 group-hover:w-full ${
          isActive ? "w-full" : "w-0"
        }`}
      />
    </Link>
  );
}
