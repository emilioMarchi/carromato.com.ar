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
import { ModelPortfolioItems, ModelServicesItems } from "@/data/dataModels";
import ServiceHeader from "@/components/ServiceHeader/ServiceHeader";
import ServiceBanner from "@/components/ServiceBanner/ServiceBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Service() {
  const router = useRouter();
  const { slug } = router.query;

  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (slug) {
      const foundService = ModelServicesItems.find((item) =>
        item.slug.endsWith(slug)
      );
      setSelectedService(foundService);
    }
  }, [slug, router.asPath]);

  if (!selectedService) return null;

  return (
    <div
      key={router.asPath} // Aquí el key fuerza remount completo del componente
      className={`${geistSans.className} ${geistMono.className} min-h-screen`}
      data-aos="fade-down"
      data-aos-delay="200"
    >
      <main className="flex flex-col items-center">
        <ServiceHeader item={selectedService} />
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
