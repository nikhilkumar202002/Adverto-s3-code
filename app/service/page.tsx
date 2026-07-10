import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Container from "../components/common/Container";
import InnerBannerHeading from "../components/common/InnerBannerHeading";
import Reveal from "../components/common/Reveal";
import { servicesData } from "../data/services";
import { s3Banners } from "../data/s3Assets.js";
import ServiceCardLink from "./ServiceCardLink";
import ServiceHeroContent from "./ServiceHeroContent";

export const metadata: Metadata = {
  title: "Creative Services | Adverto",
  description:
    "Explore Adverto services across branding, advertising campaigns, video production, and social media management.",
};

export default function ServicePage() {
  return (
    <div className="relative bg-[#050505] text-white">
      <section
        id="hero"
        data-scroll-section-id="hero"
        className="relative flex min-h-[680px] items-end overflow-hidden border-b border-white/5 pb-[40px] min-[1320px]:min-h-[100vh]"
        data-navbar-transparent
      >
        <div aria-hidden className="absolute inset-0 z-0 bg-black">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${s3Banners.servicesHero}")` }}
          />
        </div>

        <Container className="relative z-10">
          <ServiceHeroContent waitForPageTransition />
        </Container>
      </section>

      <section
        id="service-grid"
        data-scroll-section-id="service-grid"
        className="relative z-10 py-16 sm:py-20 md:py-24 lg:py-32"
      >
        <Container>
          <Reveal
            y={28}
            scale={0.92}
            duration={0.9}
            once={false}
            waitForPageTransition
          >
            <div className="mb-[25px] grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-12">
                <p className="mb-2 flex items-center gap-3 text-[12px] uppercase tracking-[0.1em] text-[#0000FF] sm:text-[13px] md:mb-3 md:text-[14px]">
                  <span className="h-[1px] w-[30px] bg-[#0000FF]" />
                  What We Do
                </p>
                <InnerBannerHeading
                  as="h2"
                  text="Services Built Around Outcomes"
                  variant="custom"
                  className="w-full text-[36px] font-medium leading-[1] text-[#EDEDED] sm:text-[44px] md:text-[58px] lg:text-[66px] xl:text-[70px]"
                />
              </div>
              <div className="flex items-end md:col-span-4 md:col-start-9">
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-[20px] gap-y-[20px] md:grid-cols-2 lg:grid-cols-4">
            {servicesData.map((service, index) => {
              const Icon = service.icon;

              return (
                <Reveal
                  key={service.id}
                  delay={index * 0.08}
                  y={36}
                  once={false}
                  waitForPageTransition
                >
                  <article
                    data-scroll-card-id={`service-${service.id}`}
                    className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#0000FF] p-5 pt-28 text-white transition-colors duration-500 hover:border-white/25 hover:bg-[#0000cc] sm:min-h-[390px] sm:p-6 sm:pt-32 md:min-h-[430px] md:p-7 md:pt-36 lg:min-h-[460px] lg:p-8 lg:pt-36 min-[1200px]:pt-0"
                  >
                    <div className="pointer-events-none absolute -top-[150px] left-1/2 z-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/20 opacity-0 blur-[80px] transition-all duration-700 group-hover:translate-y-8 group-hover:opacity-100" />

                    <div className="absolute right-5 top-5 z-10 text-[32px] font-medium leading-none text-white/20 transition-colors duration-500 group-hover:text-white/35 sm:right-6 sm:top-6 sm:text-[38px] md:right-7 md:top-7 md:text-[42px] lg:right-8 lg:top-8">
                      {service.id}
                    </div>

                    <div className="absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-colors duration-500 group-hover:border-white/60 group-hover:bg-white/10 sm:left-6 sm:top-6 sm:h-11 sm:w-11 md:left-7 md:top-7 md:h-12 md:w-12 lg:left-8 lg:top-8">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>

                    <div className="relative z-10 mt-auto mb-4 transition-transform duration-500 ease-out min-[1200px]:absolute min-[1200px]:inset-x-8 min-[1200px]:bottom-8 min-[1200px]:mb-0 min-[1200px]:mt-0 min-[1200px]:group-hover:-translate-y-[170px]">
                      <InnerBannerHeading
                        as="h3"
                        text={service.title}
                        variant="custom"
                        className="text-[22px] font-medium leading-tight text-white sm:text-[24px] md:text-[26px] lg:text-[24px] xl:text-[28px]"
                      />
                    </div>

                    <div className="relative z-10 translate-y-0 opacity-100 transition-all duration-500 ease-out min-[1200px]:absolute min-[1200px]:inset-x-8 min-[1200px]:bottom-8 min-[1200px]:translate-y-6 min-[1200px]:opacity-0 min-[1200px]:group-hover:translate-y-0 min-[1200px]:group-hover:opacity-100">
                      <p className="mb-6 text-[14px] leading-[1.55] text-white/80 sm:text-[15px] md:mb-7 lg:mb-8 lg:text-[14px] xl:text-[16px]">
                        {service.description}
                      </p>
                      <ServiceCardLink
                        href={service.link}
                        cardId={`service-${service.id}`}
                        className="inline-flex items-center gap-2 border-b border-white/35 pb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-white sm:text-[12px]"
                      >
                        Explore Service
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </ServiceCardLink>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
