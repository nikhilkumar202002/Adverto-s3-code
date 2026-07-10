"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

type ProjectGalleryProps = {
  images: string[];
  title: string;
  gridClassName?: string;
  itemClassName?: string;
};

type GalleryItemProps = {
  image: string;
  index: number;
  title: string;
  onOpen: () => void;
  itemClassName?: string;
};

function GalleryItem({ image, index, title, onOpen, itemClassName = "" }: GalleryItemProps) {
  const itemRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [rowSpan, setRowSpan] = useState(24);

  const updateRowSpan = useCallback(() => {
    const item = itemRef.current;
    const img = imageRef.current;

    if (!item || !img) {
      return;
    }

    const grid = item.parentElement;
    const gridStyles = grid ? window.getComputedStyle(grid) : null;
    const rowHeight = gridStyles
      ? Number.parseFloat(gridStyles.getPropertyValue("grid-auto-rows"))
      : 8;
    const rowGap = gridStyles
      ? Number.parseFloat(gridStyles.getPropertyValue("row-gap"))
      : 6;
    const safeRowHeight = Number.isFinite(rowHeight) && rowHeight > 0 ? rowHeight : 8;
    const safeRowGap = Number.isFinite(rowGap) ? rowGap : 6;
    const nextRowSpan = Math.ceil(
      (img.getBoundingClientRect().height + safeRowGap) /
        (safeRowHeight + safeRowGap),
    );

    setRowSpan(Math.max(nextRowSpan, 1));
  }, []);

  useEffect(() => {
    updateRowSpan();

    const resizeObserver = new ResizeObserver(updateRowSpan);
    if (itemRef.current) {
      resizeObserver.observe(itemRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateRowSpan]);

  return (
    <button
      ref={itemRef}
      type="button"
      onClick={onOpen}
      style={{ gridRowEnd: `span ${rowSpan}` }}
      className={`group relative w-full overflow-hidden rounded-[20px] bg-[#0A0A0A] text-left ${itemClassName}`}
      aria-label={`Open ${title} gallery image ${index + 1}`}
    >
      <img
        ref={imageRef}
        src={image}
        alt={`${title} gallery ${index + 1}`}
        loading="lazy"
        decoding="async"
        onLoad={updateRowSpan}
        className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/35" />
      <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center bg-[#0000FF] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Expand size={16} />
      </span>
    </button>
  );
}

export default function ProjectGallery({
  images,
  title,
  gridClassName = "grid-cols-2 gap-[10px] md:gap-[20px] xl:grid-cols-3",
  itemClassName = "",
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  const closeGallery = () => setActiveIndex(null);
  const showPrevious = () => {
    setActiveIndex((index) =>
      index === null ? index : (index - 1 + images.length) % images.length,
    );
  };
  const showNext = () => {
    setActiveIndex((index) =>
      index === null ? index : (index + 1) % images.length,
    );
  };

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <>
      <div className={`grid items-start [grid-auto-rows:8px] ${gridClassName}`}>
        {images.map((image, index) => (
          <GalleryItem
            key={`${image}-${index}`}
            image={image}
            index={index}
            title={title}
            itemClassName={itemClassName}
            onOpen={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {activeImage && activeIndex !== null ? (
        <div
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery image viewer`}
        >
          <button
            type="button"
            onClick={closeGallery}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-white/20 bg-black/50 text-white transition-colors hover:border-white md:right-8 md:top-8"
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/50 text-white transition-colors hover:border-white md:left-8"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/50 text-white transition-colors hover:border-white md:right-8"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </>
          ) : null}

          <div className="flex h-full w-full max-w-6xl flex-col items-center justify-center gap-4">
            <img
              src={activeImage}
              alt={`${title} gallery ${activeIndex + 1}`}
              loading="lazy"
              decoding="async"
              className="max-h-[82vh] w-auto max-w-full object-contain"
            />
            <p className="text-sm text-white/60">
              {activeIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
