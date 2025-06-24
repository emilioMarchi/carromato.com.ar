import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { DisplaySection } from "@/components/DisplaySection/DisplaySection";
import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import ItemsListGrid from "@/components/itemsListGrid/ItemsListGrid";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Services() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 sm:p-20`}
    >
      {/* Sección principal */}
      <main className="flex flex-col md:flex-row items-center gap-8 mb-20">
        <div className="w-full md:w-55%">
          <DisplaySection type="banner" />
        </div>
        {/* Bloque Izquierdo */}
        <div className="w-full md:w-45% flex justify-center md:justify-start">
          <TypewriterTitle
            text="DESARROLLO INTEGRAL DE PRODUCCIONES AUDIOVISUALES"
            as="h1"
            size="text-6xl"
            className="text-white text-center md:text-left leading-[0.9]"
            loop={false}
          />
        </div>

        {/* Bloque Derecho */}
      </main>

      {/* Sección de servicios */}
      <ItemsListGrid />
    </div>
  );
}

