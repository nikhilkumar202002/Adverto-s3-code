import React from "react";

interface SectionTitleProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-16 flex items-end justify-between gap-10">
      <div>
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#0000FF]">{subtitle}</p>

        <h2 className="max-w-[700px] text-6xl font-semibold leading-[0.95] tracking-[-0.05em]">{title}</h2>
      </div>
    </div>
  );
}
