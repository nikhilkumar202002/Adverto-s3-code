import type { Metadata } from "next";
import ServiceDetailPage from "../_components/ServiceDetailPage";

export const metadata: Metadata = {
  title: "Branding & Campaigns | Adverto Services",
  description:
    "Explore Adverto branding and campaign services across identity, rebranding, launches, awareness, influencer, and content marketing campaigns.",
};

export default function AdvertisingServicePage() {
  return <ServiceDetailPage slug="advertising" />;
}
