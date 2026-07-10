"use client";

import Image from "next/image";
import Link from "next/link";
import { portfolioPageProjects } from "../../data/portfolio";
import InnerBannerHeading from "../common/InnerBannerHeading";
import Reveal from "../common/Reveal";

type PortfolioProject = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  heroImage: string;
  portfolioImage?: string;
};

const projects = portfolioPageProjects as PortfolioProject[];
const FEATURED_PROJECT_LIMIT = 14;

const featuredProjects = [...projects].sort((a, b) => {
  const aScore = a.slug.charCodeAt(0) + a.title.length * 7;
  const bScore = b.slug.charCodeAt(0) + b.title.length * 7;

  return aScore - bScore;
}).slice(0, FEATURED_PROJECT_LIMIT);

export default function FeaturedWorksSlider({
  waitForPageTransition = false,
}: {
  waitForPageTransition?: boolean;
}) {
  return (
    <section
      id="featured-projects"
      data-scroll-section-id="featured-projects"
      data-scroll-slider-id="about-featured-projects"
      className="relative z-10 overflow-hidden bg-[#030303] py-24 text-white"
    >
      <Reveal waitForPageTransition={waitForPageTransition}>
        <div className="mb-10 flex items-end justify-between gap-6 px-[80px] max-xl:px-[60px] max-lg:px-[40px] max-md:px-[24px]">
          <div>
            <InnerBannerHeading
              as="h2"
              text="Selected projects in motion."
              variant="custom"
              className="max-w-[720px] text-[42px] font-medium leading-[0.95] tracking-[-0.03em] text-[#F5F5F5] md:text-[72px]"
              waitForPageTransition={waitForPageTransition}
            />
          </div>
          <Link
            href="/portfolio"
            className="hidden border-b border-white/25 pb-1 text-[13px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-white hover:text-white md:inline-flex"
          >
            View all work
          </Link>
        </div>
      </Reveal>

      <style>{`
        @keyframes featured-work-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        .featured-work-track {
          animation: featured-work-marquee 42s linear infinite;
          backface-visibility: hidden;
          contain: layout paint style;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .featured-work-card {
          backface-visibility: hidden;
          contain: layout paint style;
          transform: translate3d(0, 0, 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .featured-work-track {
            animation: none;
          }
        }
      `}</style>

      <Reveal waitForPageTransition={waitForPageTransition} amount={0.01} y={40}>
        <div className="w-full overflow-hidden">
          <div
            className="featured-work-track flex w-max  items-stretch"
            data-scroll-slider-track
            data-about-featured-track
          >
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="flex shrink-0 items-stretch">
                {featuredProjects.map((project, index) => (
                  <Link
                    key={`${setIndex}-${project.slug}-${index}`}
                    href={`/portfolio/${project.slug}`}
                    scroll
                    data-scroll-card-id={`project-${project.slug}`}
                    data-scroll-slider-card-id={`project-${project.slug}`}
                    data-about-featured-project={project.slug}
                    className="featured-work-card group relative mx-2 h-[360px] w-[280px] shrink-0 overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] transition-colors duration-300 hover:border-[#0000FF]/70 md:h-[460px] md:w-[380px]"
                  >
                    <Image
                      src={project.portfolioImage ?? project.heroImage}
                      alt={project.title}
                      fill
                      loading="lazy"
                      quality={72}
                      decoding="async"
                      sizes="(max-width: 768px) 280px, 380px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
