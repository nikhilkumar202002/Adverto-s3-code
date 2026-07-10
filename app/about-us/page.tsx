import type { Metadata } from "next";
import Container from "../components/common/Container";
import AboutScrolling from "../components/sections/AboutScrolling";
import ClientLogo from "../components/sections/ClientLogo";
import FeaturedWorksSlider from "../components/sections/FeaturedWorksSlider";
import HowItsWork from "../components/sections/HowItsWork";
import AboutHeroTitle from "./AboutHeroTitle";

export const metadata: Metadata = {
  title: "About Adverto | Creative Advertising Agency",
  description:
    "Learn about Adverto Ads, a Kerala-based creative agency building brands, campaigns, films, and social content for ambitious businesses.",
};

const backgroundSquares = [
  "#000000",
  "#07000c",
  "#020417",
  "#030720",
  "#061035",
  "#071849",
  "#082464",
  "#0a2f73",
  "#17034e",
  "#160854",
  "#170a5e",
  "#180b65",
  "#1a0d70",
  "#1a0f78",
  "#171085",
  "#13108f",
  "#15158a",
  "#171894",
  "#1518a2",
  "#1518ab",
  "#1218b7",
  "#1218c4",
  "#1018cf",
  "#0f18d8",
  "#1114d0",
  "#1115d7",
  "#1116df",
  "#1417e6",
  "#1518ed",
  "#1519f1",
  "#1519f7",
  "#141aff",
  "#1215f2",
  "#1115f5",
  "#1014fa",
  "#1114ff",
  "#1819ff",
  "#2423ff",
  "#302cff",
  "#3a35ff",
];

export default function AboutUsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-white">
      <section
        id="hero"
        data-scroll-section-id="hero"
        className="relative flex min-h-[680px] items-end overflow-hidden border-b border-white/5 pb-[40px] min-[1320px]:min-h-[100vh]"
        data-navbar-transparent
      >
        <div
          aria-hidden
          className="absolute inset-0 z-0 grid grid-cols-4 grid-rows-10 bg-black sm:grid-cols-8 sm:grid-rows-5"
        >
          {backgroundSquares.map((color, index) => (
            <span
              key={`${color}-${index}`}
              className="block h-full w-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(3,3,3,0.35)_0%,rgba(3,3,3,0.02)_42%,rgba(3,3,3,0.72)_100%)]"
        />

        <Container className="relative z-10">
          <AboutHeroTitle />
        </Container>
      </section>
      <AboutScrolling />
      <HowItsWork waitForPageTransition />
      <FeaturedWorksSlider waitForPageTransition />
      <ClientLogo waitForPageTransition />
    </main>
  );
}
