"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function SliderComponent({ items = [], title = "", titleDirection = "left" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = items.length;

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Card width: 320 desktop, 260 mobile
  const cardWidth = isDesktop ? 320 + 16 : 260 + 16;
  const extendedItems = [...items, ...items, ...items];
  const translateX = isDesktop ? -(currentIndex + total) * cardWidth + cardWidth : 0;

  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % total);

  return (
    <div className="w-full overflow-hidden relative mt-12">
      {title && (
        <h2
          className={`text-2xl md:text-4xl font-bold text-white mb-6 max-w-7xl mx-auto px-4 ${
            titleDirection === "right"
              ? "text-right"
              : titleDirection === "center"
              ? "text-center"
              : "text-left"
          }`}
        >
          {title}
        </h2>
      )}

      <div className="relative mx-auto">
        {/* Flechas arriba en desktop con más margen */}
        {isDesktop && (
          <div className="flex justify-between items-center mb-4 px-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition ml-4"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition mr-4"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        )}

        <div
          className={`flex gap-4 p-2 ${
            isDesktop ? "" : "overflow-x-auto touch-pan-x scrollbar-hide"
          }`}
          style={{
            width: isDesktop ? extendedItems.length * cardWidth : "auto",
            transform: isDesktop ? `translateX(${translateX}px)` : undefined,
            transition: "transform 0.8s ease",
          }}
        >
          {extendedItems.map((item, index) => (
            <Link
              key={index}
              href={`${item.slug}`}
              className="relative rounded-2xl flex flex-col justify-end border border-white/20 overflow-hidden backdrop-blur-sm transition-transform duration-500 ease-in-out hover:scale-105 hover:opacity-100 opacity-90"
              style={{
                width: isDesktop ? 320 : 260,
                aspectRatio: "16 / 9",
                flexShrink: 0,
                cursor: "pointer",
              }}
            >
              {item.video && (
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center rounded-2xl"
                  style={{ backgroundImage: `url(${item.video})` }}
                />
              )}

              <div className="absolute inset-0 bg-black/80 rounded-2xl z-10" />

              <div className="relative z-20 flex flex-col gap-1 px-3 pb-3 text-center">
                <TypewriterTitle
                  text={item.title}
                  as="h3"
                  size="text-sm sm:text-base"
                  className="font-semibold leading-snug bg-gradient-to-r from-white to-violet-400 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] line-clamp-2"
                  loop={false}
                  speed={140}
                />
                <TypewriterTitle
                  text={item.category}
                  as="p"
                  size="text-xs sm:text-sm"
                  className="font-light text-white/80 leading-snug drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                  loop={false}
                  speed={180}
                />
                <div className="mt-1 flex justify-center">
                  <ArrowRight className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
