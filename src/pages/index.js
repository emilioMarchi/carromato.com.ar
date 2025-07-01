import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { UsSectionGrid } from "@/components/UsSectionGrid/UsSectionGrid";
import { PortfolioSectionGrid } from "@/components/PortfolioSectionGrid/PortfolioSectionGrid";

import { FAQContactSection } from "@/components/FaqContactSection/FaqContactSection";
import { DisplaySection } from "@/components/DisplaySection/DisplaySection";
import { HeroHome } from "@/components/HeroHome.js/HeroHome";
import FeaturedWorkBanner from "@/components/FeaturedWorkBanner/FeaturedWorkBanner";
import { ModelServicesItems, ModelsHomeBanner } from "@/data/dataModels";
import ItemsListGrid from "@/components/itemsListGrid/ItemsListGrid";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} w-full `}
    >
      <main className="flex flex-col items-center gap-8">
    
        <FeaturedWorkBanner items={ModelsHomeBanner} mode="banner" interval={0}/>
      
        <FAQContactSection/>  
      </main>
    </div>
  );
}
