"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { TypewriterTitle } from "@/helpers/TypewriterEfect";

export default function SuperBanner({ items, subtitle = "SERVICIOS AUDIOVISUALES" }) {
  const [displayedItem, setDisplayedItem] = useState(items[0]); // Imagen actual
  const [nextItem, setNextItem] = useState(items[0]); // Imagen próxima (hover o auto)
  const [isFading, setIsFading] = useState(false);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef(null);

  const fadeTo = (item) => {
    setNextItem(item);
    setIsFading(true);
    setTimeout(() => {
      setDisplayedItem(item);
      setIsFading(false);
    }, 500);
  };

  const nextAutoItem = () => {
    const nextIndex = (currentIndexRef.current + 1) % items.length;
    const next = items[nextIndex];
    fadeTo(next);
    currentIndexRef.current = nextIndex;
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextAutoItem, 5000);
    return () => clearInterval(intervalRef.current);
  }, [items]);

  const handleMouseEnter = (item) => {
    clearInterval(intervalRef.current);
    fadeTo(item);
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(nextAutoItem, 5000);
  };

  return (
    <div className="w-full relative h-[80vh] overflow-hidden flex flex-col justify-end text-white p-10 pt-20">

      {/* Imagen actual */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'} z-0`}
        style={{
          backgroundImage: `url(${displayedItem.video})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Imagen próxima (solo durante el fade) */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isFading ? 'opacity-100' : 'opacity-0'} z-0`}
        style={{
          backgroundImage: `url(${nextItem.video})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div
        className="absolute inset-0 z-5 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col gap-2 max-w-5xl mb-5">
        <div className="p-8">
          <p className="text-sm font-light text-white/80 tracking-wide">{subtitle}</p>
          <TypewriterTitle text={nextItem.title} as="h1" size="text-6xl" loop={false} />

          <Link
            href={nextItem.slug}
            className="relative flex justify-center items-center p-3 px-5 border border-white text-white text-base font-medium rounded-md overflow-hidden group transition-all duration-300 hover:scale-105 w-56 mt-4"
          >
            <span className="relative z-10 leading-[0.9] text-center">Ver servicio</span>
            <ArrowRight
              size={20}
              className="m-1 z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
            <span className="absolute inset-0 opacity-30 group-hover:opacity-50 transition duration-500 animate-gradient-x rounded-md" />
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 p-4 pt-0">
        {items.map((item, index) => (
          <Link
            href={item.slug}
            key={item.slug}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
            className="group relative flex-shrink-0 w-40 aspect-video rounded-md border border-white/20 overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{
              backgroundImage: `url(${item.video})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition duration-300" />
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-sm font-medium">
              <span>{item.title}</span>
              <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
