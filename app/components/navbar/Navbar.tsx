"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import Container from "../common/Container";
import Button from "../common/Button";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";

export type NavItem = {
  label: string;
  href: string;
  activePaths?: string[];
};

const navItems: NavItem[] = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services", activePaths: ["/services", "/service"] },
  { label: "About", href: "/about", activePaths: ["/about", "/about-us"] },
  { label: "Team", href: "/team", activePaths: ["/team", "/our-team"] },
  { label: "Contact", href: "/contact", activePaths: ["/contact", "/contact-us"] },
];

const isNavItemActive = (path: string, item: NavItem) => {
  const paths = item.activePaths ?? [item.href];

  return paths.some((activePath) => {
    return path === activePath || path.startsWith(`${activePath}/`);
  });
};

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTransparent, setIsTransparent] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const lastScrollYRef = useRef(0);
  const animationFrameRef = useRef(0);
  const transparentSectionBoundsRef = useRef<Array<{ top: number; bottom: number }>>([]);
  const navbarStateRef = useRef({
    hasScrolled: false,
    isTransparent: false,
    isVisible: true,
  });
  const activePath = pendingHref ?? pathname;

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setPendingHref(null);
      setIsOpen(false);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const measureTransparentSections = () => {
      transparentSectionBoundsRef.current = Array.from(
        document.querySelectorAll<HTMLElement>("[data-navbar-transparent]")
      ).map((section) => {
        const rect = section.getBoundingClientRect();
        const top = rect.top + window.scrollY;

        return {
          top,
          bottom: top + rect.height,
        };
      });
    };

    const updateNavbarState = () => {
      animationFrameRef.current = 0;

      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollYRef.current;
      const nearTop = currentScrollY < 12;
      const stickyActive = currentScrollY > 12;
      const navProbeY = currentScrollY + 96;
      const transparentSection = transparentSectionBoundsRef.current.some(
        ({ top, bottom }) => navProbeY >= top && navProbeY <= bottom,
      );
      const nextState = {
        hasScrolled: stickyActive,
        isTransparent: nearTop || (transparentSection && !stickyActive),
        isVisible: nearTop || scrollingUp || transparentSection,
      };
      const previousState = navbarStateRef.current;

      if (previousState.hasScrolled !== nextState.hasScrolled) {
        setHasScrolled(nextState.hasScrolled);
      }

      if (previousState.isTransparent !== nextState.isTransparent) {
        setIsTransparent(nextState.isTransparent);
      }

      if (previousState.isVisible !== nextState.isVisible) {
        setIsVisible(nextState.isVisible);
      }

      navbarStateRef.current = nextState;
      lastScrollYRef.current = currentScrollY;
    };

    const requestNavbarUpdate = () => {
      if (animationFrameRef.current) return;

      animationFrameRef.current = window.requestAnimationFrame(updateNavbarState);
    };

    const onScroll = () => {
      requestNavbarUpdate();
    };

    const onResize = () => {
      measureTransparentSections();
      requestNavbarUpdate();
    };

    measureTransparentSections();
    updateNavbarState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full rounded-none border-b transition-[background-color,backdrop-filter,border-color,box-shadow,transform] duration-500 ease-out ${
          isTransparent
            ? "border-transparent bg-transparent shadow-none backdrop-blur-0"
            : "border-white/10 bg-black/72 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
        } ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Container
          className={`flex items-center justify-between transition-[padding] duration-500 ease-out ${
            hasScrolled ? "py-4" : "py-6"
          }`}
        >
          
          <Link
            href="/"
            aria-label="Adverto home"
            className="inline-block transition hover:opacity-90"
          >
            <img
              src="/main-logo.svg"
              alt="Adverto"
              width={128}
              height={32}
              loading="lazy"
              decoding="async"
              className="h-6 w-auto md:h-8"
            />
          </Link>

          <div className="flex items-center gap-6 ml-auto">
            {/* Desktop Nav */}
            <nav className="hidden items-center gap-[20px] md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  isActive={isNavItemActive(activePath, item)}
                  onNavigate={() => setPendingHref(item.href)}
                />
              ))}
            </nav>

            {/* Right */}
            <div className="hidden md:block">
              <Button href="/contact">Start a Project</Button>
            </div>

            {/* Mobile Button */}
            <button className="text-white md:hidden" onClick={() => setIsOpen(true)}>
              <Menu size={30} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navItems={navItems}
        activePath={activePath}
        onNavigate={setPendingHref}
      />
    </>
  );
}
