import Cookies from "js-cookie";

export const COOKIE_CONSENT_NAME = "adverto_cookie_consent";
export const COOKIE_CONSENT_EXPIRES_DAYS = 180;

export type CookieConsent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  updatedAt: string;
};

export type CookiePreferences = Pick<
  CookieConsent,
  "analytics" | "marketing" | "preferences"
>;

const cookieOptions: Cookies.CookieAttributes = {
  expires: COOKIE_CONSENT_EXPIRES_DAYS,
  sameSite: "Lax",
};

export const defaultPreferences: CookiePreferences = {
  analytics: false,
  marketing: false,
  preferences: false,
};

export const createConsent = (
  preferences: CookiePreferences,
): CookieConsent => ({
  essential: true,
  analytics: preferences.analytics,
  marketing: preferences.marketing,
  preferences: preferences.preferences,
  updatedAt: new Date().toISOString(),
});

export const getConsentCookie = (): CookieConsent | null => {
  const value = Cookies.get(COOKIE_CONSENT_NAME);

  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<CookieConsent>;

    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      preferences: Boolean(parsed.preferences),
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date().toISOString(),
    };
  } catch {
    return null;
  }
};

export const setConsentCookie = (consent: CookieConsent) => {
  Cookies.set(COOKIE_CONSENT_NAME, JSON.stringify(consent), cookieOptions);
};
