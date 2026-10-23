"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import Container from "../common/Container";
import Button from "../common/Button";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import { beginForwardNavigation } from "../common/scrollRestoration";

export type NavItem = {
  label: string;
  href: string;
  activePaths?: string[];
};

const navItems: NavItem[] = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/service", activePaths: ["/services", "/service"] },
  { label: "About", href: "/about-us", activePaths: ["/about", "/about-us"] },
  { label: "Team", href: "/our-team", activePaths: ["/team", "/our-team"] },
  { label: "Contact", href: "/contact-us", activePaths: ["/contact", "/contact-us"] },
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
  
  const [disableTransition, setDisableTransition] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  const lastScrollYRef = useRef(0);
  // NEW: Keep track of the scroll direction persistently to avoid micro-bounces
  const isScrollingUpRef = useRef(true);
  const animationFrameRef = useRef(0);
  const transparentSectionBoundsRef = useRef<Array<{ top: number; bottom: number }>>([]);
  const navbarStateRef = useRef({
    hasScrolled: false,
    isTransparent: false,
    isVisible: true,
  });
  const activePath = pendingHref ?? pathname;

  const handleNavigation = (href: string) => {
    setPendingHref(href);
    beginForwardNavigation();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.__advertoPreloaderComplete) {
        const frameId = window.requestAnimationFrame(() => {
          setIsAppReady(true);
        });
        return () => window.cancelAnimationFrame(frameId);
      } else {
        const handleReady = () => setIsAppReady(true);
        window.addEventListener("adverto:preloader-complete", handleReady, { once: true });
        return () => window.removeEventListener("adverto:preloader-complete", handleReady);
      }
    }
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setDisableTransition(true);
      setPendingHref(null);
      setIsOpen(false);
    });
    const transitionTimer = setTimeout(() => {
      setDisableTransition(false);
    }, 100);

    return () => {
      clearTimeout(transitionTimer);
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
      const delta = currentScrollY - lastScrollYRef.current;

      // FIX: Only register a direction change if the user scrolled more than 4px
      // This prevents the navbar from bouncing due to Lenis settling or trackpad momentum
      if (Math.abs(delta) > 4) {
        isScrollingUpRef.current = delta < 0;
      }
      
      const scrollingUp = isScrollingUpRef.current;
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
        data-lenis-prevent 
        className={`fixed left-0 top-0 z-50 w-full rounded-none transition-all duration-700 ease-out ${
          !isAppReady 
            ? "-translate-y-4 opacity-0" 
            : !isVisible 
              ? "-translate-y-full opacity-100" 
              : "translate-y-0 opacity-100"
        }`}
      >
        <div 
          className={`absolute inset-0 pointer-events-none border-b border-white/10 bg-black/95 shadow-[0_18px_60px_rgba(0,0,0,0.28)] md:bg-black/72 md:backdrop-blur-xl ease-out ${
            disableTransition ? "transition-none" : "transition-opacity duration-500"
          } ${isTransparent ? "opacity-0" : "opacity-100"}`}
          aria-hidden="true"
        />

        <Container
          className={`relative z-10 flex items-center justify-between transition-[padding] ease-out ${
            disableTransition ? "duration-0" : "duration-500"
          } ${
            hasScrolled ? "py-4" : "py-6"
          }`}
        >
          
          <Link
            href="/"
            aria-label="Adverto home"
            className="inline-block transition hover:opacity-90"
          >
            <Image
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
            <nav className="hidden items-center gap-[20px] md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  isActive={isNavItemActive(activePath, item)}
                  onNavigate={() => handleNavigation(item.href)}
                />
              ))}
            </nav>

            <div className="hidden md:block">
              <Button href="/contact-us">Start a Project</Button>
            </div>

            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
              className="touch-manipulation text-white md:hidden"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={30} />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navItems={navItems}
        activePath={activePath}
        onNavigate={handleNavigation}
      />
    </>
  );
}
