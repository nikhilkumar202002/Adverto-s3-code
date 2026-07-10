"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { rememberScrollPosition } from "../components/common/scrollRestoration";

type ServiceCardLinkProps = {
  children: ReactNode;
  className: string;
  href: string;
  cardId: string;
};

export default function ServiceCardLink({
  children,
  className,
  href,
  cardId,
}: ServiceCardLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      data-scroll-card-id={cardId}
      data-service-card-link={href}
      onNavigate={rememberScrollPosition}
    >
      {children}
    </Link>
  );
}
