"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import Container from "../common/Container";

const content = [
  "Adverto is a creative and digital growth agency that helps businesses grow with clarity, consistency, and measurable results.",
  "Through branding, content, design, and digital marketing, we help businesses communicate more effectively, strengthen their presence, and connect with the right audience.",
  "Rather than relying on one-size-fits-all solutions, we take the time to understand each brand's goals, audience, and position in the market. This allows us to create strategies and creative solutions that deliver meaningful value and support long-term growth.",
];

type RevealCharacterProps = {
  children: string;
  index: number;
  progress: MotionValue<number>;
  total: number;
};

function RevealCharacter({
  children,
  index,
  progress,
  total,
}: RevealCharacterProps) {
  const revealStart = 0.08;
  const revealEnd = 0.9;
  const characterProgress = index / Math.max(total - 1, 1);
  const start = revealStart + characterProgress * (revealEnd - revealStart);
  const end = Math.min(start + 0.03, 0.96);
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(255,255,255,0.24)", "rgba(255,255,255,1)"]
  );

  return <motion.span style={{ color }}>{children}</motion.span>;
}

export default function AboutScrolling() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 90%"],
  });

  const paragraphs = useMemo(() => {
    const paragraphWords = content.map((paragraph) => paragraph.split(" "));

    return paragraphWords.map((words, paragraphIndex) => {
      const previousParagraphCharacters = paragraphWords
        .slice(0, paragraphIndex)
        .reduce(
          (total, paragraph) =>
            total + paragraph.reduce((sum, word) => sum + word.length, 0),
          0
        );

      return words.map((word, wordIndex) => {
        const previousWordCharacters = words
          .slice(0, wordIndex)
          .reduce((total, previousWord) => total + previousWord.length, 0);

        return word.split("").map((character, characterIndex) => ({
          character,
          index:
            previousParagraphCharacters +
            previousWordCharacters +
            characterIndex,
        }));
      });
    });
  }, []);

  const totalCharacters = useMemo(
    () =>
      paragraphs.reduce(
        (paragraphTotal, paragraph) =>
          paragraphTotal +
          paragraph.reduce((wordTotal, word) => wordTotal + word.length, 0),
        0
      ),
    [paragraphs]
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#030303] py-24"
    >
      <Container className="relative flex min-h-screen items-center">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-3">
            <p className="flex items-center gap-3 text-[13px] uppercase tracking-[0.16em] text-[#0000FF]">
              <span className="h-[1px] w-[34px] bg-[#0000FF]" />
              Who We Are
            </p>
          </div>

          <div className="lg:col-span-9">
            <div className="max-w-[980px] text-[30px] font-normal leading-[1.12] tracking-[-0.025em] md:text-[40px] lg:text-[45px]">
              {paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="mb-8 last:mb-0">
                  {paragraph.map((word, wordIndex) => (
                    <span key={`${paragraphIndex}-${wordIndex}`}>
                      <span className="inline-block">
                        {word.map(({ character, index }) => (
                          <RevealCharacter
                            key={`${character}-${index}`}
                            index={index}
                            progress={scrollYProgress}
                            total={totalCharacters}
                          >
                            {character}
                          </RevealCharacter>
                        ))}
                      </span>{" "}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
