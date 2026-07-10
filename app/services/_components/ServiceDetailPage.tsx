import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import InnerBannerHeading from "../../components/common/InnerBannerHeading";
import Reveal from "../../components/common/Reveal";
import { serviceDetails, type ServiceSlug } from "../serviceDetails";
import ServiceDetailBackLink from "./ServiceDetailBackLink";
import ServiceDetailScrollReset from "./ServiceDetailScrollReset";

type ServiceDetailPageProps = {
  slug: ServiceSlug;
};

const serviceOrder = Object.keys(serviceDetails) as ServiceSlug[];

export default function ServiceDetailPage({ slug }: ServiceDetailPageProps) {
  const service = serviceDetails[slug];

  return (
    <main className="relative overflow-x-hidden bg-black text-white">
      <ServiceDetailScrollReset slug={slug} />
      <section
        className="relative flex min-h-[680px] items-end overflow-hidden border-b border-white/5 pb-12 pt-32 md:pb-16 min-[1320px]:min-h-[100vh]"
        data-navbar-transparent
      >
        <div aria-hidden className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#030303]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute right-[-16%] top-[-20%] h-[620px] w-[620px] rounded-full bg-[#0000FF]/25 blur-[130px]" />
          <div className="absolute bottom-[-24%] left-[-10%] h-[520px] w-[520px] rounded-full bg-white/8 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,255,0.18),transparent_44%),linear-gradient(180deg,rgba(0,0,0,0.08)_0%,#000_100%)]" />
        </div>

        <Container className="relative z-10">
          <ServiceDetailBackLink />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal
              className="lg:col-span-12"
              x={-56}
              y={0}
              once={false}
              waitForPageTransition
            >
              <p className="mb-4 flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-[#0000FF] sm:text-[13px]">
                <span className="h-[1px] w-[34px] bg-[#0000FF]" />
                {service.eyebrow}
              </p>
              <InnerBannerHeading
                text={service.title}
                highlightPrefix={service.id}
                className="max-w-[960px]"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative z-10 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:items-start">
            <div className="xl:col-span-8">
              <Reveal y={36} amount={0.08} once waitForPageTransition>
                <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-black">
                <div className="relative border-b border-white/10 p-5 md:p-8">
                  <div className="mb-10 flex items-start justify-between gap-8">
                    <Reveal
                      x={-40}
                      y={0}
                      amount={0.2}
                      once={false}
                      waitForPageTransition
                    >
                      <p className="mb-4 flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-[#0000FF]">
                        <span className="h-[1px] w-[34px] bg-[#0000FF]" />
                        Service Scope
                      </p>
                      <InnerBannerHeading
                        as="h2"
                        text="What's included in this service."
                        variant="custom"
                        className="max-w-[620px] text-[38px] font-medium leading-[0.96] tracking-[-0.035em] text-[#F5F5F5] sm:text-[44px] md:text-[54px] lg:text-[62px] xl:text-[72px]"
                      />
                    </Reveal>
                    <span className="hidden text-[54px] font-medium leading-none text-white/[0.06] md:block xl:text-[64px]">
                      {service.id}
                    </span>
                  </div>

                  <Reveal y={24} amount={0.3} once={false} waitForPageTransition>
                    <p className="max-w-[680px] text-[15px] leading-[1.6] text-white/55 md:text-[16px] xl:text-[17px]">
                      Each item is shaped around the business goal, then connected
                      into a clear system for brand, campaign, content, or growth.
                    </p>
                  </Reveal>
                </div>

                <div className="relative grid grid-cols-1 gap-[1px] bg-white/10 md:grid-cols-2">
                  {service.items.map((item, index) => (
                    <Reveal
                      key={item}
                      delay={index * 0.045}
                      duration={0.55}
                      y={28}
                      amount={0.12}
                      once
                      waitForPageTransition
                    >
                      <div className="group min-h-[180px] bg-black p-5 transition-colors duration-300 hover:bg-[#050505] md:p-7">
                        <div className="mb-10 flex items-center justify-between gap-6">
                          <span className="text-[13px] uppercase tracking-[0.16em] text-white/22 transition-colors duration-300 group-hover:text-[#0000FF]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#0000FF] transition-colors duration-300 group-hover:border-[#0000FF] group-hover:bg-[#0000FF] group-hover:text-white">
                            <Check size={16} strokeWidth={2} />
                          </span>
                        </div>
                        <InnerBannerHeading
                          as="h3"
                          text={item}
                          variant="custom"
                          className="text-[23px] font-medium leading-[1.05] tracking-[-0.025em] text-white/86 md:text-[28px] xl:text-[32px]"
                        />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              </Reveal>
            </div>

            <aside className="xl:sticky xl:top-28 xl:col-span-4 xl:self-start">
              <Reveal x={40} y={0} amount={0.08} once waitForPageTransition>
                <div className="rounded-[20px] border border-white/10 bg-[#080808] p-5 md:p-8">
                <div className="mb-8 flex items-start justify-between gap-6">
                  <div>
                    <p className="mb-2 text-[12px] uppercase tracking-[0.18em] text-white/35">
                      Current Service
                    </p>
                    <InnerBannerHeading
                      as="h3"
                      text={service.title}
                      variant="custom"
                      className="text-[30px] font-medium leading-none tracking-[-0.03em] text-white md:text-[36px] xl:text-[42px]"
                    />
                  </div>
                  <Link
                    href="/contact-us"
                    aria-label={`Start ${service.title} project`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#0000FF] text-[#0000FF] transition-colors hover:bg-[#0000FF] hover:text-white"
                  >
                    <ArrowUpRight size={22} strokeWidth={1.7} />
                  </Link>
                </div>

                <p className="mb-8 text-[16px] leading-[1.6] text-white/58">
                  Need this as a standalone service or part of a larger campaign
                  system? We can shape the scope around your goals.
                </p>

                <Button href="/contact-us" className="w-full">
                  Start a Project
                </Button>

                <div className="mt-10 border-t border-white/10 pt-6">
                  <p className="mb-4 text-[12px] uppercase tracking-[0.18em] text-white/35">
                    All Services
                  </p>
                  <div className="space-y-2">
                    {serviceOrder.map((serviceSlug) => {
                      const navService = serviceDetails[serviceSlug];
                      const isActive = serviceSlug === slug;

                      return (
                        <Link
                          key={serviceSlug}
                          href={`/services/${serviceSlug}`}
                          className={`flex items-center justify-between gap-4 rounded-[20px] border px-4 py-3 text-[15px] transition-colors ${
                            isActive
                              ? "border-[#0000FF] bg-[#0000FF] text-white"
                              : "border-white/10 bg-white/[0.03] text-white/58 hover:border-[#0000FF]/60 hover:text-white"
                          }`}
                        >
                          <span>
                            {navService.id} {navService.title}
                          </span>
                          <ArrowUpRight size={16} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
