import type { Metadata } from "next";
import Container from "../components/common/Container";
import InnerBannerHeading from "../components/common/InnerBannerHeading";

export const metadata: Metadata = {
  title: "Terms & Conditions | Adverto",
  description:
    "Review the terms and conditions for using the Adverto website and working with our creative services.",
};

const termsSections = [
  {
    title: "Use Of This Website",
    body: [
      "By accessing or using this website, you agree to these Terms & Conditions. If you do not agree with these terms, please do not use the website.",
      "You agree to use this website only for lawful purposes and in a way that does not interfere with its security, performance, availability, or use by others.",
    ],
  },
  {
    title: "Service Enquiries",
    body: [
      "Information submitted through forms, email, calls, or other communication channels is used to understand your requirements and respond to your enquiry.",
      "Submitting an enquiry does not create a client relationship, service agreement, or obligation until a written proposal, scope, quotation, or contract is accepted by both parties.",
    ],
  },
  {
    title: "Project Scope And Deliverables",
    body: [
      "Project timelines, deliverables, revisions, fees, usage rights, and payment schedules will be defined in the agreed proposal, invoice, statement of work, or contract.",
      "Any work requested beyond the agreed scope may require additional fees, revised timelines, or a separate approval before implementation.",
    ],
  },
  {
    title: "Payments And Approvals",
    body: [
      "Payment terms will be shared before work begins. Delays in payment, content delivery, approvals, or feedback may affect project timelines.",
      "Final files, campaign assets, or launch support may be withheld until outstanding payments or agreed project milestones are completed.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "Unless otherwise agreed in writing, Adverto retains ownership of concepts, drafts, source files, templates, processes, and unused creative directions created during a project.",
      "Client usage rights for approved final deliverables are granted according to the agreed project terms after required payments are completed.",
    ],
  },
  {
    title: "Website Content",
    body: [
      "All text, visuals, layouts, graphics, branding, and other content on this website are owned by or licensed to Adverto unless stated otherwise.",
      "You may not copy, reproduce, distribute, modify, or reuse website content for commercial purposes without written permission.",
    ],
  },
  {
    title: "Third-Party Links And Tools",
    body: [
      "This website may contain links to third-party websites, platforms, or tools. We are not responsible for their content, policies, availability, or practices.",
      "Use of third-party platforms may be subject to separate terms and privacy policies provided by those platforms.",
    ],
  },
  {
    title: "Limitation Of Liability",
    body: [
      "We aim to keep website information accurate and available, but we do not guarantee that the website will always be error-free, uninterrupted, or fully up to date.",
      "To the extent permitted by law, Adverto is not liable for indirect, incidental, or consequential losses arising from website use or reliance on website content.",
    ],
  },
  {
    title: "Updates To These Terms",
    body: [
      "We may update these Terms & Conditions from time to time. The latest version will be posted on this page.",
      "For questions about these terms, contact us at connectadvertoads@gmail.com.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <section className="relative bg-[#050505] pt-32 pb-24 text-white md:pt-40 md:pb-32">
      <Container>
        <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
              <span className="h-[1px] w-[30px] bg-[#0000FF]" />
              Terms &amp; Conditions
            </p>
            <InnerBannerHeading text="Website And Service Terms" />
          </div>
          <div className="flex items-end md:col-span-4">
            <p className="max-w-[360px] text-[16px] leading-[1.5] text-white/50 md:text-right">
              Last updated: June 25, 2026
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-[20px] border border-white/10 bg-[#0A0A0A] p-6">
              <InnerBannerHeading
                as="h2"
                text="Adverto"
                variant="custom"
                className="mb-4 text-2xl font-medium text-[#EDEDED]"
              />
              <p className="text-[15px] leading-[1.6] text-white/50">
                These terms outline the basic conditions for using our website
                and engaging with Adverto for branding, advertising, video, and
                creative services.
              </p>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-8">
            {termsSections.map((section) => (
              <article
                key={section.title}
                className="rounded-[20px] border border-white/10 bg-[#0A0A0A] p-6 md:p-8"
              >
                <InnerBannerHeading
                  as="h2"
                  text={section.title}
                  variant="custom"
                  className="mb-4 text-2xl font-medium text-[#EDEDED] md:text-3xl"
                />
                <div className="space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[15px] leading-[1.7] text-white/55 md:text-[16px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
