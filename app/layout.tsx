import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppShell from "./components/AppShell";
import CookieProvider from "./components/Cookie/CookieProvider";

export const metadata: Metadata = {
  title: {
    default: "Adverto | Creative Advertising Agency",
    template: "%s | Adverto",
  },
  description:
    "Adverto is a creative advertising agency building brands, campaigns, films, and social media experiences for ambitious businesses.",
  icons: {
    icon: "/main_icon-02.svg",
    shortcut: "/main_icon-02.svg",
    apple: "/main_icon-02.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/CreatoDisplay-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/CreatoDisplay-Medium.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/CreatoDisplay-Bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/CreatoDisplay-RegularItalic.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="relative overflow-x-hidden bg-black text-white">
        <CookieProvider>
          <AppShell>{children}</AppShell>
        </CookieProvider>
      </body>
    </html>
  );
}
