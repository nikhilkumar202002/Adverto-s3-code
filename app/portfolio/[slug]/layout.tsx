import type { ReactNode } from "react";
import PortfolioProjectRouteReset from "./PortfolioProjectRouteReset";

export default function PortfolioProjectLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <PortfolioProjectRouteReset />
      {children}
    </>
  );
}
