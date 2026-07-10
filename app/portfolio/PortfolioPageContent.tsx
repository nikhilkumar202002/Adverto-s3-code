"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "../components/common/Container";
import InnerBannerHeading from "../components/common/InnerBannerHeading";
import usePageTransitionReady from "../components/common/usePageTransitionReady";
import ServiceVideoShowcase from "../service/ServiceVideoShowcase";

type PortfolioProject = {
  slug: string;
  title: string;
  heroImage: string;
};

type PortfolioPageContentProps = {
  projects: PortfolioProject[];
};

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sectionRevealViewport = {
  once: false,
  amount: 0.2,
};

const fadeFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -56,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

const gridCardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.48,
      ease: smoothEase,
    },
  },
};

export default function PortfolioPageContent({
  projects,
}: PortfolioPageContentProps) {
  const pathname = usePathname();
  const motionReady = usePageTransitionReady(true);
  const worksIndexPath = pathname === "/works" ? "/works" : "/portfolio";

  return (
    <section
      id="portfolio-grid"
      data-scroll-section-id="portfolio-grid"
      className="relative bg-[#050505] pb-[25px] pt-32 md:pb-32 md:pt-40"
    >
      <Container>
        <div className="mb-20 md:mb-28">
          <ServiceVideoShowcase motionReady={motionReady} />
        </div>

        <div className="mb-[25px] grid grid-cols-1 gap-8 md:mb-14 md:grid-cols-12">
          <motion.div
            className="md:col-span-12 lg:col-span-10"
            initial="hidden"
            whileInView={motionReady ? "visible" : "hidden"}
            viewport={sectionRevealViewport}
            variants={fadeFromLeft}
          >
            <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
              <span className="h-[1px] w-[30px] bg-[#0000FF]" />
              Portfolio
            </p>
            <InnerBannerHeading
              text={"Branding &\nCreative Portfolio"}
              active={motionReady}
              revealOnScroll
              variant="custom"
              className="max-w-[720px] text-[45px] font-medium leading-[0.94] text-[#EDEDED] min-[720px]:text-[50px] min-[920px]:text-[55px] lg:max-w-[1100px] lg:text-[76px] min-[1320px]:text-[100px]"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial="hidden"
              whileInView={motionReady ? "visible" : "hidden"}
              viewport={{ once: true, amount: 0.05, margin: "100px" }}
              variants={gridCardReveal}
              transition={{ duration: 0.48, delay: (index % 3) * 0.15 }}
              className=" will-change-[opacity,transform]"
            >
              <Link
                href={`${worksIndexPath}/${project.slug}`}
                scroll={false}
                data-scroll-card-id={`portfolio-${project.slug}`}
                data-works-project={project.slug}
                className="group relative block overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] [contain:layout_paint_style]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    loading="lazy"
                    decoding="async"
                    quality={72}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-end gap-5 p-5 md:p-7">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0000FF] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
