import PortfolioPageContent from "./PortfolioPageContent";
import { portfolioPageProjects } from "../data/portfolio";

export default function PortfolioPage() {
  return <PortfolioPageContent projects={portfolioPageProjects} />;
}
