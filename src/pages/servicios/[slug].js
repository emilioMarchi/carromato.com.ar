"use client";

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { DisplaySection } from "@/components/DisplaySection/DisplaySection";
import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import { useRouter } from "next/router";
import ItemsListGrid from "@/components/itemsListGrid/ItemsListGrid";
import SliderComponent from "@/components/SliderComponent/SliderComponent";
import { FAQContactSection } from "@/components/FaqContactSection/FaqContactSection";
import { Video, Megaphone, Film, MonitorPlay, Sparkles } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serviceDetails = [
  { 
    title: "Este servicio ofrece soluciones personalizadas para mejorar la comunicación visual de tu marca."
  },
  { 
    title: "Trabajamos con tecnología de última generación para garantizar la mejor calidad en cada proyecto."
  },
  { 
    title: "Nuestro equipo creativo se adapta a tus necesidades para generar contenido impactante y efectivo."
  },
  { 
    title: "Acompañamos todo el proceso, desde la planificación hasta la entrega final, asegurando la satisfacción total."
  },
  { 
    title: "Ofrecemos asesoramiento profesional para optimizar la difusión y el alcance de tus campañas."
  },
];


const ModelSliderCardsItems = [
  { 
    slug: "video-empresarial",
    title: "Institucional EmpresaTech",
    description: "Video institucional para presentación corporativa de EmpresaTech.",
    video: "https://pandoramarketing.net/wp-content/uploads/2020/10/200.gif",
    icon: Video
  },
  { 
    slug: "publicidad",
    title: "Campaña Primavera 2025",
    description: "Serie de spots publicitarios para redes sociales de MarcaNova.",
    video: "https://miraveo.es/wp-content/uploads/2024/05/GIF1-ezgif.com-optimize-1.gif",
    icon: Megaphone
  },
  { 
    slug: "videoclips",
    title: "Videoclip 'Horizonte'",
    description: "Producción audiovisual para la banda Prisma en exteriores.",
    video: "https://static.wixstatic.com/media/ddca6c_33587a47b836449ea3534caccffc950b~mv2.gif",
    icon: Film
  },
  { 
    slug: "contenido-redes-sociales",
    title: "Contenido Verano CoolUp",
    description: "Reels y videos para la campaña estacional de CoolUp Bebidas.",
    video: "https://i.gifer.com/96e4.gif",
    icon: MonitorPlay
  },
  { 
    slug: "fx-visuales",
    title: "Visuales Evento Lumina",
    description: "Motion graphics y visuales en vivo para festival Lumina 2025.",
    video: "https://byimpetus.com/wp-content/uploads/2025/02/dreamteam-ezgif.com-optimize.gif",
    icon: Sparkles
  },
];

export default function Service() {
  const router = useRouter();
  const { slug } = router.query;

  // Convertir slug a título bonito
  const formattedTitle = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Servicio";

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 sm:p-20`}
    >
      <main className="flex flex-col items-center gap-8">
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl items-center justify-center mb-10 mt-15 md:mt-20">
          <div className="flex-1 w-full max-w-[700px]">
            <DisplaySection type="display" />
          </div>

          <div className="flex-1 flex flex-col justify-center gap-4 text-white text-center md:text-left">
            <p className="text-sm uppercase tracking-widest text-gray-400">
              Servicios Carromato
            </p>

            <TypewriterTitle text={formattedTitle} as="h1" size="text-5xl md:text-6xl" />

            <p className="text-lg text-gray-300 max-w-prose">
              Acá podés escribir una descripción breve sobre este servicio. Explicá de qué se trata, qué ofrecemos y por qué es importante para tu cliente.
            </p>

            <button className="relative inline-block px-6 py-3 border border-yellow-400 text-white text-lg font-semibold uppercase rounded-full overflow-hidden group w-fit self-center md:self-start transition-transform duration-300 hover:scale-105">
              <span className="relative z-10">Contactar servicio</span>
              <span className="absolute inset-0 opacity-20 group-hover:opacity-40 transition duration-500 animate-gradient-x rounded-full"></span>
            </button>
          </div>
        </div>

        <ItemsListGrid mode="items" items={serviceDetails} />
        <SliderComponent items={ModelSliderCardsItems} />
        <FAQContactSection />

      </main>

      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-x {
          background: linear-gradient(
            270deg,
            rgba(120, 70, 255, 0.2),
            rgba(90, 30, 210, 0.2),
            rgba(120, 70, 255, 0.2)
          );
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
      `}</style>
    </div>
  );
}
