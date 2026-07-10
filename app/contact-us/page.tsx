import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
} from "lucide-react";
import Container from "../components/common/Container";
import CustomSelect from "../components/common/CustomSelect";
import InnerBannerHeading from "../components/common/InnerBannerHeading";
import Reveal from "../components/common/Reveal";

export const metadata: Metadata = {
  title: "Contact Adverto | Branding & Creative Agency",
  description:
    "Start a branding, advertising, video production, or social media project with Adverto.",
};

const phoneNumbers = [
  {
    value: "+91 73565 60800",
    href: "tel:+917356560800",
  },
  {
    value: "+91 96052 83348",
    href: "tel:+919605283348",
  },
  {
    value: "+91 97479 12011",
    href: "tel:+919747912011",
  },
];

const contactMethods = [
  {
    label: "Email",
    value: "connectadvertoads@gmail.com",
    href: "mailto:connectadvertoads@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    phoneNumbers,
    icon: Phone,
  },
  {
    label: "Location",
    value: (
      <>
        ADVERTO ADS
        <br />
        SUITE NO: 387B, 5/257A8
        <br />
        Basement Floor, Pallath Square,
        <br />
        FACT Kalamassery Rd,
        <br />
        Kalamassery P.O, Ernakulam - 683104
      </>
    ),
    href: "https://maps.google.com/?q=ADVERTO%20ADS%20SUITE%20NO%20387B%205%2F257A8%20Basement%20Floor%20Pallath%20Square%20FACT%20Kalamassery%20Rd%20Kalamassery%20P.O%20Ernakulam%20683104",
    icon: MapPin,
  },
];

const projectTypes = [
  "Branding",
  "Advertising Campaign",
  "Video Production",
  "Social Media",
  "Website / Digital",
  "Full Launch",
];

const budgetRanges = [
  "Under 50k",
  "Under 1 lakh",
  "1 lakh to 3 lakh",
  "3 lakh to 7 lakh",
  "7 lakh plus",
];

