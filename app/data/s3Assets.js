export const S3_BUCKET_BASE =
  "https://pub-e7450afec95f428391514b56cd3e9428.r2.dev";

const encodeS3Key = (key) =>
  key
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

export const s3Asset = (key) => {
  const cleanKey = key.replace(/^adverto\//, "").replace(/^\/case-studies\//, "Portfolio/");
  return `${S3_BUCKET_BASE}/${encodeS3Key(cleanKey)}`;
};

export const s3AdvertoAsset = (path) => s3Asset(path);

export const s3Banners = {
  serviceCard: s3AdvertoAsset("Banners/service-card-banner.jpg"),
  servicesHero: s3AdvertoAsset("Banners/Services-banner.jpg"),
  squadHero: s3AdvertoAsset("Banners/Squad-bg-banner.webp"),
  squadMobile: s3AdvertoAsset("Banners/SQUAD-MOBILE-VIEW.webp"),
  teamHero: s3AdvertoAsset("Banners/Team-banner.jpg"),
};

export const s3KoickalCampaignImages = [
  "01.webp",
  "02.webp",
  "03.webp",
  "04.webp",
  "05.webp",
].map((fileName) => s3AdvertoAsset(`campaigns/Koickal Gold/${fileName}`));

export const s3CampaignImages = s3KoickalCampaignImages;

export const s3AlJazeeraCampaignImages = [
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
].map((fileName) => s3AdvertoAsset(`campaigns/Al Jazeera/${fileName}`));


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
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "25.jpg",
  "26.jpg",
  "27.jpg",
  "28.jpg",
  "29.jpg",
  "30.jpg",
  "31.jpg"
].map(
    (fileName, index) => homePortfolioTile("1200 x 1200", fileName, index)
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
  "23.jpg",
  "24.jpg",
  "25.jpg",
  "26.jpg"
].map(
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
  "11-core": s3PortfolioProject(
    "Portfolio/11_CORE/cover/cover.jpg",
    [
        "Portfolio/11_CORE/11 CORE-01.jpg",
        "Portfolio/11_CORE/11 CORE-02.jpg",
        "Portfolio/11_CORE/11 CORE-03.jpg",
        "Portfolio/11_CORE/11 CORE-04.jpg",
        "Portfolio/11_CORE/11 CORE-05.jpg",
        "Portfolio/11_CORE/11 CORE-06.jpg",
        "Portfolio/11_CORE/11 CORE-07.jpg",
        "Portfolio/11_CORE/11 CORE-08.jpg",
        "Portfolio/11_CORE/11 CORE-09.jpg",
        "Portfolio/11_CORE/11 CORE-10.jpg",
        "Portfolio/11_CORE/11 CORE-11.jpg",
        "Portfolio/11_CORE/11 CORE-12.jpg",
        "Portfolio/11_CORE/11 CORE-13.jpg",
        "Portfolio/11_CORE/11 CORE-14.jpg"
    ]
  ),
  "al-sama": s3PortfolioProject(
    "Portfolio/AL_SAMA/Cover/cover copy.webp",
    [
        "Portfolio/AL_SAMA/al sama-01.webp",
        "Portfolio/AL_SAMA/al sama-02.webp",
        "Portfolio/AL_SAMA/al sama-03.webp",
        "Portfolio/AL_SAMA/al sama-04.webp",
        "Portfolio/AL_SAMA/al sama-05.webp",
        "Portfolio/AL_SAMA/al sama-06.webp",
        "Portfolio/AL_SAMA/al sama-08..webp",
        "Portfolio/AL_SAMA/al sama-09.webp",
        "Portfolio/AL_SAMA/al sama-10.webp",
        "Portfolio/AL_SAMA/al sama-11.webp",
        "Portfolio/AL_SAMA/al sama-12.webp",
        "Portfolio/AL_SAMA/al sama-13.webp"
    ]
  ),
  "arab-season": s3PortfolioProject(
    "Portfolio/ARAB_SEASON/Cover/cover copy.webp",
    [
        "Portfolio/ARAB_SEASON/Untitled-1-01.webp",
        "Portfolio/ARAB_SEASON/Untitled-1-02.webp",
        "Portfolio/ARAB_SEASON/Untitled-1-03.webp",
        "Portfolio/ARAB_SEASON/Untitled-1-04.webp",
        "Portfolio/ARAB_SEASON/Untitled-1-05.webp",
        "Portfolio/ARAB_SEASON/Untitled-1-06.webp",
        "Portfolio/ARAB_SEASON/Untitled-1-07.webp",
        "Portfolio/ARAB_SEASON/Untitled-1-08.webp",
        "Portfolio/ARAB_SEASON/Untitled-1-09.webp"
    ]
  ),
  "asir": s3PortfolioProject(
    "Portfolio/ASIR/Cover/cover copy.webp",
    [
        "Portfolio/ASIR/asir copy-01.webp",
        "Portfolio/ASIR/asir copy-02.webp",
        "Portfolio/ASIR/asir copy-03.webp",
        "Portfolio/ASIR/asir copy-04.webp",
        "Portfolio/ASIR/asir copy-06.webp",
        "Portfolio/ASIR/asir copy-07.webp",
        "Portfolio/ASIR/asir copy-08.webp",
        "Portfolio/ASIR/asir copy-09.webp",
        "Portfolio/ASIR/asir copy-10.webp",
        "Portfolio/ASIR/asir copy-11.webp"
    ]
  ),
  "ayan": s3PortfolioProject(
    "Portfolio/AYAN_CUPPA/Cover/cover copy.webp",
    [
        "Portfolio/AYAN_CUPPA/AYAN CUPPA 02-1.webp",
        "Portfolio/AYAN_CUPPA/AYAN CUPPA 02-2.webp",
        "Portfolio/AYAN_CUPPA/AYAN CUPPA 02-3.webp",
        "Portfolio/AYAN_CUPPA/AYAN CUPPA 02-4.webp",
        "Portfolio/AYAN_CUPPA/AYAN CUPPA 02-5.webp",
        "Portfolio/AYAN_CUPPA/AYAN CUPPA 02-6.webp",
        "Portfolio/AYAN_CUPPA/AYAN CUPPA 02-7.webp",
        "Portfolio/AYAN_CUPPA/AYAN CUPPA 02-8.webp",
        "Portfolio/AYAN_CUPPA/AYAN CUPPA 02-9.webp",
        "Portfolio/AYAN_CUPPA/AYAN CUPPA 02-10.webp",
        "Portfolio/AYAN_CUPPA/AYAN CUPPA 02-11.webp"
    ]
  ),
  "azbery": s3PortfolioProject(
    "Portfolio/AZBERY/Cover/cover copy.webp",
    [
        "Portfolio/AZBERY/Untitled-1-01.webp",
        "Portfolio/AZBERY/Untitled-1-02.webp",
        "Portfolio/AZBERY/Untitled-1-03.webp",
        "Portfolio/AZBERY/Untitled-1-04.webp",
        "Portfolio/AZBERY/Untitled-1-05.webp",
        "Portfolio/AZBERY/Untitled-1-06.webp",
        "Portfolio/AZBERY/Untitled-1-07.webp",
        "Portfolio/AZBERY/Untitled-1-08.webp",
        "Portfolio/AZBERY/Untitled-1-09.webp",
        "Portfolio/AZBERY/Untitled-1-10.webp",
        "Portfolio/AZBERY/Untitled-1-11.webp",
        "Portfolio/AZBERY/Untitled-1-12.webp",
        "Portfolio/AZBERY/Untitled-1-13.webp",
        "Portfolio/AZBERY/Untitled-1-14.webp"
    ]
  ),
  "belanto": s3PortfolioProject(
    "Portfolio/BELANTO/Cover/cover copy.webp",
    [
        "Portfolio/BELANTO/1.webp",
        "Portfolio/BELANTO/2.webp",
        "Portfolio/BELANTO/3.webp",
        "Portfolio/BELANTO/4.webp",
        "Portfolio/BELANTO/5.webp",
        "Portfolio/BELANTO/6.webp",
        "Portfolio/BELANTO/7.webp",
        "Portfolio/BELANTO/8.webp",
        "Portfolio/BELANTO/9.webp",
        "Portfolio/BELANTO/10.webp",
        "Portfolio/BELANTO/11.webp"
    ]
  ),
  "beru": s3PortfolioProject(
    "Portfolio/BERU/Cover/cover.webp",
    [
        "Portfolio/BERU/01.webp",
        "Portfolio/BERU/02.webp",
        "Portfolio/BERU/03.webp",
        "Portfolio/BERU/04.webp",
        "Portfolio/BERU/05.webp",
        "Portfolio/BERU/06.webp",
        "Portfolio/BERU/07.webp",
        "Portfolio/BERU/08.webp"
    ]
  ),
  "bridex": s3PortfolioProject(
    "Portfolio/BRIDEX/Cover/cover copy.webp",
    [
        "Portfolio/BRIDEX/01.webp",
        "Portfolio/BRIDEX/02.webp",
        "Portfolio/BRIDEX/03.webp",
        "Portfolio/BRIDEX/04.webp",
        "Portfolio/BRIDEX/05.webp",
        "Portfolio/BRIDEX/06.webp",
        "Portfolio/BRIDEX/07.webp"
    ]
  ),
  "chai-kaif": s3PortfolioProject(
    "Portfolio/CHAI_KAIF/Cover/cover copy.webp",
    [
        "Portfolio/CHAI_KAIF/1.webp",
        "Portfolio/CHAI_KAIF/2.webp",
        "Portfolio/CHAI_KAIF/3.webp",
        "Portfolio/CHAI_KAIF/4.webp",
        "Portfolio/CHAI_KAIF/5.webp",
        "Portfolio/CHAI_KAIF/6.webp",
        "Portfolio/CHAI_KAIF/7.webp",
        "Portfolio/CHAI_KAIF/8.webp",
        "Portfolio/CHAI_KAIF/9.webp",
        "Portfolio/CHAI_KAIF/10.webp",
        "Portfolio/CHAI_KAIF/11.webp",
        "Portfolio/CHAI_KAIF/12.webp",
        "Portfolio/CHAI_KAIF/13.webp",
        "Portfolio/CHAI_KAIF/14.webp",
        "Portfolio/CHAI_KAIF/15.webp",
        "Portfolio/CHAI_KAIF/16.webp",
        "Portfolio/CHAI_KAIF/17.webp"
    ]
  ),
  "charutha": s3PortfolioProject(
    "Portfolio/CHARUTHA/Cover/cover copy.webp",
    [
        "Portfolio/CHARUTHA/1.webp",
        "Portfolio/CHARUTHA/2.webp",
        "Portfolio/CHARUTHA/3.webp",
        "Portfolio/CHARUTHA/4.webp",
        "Portfolio/CHARUTHA/5.webp",
        "Portfolio/CHARUTHA/6.webp",
        "Portfolio/CHARUTHA/7.webp",
        "Portfolio/CHARUTHA/8.webp",
        "Portfolio/CHARUTHA/9.webp",
        "Portfolio/CHARUTHA/10.webp"
    ]
  ),
  "crevo": s3PortfolioProject(
    "Portfolio/CREVO/Cover/cover copy.webp",
    [
        "Portfolio/CREVO/1.webp",
        "Portfolio/CREVO/2.webp",
        "Portfolio/CREVO/3.webp",
        "Portfolio/CREVO/4.webp",
        "Portfolio/CREVO/5.webp",
        "Portfolio/CREVO/6.webp",
        "Portfolio/CREVO/7.webp",
        "Portfolio/CREVO/8.webp",
        "Portfolio/CREVO/9.webp",
        "Portfolio/CREVO/10.webp",
        "Portfolio/CREVO/11.webp",
        "Portfolio/CREVO/12.webp",
        "Portfolio/CREVO/13.webp",
        "Portfolio/CREVO/14.webp",
        "Portfolio/CREVO/15.webp",
        "Portfolio/CREVO/16.webp",
        "Portfolio/CREVO/17.webp"
    ]
  ),
  "darex": s3PortfolioProject(
    "Portfolio/DAREX/Cover/cover copy.webp",
    [
        "Portfolio/DAREX/1.webp",
        "Portfolio/DAREX/2.webp",
        "Portfolio/DAREX/3.webp",
        "Portfolio/DAREX/4.webp",
        "Portfolio/DAREX/5.webp",
        "Portfolio/DAREX/6.webp",
        "Portfolio/DAREX/7.webp",
        "Portfolio/DAREX/8.webp",
        "Portfolio/DAREX/9.webp",
        "Portfolio/DAREX/10.webp",
        "Portfolio/DAREX/11.webp",
        "Portfolio/DAREX/12.webp",
        "Portfolio/DAREX/13.webp",
        "Portfolio/DAREX/14.webp"
    ]
  ),
  "design-marble-granite": s3PortfolioProject(
    "Portfolio/DESIGN_MARBLE_GRANITE/Cover/cover.jpg",
    [
        "Portfolio/DESIGN_MARBLE_GRANITE/Design-01.jpg",
        "Portfolio/DESIGN_MARBLE_GRANITE/Design-02.jpg",
        "Portfolio/DESIGN_MARBLE_GRANITE/Design-03.jpg",
        "Portfolio/DESIGN_MARBLE_GRANITE/Design-04.jpg",
        "Portfolio/DESIGN_MARBLE_GRANITE/Design-05.jpg",
        "Portfolio/DESIGN_MARBLE_GRANITE/Design-06.jpg",
        "Portfolio/DESIGN_MARBLE_GRANITE/Design-07.jpg",
        "Portfolio/DESIGN_MARBLE_GRANITE/Design-08.jpg",
        "Portfolio/DESIGN_MARBLE_GRANITE/Design-09.jpg",
        "Portfolio/DESIGN_MARBLE_GRANITE/Design-10.jpg",
        "Portfolio/DESIGN_MARBLE_GRANITE/Design-11.jpg",
        "Portfolio/DESIGN_MARBLE_GRANITE/Design-12.jpg"
    ]
  ),
  "fins": s3PortfolioProject(
    "Portfolio/FINS/Cover/cover copy.webp",
    [
        "Portfolio/FINS/1.webp",
        "Portfolio/FINS/2.webp",
        "Portfolio/FINS/3.webp",
        "Portfolio/FINS/4.webp",
        "Portfolio/FINS/5.webp",
        "Portfolio/FINS/6.webp",
        "Portfolio/FINS/7.webp",
        "Portfolio/FINS/8.webp",
        "Portfolio/FINS/9.webp"
    ]
  ),
  "govoyajo": s3PortfolioProject(
    "Portfolio/GOVOYAJO/Cover/cover copy.webp",
    [
        "Portfolio/GOVOYAJO/1.webp",
        "Portfolio/GOVOYAJO/2.webp",
        "Portfolio/GOVOYAJO/3.webp",
        "Portfolio/GOVOYAJO/4.webp",
        "Portfolio/GOVOYAJO/5.webp",
        "Portfolio/GOVOYAJO/6.webp",
        "Portfolio/GOVOYAJO/7.webp",
        "Portfolio/GOVOYAJO/8.webp",
        "Portfolio/GOVOYAJO/9.webp",
        "Portfolio/GOVOYAJO/10.webp"
    ]
  ),
  "halo-hive": s3PortfolioProject(
    "Portfolio/HALO_HIVE/Cover/cover copy.webp",
    [
        "Portfolio/HALO_HIVE/1.webp",
        "Portfolio/HALO_HIVE/2.webp",
        "Portfolio/HALO_HIVE/3.webp",
        "Portfolio/HALO_HIVE/4.webp",
        "Portfolio/HALO_HIVE/5.webp",
        "Portfolio/HALO_HIVE/6.webp",
        "Portfolio/HALO_HIVE/7.webp",
        "Portfolio/HALO_HIVE/8.webp",
        "Portfolio/HALO_HIVE/9.webp",
        "Portfolio/HALO_HIVE/10.webp",
        "Portfolio/HALO_HIVE/11.webp",
        "Portfolio/HALO_HIVE/12.webp",
        "Portfolio/HALO_HIVE/13.webp",
        "Portfolio/HALO_HIVE/14.webp",
        "Portfolio/HALO_HIVE/15.webp",
        "Portfolio/HALO_HIVE/16.webp",
        "Portfolio/HALO_HIVE/17.webp",
        "Portfolio/HALO_HIVE/18.webp",
        "Portfolio/HALO_HIVE/19.webp",
        "Portfolio/HALO_HIVE/20.webp",
        "Portfolio/HALO_HIVE/21.webp",
        "Portfolio/HALO_HIVE/22.webp",
        "Portfolio/HALO_HIVE/23.webp",
        "Portfolio/HALO_HIVE/24.webp",
        "Portfolio/HALO_HIVE/25.webp",
        "Portfolio/HALO_HIVE/26.webp",
        "Portfolio/HALO_HIVE/27.webp",
        "Portfolio/HALO_HIVE/28.webp",
        "Portfolio/HALO_HIVE/29.webp",
        "Portfolio/HALO_HIVE/30.webp"
    ]
  ),
  "handstrom": s3PortfolioProject(
    "Portfolio/HANDSTROM/cover/cover copy.webp",
    [
        "Portfolio/HANDSTROM/1.webp",
        "Portfolio/HANDSTROM/2.webp",
        "Portfolio/HANDSTROM/3.webp",
        "Portfolio/HANDSTROM/4.webp",
        "Portfolio/HANDSTROM/5.webp",
        "Portfolio/HANDSTROM/6.webp",
        "Portfolio/HANDSTROM/7.webp"
    ]
  ),
  "km": s3PortfolioProject(
    "Portfolio/KM/Cover/cover copy.webp",
    [
        "Portfolio/KM/1.webp",
        "Portfolio/KM/2.webp",
        "Portfolio/KM/3.webp",
        "Portfolio/KM/4.webp",
        "Portfolio/KM/5.webp",
        "Portfolio/KM/6.webp",
        "Portfolio/KM/7.webp",
        "Portfolio/KM/8.webp",
        "Portfolio/KM/9.webp",
        "Portfolio/KM/10.webp"
    ]
  ),
  "mistwish": s3PortfolioProject(
    "Portfolio/Mistwish/Cover/mist.D.webp",
    [
        "Portfolio/Mistwish/mist 1.webp",
        "Portfolio/Mistwish/mist 2.webp",
        "Portfolio/Mistwish/mist 3.webp",
        "Portfolio/Mistwish/mist 4.webp",
        "Portfolio/Mistwish/mist 5.webp",
        "Portfolio/Mistwish/mist 6.webp",
        "Portfolio/Mistwish/mist 7.webp",
        "Portfolio/Mistwish/mist 8.webp",
        "Portfolio/Mistwish/mist 9.webp",
        "Portfolio/Mistwish/mist 10.webp",
        "Portfolio/Mistwish/mist 11.webp",
        "Portfolio/Mistwish/mist 12.webp",
        "Portfolio/Mistwish/mist 13.webp",
        "Portfolio/Mistwish/mist 14.webp",
        "Portfolio/Mistwish/mist 15.webp",
        "Portfolio/Mistwish/mist 16.webp"
    ]
  ),
  "neveu": s3PortfolioProject(
    "Portfolio/NEVEU/COVER/Cover.webp",
    [
        "Portfolio/NEVEU/NEVU 1.webp",
        "Portfolio/NEVEU/NEVU 2.webp",
        "Portfolio/NEVEU/NEVU 3.webp",
        "Portfolio/NEVEU/NEVU 4.webp",
        "Portfolio/NEVEU/NEVU 5.webp",
        "Portfolio/NEVEU/NEVU 6.webp",
        "Portfolio/NEVEU/NEVU 7.webp",
        "Portfolio/NEVEU/NEVU 8.webp",
        "Portfolio/NEVEU/NEVU 9.webp"
    ]
  ),
  "orlo": s3PortfolioProject(
    "Portfolio/ORLO/Cover/cover.jpg",
    [
        "Portfolio/ORLO/Branding-01.jpg",
        "Portfolio/ORLO/Branding-02.jpg",
        "Portfolio/ORLO/Branding-03.jpg",
        "Portfolio/ORLO/Branding-04.jpg",
        "Portfolio/ORLO/Branding-05.jpg",
        "Portfolio/ORLO/Branding-06.jpg",
        "Portfolio/ORLO/Branding-07.jpg",
        "Portfolio/ORLO/Branding-08.jpg",
        "Portfolio/ORLO/Branding-09.jpg"
    ]
  ),
  "POTOGO": s3PortfolioProject(
    "Portfolio/POTAGO/Cover/cover copy.webp",
    [
        "Portfolio/POTAGO/1.webp",
        "Portfolio/POTAGO/2.webp",
        "Portfolio/POTAGO/3.webp",
        "Portfolio/POTAGO/4.webp",
        "Portfolio/POTAGO/5.webp",
        "Portfolio/POTAGO/6.webp",
        "Portfolio/POTAGO/7.webp",
        "Portfolio/POTAGO/8.webp",
        "Portfolio/POTAGO/9.webp"
    ]
  ),
  "prime-edge": s3PortfolioProject(
    "Portfolio/PRIME_EDGE/Cover/cover copy.webp",
    [
        "Portfolio/PRIME_EDGE/1.webp",
        "Portfolio/PRIME_EDGE/2.webp",
        "Portfolio/PRIME_EDGE/3.webp",
        "Portfolio/PRIME_EDGE/4.webp",
        "Portfolio/PRIME_EDGE/5.webp",
        "Portfolio/PRIME_EDGE/6.webp",
        "Portfolio/PRIME_EDGE/7.webp",
        "Portfolio/PRIME_EDGE/8.webp",
        "Portfolio/PRIME_EDGE/9.webp",
        "Portfolio/PRIME_EDGE/10.webp",
        "Portfolio/PRIME_EDGE/11.webp"
    ]
  ),
  "quoon": s3PortfolioProject(
    "Portfolio/QUOON/Cover/cover.jpg",
    [
        "Portfolio/QUOON/01.jpg",
        "Portfolio/QUOON/02.jpg",
        "Portfolio/QUOON/03.jpg",
        "Portfolio/QUOON/04.jpg",
        "Portfolio/QUOON/05.jpg",
        "Portfolio/QUOON/06.jpg",
        "Portfolio/QUOON/07.jpg",
        "Portfolio/QUOON/08.jpg",
        "Portfolio/QUOON/09.jpg",
        "Portfolio/QUOON/10.jpg"
    ]
  ),
  "rich-mount": s3PortfolioProject(
    "Portfolio/RICH_MOUNT/Cover/cover copy.webp",
    [
        "Portfolio/RICH_MOUNT/1.webp",
        "Portfolio/RICH_MOUNT/2.webp",
        "Portfolio/RICH_MOUNT/3.webp",
        "Portfolio/RICH_MOUNT/4.webp",
        "Portfolio/RICH_MOUNT/5.webp",
        "Portfolio/RICH_MOUNT/6.webp",
        "Portfolio/RICH_MOUNT/7.webp",
        "Portfolio/RICH_MOUNT/8.webp"
    ]
  ),
  "royal-gym": s3PortfolioProject(
    "Portfolio/ROYAL_FITNESS/Cover/cover copy.webp",
    [
        "Portfolio/ROYAL_FITNESS/1.webp",
        "Portfolio/ROYAL_FITNESS/2.webp",
        "Portfolio/ROYAL_FITNESS/3.webp",
        "Portfolio/ROYAL_FITNESS/4.webp",
        "Portfolio/ROYAL_FITNESS/5.webp",
        "Portfolio/ROYAL_FITNESS/6.webp",
        "Portfolio/ROYAL_FITNESS/7.webp",
        "Portfolio/ROYAL_FITNESS/8.webp"
    ]
  ),
  "soma-beach": s3PortfolioProject(
    "Portfolio/SOMA_BEACH/Cover/cover copy.webp",
    [
        "Portfolio/SOMA_BEACH/1.webp",
        "Portfolio/SOMA_BEACH/2.webp",
        "Portfolio/SOMA_BEACH/3.webp",
        "Portfolio/SOMA_BEACH/4.webp",
        "Portfolio/SOMA_BEACH/5.webp"
    ]
  ),
  "sora": s3PortfolioProject(
    "Portfolio/SORA/Cover/cover copy.webp",
    [
        "Portfolio/SORA/1.webp",
        "Portfolio/SORA/2.webp",
        "Portfolio/SORA/3.webp",
        "Portfolio/SORA/4.webp",
        "Portfolio/SORA/5.webp",
        "Portfolio/SORA/6.webp",
        "Portfolio/SORA/7.webp",
        "Portfolio/SORA/8.webp",
        "Portfolio/SORA/9.webp",
        "Portfolio/SORA/10.webp",
        "Portfolio/SORA/11.webp",
        "Portfolio/SORA/12.webp",
        "Portfolio/SORA/13.webp",
        "Portfolio/SORA/14.webp"
    ]
  ),
  "summer-slate": s3PortfolioProject(
    "Portfolio/SUMMER_SLATE/Cover/cover (1).webp",
    [
        "Portfolio/SUMMER_SLATE/1.webp",
        "Portfolio/SUMMER_SLATE/2.webp",
        "Portfolio/SUMMER_SLATE/3.webp",
        "Portfolio/SUMMER_SLATE/4.webp",
        "Portfolio/SUMMER_SLATE/5.webp",
        "Portfolio/SUMMER_SLATE/6.webp"
    ]
  ),
  "spices": s3PortfolioProject(
    "Portfolio/Spices_Global/cover/cover.webp",
    [
        "Portfolio/Spices_Global/BRANDING SPICES-01-01.webp",
        "Portfolio/Spices_Global/BRANDING SPICES-01-02.webp",
        "Portfolio/Spices_Global/BRANDING SPICES-01-03.webp",
        "Portfolio/Spices_Global/BRANDING SPICES-01-04.webp",
        "Portfolio/Spices_Global/BRANDING SPICES-01-05.webp",
        "Portfolio/Spices_Global/BRANDING SPICES-01-06.webp",
        "Portfolio/Spices_Global/BRANDING SPICES-01-07.webp",
        "Portfolio/Spices_Global/BRANDING SPICES-01-08.webp",
        "Portfolio/Spices_Global/BRANDING SPICES-01-09.webp",
        "Portfolio/Spices_Global/BRANDING SPICES-01-10.webp",
        "Portfolio/Spices_Global/BRANDING SPICES-01-11.webp"
    ]
  ),
  "thavala": s3PortfolioProject(
    "Portfolio/THAVALA/Cover/thavala cover.webp",
    [
        "Portfolio/THAVALA/THAVALA 1.webp",
        "Portfolio/THAVALA/THAVALA BRAND 2.webp",
        "Portfolio/THAVALA/THAVALA BRAND 3.webp",
        "Portfolio/THAVALA/THAVALA BRAND 4.webp",
        "Portfolio/THAVALA/THAVALA BRAND 5.webp",
        "Portfolio/THAVALA/THAVALA BRAND 6.webp",
        "Portfolio/THAVALA/THAVALA BRAND 7.webp",
        "Portfolio/THAVALA/THAVALA BRAND 8.webp",
        "Portfolio/THAVALA/THAVALA BRAND 9.webp",
        "Portfolio/THAVALA/THAVALA BRAND 10.webp",
        "Portfolio/THAVALA/THAVALA BRAND 11.webp",
        "Portfolio/THAVALA/THAVALA BRAND 12.webp",
        "Portfolio/THAVALA/THAVALA BRAND 13.webp"
    ]
  ),
  "underdwag": s3PortfolioProject(
    "Portfolio/UNDER_DAWG/Cover/cover copy.webp",
    [
        "Portfolio/UNDER_DAWG/1.webp",
        "Portfolio/UNDER_DAWG/2.webp",
        "Portfolio/UNDER_DAWG/3.webp",
        "Portfolio/UNDER_DAWG/4.webp",
        "Portfolio/UNDER_DAWG/5.webp",
        "Portfolio/UNDER_DAWG/6.webp",
        "Portfolio/UNDER_DAWG/7.webp",
        "Portfolio/UNDER_DAWG/8.webp",
        "Portfolio/UNDER_DAWG/9.webp",
        "Portfolio/UNDER_DAWG/10.webp"
    ]
  ),
  "water-can": s3PortfolioProject(
    "Portfolio/WATER_CAN/Cover/water-cover.webp",
    [
        "Portfolio/WATER_CAN/1.webp",
        "Portfolio/WATER_CAN/2.webp",
        "Portfolio/WATER_CAN/3.webp",
        "Portfolio/WATER_CAN/4.webp",
        "Portfolio/WATER_CAN/5.webp",
        "Portfolio/WATER_CAN/6.webp",
        "Portfolio/WATER_CAN/7.webp",
        "Portfolio/WATER_CAN/8.webp",
        "Portfolio/WATER_CAN/9.webp"
    ]
  ),
  "yuja": s3PortfolioProject(
    "Portfolio/YUJA/Cover/cover copy.webp",
    [
        "Portfolio/YUJA/1.webp",
        "Portfolio/YUJA/2.webp",
        "Portfolio/YUJA/3.webp",
        "Portfolio/YUJA/4.webp",
        "Portfolio/YUJA/5.webp",
        "Portfolio/YUJA/6.webp",
        "Portfolio/YUJA/7.webp",
        "Portfolio/YUJA/8.webp",
        "Portfolio/YUJA/9.webp"
    ]
  ),
  "ziva": s3PortfolioProject(
    "Portfolio/ZIVA/Cover/cover copy.webp",
    [
        "Portfolio/ZIVA/1.webp",
        "Portfolio/ZIVA/2.webp",
        "Portfolio/ZIVA/3.webp",
        "Portfolio/ZIVA/4.webp",
        "Portfolio/ZIVA/5.webp",
        "Portfolio/ZIVA/6.webp",
        "Portfolio/ZIVA/7.webp",
        "Portfolio/ZIVA/8.webp",
        "Portfolio/ZIVA/9.webp"
    ]
  ),
  "orlands": s3PortfolioProject(
    "Portfolio/orlands/cover/COVER OR.webp",
    [
        "Portfolio/orlands/OR 1.webp",
        "Portfolio/orlands/OR 2.webp",
        "Portfolio/orlands/OR 3.webp",
        "Portfolio/orlands/OR 4.webp",
        "Portfolio/orlands/OR 5.webp",
        "Portfolio/orlands/OR 6.webp",
        "Portfolio/orlands/OR 7.webp",
        "Portfolio/orlands/OR 8.webp",
        "Portfolio/orlands/OR 9.webp"
    ]
  ),
};

