import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { DisplaySection } from "@/components/DisplaySection/DisplaySection";
import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import ItemsListGrid from "@/components/itemsListGrid/ItemsListGrid";
import { PortfolioSectionGrid } from "@/components/PortfolioSectionGrid/PortfolioSectionGrid";
import { FAQContactSection } from "@/components/FaqContactSection/FaqContactSection";
import { ModelDetailServicesItems, ModelServicesItems } from "@/data/dataModels";
import SuperBanner from "@/components/SuperBanner/SuperBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const servicesCardsItems = [
  { slug: "/servicios/videos-empresariales", title: "Videos empresariales", description:'Breve descripción del servicio en cuestión' },
    { slug: "/servicios/publicidad", title: "Publicidad",  description:'Breve descripción del servicio en cuestión' },
    { slug: "/servicios/videoclips", title: "Videoclips",  description:'Breve descripción del servicio en cuestión' },
    { slug: "/servicios/contenido-redes-sociales", title: "Contenido redes sociales",  description:'Breve descripción del servicio en cuestión' },
    { slug: "/servicios/fx-visuales", title: "FX visuales",  description:'Breve descripción del servicio en cuestión' },
]
const portfolioCardsItems = [
  { 
    slug: "servicios/video-empresarial",
    title: "Institucional EmpresaTech",
    description: "Video institucional para presentación corporativa de EmpresaTech.",
    video: "https://pandoramarketing.net/wp-content/uploads/2020/10/200.gif"
  },
  { 
    slug: "servicios/publicidad",
    title: "Campaña Primavera 2025",
    description: "Serie de spots publicitarios para redes sociales de MarcaNova.",
    video: "https://miraveo.es/wp-content/uploads/2024/05/GIF1-ezgif.com-optimize-1.gif"
  },
  { 
    slug: "servicios/videoclips",
    title: "Videoclip 'Horizonte'",
    description: "Producción audiovisual para la banda Prisma en exteriores.",
    video: "https://static.wixstatic.com/media/ddca6c_33587a47b836449ea3534caccffc950b~mv2.gif"
  },
  { 
    slug: "servicios/contenido-redes-sociales",
    title: "Contenido Verano CoolUp",
    description: "Reels y videos para la campaña estacional de CoolUp Bebidas.",
    video: "https://i.gifer.com/96e4.gif"
  },
  { 
    slug: "servicios/fx-visuales",
    title: "Visuales Evento Lumina",
    description: "Motion graphics y visuales en vivo para festival Lumina 2025.",
    video: "https://byimpetus.com/wp-content/uploads/2025/02/dreamteam-ezgif.com-optimize.gif"
  },
];

const myFaqs = [
  { question: "¿Cuánto tarda un proyecto audiovisual?", answer: "El tiempo varía según la complejidad, pero generalmente entregamos en 2 a 4 semanas." },
  { question: "¿Ofrecen servicios para redes sociales?", answer: "Sí, creamos contenido específico para diferentes plataformas como Instagram, TikTok y YouTube." },
  { question: "¿Cómo es el proceso de contratación?", answer: "Nos contactás, definimos objetivos, hacemos un presupuesto y comenzamos la producción una vez aprobado." },
];



export default function Services() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className}`} data-aos="fade-down" data-aos-delay="200"
    >
      {/* Sección principal */}
      <main className="flex flex-col md:flex-row items-center mb-20">
          <SuperBanner items={ModelServicesItems} subtitle='SERVICIOS' />
        
       

        {/* Bloque Derecho */}
      </main>

      {/* Sección de servicios */}
      <ItemsListGrid mode='servicios' items={ModelDetailServicesItems} />
      <ItemsListGrid mode='portfolio' items={portfolioCardsItems} />
      <FAQContactSection faqs={myFaqs} />

    </div>
  );
}

