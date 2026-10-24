import { s3HomePortfolioTiles } from "./s3Assets.js";

const splitEveryOther = (items, startIndex) =>
  items.filter((_, index) => index % 2 === startIndex);

const squareTiles = s3HomePortfolioTiles.square.slice().reverse();
const landscapeTiles = s3HomePortfolioTiles.landscape.slice().reverse();

export const featuredPortfolioTiles = {
  leftTop: {
    intervalMs: 1200,
    projects: splitEveryOther(squareTiles, 0),
  },
  leftBottom: {
    intervalMs: 1500,
    projects: splitEveryOther(landscapeTiles, 0),
  },
  rightTop: {
    intervalMs: 1800,
    projects: splitEveryOther(landscapeTiles, 1),
  },
  rightBottom: {
    intervalMs: 2100,
    projects: splitEveryOther(squareTiles, 1),
  },
};
