"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import AOS from "aos";
import "aos/dist/aos.css";

export default function SuperBanner({ items, subtitle = "SERVICIOS AUDIOVISUALES" }) {
  const [displayedItem, setDisplayedItem] = useState(items[0]);
  const [nextItem, setNextItem] = useState(items[0]);
  const [isFading, setIsFading] = useState(false);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef(null);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const fadeTo = (item, index) => {
    setNextItem(item);
    setIsFading(true);
    setTimeout(() => {
      setDisplayedItem(item);
      setIsFading(false);
      AOS.refresh();
    }, 500);
    if (typeof index === "number") {
      currentIndexRef.current = index;
    }
  };

  const nextAutoItem = () => {
    const nextIndex = (currentIndexRef.current + 1) % items.length;
    const next = items[nextIndex];
    fadeTo(next, nextIndex);
  };

  useEffect(() => {
    AOS.init({ once: false });
    intervalRef.current = setInterval(nextAutoItem, 7000);
    return () => clearInterval(intervalRef.current);
  }, [items]);

  // Scroll infinito JS sin saltos ni reset
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    if (!isMobile) return;

    let speed = 0.5;

    const scroll = () => {
      container.scrollLeft += speed;
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationRef.current);
  }, [isMobile]);

  return (
    <div className="w-full relative h-[90vh] overflow-hidden flex flex-col justify-end text-white">

      {/* Imagen actual */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'} z-0`}
        style={{
          backgroundImage: `url(${displayedItem.video})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Imagen próxima */}
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
      {!isFading && (
        <div className="relative z-10 flex flex-col gap-1 max-w-5xl mb-5 p-3 md:p-10 md:mb-40 xl:pl-40 xl:mb-10 xl:px-12 xl:justify-center" key={displayedItem.slug}>
          <p
            className="text-xl md:text-2xl font-light text-white/80 tracking-wide pl-2"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            {subtitle}
          </p>

          <div data-aos="fade-down" data-aos-delay="200">
            <TypewriterTitle text={nextItem.title} as="h1" size="text-5xl md:text-7xl lg:text-6xl leading-[0.9] mt-0 pt-1" loop={false} />
          </div>

          <div className='items-end' data-aos="fade-down" data-aos-delay="300">
            <Link
              href={nextItem.slug}
              className="relative flex justify-center items-center p-3 px-5 border border-white text-white text-base font-medium rounded-md overflow-hidden group transition-all duration-300 hover:scale-105 w-56 mt-4"
            >
              <span className="relative z-10 leading-[0.9] text-center md:text-xl">Ver servicio</span>
              <ArrowRight
                size={20}
                className="m-1 z-10 transition-transform duration-300 group-hover:translate-x-1"
              />
              <span className="absolute inset-0 opacity-30 group-hover:opacity-50 transition duration-500 animate-gradient-x rounded-md" />
            </Link>
          </div>
        </div>
      )}

      {/* Cards slider */}
      {/* Mobile: scroll infinito controlado con JS */}
      <div className="w-full overflow-hidden md:hidden z-100">
        <div
          ref={scrollRef}
          className="flex flex-row gap-2 pt-6 pb-5 overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: "auto" }}
        >
          {items.concat(items).map((item, i) => (
            <Link
              href={item.slug}
              key={`${item.slug}-${i}`}
              className="group relative flex-shrink-0 w-48 aspect-video rounded-md border border-white/20 overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{
                backgroundImage: `url(${item.video})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="absolute inset-0 transition duration-300 md:group-hover:bg-black/30"
                style={{ backgroundColor: isMobile ? "transparent" : "rgba(0,0,0,0.5)" }}
              />
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-sm font-medium text-white">
                <span>{item.title}</span>
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop: todas las cards visibles sin animación */}
      <div className="w-full p-5 relative z-10 hidden md:flex flex-wrap md:wrap-3 gap-2 lg:gap-4 pt-6 pb-5 justify-center items-center">
        {items.map((item) => (
          <Link
            href={item.slug}
            key={item.slug}
            className="group relative flex-shrink-0 w-52 lg:w-60 aspect-video rounded-md border border-white/20 overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{
              backgroundImage: `url(${item.video})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition duration-300" />
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-sm font-medium text-white">
              <span>{item.title}</span>
              <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
