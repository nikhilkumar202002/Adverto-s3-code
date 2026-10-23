"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { beginForwardNavigation } from "../components/common/scrollRestoration";

export default function CampaignNavigationLink({
  slug,
  children,
  className,
}: {
  slug: string;
  children: ReactNode;
  className: string;
}) {
  const cardId = `campaign-${slug}`;

  return (
    <Link
      href={`/campigns/${slug}`}
      scroll
      onNavigate={() => beginForwardNavigation(cardId)}
      data-scroll-card-id={cardId}
      data-campaign-card={slug}
      className={className}
    >
      {children}
    </Link>
  );
}
