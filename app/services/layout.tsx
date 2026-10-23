import type { ReactNode } from "react";
import ServiceDetailsScrollReset from "./_components/ServiceDetailsScrollReset";

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ServiceDetailsScrollReset />
      {children}
    </>
  );
}
