"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { loadAnalyticsScripts } from "../../lib/analytics";
import CookieBanner from "./CookieBanner";
import CookieModal from "./CookieModal";
import {
  createConsent,
  defaultPreferences,
  getConsentCookie,
  setConsentCookie,
  type CookieConsent,
  type CookiePreferences,
} from "./cookieStore";

type CookieConsentContextValue = {
  closeBanner: () => void;
  closeModal: () => void;
  consent: CookieConsent | null;
  isBannerOpen: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  rejectAll: () => void;
  savePreferences: (preferences: CookiePreferences) => void;
  acceptAll: () => void;
};

export const CookieConsentContext =
  createContext<CookieConsentContextValue | null>(null);

export default function CookieProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const persistConsent = useCallback((nextConsent: CookieConsent) => {
    setConsentCookie(nextConsent);
    setConsent(nextConsent);
    loadAnalyticsScripts(nextConsent);
  }, []);

  const acceptAll = useCallback(() => {
    persistConsent(
      createConsent({
        analytics: true,
        marketing: true,
        preferences: true,
      }),
    );
  }, [persistConsent]);

  const rejectAll = useCallback(() => {
    persistConsent(createConsent(defaultPreferences));
  }, [persistConsent]);

  const savePreferences = useCallback(
    (preferences: CookiePreferences) => {
      persistConsent(createConsent(preferences));
    },
    [persistConsent],
  );

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const closeBanner = useCallback(() => {
    setIsBannerOpen(false);
  }, []);

  useEffect(() => {
    let initializeTimer = 0;
    let showBannerTimer = 0;

    const showBanner = () => {
      window.clearTimeout(showBannerTimer);
      showBannerTimer = window.setTimeout(() => {
        setIsBannerOpen(true);
      }, 3000);
    };

    initializeTimer = window.setTimeout(() => {
      const savedConsent = getConsentCookie();

      if (savedConsent) {
        loadAnalyticsScripts(savedConsent);
        setConsent(savedConsent);
        return;
      }

      if (window.__advertoPreloaderComplete) {
        showBanner();
      } else {
        window.addEventListener("adverto:preloader-complete", showBanner, {
          once: true,
        });
      }
    }, 0);

    return () => {
      window.clearTimeout(initializeTimer);
      window.clearTimeout(showBannerTimer);
      window.removeEventListener("adverto:preloader-complete", showBanner);
    };
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      acceptAll,
      closeBanner,
      closeModal,
      consent,
      isBannerOpen,
      isModalOpen,
      openModal,
      rejectAll,
      savePreferences,
    }),
    [
      acceptAll,
      closeBanner,
      closeModal,
      consent,
      isBannerOpen,
      isModalOpen,
      openModal,
      rejectAll,
      savePreferences,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {isBannerOpen ? <CookieBanner /> : null}
      {isModalOpen ? <CookieModal /> : null}
    </CookieConsentContext.Provider>
  );
}
