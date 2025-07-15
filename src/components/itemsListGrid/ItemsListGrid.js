"use client";

import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ModelCardsItems = [
  {
    slug: "video-empresarial",
    title: "Institucional EmpresaTech",
    description: "Video institucional para presentación corporativa de EmpresaTech.",
    video: "https://pandoramarketing.net/wp-content/uploads/2020/10/200.gif"
  },
  {
    slug: "publicidad",
    title: "Campaña Primavera 2025",
    description: "Serie de spots publicitarios para redes sociales de MarcaNova.",
    video: "https://miraveo.es/wp-content/uploads/2024/05/GIF1-ezgif.com-optimize-1.gif"
  },
  {
    slug: "videoclips",
    title: "Videoclip 'Horizonte'",
    description: "Producción audiovisual para la banda Prisma en exteriores.",
    video: "https://static.wixstatic.com/media/ddca6c_33587a47b836449ea3534caccffc950b~mv2.gif"
  },
  {
    slug: "contenido-redes-sociales",
    title: "Contenido Verano CoolUp",
    description: "Reels y videos para la campaña estacional de CoolUp Bebidas.",
    video: "https://i.gifer.com/96e4.gif"
  },
  {
    slug: "fx-visuales",
    title: "Visuales Evento Lumina",
    description: "Motion graphics y visuales en vivo para festival Lumina 2025.",
    video: "https://byimpetus.com/wp-content/uploads/2025/02/dreamteam-ezgif.com-optimize.gif"
  },
];

// 👉 función para truncar texto
function truncateText(text, maxLength = 90) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export default function ItemsListGrid({ items = [], mode = "servicios" }) {
  const gradientesTexto = [
    "bg-gradient-to-r from-white to-violet-400 bg-clip-text text-transparent",
    "bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent",
  ];

  if (mode === "items") {
    return (
      <div className="w-full flex flex-wrap justify-center gap-2 mb-5 mx-auto">
        {items.map((item, index) => (
          <ItemCard
            key={index}
            item={item}
            index={index}
            mode={mode}
            gradientesTexto={gradientesTexto}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 p-2 mb-20 mt-10">
      {/* Título */}
      <div className="flex flex-wrap wrap-1 items-center justify-center gap-4 w-full max-w-6xl pb-10">
        <h2
          className="text-7xl md:text-6xl font-extrabold leading-[0.8] text-white text-center"
          data-aos="fade-in"
        >
          {mode === "portfolio" ? (
            <>PORT<br />FOLIO</>
          ) : (
            <>CARRO_<br />MATO</>
          )}
        </h2>
        {mode === "servicios" && (
          <h2
            className="text-2xl md:text-5xl font-light leading-[1] text-white text-center"
            data-aos="fade-in"
            data-aos-delay="300"
          >
            PRODUCCIONES<br />AUDIOVISUALES
          </h2>
        )}
        {mode === "portfolio" && (
          <div
            className="hidden sm:flex flex-col justify-center items-start text-white min-w-[220px] sm:w-[320px]"
            data-aos="fade-in"
            data-aos-delay="450"
          >
            <h3 className="text-2xl md:text-4xl leading-[0.9]">NUESTRO TRABAJO HABLA</h3>
            <p className="text-2xl md:text-3xl leading-[0.9]">POR NOSOTROS</p>
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 md:w-[90%]">
        {items.map((item, index) => (
          <ItemCard
            key={index}
            item={item}
            index={index + 1}
            mode={mode}
            gradientesTexto={gradientesTexto}
          />
        ))}
      </div>
    </div>
  );
}

function ItemCard({ item, index, mode, gradientesTexto }) {
  const interactiveClasses =
    mode === "items" ? "" : "cursor-pointer hover:scale-105";

  const hasLink = mode !== "items" && item.slug;
  const Wrapper = hasLink ? Link : "div";
  const wrapperProps = hasLink ? { href: item.slug } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`relative group aspect-video p-3 rounded-2xl flex flex-col ${
        mode === "portfolio" ? "justify-end" : "justify-center"
      } border border-white/20 overflow-hidden transition-transform duration-300 ease-in-out ${interactiveClasses} backdrop-blur-sm
      w-[95vw] md:w-[30%]`}
      data-aos="fade-in"
      data-aos-delay={`${index * 150}`}
    >
      {/* Fondo video solo en modo portfolio */}
      {mode === "portfolio" && item.video && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${item.video})` }}
        />
      )}

      {/* Gradiente */}
      <div
        className={`absolute inset-0 ${
          mode === "portfolio"
            ? "bg-gradient-to-t from-black/90 via-black/70 to-transparent"
            : "bg-black/50"
        } z-10`}
      />

      {/* Luz blur */}
      {mode === "servicios" && (
        <div
          className={`absolute text-white top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-3xl opacity-50 pointer-events-none transition-all duration-300 group-hover:w-36 group-hover:h-36 ${
            index % 2 === 0
              ? "bg-gradient-to-br from-violet-400 to-transparent"
              : "bg-gradient-to-br from-orange-400 to-transparent"
          }`}
        />
      )}

      {/* Contenido */}
      <div className="relative z-20 flex flex-col gap-1 px-2 pb-3 w-full">
        <TypewriterTitle
          text={item.title}
          as="h3"
          className={`font-semibold text-white/40 leading-[0.9] text-[1.7rem] md:text-[1rem] ${gradientesTexto[index % 2]} drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}
          loop={false}
        />
        {mode !== "items" && item.description && (
          <TypewriterTitle
            text={truncateText(item.description, 60)}
            as="p"
            className={`${
              mode === "portfolio" ? "font-light" : "font-normal"
            } text-white/80 leading-[1] text-lg md:text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}
            loop={false}
          />
        )}
      </div>

      {/* Flecha */}
      {(mode === "portfolio" || mode === "servicios") && (
        <ArrowRight className="absolute z-100 bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-5 h-5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
      )}
    </Wrapper>
  );
}
