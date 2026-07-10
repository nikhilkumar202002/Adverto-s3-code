import type { Metadata } from "next";
import ServiceDetailPage from "../_components/ServiceDetailPage";

export const metadata: Metadata = {
  title: "Media Production | Adverto Services",
  description:
    "Explore Adverto media production services for commercials, brand films, digital ads, photography, animation, reels, explainers, and short format ads.",
};

export default function VideoServicePage() {
  return <ServiceDetailPage slug="video" />;
}
