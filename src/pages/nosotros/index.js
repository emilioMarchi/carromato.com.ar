
import AboutTextSection from "@/components/AboutTextSection/AboutTextSection";
import BannerPanelData from "@/components/BannerPanelData.js/BannerPanelData";
import PhotoSlider from "@/components/photoGrid/PhotoGridSection";
import PhotoGrid from "@/components/photoGrid/PhotoGridSection";
import SliderComponent from "@/components/SliderComponent/SliderComponent";
import { ModelPortfolioItems } from "@/data/dataModels";
import { Geist, Geist_Mono } from "next/font/google";
import { FAQContactSection } from "@/components/FaqContactSection/FaqContactSection";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function UsPage() {


  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 sm:p-20`}
    >
      <main className="flex flex-col items-center gap-8">
        <BannerPanelData/>
        <AboutTextSection/>
     
        <SliderComponent items={ModelPortfolioItems}  />
        <FAQContactSection />
      </main>
    </div>
  );
}
