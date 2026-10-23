import React from "react";
import dynamic from "next/dynamic";
import HeroSection from "./components/hero/HeroSection";

// Dynamically import below-the-fold heavy sections to eliminate initial load lag
const CaseStudiesSection = dynamic(() => import("./components/sections/CaseStudiesSection"), { ssr: true });
const ServicesSection = dynamic(() => import("./components/sections/ServicesSection"), { ssr: true });
const StorySection = dynamic(() => import("./components/sections/StorySection"), { ssr: true });
const ClientLogo = dynamic(() => import("./components/sections/ClientLogo"), { ssr: true });
const HeroBanner = dynamic(() => import("./components/HeroBanner/HeroBanner"), { ssr: true });
const TeamSection = dynamic(() => import("./components/TeamSection/TeamSection"), { ssr: true });
const FaqSection = dynamic(() => import("./components/sections/FaqSection"), { ssr: true });

const page = () => {
  return (
    <>
      {/* HeroSection is imported statically to render immediately above the fold */}
      <HeroSection />
      <CaseStudiesSection />
      <ServicesSection />
      <StorySection />
      <ClientLogo />
      <HeroBanner />
      <TeamSection />
      <FaqSection />
    </>
  );
};

export default page;