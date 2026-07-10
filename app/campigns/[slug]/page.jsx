import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Container from "../../components/common/Container";
import InnerBannerHeading from "../../components/common/InnerBannerHeading";
import Reveal from "../../components/common/Reveal";
import { campaignProjects } from "../../data/campaigns";
import ProjectGallery from "../../portfolio/[slug]/ProjectGallery";

export function generateStaticParams() {
  return campaignProjects.map((campaign) => ({
    slug: campaign.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const campaign = campaignProjects.find((item) => item.slug === slug);

  if (!campaign) {
    return {
      title: "Campaign Not Found",
    };
  }

  return {
    title: `${campaign.title} | Campaigns`,
    description: campaign.description,
  };
}

export default async function CampaignPage({ params }) {
  const { slug } = await params;
  const campaign = campaignProjects.find((item) => item.slug === slug);

  if (!campaign) {
    notFound();
  }

  const headingTitle = campaign.title.includes(" & ")
    ? campaign.title.replace(" & ", " &\n")
    : campaign.title;

  return (
    <article className="relative bg-[#050505] pt-28 pb-24 md:pt-36 md:pb-32">
      <Container>
        <Reveal
          x={-32}
          y={0}
          duration={0.55}
          once={false}
          waitForPageTransition
        >
          <Link
            href="/campigns"
            className="mb-10 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Campaigns
          </Link>
        </Reveal>

        <div className="portfolio-single-header">
          <Reveal
            className="portfolio-header-left"
            x={-56}
            y={0}
            once={false}
            waitForPageTransition
          >
            <InnerBannerHeading
              text={headingTitle}
              className="md:leading-[0.86]"
            />
          </Reveal>
          <Reveal
            className="portfolio-header-right"
            x={56}
            y={0}
            once={false}
            waitForPageTransition
          >
            <p className="portfolio-page-description">
              {campaign.description}
            </p>
          </Reveal>
        </div>

        <Reveal y={36} amount={0.08} once waitForPageTransition>
          <div className="mt-[30px] overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A]">
            <img
              src={campaign.heroImage}
              alt={campaign.title}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-auto w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-[6px] grid grid-cols-2 gap-[6px] xl:grid-cols-3">
          {[
            ["Category", campaign.category],
            ["Year", campaign.year],
            ["Services", campaign.services.join(", ")],
          ].map(([label, value], index) => (
            <Reveal
              key={label}
              className={index === 2 ? "col-span-2 xl:col-span-1" : ""}
              delay={index * 0.06}
              duration={0.55}
              y={24}
              amount={0.12}
              once
              waitForPageTransition
            >
              <div className="bg-[#080808] p-6 md:p-8">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">
                  {label}
                </p>
                <p className="text-xl font-medium text-white">{value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 xl:grid-cols-12 xl:items-start">
          <div className="xl:sticky xl:top-28 xl:col-span-4 xl:self-start">
            <Reveal
              x={-56}
              y={0}
              amount={0.12}
              once={false}
              waitForPageTransition
            >
              <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
                <span className="h-[1px] w-[30px] bg-[#0000FF]" />
                Gallery
              </p>
              <InnerBannerHeading
                as="h2"
                text="Campaign Visuals"
                variant="custom"
                className="text-4xl font-medium leading-none text-[#EDEDED] md:text-5xl"
              />
            </Reveal>
          </div>
          <Reveal
            className="xl:col-span-8"
            y={36}
            amount={0.06}
            once
            waitForPageTransition
          >
            <ProjectGallery
              images={campaign.gallery}
              title={campaign.title}
              gridClassName="[grid-auto-rows:1px] grid-cols-2 gap-x-[10px] gap-y-[10px] md:gap-x-[20px] md:gap-y-[20px] xl:grid-cols-3"
            />
          </Reveal>
        </div>

        <Reveal y={24} amount={0.12} once waitForPageTransition>
          <div className="mt-20 flex justify-end">
            <Link
              href="/campigns"
              className="group inline-flex items-center gap-2 border-b border-white/20 pb-1 text-sm text-white/80 transition-colors hover:border-white hover:text-white"
            >
              View all campaigns
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
