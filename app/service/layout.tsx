import type { ReactNode } from "react";
import ServiceScrollReset from "./ServiceScrollReset";

export default function ServiceLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ServiceScrollReset />
      {children}
    </>
  );
}
