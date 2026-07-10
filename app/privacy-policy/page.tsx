import type { Metadata } from "next";
import Container from "../components/common/Container";
import InnerBannerHeading from "../components/common/InnerBannerHeading";

export const metadata: Metadata = {
  title: "Privacy Policy | Adverto",
  description:
    "Read how Adverto collects, uses, protects, and manages information shared through our website and service enquiries.",
};

const policySections = [
  {
    title: "Information We Collect",
    body: [
      "We may collect details you choose to share with us, including your name, email address, phone number, company name, project requirements, and messages submitted through our contact forms or direct communication channels.",
      "We may also receive basic technical information such as browser type, device information, pages visited, and approximate location data through analytics or website performance tools.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use your information to respond to enquiries, prepare proposals, manage client communication, deliver requested services, improve our website, and maintain the security and reliability of our digital platforms.",
      "We do not sell your personal information. We only share information when needed to operate our services, comply with legal requirements, or work with trusted service providers who support our business operations.",
    ],
  },
  {
    title: "Cookies And Analytics",
    body: [
      "Our website may use cookies or similar technologies to understand site usage, improve performance, and provide a smoother browsing experience.",
      "You can control or disable cookies through your browser settings. Some parts of the website may not work as expected if cookies are disabled.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "We take reasonable technical and organizational steps to protect the information shared with us against unauthorized access, misuse, loss, or disclosure.",
      "No online transmission or storage system is completely secure, so we cannot guarantee absolute security of information transmitted through the website.",
    ],
  },
  {
    title: "Data Retention",
    body: [
      "We keep personal information only for as long as necessary to respond to enquiries, maintain business records, deliver services, resolve disputes, and meet legal or accounting obligations.",
      "When information is no longer needed, we take reasonable steps to delete, anonymize, or securely archive it.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "You may request access, correction, or deletion of personal information you have shared with us, subject to applicable legal and business record requirements.",
      "To make a request, contact us using the email address listed below.",
    ],
  },
  {
    title: "Contact",
    body: [
      "For privacy-related questions or requests, email us at connectadvertoads@gmail.com.",
      "We may update this Privacy Policy from time to time. The latest version will be posted on this page.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="relative bg-[#050505] pt-32 pb-24 text-white md:pt-40 md:pb-32">
      <Container>
        <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="mb-3 flex items-center gap-3 text-[14px] uppercase tracking-[0.1em] text-[#0000FF]">
              <span className="h-[1px] w-[30px] bg-[#0000FF]" />
              Privacy Policy
            </p>
            <InnerBannerHeading text="How We Handle Your Information" />
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
                This policy explains how we collect and use information when you
                visit our website, contact us, or discuss a project with our
                team.
              </p>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-8">
            {policySections.map((section) => (
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
