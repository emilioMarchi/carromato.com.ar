import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import WorkDisplayAndGallery from "@/components/WorkDisplayAndGallery/WorkDisplayAndGallery";
import {ClockIcon, MapPinIcon,UserIcon,MonitorIcon} from 'lucide-react'
import SliderComponent from "@/components/SliderComponent/SliderComponent";
import { FAQContactSection } from "@/components/FaqContactSection/FaqContactSection";
import { ModelPortfolioItems } from "@/data/dataModels";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const projectModel = {
  title: "Campaña Primavera",
  src:'https://www.youtube.com/watch?v=TTfYcGKXb-U&t=1s&ab_channel=AlejandroLuengo',
  background: "https://byimpetus.com/wp-content/uploads/2025/02/dreamteam-ezgif.com-optimize.gif",
  slug:'/portfolio/campaña-primavera',
  summary: "Producción integral de campaña audiovisual para lanzamiento de temporada Primavera 2024. Desarrollo de concepto creativo, dirección, realización y edición.",
  technicalData: [
    { label: "Duración", value: "3 min", icon: ClockIcon },
    { label: "Ubicación", value: "Buenos Aires, Argentina", icon: MapPinIcon },
    { label: "Cliente", value: "Marca X", icon: UserIcon },
    { label: "Formato", value: "HD 1080p", icon: MonitorIcon },
  ],
  images: [
    { src: "/1.jpg", alt: "Fotograma 1" },
    { src: "/2.jpg", alt: "Backstage" },
    { src: "/2.jpg", alt: "Escena final" },
  ],
}


export default function Work() {

  const router = useRouter()
  const {slug} = router.query
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 sm:p-20`}
    >
      <main className="flex flex-col items-center gap-8">
        {/* Tu contenido va acá */}
        <WorkDisplayAndGallery project={projectModel} />
        <SliderComponent title="TE PUEDEN INTERESAR..." items={ModelPortfolioItems}/>
        <FAQContactSection/>
      </main>
    </div>
  );
}
