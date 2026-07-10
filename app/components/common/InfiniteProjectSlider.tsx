"use client";

import Image from "next/image";
import Link from "next/link";
import { moreProjects } from "../../data/moreProjects";

interface Project {
  id: number | string;
  slug?: string;
  title: string;
  subtitle: string;
  image: string;
}

interface InfiniteProjectSliderProps {
  projects?: Project[];
}

export const moreProjectsDataset = moreProjects as Project[];

export default function InfiniteProjectSlider({
  projects = moreProjectsDataset,
}: InfiniteProjectSliderProps) {
  const sliderProjects = projects.length > 0 ? projects : moreProjectsDataset;

  return (
    <div
      id="featured-projects"
      data-scroll-section-id="featured-projects"
      data-scroll-slider-id="home-projects"
      className="project-marquee w-full overflow-hidden"
    >
      <div className="mb-4 flex items-center justify-between pl-1.5 md:pl-2">
        <p className="text-[#0000FF] uppercase text-[12px] md:text-[14px] tracking-[0.1em] flex items-center gap-3">
          <span className="w-[30px] h-[1px] bg-[#0000FF]" />
          MORE PROJECTS
        </p>

        <Link
          href="/portfolio"
          aria-label="View all projects"
          className="text-[#0000FF] uppercase text-[12px] md:text-[14px] tracking-[0.1em] hover:underline"
        >
          VIEW ALL
        </Link>
      </div>

      <style>{`
        @keyframes image-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        .project-marquee__track {
          animation: image-marquee 52s linear infinite;
          backface-visibility: hidden;
          contain: layout paint;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .project-marquee__card {
          backface-visibility: hidden;
          border-bottom-color: transparent;
          transform: translateZ(0);
        }

        .project-marquee__card:hover {
          border-bottom-color: #0000FF;
        }

        .project-marquee__hover-layer {
          will-change: opacity, transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .project-marquee__track {
            animation: none;
          }
        }
      `}</style>

      <div
        className="project-marquee__track flex w-max items-center"
        data-scroll-slider-track
        data-home-project-track
      >
        {[...Array(2)].map((_, setIndex) => (
          <div key={setIndex} className="flex shrink-0 items-center">
            {sliderProjects.map((project, index) => (
              <Link
                href={`/portfolio/${project.slug || project.id}`}
                scroll
                key={`${setIndex}-${project.id}-${index}`}
                data-cursor-ignore="true"
                data-scroll-card-id={`project-${project.slug || project.id}`}
                data-scroll-slider-card-id={`project-${project.slug || project.id}`}
                data-home-project-card={String(project.slug || project.id)}
                className="project-marquee__card group relative mx-1.5 md:mx-2 h-[142px] w-[210px] sm:h-[160px] sm:w-[232px] md:h-[180px] md:w-[260px] overflow-hidden rounded-[12px] md:rounded-[15px] border border-b-2 border-transparent bg-[#1A1A1A] transition-colors duration-300 ease-out"
              >
                <div className="absolute inset-0 bg-[#0A0A0A] z-0" />

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  decoding="async"
                  loading="lazy"
                  quality={72}
                  sizes="(max-width: 640px) 210px, (max-width: 768px) 232px, 260px"
                  className="relative z-0 rounded-[12px] object-cover md:rounded-[15px]"
                />

                <div className="project-marquee__hover-layer pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-1/2 translate-y-full bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100" />

              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
