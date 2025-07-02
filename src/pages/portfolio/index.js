import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import FeaturedWorkBanner from "@/components/FeaturedWorkBanner/FeaturedWorkBanner";
import { ModelDetailServicesItems, ModelPortfolioItems, ModelServicesItems } from "@/data/dataModels";
import SliderComponent from "@/components/SliderComponent/SliderComponent";
import ItemsListGrid from "@/components/itemsListGrid/ItemsListGrid";
import { FAQContactSection } from "@/components/FaqContactSection/FaqContactSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Portfolio() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen`} data-aos="fade-down" data-aos-delay="200"
    >
      <main className="flex flex-col items-center gap-8">
        {/* Tu contenido va acá */}
        <FeaturedWorkBanner items={ModelPortfolioItems} mode="portfolio" interval={8000}/>
          <SliderComponent items={ModelPortfolioItems} title={'Videos Empresariales'} titleDirection='left'/>
          <SliderComponent items={ModelPortfolioItems} title={'Videos Publicitarios' } titleDirection='rigth'/>
          <SliderComponent items={ModelPortfolioItems} title={'Videoclips'} titleDirection='left'/>
          <SliderComponent items={ModelPortfolioItems} title={'Contenido para redes sociales'} titleDirection='rigth'/>
          <SliderComponent items={ModelPortfolioItems} title={'Fx visuales'} titleDirection='left'/>
          <ItemsListGrid  items={ModelDetailServicesItems} mode="servicios" />
          <FAQContactSection/>
      </main>
    </div>
  );
}
