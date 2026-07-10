"use client";

import { Suspense, type ReactNode } from "react";
import Preloader from "./Preloader/Preloader";
import Navbar from "./navbar/Navbar";
import NoiseOverlay from "./common/NoiseOverlay";
import CustomCursor from "./common/CustomCursor";
import SmoothScroll from "./common/SmoothScroll";
import ScrollTopWhatsapp from "./common/ScrollTopWhatsapp";
import Footer from "./footer/Footer";
import NavigationRestoration from "./common/NavigationRestoration";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll>
        <Suspense fallback={null}>
          <NavigationRestoration />
        </Suspense>
        <NoiseOverlay />
        <CustomCursor />
        <Navbar />
        <main className="relative z-10 min-h-[100svh]">{children}</main>
        <ScrollTopWhatsapp />
        <Footer />
      </SmoothScroll>
      <Preloader />
    </>
  );
}