const responseSteps = [
  {
    id: "01",
    title: "Share the brief",
    text: "Tell us what you are building, where it needs to go, and what success should look like.",
  },
  {
    id: "02",
    title: "Align the scope",
    text: "We map the right creative direction, deliverables, timeline, and team for the project.",
  },
  {
    id: "03",
    title: "Start production",
    text: "Once the plan is clear, we move into strategy, design, content, and execution.",
  },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-[#050505] pt-32 pb-24 text-white md:pt-36 md:pb-28 lg:pt-40 lg:pb-32">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <Reveal
            className="md:col-span-8"
            x={-56}
            y={0}
            once={false}
            waitForPageTransition
          >
            <p className="mb-4 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
              <span className="h-[1px] w-[30px] bg-[#0000FF]" />
              Contact Us
            </p>
            <InnerBannerHeading
              text="Your Next Move Starts Here."
              className="max-w-[920px]"
            />
          </Reveal>
          <Reveal
            className="md:col-span-4"
            x={56}
            y={0}
            once={false}
            waitForPageTransition
          >
            <p className="max-w-[380px] text-[16px] leading-[1.45] text-white/55 md:ml-auto">
              Bring us a launch, rebrand, campaign, or content challenge. We
              will shape it into a clear creative plan and production path.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-[20px] md:mt-14 lg:mt-16 lg:grid-cols-12">
          <Reveal
            className="lg:col-span-5"
            x={-40}
            y={0}
            amount={0.08}
            once
            waitForPageTransition
          >
            <div className="grid grid-cols-1 gap-[20px]">
              {contactMethods.map((method) => {
                const Icon = method.icon;

                if ("phoneNumbers" in method) {
                  return (
                    <div
                      key={method.label}
                      className="group flex min-h-[150px] items-start justify-between gap-6 rounded-[20px] border border-white/10 bg-[#0A0A0A] p-6 transition-colors duration-300 hover:border-[#0000FF] hover:bg-[#0f0f0f] md:p-8"
                    >
                      <div>
                        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-[20px] border border-white/10 text-[#0000FF] transition-colors duration-300 group-hover:border-[#0000FF]/50 group-hover:bg-[#0000FF]/10">
                          <Icon size={20} strokeWidth={1.6} />
                        </div>
                        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">
                          {method.label}
                        </p>
                        <div className="flex flex-col items-start gap-1 text-xl font-medium leading-snug text-white">
                          {phoneNumbers.map((number) => (
                            <a
                              key={number.href}
                              href={number.href}
                              className="transition-colors duration-300 hover:text-[#0000FF]"
                            >
                              {number.value}
                            </a>
                          ))}
                        </div>
                      </div>
                      <Phone
                        size={18}
                        className="mt-1 text-white/35 transition-colors duration-300 group-hover:text-white"
                      />
                    </div>
                  );
                }

                return (
                  <Link
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    className="group flex min-h-[150px] items-start justify-between gap-6 rounded-[20px] border border-white/10 bg-[#0A0A0A] p-6 transition-colors duration-300 hover:border-[#0000FF] hover:bg-[#0f0f0f] md:p-8"
                  >
                    <div>
                      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-[20px] border border-white/10 text-[#0000FF] transition-colors duration-300 group-hover:border-[#0000FF]/50 group-hover:bg-[#0000FF]/10">
                        <Icon size={20} strokeWidth={1.6} />
                      </div>
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">
                        {method.label}
                      </p>
                      <p className="text-xl font-medium leading-snug text-white">
                        {method.value}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="mt-1 text-white/35 transition-colors duration-300 group-hover:text-white"
                    />
                  </Link>
                );
              })}

              <div className="rounded-[20px] border border-white/10 bg-[#080808] p-6 md:p-8">
                <div className="mb-8 flex items-center justify-between gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[20px] border border-white/10 text-[#0000FF]">
                    <Clock3 size={20} strokeWidth={1.6} />
                  </div>
                  <p className="text-right text-xs uppercase tracking-[0.18em] text-white/35">
                    Typical response
                  </p>
                </div>
                <p className="text-3xl font-medium leading-none text-[#EDEDED]">
                  Within 24 hours
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal
            className="lg:col-span-7"
            x={40}
            y={0}
            amount={0.08}
            once
            waitForPageTransition
          >
            <div className="grid grid-cols-1 gap-[20px]">
              <div className="rounded-[20px] border border-white/10 bg-[#0A0A0A] p-6 md:p-8">
                <div className="mb-10 flex items-start justify-between gap-6">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#0000FF]">
                      Project Inquiry
                    </p>
                    <InnerBannerHeading
                      as="h2"
                      text="Tell us what you need"
                      variant="custom"
                      className="text-3xl font-medium leading-tight text-[#EDEDED] md:text-4xl"
                    />
                  </div>
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-[20px] border border-white/10 text-[#0000FF] md:flex">
                    <MessageSquareText size={20} strokeWidth={1.6} />
                  </div>
                </div>

                <form
                  action="mailto:connectadvertoads@gmail.com"
                  method="post"
                  encType="text/plain"
                  className="grid grid-cols-1 gap-5 md:grid-cols-2"
                >
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/35">
                      Name
                    </span>
                    <input
                      name="name"
                      type="text"
                      required
                      className="h-14 w-full rounded-[20px] border border-white/10 bg-black/30 px-4 text-[16px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#0000FF]"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/35">
                      Email
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      className="h-14 w-full rounded-[20px] border border-white/10 bg-black/30 px-4 text-[16px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#0000FF]"
                      placeholder="you@example.com"
                    />
                  </label>

                  <CustomSelect
                    label="Service"
                    name="service"
                    placeholder="Select a service"
                    options={projectTypes}
                  />

                  <CustomSelect
                    label="Budget"
                    name="budget"
                    placeholder="Select a range"
                    options={budgetRanges}
                  />

                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/35">
                      Project Details
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={7}
                      className="w-full resize-none rounded-[20px] border border-white/10 bg-black/30 p-4 text-[16px] leading-relaxed text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#0000FF]"
                      placeholder="Tell us about the goal, timeline, audience, and deliverables."
                    />
                  </label>

                  <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
                    <p className="max-w-[420px] text-sm leading-relaxed text-white/40">
                      The form opens your email client with the project details. For
                      direct email, write to connectadvertoads@gmail.com.
                    </p>
                    <button
                      type="submit"
                      className="group inline-flex h-14 items-center justify-center gap-3 rounded-[20px] bg-[#0000FF] px-7 text-[14px] font-medium tracking-wide text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,0,255,0.45)]"
                    >
                      Send Inquiry
                      <Send
                        size={18}
                        strokeWidth={1.8}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3">
                {responseSteps.map((step, index) => (
                  <Reveal
                    key={step.id}
                    delay={index * 0.06}
                    duration={0.55}
                    y={28}
                    amount={0.12}
                    once
                    waitForPageTransition
                  >
                    <div className="flex min-h-[220px] flex-col rounded-[20px] border border-white/10 bg-[#080808] p-6 md:min-h-[240px] md:p-8 lg:min-h-[284px]">
                      <div className="mb-10 flex items-center justify-between gap-5">
                        <span className="text-lg font-medium text-[#0000FF]">
                          {step.id}
                        </span>
                        <BriefcaseBusiness
                          size={20}
                          strokeWidth={1.5}
                          className="text-white/25"
                        />
                      </div>
                      <InnerBannerHeading
                        as="h3"
                        text={step.title}
                        variant="custom"
                        className="mb-3 text-xl font-medium text-[#EDEDED]"
                      />
                      <p className="text-[15px] leading-[1.45] text-white/45">
                        {step.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
