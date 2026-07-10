"use client";

import type { CookieConsent } from "../components/Cookie/cookieStore";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

let analyticsLoaded = false;
let marketingLoaded = false;

const appendScript = (id: string, src: string) => {
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
};

const appendInlineScript = (id: string, content: string) => {
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.id = id;
  script.textContent = content;
  document.head.appendChild(script);
};

const loadGoogleAnalytics = () => {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  appendScript(
    "adverto-google-analytics",
    `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
  );
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
};

const loadMicrosoftClarity = () => {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  if (!clarityId) return;

  appendInlineScript(
    "adverto-microsoft-clarity",
    `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`,
  );
};

const loadMetaPixel = () => {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (!pixelId) return;

  appendInlineScript(
    "adverto-meta-pixel",
    `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","${pixelId}");fbq("track","PageView");`,
  );
};

export const loadAnalyticsScripts = (consent: CookieConsent) => {
  if (typeof window === "undefined") return;

  if (consent.analytics && !analyticsLoaded) {
    analyticsLoaded = true;
    loadGoogleAnalytics();
    loadMicrosoftClarity();
  }

  if (consent.marketing && !marketingLoaded) {
    marketingLoaded = true;
    loadMetaPixel();
  }
};
