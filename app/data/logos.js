import React from "react";
import { s3Logo } from "./s3Assets.js";

function ImageLogo({ src, alt = "logo", size = 48, className = "", ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={className}
      style={{ objectFit: "contain" }}
      {...props}
    />
  );
}

const logoFiles = [
  "tiara logo1y.png",
  "fira logoy.png",
  "Asset 2@4x.png",
  "300Asset 1u.png",
  "500Asset 1.png",
  "500Asset 1t.png",
  "500Asset 1tt.png",
  "500Asset 1yy.png",
  "500Asset 2.png",
  "500Asset 28.png",
  "500Asset 2t.png",
  "Asset 10.png",
  "Asset 12.png",
  "Asset 13.png",
  "Asset 14.png",
  "Asset 16.png",
  "Asset 17.png",
  "Asset 18.png",
  "Asset 1@4x.png",
  "Asset 20.png",
  "Asset 22.png",
  "Asset 23.png",
  "Asset 24.png",
  "Asset 26.png",
  "Asset 27.png",
  "Asset 28.png",
  "Asset 29.png",
  "Asset 3.png",
  "Asset 36.png",
  "Asset 37.png",
  "Asset 38.png",
  "Asset 39.png",
  "Asset 4.png",
  "Asset 40.png",
  "Asset 41.png",
  "Asset 42.png",
  "Asset 43.png",
  "Asset 44.png",
  "Asset 5.png",
  "Asset 8.png",
  "Asset 9.png",
  "PNG.png",
  "sss.png",
  "Asset 1@500x.png",
  "Asset 2@500x.png",
  "ayan@500x.png",
  "Jerrys-Educare-HD.png",
  "LOGOS-12.png",
].map((fileName) => ({
  name: fileName.replace(/\.[^.]+$/, "").replace(/[@_-]/g, " "),
  src: s3Logo(fileName),
}));

export const clientLogos = logoFiles.map((logo, idx) => ({
  id: idx + 1,
  name: logo.name,
  icon: (props) => <ImageLogo src={logo.src} alt={logo.name} {...props} />,
}));
