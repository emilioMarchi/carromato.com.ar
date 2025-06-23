"use client";
import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import Link from "next/link";
import Image from "next/image";

export function PortfolioSectionGrid() {
  const images = [
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
  ];

  return (
    <section className="py-16 text-white relative overflow-hidden">
      <div className="w-full px-6 flex flex-col md:flex-row items-center justify-between gap-8 min-w-[90vw]">

        {/* Texto */}
        <div className="w-full md:w-[30%] space-y-6">
          <TypewriterTitle
            text="NUESTRO TRABAJO HABLA POR NOSOTROS"
            speed={150}
            as="h2"
            size="text-5xl md:text-6xl"
            className="text-white"
          />
          <Link
            href="/nosotros"
            className="text-xl md:text-2xl inline-block text-white font-bold uppercase underline underline-offset-4 decoration-2 decoration-white transition hover:text-yellow-400 hover:decoration-yellow-400"
          >
            VER MÁS
          </Link>
        </div>

        {/* Imagen rotativa elegante */}
        <div className="w-full md:w-[60%]">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl shadow-lg">
            {images.map((img, index) => (
              <Link
                key={index}
                href="/nosotros"
                className="block absolute w-full h-full animate-carousel-slide"
                style={{
                  animationDelay: `${index * 2}s`,
                  animationFillMode: "both",
                }}
              >
                <Image
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className="object-cover rounded-xl"
                />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
