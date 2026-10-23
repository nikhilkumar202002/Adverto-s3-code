import PortfolioPageContent from "./PortfolioPageContent";
import { portfolioPageProjects } from "../data/portfolio";
import PortfolioIndexScrollReset from "./PortfolioIndexScrollReset";

export default function PortfolioPage() {
  return (
    <>
      <PortfolioIndexScrollReset />
      <PortfolioPageContent projects={portfolioPageProjects} />
    </>
  );
}
