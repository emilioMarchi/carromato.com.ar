"use client";

import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function FeaturedWorkBanner({ items = [], interval = 7000, mode = "banner" }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Cambia solo si hay items
  useEffect(() => {
    if (items.length === 0) return;

    const autoChange = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(autoChange);
  }, [items, interval]);

  if (!items.length) return null;

  const currentItem = items[activeIndex];

  return (
    <div className="overflow-hidden relative h-[90vh] md:h-[90vh] w-full md:px-10 lg:px-10">
      {/* Fondo con GIF */}
      <div
        className="absolute inset-0 h-full bg-center bg-cover transition-all duration-700"
        style={{
          backgroundImage: `url(${currentItem.video})`,
        }}
      />

      {/* Gradiente overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />

      {/* Contenido */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-end md:justify-between h-full p-5 pb-10">
        <div className="md:w-[75%] lg:w-[50%] flex flex-col gap-4 text-white pb-25 pt-[30vh] md:pt-0 lg:pb-0">
          {/* Solo mostrar en modo banner */} 
          {mode === "portfolio" && (
            <p className="text-lg md:text-2xl lg:text-lg uppercase tracking-widest text-gray-400">
              Trabajo destacado
            </p>
          )}

          <TypewriterTitle
            key={activeIndex}
            text={currentItem.title}
            as="h2"
            size="text-4xl md:text-7xl lg:text-5xl"
            className="font-extrabold leading-[0.9]"
            speed={180}
            loop={false}
          />

          <p className="text-xl md:text-3xl lg:text-xl text-gray-300 leading-[1]">
            {currentItem.description}
          </p>

          {/* Solo mostrar botón en modo portfolio y si hay slug */}
          {mode === "portfolio" && currentItem.slug && (
            <Link
            href={currentItem.slug}
            className="relative inline-block px-6 py-3 mt-2 border border-orange-400 text-white text-lg md:text-2xl lg:text-xl font-semibold uppercase rounded-full overflow-hidden group w-fit md:self-start transition-transform duration-300 hover:scale-105"
          >
            <span className="relative z-10">Ver proyecto</span>
            <span className="absolute inset-0 opacity-20 group-hover:opacity-40 transition duration-500 animate-gradient-x rounded-full"></span>
          </Link>
          
          )}
        </div>

        {/* Botoncitos de cambio */}
        <div className="flex md:flex-col gap-2 mt-6 md:mt-0">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-4 h-4 rounded-full border transition-all duration-300 ${
                index === activeIndex
                  ? "bg-orange-400 border-orange-400"
                  : "border-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
