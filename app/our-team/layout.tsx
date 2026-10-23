import type { ReactNode } from "react";
import TeamScrollReset from "./TeamScrollReset";

export default function TeamLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TeamScrollReset />
      {children}
    </>
  );
}
