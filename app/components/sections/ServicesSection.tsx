"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "../common/Container";
import { servicesData } from "../../data/services";
import { s3Banners } from "../../data/s3Assets.js";
import styles from "./ServicesSection.module.css";

const serviceCardBackground = s3Banners.serviceCard;
const headingWords = ["Creative", "Services"];
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sectionRevealViewport = {
  once: false,
  amount: 0.25,
};

const fadeFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -56,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.25,
      ease: smoothEase,
    },
  },
};

const fadeFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 56,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.25,
      ease: smoothEase,
    },
  },
};

const staggerGroup: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

function StaticHeading() {
  return (
    <h2
      className={`${styles.servicesHeading} font-medium leading-[1.05] text-[#EDEDED]`}
    >
      <span className="block pb-[0.08em]">
        {headingWords.map((word) => (
          <span
            key={word}
            className="mr-[0.18em] inline-block"
          >
            {word}
          </span>
        ))}
      </span>
    </h2>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      data-scroll-section-id="services"
      className="relative z-10 bg-[#050505] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden border-t border-white/5"
    >
      <Container>
        <div
          className="mb-[25px] grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-8"
        >
          <motion.div 
            className="md:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={sectionRevealViewport}
            variants={fadeFromLeft}
          >
            <p className="text-[#0000FF] uppercase text-[12px] md:text-[13px] lg:text-[14px] tracking-[0.12em] mb-1 flex items-center gap-2">
              <span className="w-[30px] h-[1px] bg-[#0000FF]"></span>WHAT WE DO
            </p>
            <StaticHeading />
          </motion.div>

          <motion.div 
            className="md:col-span-4 md:col-start-9 flex flex-col items-end justify-end"
            initial="hidden"
            whileInView="visible"
            viewport={sectionRevealViewport}
            variants={fadeFromRight}
          >
           
          </motion.div>
        </div>

        {/* --- SERVICES GRID --- */}
        <motion.div
          id="service-grid"
          data-scroll-section-id="service-grid"
          className={`${styles.servicesGrid} gap-4 md:gap-5 lg:gap-6`}
          initial="hidden"
          whileInView="visible"
          viewport={sectionRevealViewport}
          variants={staggerGroup}
        >
          {servicesData.map((service) => {
            const Icon = service.icon;
            const cardVariants = Number(service.id) % 2 === 0 ? fadeFromRight : fadeFromLeft;
            
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
              >
                <Link
                  href={service.link}
                  scroll={false}
                  data-scroll-card-id={`service-${service.id}`}
                  data-home-service-card={service.link}
                  className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[16px] border border-white/10 p-5 transition-colors duration-500 hover:border-white/25 sm:min-h-[340px] sm:p-6 md:min-h-[360px] md:rounded-[20px] md:p-8 lg:min-h-[380px] lg:p-10"
                >
                  <img
                    src={serviceCardBackground}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                    className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-500 group-hover:opacity-90" />

                  <div className="pointer-events-none absolute -top-[150px] left-1/2 z-[2] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/20 opacity-0 blur-[80px] transition-all duration-700 group-hover:translate-y-8 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-4 flex flex-col gap-4 md:gap-5 lg:gap-6">
                      <span className="text-base font-medium text-white md:text-lg">
                        {service.id}
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-md border border-white/30 transition-colors duration-500 group-hover:border-white/70 group-hover:bg-white/10 md:h-12 md:w-12">
                        <Icon className="text-white" size={20} strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="mb-2 text-lg font-medium text-white md:text-xl">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-[14px] leading-[1.45] text-white/75 md:text-[15px] lg:text-[16px]">
                      {service.description}
                    </p>
                  </div>

                  <span className="relative z-10 mt-auto flex w-max items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-white/75 transition-colors duration-300 group-hover:text-white">
                    Explore
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
