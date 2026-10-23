import type { ReactNode } from "react";
import ContactScrollReset from "./ContactScrollReset";

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ContactScrollReset />
      {children}
    </>
  );
}