export const s3Videos = {
  heroPortrait: s3AdvertoAsset("videos/Adverto_Portrait.mp4"),
  heroLandscape: s3AdvertoAsset("videos/Adverto_Landscape.mp4"),
  centerVideo: s3AdvertoAsset("videos/Center_Video.mp4"),
};

export const s3ServiceVideos = {
  horizontal: [
    "IMG_1816.MOV",
    "Img 0880.mp4",
    "Img 0867.mp4",
    "Img 0881.mp4",
    "Img 0868.mp4",
    "IMG_1817.MOV",
    "Img 0882.mp4",
    "Img 0883.mp4",
    "Img 0865.mp4",
    "Img 0871.mp4",
    "Img 0870.mp4",
  ].map((fileName) => s3AdvertoAsset(`videos/horizontal/${fileName}`)),
  vertical: [
    "Img 1780.mp4",
    "Img 0884.mp4",
    "IMG_1818.MOV",
    "Img 0887.mp4",
    "Img 1781.mp4",
    "IMG_1820.MOV",
    "Img 0889.mp4",
    "Img 0890.mp4",
    "IMG_1821.MOV",
    "Img 0886.mp4",
    "Img 1784.mp4",
    "Img 1783.mp4",
    "Img 0885.mp4",
    "Img 1786.mp4",
    "Img 1782.mp4",
    "Vertical-Video.mp4",
    "Img 0888.mp4",
    "Img 1788.mp4",
    "Img 1776.mp4",
    "Img 1775.mp4",
  ].map((fileName) => s3AdvertoAsset(`videos/vertical/${fileName}`)),
};

