import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppShell from "./components/AppShell";
import CookieProvider from "./components/Cookie/CookieProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://advertoads.com"),
  title: {
    default: "Adverto | Creative Advertising Agency",
    template: "%s | Adverto",
  },
  description:
    "Adverto is a creative advertising agency building brands, campaigns, films, and social media experiences for ambitious businesses.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Adverto",
    title: "Adverto | Creative Advertising Agency",
    description:
      "Adverto is a creative advertising agency building brands, campaigns, films, and social media experiences for ambitious businesses.",
    images: [
      {
        url: "/social-share-image.png",
        width: 600,
        height: 328,
        alt: "Adverto Creative Advertising Agency",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adverto | Creative Advertising Agency",
    description:
      "Adverto is a creative advertising agency building brands, campaigns, films, and social media experiences for ambitious businesses.",
    images: ["/social-share-image.png"],
  },
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
  {/* Only preload the 1 or 2 most critical font weights in compressed woff2 format */}
  <link
    rel="preload"
    href="/fonts/CreatoDisplay-Regular.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
  <link
    rel="preload"
    href="/fonts/CreatoDisplay-Bold.woff2"
    as="font"
    type="font/woff2"
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
