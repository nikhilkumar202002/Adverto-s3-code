import fs from "node:fs/promises";
import path from "node:path";

const API_ENDPOINT = "https://adverto.jinskadamthodu2k15.workers.dev/api/list-all";
const TARGET_FILE = path.join(process.cwd(), "app/data/s3Assets.js");

// Natural sort for filenames like 1.webp, 2.webp, 10.webp, 01.jpg, etc.
const naturalSort = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

async function fetchBucketData() {
  console.log(`📡 Fetching complete bucket list from ${API_ENDPOINT}...`);
  const res = await fetch(API_ENDPOINT);
  if (!res.ok) {
    throw new Error(`Failed to fetch bucket data: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  const files = Array.isArray(json) ? json : json.objects || json.files || [];
  console.log(`✅ Loaded ${files.length} objects from bucket.`);
  return files;
}

function processFiles(files) {
  const manifest = {
    Banners: [],
    Home: {
      "1200 x 1200": [],
      "1200 x 900": [],
    },
    Portfolio: {},
    campaigns: [],
    client_logos: [],
    teams: [],
    videos: {
      root: [],
      horizontal: [],
      vertical: [],
    },
  };

  for (const file of files) {
    const key = file.key.replace(/^adverto\//, "");
    if (!key || key === "Portfolio/") continue;

    const parts = key.split("/");
    const rootFolder = parts[0];

    if (rootFolder === "Banners") {
      manifest.Banners.push(parts[1]);
    } else if (rootFolder === "Home") {
      const sizeFolder = parts[1];
      const fileName = parts[2];
      if (manifest.Home[sizeFolder]) {
        manifest.Home[sizeFolder].push(fileName);
      }
    } else if (rootFolder === "Portfolio") {
      const projectFolder = parts[1];
      const subPath = parts.slice(2).join("/");
      if (!manifest.Portfolio[projectFolder]) {
        manifest.Portfolio[projectFolder] = [];
      }
      manifest.Portfolio[projectFolder].push(subPath);
    } else if (rootFolder === "campaigns") {
      manifest.campaigns.push(parts[1]);
    } else if (rootFolder === "client_logos") {
      manifest.client_logos.push(parts[1]);
    } else if (rootFolder === "teams") {
      manifest.teams.push(parts[1]);
    } else if (rootFolder === "videos") {
      if (parts.length === 2) {
        manifest.videos.root.push(parts[1]);
      } else if (parts[1] === "horizontal") {
        manifest.videos.horizontal.push(parts[2]);
      } else if (parts[1] === "vertical") {
        manifest.videos.vertical.push(parts[2]);
      }
    }
  }

  // Sort all arrays naturally
  manifest.Banners.sort(naturalSort);
  manifest.Home["1200 x 1200"].sort(naturalSort);
  manifest.Home["1200 x 900"].sort(naturalSort);
  manifest.campaigns.sort(naturalSort);
  manifest.client_logos.sort(naturalSort);
  manifest.teams.sort(naturalSort);
  manifest.videos.root.sort(naturalSort);
  manifest.videos.horizontal.sort(naturalSort);
  manifest.videos.vertical.sort(naturalSort);

  for (const project of Object.keys(manifest.Portfolio)) {
    manifest.Portfolio[project].sort(naturalSort);
  }

  return manifest;
}

function generateCode(manifest) {
  // Folder to slug mapping
  const folderToSlug = {
    AL_SAMA: "al-sama",
    ARAB_SEASON: "arab-season",
    ASIR: "asir",
    AYAN_CUPPA: "ayan",
    AZBERY: "azbery",
    BELANTO: "belanto",
    BERU: "beru",
    BRIDEX: "bridex",
    CHAI_KAIF: "chai-kaif",
    CHARUTHA: "charutha",
    CREVO: "crevo",
    DAREX: "darex",
    DESIGN_MARBLE_GRANITE: "design-marble-granite",
    FINS: "fins",
    GOVOYAJO: "govoyajo",
    HALO_HIVE: "halo-hive",
    HANDSTROM: "handstrom",
    KM: "km",
    Mistwish: "mistwish",
    NEVEU: "neveu",
    ORLO: "orlo",
    POTAGO: "POTOGO",
    PRIME_EDGE: "prime-edge",
    QUOON: "quoon",
    RICH_MOUNT: "rich-mount",
    ROYAL_FITNESS: "royal-gym",
    SOMA_BEACH: "soma-beach",
    SORA: "sora",
    SUMMER_SLATE: "summer-slate",
    Spices_Global: "spices",
    THAVALA: "thavala",
    UNDER_DAWG: "underdwag",
    WATER_CAN: "water-can",
    YUJA: "yuja",
    ZIVA: "ziva",
    orlands: "orlands",
    "11_CORE": "11-core",
  };

  const projectEntries = [];

  for (const [projectFolder, files] of Object.entries(manifest.Portfolio)) {
    const slug = folderToSlug[projectFolder] || projectFolder.toLowerCase().replace(/_/g, "-");
    const coverFile = files.find((f) => f.toLowerCase().includes("cover")) || files[0];
    const galleryFiles = files.filter((f) => f !== coverFile && !f.toLowerCase().includes("cover"));

    const heroImagePath = `Portfolio/${projectFolder}/${coverFile}`;
    const galleryPaths = galleryFiles.map((f) => `Portfolio/${projectFolder}/${f}`);

    projectEntries.push({
      slug,
      projectFolder,
      heroImagePath,
      galleryPaths,
    });
  }

  return `export const S3_BUCKET_BASE =
  "https://pub-e7450afec95f428391514b56cd3e9428.r2.dev";

const encodeS3Key = (key) =>
  key
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

export const s3Asset = (key) => {
  const cleanKey = key.replace(/^adverto\\//, "").replace(/^\\/case-studies\\//, "Portfolio/");
  return \`\${S3_BUCKET_BASE}/\${encodeS3Key(cleanKey)}\`;
};

export const s3AdvertoAsset = (path) => s3Asset(path);

export const s3Banners = {
  serviceCard: s3AdvertoAsset("Banners/service-card-banner.jpg"),
  servicesHero: s3AdvertoAsset("Banners/Services-banner.jpg"),
  squadHero: s3AdvertoAsset("Banners/Squad-bg-banner.webp"),
  squadMobile: s3AdvertoAsset("Banners/SQUAD-MOBILE-VIEW.webp"),
  teamHero: s3AdvertoAsset("Banners/Team-banner.jpg"),
};

export const s3CampaignImages = ${JSON.stringify(manifest.campaigns, null, 2)}.map(
  (fileName) => s3AdvertoAsset(\`campaigns/\${fileName}\`)
);

export const s3TeamImage = (fileName) => s3AdvertoAsset(\`teams/\${fileName}\`);

const homeImage = (sizeFolder, fileName) =>
  s3AdvertoAsset(\`Home/\${sizeFolder}/\${fileName}\`);

const homePortfolioTile = (sizeFolder, fileName, index) => ({
  id: \`\${sizeFolder}-\${fileName}\`,
  title: "Featured Portfolio",
  subtitle: "Branding",
  image: homeImage(sizeFolder, fileName),
  alt: \`Featured portfolio image \${index + 1}\`,
});

export const s3HomePortfolioTiles = {
  square: ${JSON.stringify(manifest.Home["1200 x 1200"], null, 2)}.map(
    (fileName, index) => homePortfolioTile("1200 x 1200", fileName, index)
  ),
  landscape: ${JSON.stringify(manifest.Home["1200 x 900"], null, 2)}.map(
    (fileName, index) => homePortfolioTile("1200 x 900", fileName, index)
  ),
};

export const s3PortfolioImage = (imagePath) => {
  if (!imagePath || imagePath.startsWith("http")) {
    return imagePath;
  }
  return s3Asset(imagePath);
};

const s3PortfolioProject = (heroImage, gallery, portfolioImage) => ({
  heroImage: s3PortfolioImage(heroImage),
  portfolioImage: s3PortfolioImage(portfolioImage ?? heroImage),
  gallery: gallery.map(s3PortfolioImage),
});

export const s3PortfolioProjects = {
${projectEntries
  .map(
    (p) => `  ${JSON.stringify(p.slug)}: s3PortfolioProject(
    ${JSON.stringify(p.heroImagePath)},
    ${JSON.stringify(p.galleryPaths, null, 4).replace(/^/gm, "    ").trim()}
  ),`
  )
  .join("\n")}
};

export const s3Videos = {
  heroPortrait: s3AdvertoAsset("videos/Adverto_Portrait.mp4"),
  heroLandscape: s3AdvertoAsset("videos/Adverto_Landscape.mp4"),
  centerVideo: s3AdvertoAsset("videos/Center_Video.mp4"),
};

export const s3ServiceVideos = {
  horizontal: ${JSON.stringify(manifest.videos.horizontal, null, 2)}.map(
    (fileName) => s3AdvertoAsset(\`videos/horizontal/\${fileName}\`)
  ),
  vertical: ${JSON.stringify(manifest.videos.vertical, null, 2)}.map(
    (fileName) => s3AdvertoAsset(\`videos/vertical/\${fileName}\`)
  ),
};

export const s3Logo = (fileName) => s3AdvertoAsset(\`client_logos/\${fileName}\`);

export const s3Manifest = ${JSON.stringify(manifest, null, 2)};
`;
}

async function run() {
  try {
    const files = await fetchBucketData();
    const manifest = processFiles(files);
    const code = generateCode(manifest);
    await fs.writeFile(TARGET_FILE, code, "utf8");
    console.log(`🎉 Successfully synchronized all ${files.length} bucket items to ${TARGET_FILE}!`);
  } catch (err) {
    console.error("❌ Synchronization failed:", err);
    process.exit(1);
  }
}

run();