export const s3Logo = (fileName) => s3AdvertoAsset(`client_logos/${fileName}`);

export const s3Manifest = {
  "Banners": [
    "service-card-banner.jpg",
    "Services-banner.jpg",
    "Squad-bg-banner.webp",
    "SQUAD-MOBILE-VIEW.webp",
    "Team-banner.jpg"
  ],
  "Home": {
    "1200 x 1200": [
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
      "19.jpg",
      "20.jpg",
      "21.jpg",
      "22.jpg",
      "23.jpg",
      "24.jpg",
      "25.jpg",
      "26.jpg",
      "27.jpg",
      "28.jpg",
      "29.jpg",
      "30.jpg",
      "31.jpg"
    ],
    "1200 x 900": [
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
      "23.jpg",
      "24.jpg",
      "25.jpg",
      "26.jpg"
    ]
  },
  "Portfolio": {
    "11_CORE": [
      "11 CORE-01.jpg",
      "11 CORE-02.jpg",
      "11 CORE-03.jpg",
      "11 CORE-04.jpg",
      "11 CORE-05.jpg",
      "11 CORE-06.jpg",
      "11 CORE-07.jpg",
      "11 CORE-08.jpg",
      "11 CORE-09.jpg",
      "11 CORE-10.jpg",
      "11 CORE-11.jpg",
      "11 CORE-12.jpg",
      "11 CORE-13.jpg",
      "11 CORE-14.jpg",
      "cover/cover.jpg"
    ],
    "AL_SAMA": [
      "al sama-01.webp",
      "al sama-02.webp",
      "al sama-03.webp",
      "al sama-04.webp",
      "al sama-05.webp",
      "al sama-06.webp",
      "al sama-08..webp",
      "al sama-09.webp",
      "al sama-10.webp",
      "al sama-11.webp",
      "al sama-12.webp",
      "al sama-13.webp",
      "Cover/cover copy.webp"
    ],
    "ARAB_SEASON": [
      "Cover/cover copy.webp",
      "Untitled-1-01.webp",
      "Untitled-1-02.webp",
      "Untitled-1-03.webp",
      "Untitled-1-04.webp",
      "Untitled-1-05.webp",
      "Untitled-1-06.webp",
      "Untitled-1-07.webp",
      "Untitled-1-08.webp",
      "Untitled-1-09.webp"
    ],
    "ASIR": [
      "asir copy-01.webp",
      "asir copy-02.webp",
      "asir copy-03.webp",
      "asir copy-04.webp",
      "asir copy-06.webp",
      "asir copy-07.webp",
      "asir copy-08.webp",
      "asir copy-09.webp",
      "asir copy-10.webp",
      "asir copy-11.webp",
      "Cover/cover copy.webp"
    ],
    "AYAN_CUPPA": [
      "AYAN CUPPA 02-1.webp",
      "AYAN CUPPA 02-2.webp",
      "AYAN CUPPA 02-3.webp",
      "AYAN CUPPA 02-4.webp",
      "AYAN CUPPA 02-5.webp",
      "AYAN CUPPA 02-6.webp",
      "AYAN CUPPA 02-7.webp",
      "AYAN CUPPA 02-8.webp",
      "AYAN CUPPA 02-9.webp",
      "AYAN CUPPA 02-10.webp",
      "AYAN CUPPA 02-11.webp",
      "Cover/cover copy.webp"
    ],
    "AZBERY": [
      "Cover/cover copy.webp",
      "Untitled-1-01.webp",
      "Untitled-1-02.webp",
      "Untitled-1-03.webp",
      "Untitled-1-04.webp",
      "Untitled-1-05.webp",
      "Untitled-1-06.webp",
      "Untitled-1-07.webp",
      "Untitled-1-08.webp",
      "Untitled-1-09.webp",
      "Untitled-1-10.webp",
      "Untitled-1-11.webp",
      "Untitled-1-12.webp",
      "Untitled-1-13.webp",
      "Untitled-1-14.webp"
    ],
    "BELANTO": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "10.webp",
      "11.webp",
      "Cover/cover copy.webp"
    ],
    "BERU": [
      "01.webp",
      "02.webp",
      "03.webp",
      "04.webp",
      "05.webp",
      "06.webp",
      "07.webp",
      "08.webp",
      "Cover/cover.webp"
    ],
    "BRIDEX": [
      "01.webp",
      "02.webp",
      "03.webp",
      "04.webp",
      "05.webp",
      "06.webp",
      "07.webp",
      "Cover/cover copy.webp"
    ],
    "CHAI_KAIF": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "10.webp",
      "11.webp",
      "12.webp",
      "13.webp",
      "14.webp",
      "15.webp",
      "16.webp",
      "17.webp",
      "Cover/cover copy.webp"
    ],
    "CHARUTHA": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "10.webp",
      "Cover/cover copy.webp"
    ],
    "CREVO": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "10.webp",
      "11.webp",
      "12.webp",
      "13.webp",
      "14.webp",
      "15.webp",
      "16.webp",
      "17.webp",
      "Cover/cover copy.webp"
    ],
    "DAREX": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "10.webp",
      "11.webp",
      "12.webp",
      "13.webp",
      "14.webp",
      "Cover/cover copy.webp"
    ],
    "DESIGN_MARBLE_GRANITE": [
      "Cover/cover.jpg",
      "Design-01.jpg",
      "Design-02.jpg",
      "Design-03.jpg",
      "Design-04.jpg",
      "Design-05.jpg",
      "Design-06.jpg",
      "Design-07.jpg",
      "Design-08.jpg",
      "Design-09.jpg",
      "Design-10.jpg",
      "Design-11.jpg",
      "Design-12.jpg"
    ],
    "FINS": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "Cover/cover copy.webp"
    ],
    "GOVOYAJO": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "10.webp",
      "Cover/cover copy.webp"
    ],
    "HALO_HIVE": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "10.webp",
      "11.webp",
      "12.webp",
      "13.webp",
      "14.webp",
      "15.webp",
      "16.webp",
      "17.webp",
      "18.webp",
      "19.webp",
      "20.webp",
      "21.webp",
      "22.webp",
      "23.webp",
      "24.webp",
      "25.webp",
      "26.webp",
      "27.webp",
      "28.webp",
      "29.webp",
      "30.webp",
      "Cover/cover copy.webp"
    ],
    "HANDSTROM": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "cover/cover copy.webp"
    ],
    "KM": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "10.webp",
      "Cover/cover copy.webp"
    ],
    "Mistwish": [
      "Cover/mist.D.webp",
      "mist 1.webp",
      "mist 2.webp",
      "mist 3.webp",
      "mist 4.webp",
      "mist 5.webp",
      "mist 6.webp",
      "mist 7.webp",
      "mist 8.webp",
      "mist 9.webp",
      "mist 10.webp",
      "mist 11.webp",
      "mist 12.webp",
      "mist 13.webp",
      "mist 14.webp",
      "mist 15.webp",
      "mist 16.webp"
    ],
    "NEVEU": [
      "COVER/Cover.webp",
      "NEVU 1.webp",
      "NEVU 2.webp",
      "NEVU 3.webp",
      "NEVU 4.webp",
      "NEVU 5.webp",
      "NEVU 6.webp",
      "NEVU 7.webp",
      "NEVU 8.webp",
      "NEVU 9.webp"
    ],
    "ORLO": [
      "Branding-01.jpg",
      "Branding-02.jpg",
      "Branding-03.jpg",
      "Branding-04.jpg",
      "Branding-05.jpg",
      "Branding-06.jpg",
      "Branding-07.jpg",
      "Branding-08.jpg",
      "Branding-09.jpg",
      "Cover/cover.jpg"
    ],
    "POTAGO": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "Cover/cover copy.webp"
    ],
    "PRIME_EDGE": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "10.webp",
      "11.webp",
      "Cover/cover copy.webp"
    ],
    "QUOON": [
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
      "Cover/cover.jpg"
    ],
    "RICH_MOUNT": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "Cover/cover copy.webp"
    ],
    "ROYAL_FITNESS": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "Cover/cover copy.webp"
    ],
    "SOMA_BEACH": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "Cover/cover copy.webp"
    ],
    "SORA": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "10.webp",
      "11.webp",
      "12.webp",
      "13.webp",
      "14.webp",
      "Cover/cover copy.webp"
    ],
    "SUMMER_SLATE": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "Cover/cover (1).webp"
    ],
    "Spices_Global": [
      "BRANDING SPICES-01-01.webp",
      "BRANDING SPICES-01-02.webp",
      "BRANDING SPICES-01-03.webp",
      "BRANDING SPICES-01-04.webp",
      "BRANDING SPICES-01-05.webp",
      "BRANDING SPICES-01-06.webp",
      "BRANDING SPICES-01-07.webp",
      "BRANDING SPICES-01-08.webp",
      "BRANDING SPICES-01-09.webp",
      "BRANDING SPICES-01-10.webp",
      "BRANDING SPICES-01-11.webp",
      "cover/cover.webp"
    ],
    "THAVALA": [
      "Cover/thavala cover.webp",
      "THAVALA 1.webp",
      "THAVALA BRAND 2.webp",
      "THAVALA BRAND 3.webp",
      "THAVALA BRAND 4.webp",
      "THAVALA BRAND 5.webp",
      "THAVALA BRAND 6.webp",
      "THAVALA BRAND 7.webp",
      "THAVALA BRAND 8.webp",
      "THAVALA BRAND 9.webp",
      "THAVALA BRAND 10.webp",
      "THAVALA BRAND 11.webp",
      "THAVALA BRAND 12.webp",
      "THAVALA BRAND 13.webp"
    ],
    "UNDER_DAWG": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "10.webp",
      "Cover/cover copy.webp"
    ],
    "WATER_CAN": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "Cover/water-cover.webp"
    ],
    "YUJA": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "Cover/cover copy.webp"
    ],
    "ZIVA": [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "Cover/cover copy.webp"
    ],
    "orlands": [
      "cover/COVER OR.webp",
      "OR 1.webp",
      "OR 2.webp",
      "OR 3.webp",
      "OR 4.webp",
      "OR 5.webp",
      "OR 6.webp",
      "OR 7.webp",
      "OR 8.webp",
      "OR 9.webp"
    ]
  },
  "campaigns": [
    "01.jpg",
    "01.webp",
    "02.jpg",
    "02.webp",
    "03.jpg",
    "03.webp",
    "04.jpg",
    "04.webp",
    "05.jpg",
    "05.webp",
    "06.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "10.jpg"
  ],
  "client_logos": [
    "300Asset 1u.png",
    "500Asset 1.png",
    "500Asset 1t.png",
    "500Asset 1tt.png",
    "500Asset 1yy.png",
    "500Asset 2.png",
    "500Asset 2t.png",
    "500Asset 4.png",
    "500Asset 28.png",
    "Asset 1.png",
    "Asset 1@4x.png",
    "Asset 1@500x.png",
    "Asset 2.png",
    "Asset 2@4x.png",
    "Asset 2@500x.png",
    "Asset 3.png",
    "Asset 4.png",
    "Asset 5.png",
    "Asset 6.png",
    "Asset 7.png",
    "Asset 8.png",
    "Asset 9.png",
    "Asset 10.png",
    "Asset 12.png",
    "Asset 13.png",
    "Asset 14.png",
    "Asset 16.png",
    "Asset 17.png",
    "Asset 18.png",
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
    "ayan@500x.png",
    "design.png",
    "fira logoy.png",
    "Jerrys-Educare-HD.png",
    "LOGOS-12.png",
    "PNG.png",
    "sora.png",
    "sss.png",
    "tiara logo1y.png"
  ],
  "teams": [
    "ABY.jpg",
    "AJIN.jpg",
    "ALPHY.jpg",
    "ameen.jpg",
    "ashi.jpg",
    "ASHIF.jpeg",
    "fabis.jpg",
    "navas ..jpg",
    "navo.jpeg",
    "shihab.jpg"
  ],
  "videos": {
    "root": [
      "Adverto_Landscape.mp4",
      "Adverto_Portrait.mp4",
      "Center_Video.mp4"
    ],
    "horizontal": [
      "Img 0864.mp4",
      "Img 0865.mp4",
      "Img 0866.mp4",
      "Img 0867.mp4",
      "Img 0868.mp4",
      "Img 0870.mp4",
      "Img 0871.mp4",
      "Img 0880.mp4",
      "Img 0881.mp4",
      "Img 0882.mp4",
      "Img 0883.mp4",
      "IMG_1816.MOV",
      "IMG_1817.MOV"
    ],
    "vertical": [
      "Img 0884.mp4",
      "Img 0885.mp4",
      "Img 0886.mp4",
      "Img 0887.mp4",
      "Img 0888.mp4",
      "Img 0889.mp4",
      "Img 0890.mp4",
      "Img 1775.mp4",
      "Img 1776.mp4",
      "Img 1780.mp4",
      "Img 1781.mp4",
      "Img 1782.mp4",
      "Img 1783.mp4",
      "Img 1784.mp4",
      "Img 1786.mp4",
      "Img 1788.mp4",
      "IMG_1818.MOV",
      "IMG_1820.MOV",
      "IMG_1821.MOV",
      "Vertical-Video.mp4"
    ]
  }
};
