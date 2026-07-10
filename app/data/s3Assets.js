export const S3_BUCKET_BASE =
  "https://jinskadamthodu-410139137516-eu-north-1-an.s3.eu-north-1.amazonaws.com";

const encodeS3Key = (key) =>
  key
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

export const s3Asset = (key) => `${S3_BUCKET_BASE}/${encodeS3Key(key)}`;

export const s3AdvertoAsset = (path) => s3Asset(`adverto/${path}`);

export const s3Banners = {
  serviceCard: s3AdvertoAsset("Banners/service-card-banner.jpg"),
  servicesHero: s3AdvertoAsset("Banners/Services-banner.jpg"),
  squadHero: s3AdvertoAsset("Banners/Squad-bg-banner.webp"),
  squadMobile: s3AdvertoAsset("Banners/SQUAD-MOBILE-VIEW.webp"),
  teamHero: s3AdvertoAsset("Banners/Team-banner.jpg"),
};

export const s3CampaignImages = [
  "01.webp",
  "02.webp",
  "03.webp",
  "04.webp",
  "05.webp",
].map((fileName) => s3AdvertoAsset(`campaigns/${fileName}`));

export const s3TeamImage = (fileName) => s3AdvertoAsset(`teams/${fileName}`);

const homeImage = (sizeFolder, fileName) =>
  s3AdvertoAsset(`Home/${sizeFolder}/${fileName}`);

const homePortfolioTile = (sizeFolder, fileName, index) => ({
  id: `${sizeFolder}-${fileName}`,
  title: "Featured Portfolio",
  subtitle: "Branding",
  image: homeImage(sizeFolder, fileName),
  alt: `Featured portfolio image ${index + 1}`,
});

export const s3HomePortfolioTiles = {
  square: [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
  ].map((fileName, index) =>
    homePortfolioTile("1200 x 1200", fileName, index),
  ),
  landscape: [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "19.jpeg",
    "19.jpg.jpeg",
    "20.jpeg",
    "21.jpeg",
    "22.jpeg",
  ].map((fileName, index) =>
    homePortfolioTile("1200 x 900", fileName, index),
  ),
};

