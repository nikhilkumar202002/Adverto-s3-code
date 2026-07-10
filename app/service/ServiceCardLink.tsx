"use client";

import { type ReactNode } from "react";
import Link from "next/link";

type ServiceCardLinkProps = {
  children: ReactNode;
  className: string;
  href: string;
};

export default function ServiceCardLink({
  children,
  className,
  href,
}: ServiceCardLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      data-service-card-link={href}
    >
      {children}
    </Link>
  );
}
