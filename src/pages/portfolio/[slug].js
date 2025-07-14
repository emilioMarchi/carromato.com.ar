"use client";

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import WorkDisplayAndGallery from "@/components/WorkDisplayAndGallery/WorkDisplayAndGallery";
import SliderComponent from "@/components/SliderComponent/SliderComponent";
import { FAQContactSection } from "@/components/FaqContactSection/FaqContactSection";
import { ModelPortfolioItems, ModelPortfolioItemsDetail } from "@/data/dataModels";
import { useProvider } from "@/context/Provider";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Work() {
  const router = useRouter();
  const { slug } = router.query;
  const { proyectSelected, setProyect } = useProvider();

  useEffect(() => {
    if (!slug) return;

    const foundProject = ModelPortfolioItemsDetail.find(
      (item) => item.slug === `/portfolio/${slug}`
    );

    if (foundProject && proyectSelected !== foundProject) {
      setProyect(foundProject);
    }
  }, [slug, proyectSelected, setProyect]);

  if (!proyectSelected) return null;

  return (
    <div
      key={slug} // 👈 esta es la clave
      className={`${geistSans.className} ${geistMono.className} min-h-screen`}
      data-aos="fade-down"
      data-aos-delay="200"
    >
      <main className="flex flex-col items-center gap-8">
        <WorkDisplayAndGallery project={proyectSelected} />
        <SliderComponent title="Otros proyectos" items={ModelPortfolioItems} />
        <FAQContactSection />
      </main>
    </div>
  );
}