export const s3PortfolioImage = (imagePath) => {
  if (!imagePath || imagePath.startsWith("http")) {
    return imagePath;
  }

  return s3AdvertoAsset(
    imagePath.replace(/^\/case-studies\//, "Portfolio/"),
  );
};

const s3PortfolioProject = (heroImage, gallery, portfolioImage) => ({
  heroImage: s3PortfolioImage(heroImage),
  portfolioImage: s3PortfolioImage(portfolioImage ?? heroImage),
  gallery: gallery.map(s3PortfolioImage),
});

const spicesGalleryImages = [
  "/case-studies/Spices_Global/BRANDING SPICES-01-01.webp",
  "/case-studies/Spices_Global/BRANDING SPICES-01-02.webp",
  "/case-studies/Spices_Global/BRANDING SPICES-01-03.webp",
  "/case-studies/Spices_Global/BRANDING SPICES-01-04.webp",
  "/case-studies/Spices_Global/BRANDING SPICES-01-05.webp",
  "/case-studies/Spices_Global/BRANDING SPICES-01-06.webp",
  "/case-studies/Spices_Global/BRANDING SPICES-01-07.webp",
  "/case-studies/Spices_Global/BRANDING SPICES-01-08.webp",
  "/case-studies/Spices_Global/BRANDING SPICES-01-09.webp",
  "/case-studies/Spices_Global/BRANDING SPICES-01-10.webp",
  "/case-studies/Spices_Global/BRANDING SPICES-01-11.webp",
];

const underdwagGalleryImages = Array.from(
  { length: 10 },
  (_, index) => `/case-studies/UNDER_DAWG/${index + 1}.webp`,
);

const crevoGalleryImages = Array.from(
  { length: 17 },
  (_, index) => `/case-studies/CREVO/${index + 1}.webp`,
);

const azberyGalleryImages = Array.from(
  { length: 14 },
  (_, index) =>
    `/case-studies/AZBERY/Untitled-1-${String(index + 1).padStart(2, "0")}.webp`,
);

const belantoGalleryImages = Array.from(
  { length: 11 },
  (_, index) => `/case-studies/BELANTO/${index + 1}.webp`,
);

const charuthaGalleryImages = Array.from(
  { length: 10 },
  (_, index) => `/case-studies/CHARUTHA/${index + 1}.webp`,
);

const neveuGalleryImages = Array.from(
  { length: 9 },
  (_, index) => `/case-studies/NEVEU/NEVU ${index + 1}.webp`,
);

const somaBeachGalleryImages = Array.from(
  { length: 5 },
  (_, index) => `/case-studies/SOMA_BEACH/${index + 1}.webp`,
);

const primeEdgeGalleryImages = Array.from(
  { length: 11 },
  (_, index) => `/case-studies/PRIME_EDGE/${index + 1}.webp`,
);

const thavalaGalleryImages = [
  "/case-studies/THAVALA/THAVALA 1.webp",
  ...Array.from(
    { length: 12 },
    (_, index) => `/case-studies/THAVALA/THAVALA BRAND ${index + 2}.webp`,
  ),
];

const soraGalleryImages = Array.from(
  { length: 14 },
  (_, index) => `/case-studies/SORA/${index + 1}.webp`,
);

const finsGalleryImages = Array.from(
  { length: 9 },
  (_, index) => `/case-studies/FINS/${index + 1}.webp`,
);

const govoyajoGalleryImages = Array.from(
  { length: 10 },
  (_, index) => `/case-studies/GOVOYAJO/${index + 1}.webp`,
);

const mistwishGalleryImages = Array.from(
  { length: 16 },
  (_, index) => `/case-studies/Mistwish/mist ${index + 1}.webp`,
);

const waterCanGalleryImages = Array.from(
  { length: 12 },
  (_, index) => `/case-studies/WATER_CAN/${index + 1}.webp`,
);

const ayanGalleryImages = Array.from(
  { length: 11 },
  (_, index) => `/case-studies/AYAN_CUPPA/AYAN CUPPA 02-${index + 1}.webp`,
);

const bridexGalleryImages = Array.from(
  { length: 7 },
  (_, index) => `/case-studies/BRIDEX/${String(index + 1).padStart(2, "0")}.webp`,
);

const chaiKaifGalleryImages = Array.from(
  { length: 17 },
  (_, index) => `/case-studies/CHAI_KAIF/${index + 1}.webp`,
);

const haloHiveGalleryImages = Array.from(
  { length: 30 },
  (_, index) => `/case-studies/HALO_HIVE/${index + 1}.webp`,
);

const asirGalleryImages = [
  "/case-studies/ASIR/asir copy-01.webp",
  "/case-studies/ASIR/asir copy-02.webp",
  "/case-studies/ASIR/asir copy-03.webp",
  "/case-studies/ASIR/asir copy-04.webp",
  "/case-studies/ASIR/asir copy-06.webp",
  "/case-studies/ASIR/asir copy-07.webp",
  "/case-studies/ASIR/asir copy-08.webp",
  "/case-studies/ASIR/asir copy-09.webp",
  "/case-studies/ASIR/asir copy-10.webp",
  "/case-studies/ASIR/asir copy-11.webp",
];

const orlandsGalleryImages = Array.from(
  { length: 9 },
  (_, index) => `/case-studies/orlands/OR ${index + 1}.webp`,
);

const richMountGalleryImages = Array.from(
  { length: 8 },
  (_, index) => `/case-studies/RICH_MOUNT/${index + 1}.webp`,
);

const royalGymGalleryImages = Array.from(
  { length: 8 },
  (_, index) => `/case-studies/ROYAL_FITNESS/${index + 1}.webp`,
);

const yujaGalleryImages = Array.from(
  { length: 9 },
  (_, index) => `/case-studies/YUJA/${index + 1}.webp`,
);

const summerSlateGalleryImages = Array.from(
  { length: 6 },
  (_, index) => `/case-studies/SUMMER_SLATE/${index + 1}.webp`,
);

const zivaGalleryImages = Array.from(
  { length: 9 },
  (_, index) => `/case-studies/ZIVA/${index + 1}.webp`,
);

const alSamaGalleryImages = [
  "/case-studies/AL_SAMA/al sama-01.webp",
  "/case-studies/AL_SAMA/al sama-02.webp",
  "/case-studies/AL_SAMA/al sama-03.webp",
  "/case-studies/AL_SAMA/al sama-04.webp",
  "/case-studies/AL_SAMA/al sama-05.webp",
  "/case-studies/AL_SAMA/al sama-06.webp",
  "/case-studies/AL_SAMA/al sama-08..webp",
  "/case-studies/AL_SAMA/al sama-09.webp",
  "/case-studies/AL_SAMA/al sama-10.webp",
  "/case-studies/AL_SAMA/al sama-11.webp",
  "/case-studies/AL_SAMA/al sama-12.webp",
  "/case-studies/AL_SAMA/al sama-13.webp",
];

const arabSeasonGalleryImages = Array.from(
  { length: 9 },
  (_, index) =>
    `/case-studies/ARAB_SEASON/Untitled-1-${String(index + 1).padStart(2, "0")}.webp`,
);

const beruGalleryImages = Array.from(
  { length: 8 },
  (_, index) => `/case-studies/BERU/${String(index + 1).padStart(2, "0")}.webp`,
);

const darexGalleryImages = Array.from(
  { length: 14 },
  (_, index) => `/case-studies/DAREX/${index + 1}.webp`,
);

const handstromGalleryImages = Array.from(
  { length: 7 },
  (_, index) => `/case-studies/HANDSTROM/${index + 1}.webp`,
);

const kmGalleryImages = Array.from(
  { length: 10 },
  (_, index) => `/case-studies/KM/${index + 1}.webp`,
);

const potogoGalleryImages = Array.from(
  { length: 9 },
  (_, index) => `/case-studies/POTAGO/${index + 1}.webp`,
);

export const s3PortfolioProjects = {
  spices: s3PortfolioProject(
    "/case-studies/Spices_Global/cover/cover.webp",
    spicesGalleryImages,
  ),
  underdwag: s3PortfolioProject(
    "/case-studies/UNDER_DAWG/Cover/cover copy.webp",
    underdwagGalleryImages,
    "/case-studies/UNDER_DAWG/1.webp",
  ),
  crevo: s3PortfolioProject(
    "/case-studies/CREVO/Cover/cover copy.webp",
    crevoGalleryImages,
  ),
  azbery: s3PortfolioProject(
    "/case-studies/AZBERY/Cover/cover copy.webp",
    azberyGalleryImages,
  ),
  belanto: s3PortfolioProject(
    "/case-studies/BELANTO/Cover/cover copy.webp",
    belantoGalleryImages,
  ),
  charutha: s3PortfolioProject(
    "/case-studies/CHARUTHA/Cover/cover copy.webp",
    charuthaGalleryImages,
  ),
  neveu: s3PortfolioProject(
    "/case-studies/NEVEU/COVER/Cover.webp",
    neveuGalleryImages,
  ),
  "soma-beach": s3PortfolioProject(
    "/case-studies/SOMA_BEACH/Cover/cover copy.webp",
    somaBeachGalleryImages,
  ),
  "prime-edge": s3PortfolioProject(
    "/case-studies/PRIME_EDGE/Cover/cover copy.webp",
    primeEdgeGalleryImages,
  ),
  thavala: s3PortfolioProject(
    "/case-studies/THAVALA/Cover/thavala cover.webp",
    thavalaGalleryImages,
  ),
  sora: s3PortfolioProject(
    "/case-studies/SORA/Cover/cover copy.webp",
    soraGalleryImages,
  ),
  fins: s3PortfolioProject(
    "/case-studies/FINS/Cover/cover copy.webp",
    finsGalleryImages,
  ),
  govoyajo: s3PortfolioProject(
    "/case-studies/GOVOYAJO/Cover/cover copy.webp",
    govoyajoGalleryImages,
  ),
  mistwish: s3PortfolioProject(
    "/case-studies/Mistwish/Cover/mist.D.webp",
    mistwishGalleryImages,
  ),
  "water-can": s3PortfolioProject(
    "/case-studies/WATER_CAN/Cover/cover copy.webp",
    waterCanGalleryImages,
  ),
  ayan: s3PortfolioProject(
    "/case-studies/AYAN_CUPPA/Cover/cover copy.webp",
    ayanGalleryImages,
  ),
  bridex: s3PortfolioProject(
    "/case-studies/BRIDEX/Cover/cover copy.webp",
    bridexGalleryImages,
  ),
  "chai-kaif": s3PortfolioProject(
    "/case-studies/CHAI_KAIF/Cover/cover copy.webp",
    chaiKaifGalleryImages,
  ),
  "halo-hive": s3PortfolioProject(
    "/case-studies/HALO_HIVE/Cover/cover copy.webp",
    haloHiveGalleryImages,
  ),
  asir: s3PortfolioProject(
    "/case-studies/ASIR/Cover/cover copy.webp",
    asirGalleryImages,
  ),
  orlands: s3PortfolioProject(
    "/case-studies/orlands/cover/COVER OR.webp",
    orlandsGalleryImages,
  ),
  "rich-mount": s3PortfolioProject(
    "/case-studies/RICH_MOUNT/Cover/cover copy.webp",
    richMountGalleryImages,
  ),
  "royal-gym": s3PortfolioProject(
    "/case-studies/ROYAL_FITNESS/Cover/cover copy.webp",
    royalGymGalleryImages,
  ),
  yuja: s3PortfolioProject(
    "/case-studies/YUJA/Cover/cover copy.webp",
    yujaGalleryImages,
  ),
  "summer-slate": s3PortfolioProject(
    "/case-studies/SUMMER_SLATE/Cover/cover copy.webp",
    summerSlateGalleryImages,
  ),
  ziva: s3PortfolioProject(
    "/case-studies/ZIVA/Cover/cover copy.webp",
    zivaGalleryImages,
  ),
  "al-sama": s3PortfolioProject(
    "/case-studies/AL_SAMA/Cover/cover copy.webp",
    alSamaGalleryImages,
  ),
  "arab-season": s3PortfolioProject(
    "/case-studies/ARAB_SEASON/Cover/cover copy.webp",
    arabSeasonGalleryImages,
  ),
  beru: s3PortfolioProject(
    "/case-studies/BERU/Cover/cover copy.webp",
    beruGalleryImages,
  ),
  darex: s3PortfolioProject(
    "/case-studies/DAREX/Cover/cover copy.webp",
    darexGalleryImages,
  ),
  handstrom: s3PortfolioProject(
    "/case-studies/HANDSTROM/cover/cover copy.webp",
    handstromGalleryImages,
  ),
  km: s3PortfolioProject(
    "/case-studies/KM/Cover/cover copy.webp",
    kmGalleryImages,
  ),
  POTOGO: s3PortfolioProject(
    "/case-studies/POTAGO/Cover/cover copy.webp",
    potogoGalleryImages,
  ),
};

export const s3Videos = {
  heroPortrait: s3AdvertoAsset("videos/Adverto_Portrait.mp4"),
  heroLandscape: s3AdvertoAsset("videos/Adverto_Landscape.mp4"),
  centerVideo: s3AdvertoAsset("videos/center-video.mp4"),
};

export const s3ServiceVideos = {
  horizontal: [
    "Img_0865.mp4",
    "IMG_0866.mp4",
    "Img_0867.mp4",
    "Img_0868.mp4",
    "Img_0870.mp4",
    "Img_0871.mp4",
    "Img_0880.mp4",
    "Img_0881.mp4",
    "Img_0882.mp4",
    "Img_0883.mp4",
    "Img_0864.mp4",
  ].map((fileName) => s3AdvertoAsset(`videos/horizontal/${fileName}`)),
  vertical: [
    "Img_0884.mp4",
    "Img_0885.mp4",
    "Img_0886.mp4",
    "Img_0887.mp4",
    "Img_0888.mp4",
    "Img_0889.mp4",
    "Img_0890.mp4",
    "Img_1775.mp4",
    "Img_1776.mp4",
    "Img_1780.mp4",
    "IMG_1781.mp4",
    "Img_1782.mp4",
    "Img_1783.mp4",
    "Img_1784.mp4",
    "Img_1786.mp4",
    "Img_1788.mp4",
  ].map((fileName) => s3AdvertoAsset(`videos/vertical/${fileName}`)),
};

export const s3Logo = (fileName) => s3AdvertoAsset(`client_logos/${fileName}`);
