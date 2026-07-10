import React from "react";

export default function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-screen"
      style={{ backgroundImage: "url('/noise.svg')" }}
    />
  );
}
