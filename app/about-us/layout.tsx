import type { ReactNode } from "react";
import AboutScrollReset from "./AboutScrollReset";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AboutScrollReset />
      {children}
    </>
  );
}
