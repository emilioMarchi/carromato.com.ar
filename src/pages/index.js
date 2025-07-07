import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";


import { FAQContactSection } from "@/components/FaqContactSection/FaqContactSection";
import HomeBanner from "@/components/HomeBanner/HomeBanner";

import ItemsListGrid from "@/components/itemsListGrid/ItemsListGrid";
import { ModelPortfolioItems } from "@/data/dataModels";
import SliderComponent from "@/components/SliderComponent/SliderComponent";
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
      className={`${geistSans.className} ${geistMono.className} w-full `} data-aos="fade-down" data-aos-delay="200"
    >
      <main className="flex flex-col items-center gap-8">
        <HomeBanner/>

        <SliderComponent title="Portfolio" items={ModelPortfolioItems}/>
        <FAQContactSection />  
      </main>
    </div>
  );
}
