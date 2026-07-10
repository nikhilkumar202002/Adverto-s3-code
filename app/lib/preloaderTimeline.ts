import gsap from "gsap";

export const BG_FADE_IN = 0.45;
export const HOLD = 0.55;
export const TRANSITION_DURATION = 1.35;
export const LOADER_FADE_OUT = 0.35;

const COVER_SAFETY_MARGIN = 48;
const BAR_FINAL_Y = 0;
const BAR_FINAL_ROTATION = 0;
const BAR_FINAL_X = 50;
const CIRCLE_FINAL_Y = 48;
const CIRCLE_FINAL_X = -30;
const BASE_CIRCLE_DIAMETER = 148;

export type PreloaderRefs = {
  container: HTMLDivElement;
  background: HTMLDivElement;
  logoGroup: HTMLDivElement;
  rectangle: HTMLDivElement;
  circle: HTMLDivElement;
};

type CreateTimelineOptions = {
  refs: PreloaderRefs;
  onComplete: () => void;
  timeScale?: number;
};

export function computeCoverScale(circleElement: HTMLElement) {
  const viewportDiagonal = Math.hypot(window.innerWidth, window.innerHeight);
  const requiredDiameter = viewportDiagonal + COVER_SAFETY_MARGIN * 2;
  const currentDiameter = circleElement.getBoundingClientRect().width || 1;
  return (requiredDiameter / currentDiameter) * 1.15;
}

function getLogoPositionScale(circleElement: HTMLElement) {
  const currentDiameter = circleElement.getBoundingClientRect().width || BASE_CIRCLE_DIAMETER;
  return currentDiameter / BASE_CIRCLE_DIAMETER;
}

export function createPreloaderTimeline({
  refs,
  onComplete,
  timeScale = 1,
}: CreateTimelineOptions) {
  const { background, logoGroup, rectangle, circle, container } = refs;
  const logoPositionScale = getLogoPositionScale(circle);
  const scaled = (value: number) => value * logoPositionScale;

  const timeline = gsap.timeline({
    paused: true,
    onComplete,
  });

  timeline.timeScale(timeScale);

  // Start with the completed logo mark in its final centered position.
  gsap.set(circle, {
    x: scaled(CIRCLE_FINAL_X),
    y: scaled(CIRCLE_FINAL_Y),
    scale: 1,
    opacity: 1,
    zIndex: 1,
    transformOrigin: "50% 50%",
  });

  gsap.set(rectangle, {
    opacity: 1,
    zIndex: 2,
    x: scaled(BAR_FINAL_X),
    rotation: BAR_FINAL_ROTATION,
    scaleX: 1,
    scaleY: 1,
    y: scaled(BAR_FINAL_Y),
    transformOrigin: "50% 100%",
  });

  gsap.set(logoGroup, {
    transformOrigin: "50% 50%",
  });
  gsap.set(background, {
    opacity: 1,
  });

  timeline
    // Hold the completed logo briefly, then use the circle as the reveal mask.
    .to({}, { duration: HOLD })
    .set(circle, {
      zIndex: 10,
    })
    .to(circle, {
      scale: () => computeCoverScale(circle),
      duration: TRANSITION_DURATION,
      ease: "power4.inOut",
    })
    .to(container, {
      opacity: 0,
      duration: LOADER_FADE_OUT,
      ease: "power1.in",
    });

  return timeline;
}
