"use client";

import { s3Banners } from "../../data/s3Assets.js";

export default function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 hero-background"
        style={{ backgroundImage: `url("${s3Banners.squadHero}")` }}
      />
      <div className="absolute inset-0 hero-overlay" />

      <style jsx>{`
        .hero-background {
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .hero-overlay {
          background:
            radial-gradient(ellipse at center, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.48)),
            linear-gradient(180deg, rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.18) 45%, rgba(0, 0, 0, 0.56));
        }
      `}</style>
    </div>
  );
}
