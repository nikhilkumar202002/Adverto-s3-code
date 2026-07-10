"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type CustomSelectProps = {
  label: string;
  name: string;
  placeholder: string;
  options: string[];
  required?: boolean;
};

export default function CustomSelect({
  label,
  name,
  placeholder,
  options,
  required = true,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const wrapperRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <label ref={wrapperRef} className="relative block">
      <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-white/35">
        {label}
      </span>

      <input
        name={name}
        type="text"
        value={selectedValue}
        readOnly
        required={required}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px opacity-0"
        onInvalid={() => setIsOpen(true)}
      />

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex h-14 w-full items-center justify-between gap-3 rounded-[20px] border bg-black/30 px-4 text-left text-[16px] outline-none transition-colors ${
          isOpen
            ? "border-[#0000FF] shadow-[0_0_0_1px_rgba(0,0,255,0.45)]"
            : "border-white/10 hover:border-white/25"
        }`}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className={selectedValue ? "text-white" : "text-white/35"}>
          {selectedValue || placeholder}
        </span>
        <ChevronDown
          size={18}
          strokeWidth={1.8}
          className={`shrink-0 text-white transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#0000FF]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-40 overflow-hidden rounded-[20px] border border-white/10 bg-[#050505]/95 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-md">
          <div
            role="listbox"
            aria-label={label}
            className="overflow-visible"
          >
            {options.map((option) => {
              const isSelected = selectedValue === option;

              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`flex w-full items-center justify-between gap-3 rounded-[14px] px-4 py-3 text-left text-[15px] transition-colors ${
                    isSelected
                      ? "bg-[#0000FF] text-white"
                      : "bg-black/30 text-white/70 hover:bg-black/50 hover:text-white"
                  }`}
                  onClick={() => {
                    setSelectedValue(option);
                    setIsOpen(false);
                  }}
                >
                  <span>{option}</span>
                  {isSelected && <Check size={16} strokeWidth={2} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </label>
  );
}
