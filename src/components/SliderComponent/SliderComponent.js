import { useEffect, useState } from "react";
import Link from "next/link";
import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import { ArrowRight } from "lucide-react";

export default function SliderComponent({ items = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = items.length;

  // Detecta si estamos en desktop (>768px)
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Avanza currentIndex para rotar cards infinitamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(interval);
  }, [total]);

  // Ancho card fijo según breakpoint
  const cardWidth = isDesktop ? 320 + 16 : 220 + 16; // 16px gap incluido

  // Extiende items para loop infinito (3 veces)
  const extendedItems = [...items, ...items, ...items];

  // Calcula translateX para centrar card activa
  // En desktop la card activa va en posición 1 (la segunda card visible)
  // En móvil card activa va en posición 0 (primera visible)
  const translateX = isDesktop
    ? -(currentIndex + total) * cardWidth + cardWidth
    : -currentIndex * cardWidth;

  return (
    // Contenedor full width sin max-width ni centrado
    <div className="w-full overflow-hidden relative">
      <div
        className="flex gap-4"
        style={{
          width: extendedItems.length * cardWidth,
          transform: `translateX(${translateX}px)`,
          transition: "transform 0.8s ease",
        }}
      >
        {extendedItems.map((item, index) => {
          const realIndex = index % total;
          const diff = Math.abs(realIndex - currentIndex);
          const circularDiff = Math.min(diff, total - diff);

          // Zoom y opacidad para card activa
          const scale = circularDiff === 0 ? 1.05 : 1;
          const opacity = circularDiff === 0 ? 1 : 0.6;

          return (
            <Link
              key={index}
              href={`/portfolio/${item.slug}`}
              className="relative rounded-2xl flex flex-col justify-end border border-white/20 overflow-hidden backdrop-blur-sm transition-transform duration-700 ease-in-out"
              style={{
                width: isDesktop ? 320 : 220,
                aspectRatio: "16 / 9",
                transform: `scale(${scale})`,
                opacity,
                transition: "transform 0.8s ease, opacity 0.8s ease",
                flexShrink: 0,
                marginRight: 16,
                cursor: "pointer",
              }}
            >
              {/* Fondo video */}
              {item.video && (
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center rounded-2xl"
                  style={{ backgroundImage: `url(${item.video})` }}
                />
              )}

              {/* Overlay oscuro para separar texto del video */}
              <div className="absolute inset-0 bg-black/80 rounded-2xl z-10" />

              {/* Contenido */}
              <div className="relative z-20 flex flex-col gap-2 px-5 pb-5 text-center">
                <TypewriterTitle
                  text={item.title}
                  as="h3"
                  size="text-lg sm:text-xl"
                  className="font-semibold leading-[1.1] bg-gradient-to-r from-white to-violet-400 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                  loop={false}
                  speed={150}
                />
                <TypewriterTitle
                  text={item.description}
                  as="p"
                  size="text-xs sm:text-sm"
                  className="font-light text-white/80 leading-[1.2] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                  loop={false}
                  speed={180}
                />
                <div className="mt-2 flex justify-center">
                  <ArrowRight className="w-5 h-5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
