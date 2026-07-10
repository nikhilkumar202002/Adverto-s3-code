import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../components/common/Container";
import InnerBannerHeading from "../components/common/InnerBannerHeading";
import { campaignProjects } from "../data/campaigns";

export const metadata = {
  title: "Campaigns | Adverto",
  description:
    "Explore Adverto campaign work, launch campaigns, outdoor visibility, digital creatives, and brand storytelling.",
};

export default function CampaignsPage() {
  return (
    <section
      id="campaign-grid"
      data-scroll-section-id="campaign-grid"
      className="relative bg-[#050505] pt-32 pb-24 md:pt-40 md:pb-32"
    >
      <Container>
        <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
              <span className="h-[1px] w-[30px] bg-[#0000FF]" />
              Campaigns
            </p>
            <InnerBannerHeading
              text="Campaigns & Launch Stories"
              className="md:max-w-[760px]"
            />
          </div>
          <div className="md:col-span-4 md:flex md:items-end">
            <p className="max-w-[420px] text-[15px] leading-[1.6] text-white/50 md:text-[16px]">
              Campaign systems built for visibility across outdoor, digital, launch,
              and retail moments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {campaignProjects.map((campaign, index) => (
            <Link
              key={campaign.slug}
              href={`/campigns/${campaign.slug}`}
              scroll={false}
              data-scroll-card-id={`campaign-${campaign.slug}`}
              data-campaign-card={campaign.slug}
              className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-white/5">
                <img
                  src={campaign.heroImage}
                  alt={campaign.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-5 p-5 md:p-7">
                <div>
                  <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[#0000FF]">
                    {campaign.subtitle}
                  </p>
                  <InnerBannerHeading
                    as="h2"
                    text={campaign.title}
                    variant="custom"
                    className="text-xl font-medium leading-tight text-white md:text-2xl"
                  />
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0000FF] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
