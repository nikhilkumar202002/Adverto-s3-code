import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const bucket =
  "https://pub-e7450afec95f428391514b56cd3e9428.r2.dev";
const sourceDirectory = "client_logos";
const outputDirectory = path.join(process.cwd(), "public", "client-logos");

const logoFiles = [
  // 1st, 2nd, 3rd logos
  "tiara logo1y.png",
  "fira logoy.png",
  "Asset 2@4x.png",

  // New logos fetched after the 3rd logo (uploaded 2026-10-23T15:59)
  "design.png",
  "sora.png",
  "Asset 1.png",
  "Asset 2.png",
  "Asset 3.png",
  "Asset 4.png",
  "500Asset 4.png",
  "Asset 5.png",
  "Asset 6.png",
  "Asset 7.png",
  "Asset 8.png",
  "Asset 9.png",

  // Remaining original logos
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
  "Asset 36.png",
  "Asset 37.png",
  "Asset 38.png",
  "Asset 39.png",
  "Asset 40.png",
  "Asset 41.png",
  "Asset 42.png",
  "Asset 43.png",
  "Asset 44.png",
  "PNG.png",
  "sss.png",
  "Asset 1@500x.png",
  "Asset 2@500x.png",
  "ayan@500x.png",
  "Jerrys-Educare-HD.png",
  "LOGOS-12.png",
];

const outputName = (fileName) =>
  `${fileName
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}.webp`;

await fs.mkdir(outputDirectory, { recursive: true });

let sourceBytes = 0;
let outputBytes = 0;

for (const fileName of logoFiles) {
  const sourceUrl = `${bucket}/${sourceDirectory
    .split("/")
    .concat(fileName)
    .map(encodeURIComponent)
    .join("/")}`;
  const response = await fetch(sourceUrl);

  if (!response.ok) {
    throw new Error(`Could not download ${fileName}: ${response.status}`);
  }

  const source = Buffer.from(await response.arrayBuffer());
  const destination = path.join(outputDirectory, outputName(fileName));

  await sharp(source)
    .resize({ width: 240, height: 160, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(destination);

  sourceBytes += source.length;
  outputBytes += (await fs.stat(destination)).size;
}

console.log(
  `Optimized ${logoFiles.length} logos: ${(sourceBytes / 1024 / 1024).toFixed(1)} MB -> ${(outputBytes / 1024 / 1024).toFixed(1)} MB`,
);
