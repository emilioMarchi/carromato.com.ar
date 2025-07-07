"use client";

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { DisplaySection } from "@/components/DisplaySection/DisplaySection";
import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ItemsListGrid from "@/components/itemsListGrid/ItemsListGrid";
import SliderComponent from "@/components/SliderComponent/SliderComponent";
import { FAQContactSection } from "@/components/FaqContactSection/FaqContactSection";
import { Video, Megaphone, Film, MonitorPlay, Sparkles } from "lucide-react";
import SuperBanner from "@/components/SuperBanner/SuperBanner";
import { ModelPortfolioItems, ModelServicesItems } from "@/data/dataModels"; // 👉 import de servicios
import ServiceHeader from "@/components/ServiceHeader/ServiceHeader";
import ServiceBanner from "@/components/ServiceBanner/ServiceBanner"
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
  // ... tu contenido actual
];

export default function Service() {
  const router = useRouter();
  const { slug } = router.query;

  const [selectedService, setSelectedService] = useState(null);

  // Buscar servicio cuando cambia el slug
  useEffect(() => {
    if (slug) {
      const foundService = ModelServicesItems.find(
        (item) => item.slug.endsWith(slug)
      );
      setSelectedService(foundService);
    }
  }, [slug]);

  // Convertir slug a título bonito
  const formattedTitle = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Servicio";

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen`}
      data-aos="fade-down"
      data-aos-delay="200"
    >
      <main className="flex flex-col items-center ">
        
        {selectedService && (
          <ServiceHeader item={selectedService} />
        )}
        <ServiceBanner slug={slug} items={ModelPortfolioItems} />
        <SliderComponent items={ModelPortfolioItems} />
     
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
