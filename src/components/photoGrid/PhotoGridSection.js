"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import Link from "next/link";

const images = [
  { src: "/1.jpg", caption: "Escena en exteriores" },
  { src: "/2.jpg", caption: "Producto en estudio de alta definición" },
  { src: "/3.jpg", caption: "Retrato artístico para portada de álbum" },
  { src: "/4.jpg", caption: "Visuales en acción para evento multimedia" },
];

export default function DoubleSliderBanner() {
  const [current, setCurrent] = useState(0);
  const visibleImages = 2;
  const totalImages = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalImages);
    }, 3500);
    return () => clearInterval(interval);
  }, [totalImages]);

  const getTranslateX = () => {
    return `-${(current * 100) / visibleImages}%`;
  };

  return (
    <div className="w-full overflow-hidden relative">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(${getTranslateX()})`,
          width: `${(totalImages / visibleImages) * 100}%`,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="w-1/2 aspect-[16/5] relative flex-shrink-0 overflow-hidden group"
          >
            <Image
              src={img.src}
              alt={img.caption}
              fill
              className="object-cover"
              sizes="50vw"
            />

            {/* Gradiente de abajo más agresivo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent z-10" />

            {/* Texto + icono en esquina inferior derecha */}
            <div className="absolute bottom-0 right-0 p-4 flex items-end gap-3 z-20">
              <Link
                href="/galeria"
                className="flex items-center gap-3 text-white group-hover:text-orange-400 transition-colors duration-300"
              >
                <Eye className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-xl" />
                <p className="text-lg sm:text-3xl font-extrabold leading-tight max-w-[35vw] break-words drop-shadow-md hover:text-orange-400 transition-colors duration-300">
                  {img.caption}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
