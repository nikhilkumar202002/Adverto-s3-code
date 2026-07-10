"use client";

import Link from "next/link";
import Button from "../common/Button";
import Container from "../common/Container";

type IconProps = {
  size?: number;
  className?: string;
};

const Behance = ({ size = 18, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
  </svg>
);

const Instagram = ({ size = 18, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const Facebook = ({ size = 18, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.5c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.1h-1.07c-1.05 0-1.37.65-1.37 1.32v1.58h2.33l-.37 2.9h-1.96v7A10 10 0 0022 12z" />
  </svg>
);

const LinkedIn = ({ size = 18, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M4.98 3.5c0 1.38-1.11 2.5-2.49 2.5S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.5 8h4v15h-4V8zm7.5 0h3.84v2.05h.05c.53-1 1.84-2.05 3.79-2.05 4.06 0 4.82 2.67 4.82 6.14V23h-4v-7.85c0-1.87-.03-4.28-2.61-4.28-2.61 0-3.01 2.04-3.01 4.15V23h-4V8z" />
  </svg>
);

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/adverto.india?",
    content: <Facebook size={17} />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/adverto.india?igsh=M3d0cndoMnoxbWl1&utm_source=qr",
    content: <Instagram size={17} />,
  },
  {
    label: "Behance",
    href: "https://www.behance.net/advertocompany2025",
    content: <Behance size={18} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adverto-company-b33990363?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    content: <LinkedIn size={17} />,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 overflow-hidden bg-black text-white">
      <Container className="relative z-10 flex min-h-[520px] flex-col justify-between py-10 md:min-h-[620px] min-[1301px]:min-h-[640px]">
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <h2 className="text-[clamp(52px,18vw,92px)] font-semibold leading-[0.82] tracking-normal text-[#f4f3ef] md:text-[clamp(86px,14vw,150px)] md:leading-[0.8] min-[1301px]:text-[clamp(130px,17vw,300px)] min-[1301px]:leading-[0.78]">
            Let<span className="text-[#0000FF]">&apos;</span>s Talk
          </h2>

          <Button href="/contact" className="mt-8 md:mt-12 min-[1301px]:mt-20">
            Contact Us
          </Button>
        </div>

    

        <div className="grid items-center gap-4 pb-1 text-[13px] text-white/60 md:text-[14px] lg:grid-cols-3 lg:gap-6 lg:text-[15px]">
          <p className="text-center lg:text-left">
            Adverto © {currentYear} All rights reserved
          </p>

          <nav
            className="flex flex-wrap items-center justify-center gap-4 text-white/55 md:gap-5"
            aria-label="Social links"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noreferrer"
                className="flex h-6 min-w-4 items-center justify-center text-[18px] font-semibold leading-none transition-colors duration-300 hover:text-white"
              >
                {social.content}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end lg:gap-5">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span className="text-white/25">|</span>
            <Link href="/terms-and-conditions" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
