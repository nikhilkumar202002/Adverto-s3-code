"use client";

import { useContext } from "react";
import { CookieConsentContext } from "../components/Cookie/CookieProvider";

export default function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error("useCookieConsent must be used within CookieProvider.");
  }

  return context;
}
