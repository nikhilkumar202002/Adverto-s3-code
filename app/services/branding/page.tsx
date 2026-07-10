import type { Metadata } from "next";
import ServiceDetailPage from "../_components/ServiceDetailPage";

export const metadata: Metadata = {
  title: "Brand Consulting | Adverto Services",
  description:
    "Explore Adverto brand consulting services including research, audits, positioning, content strategy, and digital brand strategy.",
};

export default function BrandingServicePage() {
  return <ServiceDetailPage slug="branding" />;
}
