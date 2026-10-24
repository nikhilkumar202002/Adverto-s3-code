import { s3CampaignImages, s3AlJazeeraCampaignImages } from "./s3Assets.js";

export const campaignProjects = [
  {
    slug: "al-jazeera-little-wonder-2026",
    title: "Al Jazeera Little Wonder 2026",
    subtitle: "Kids Drawing Competition Campaign",
    category: "Campaign",
    year: "2026",
    heroImage: s3AlJazeeraCampaignImages[0],
    description:
      "A vibrant creative campaign developed by Adverto for Al Jazeera Oman’s Little Wonder 2026. Celebrating children’s imagination and artistic talent, the campaign was designed to encourage creativity, build confidence, and bring young talents into the spotlight.",
    services: [
      "Campaign Strategy",
      "Creative Direction",
      "Event Branding",
      "Digital Creatives",
    ],
    gallery: s3AlJazeeraCampaignImages,
  },
  {
    slug: "koickal-gold-diamonds",
    title: "Koickal Gold & Diamonds",
    subtitle: "Grand Reopening Campaign",
    category: "Campaign",
    year: "2024",
    heroImage: s3CampaignImages[0],
    description:
      "A grand reopening campaign shaped around the idea Harippadinte Puthiya Thilakkam, combining campaign strategy, custom typography, outdoor visibility, and digital-first visuals.",
    services: ["Campaign strategy", "Typography", "Outdoor", "Digital creatives"],
    gallery: s3CampaignImages,
  },
];
