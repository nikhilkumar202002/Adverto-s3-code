import type { Metadata } from "next";
import ServiceDetailPage from "../_components/ServiceDetailPage";

export const metadata: Metadata = {
  title: "Social Media Management | Adverto Services",
  description:
    "Explore Adverto social media management services including content creation, creative production, community management, audience growth, paid media, analytics, and reporting.",
};

export default function SocialServicePage() {
  return <ServiceDetailPage slug="social" />;
}
