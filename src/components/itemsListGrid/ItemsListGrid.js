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

export default function ItemsListGrid({ items = [], mode = "servicios" }) {
  const gradientesTexto = [
    "bg-gradient-to-r from-white to-violet-400 bg-clip-text text-transparent",
    "bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent",
  ];

  if (mode === "items") {
    return (
      <div className="w-full flex flex-wrap justify-center gap-6 mb-20 max-w-6xl mx-auto">
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

  // Render para otros modos ("servicios", "portfolio")
  return (
    <div className="w-full flex flex-col items-center gap-10 mb-20">
      {/* Primera fila */}
      <div className="flex flex-row items-center justify-center gap-4 w-full max-w-6xl">
        <h2
          className="text-5xl sm:text-8xl font-extrabold leading-[0.8] text-white text-center sm:text-left flex-shrink-0 w-[180px] sm:w-auto"
          data-aos="fade-in"
        >
          {mode === "portfolio" ? (
            <>
              PORT<br />FOLIO
            </>
          ) : (
            <>
              CARRO_<br />MATO
            </>
          )}
        </h2>

        <ItemCard
          item={items[0]}
          index={0}
          mode={mode}
          gradientesTexto={gradientesTexto}
        />
      </div>

      {/* Resto de cards + subtítulo */}
      <div className="flex flex-col sm:flex-wrap sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full max-w-6xl">
        {items.slice(1).map((item, index) => (
          <ItemCard
            key={index}
            item={item}
            index={index + 1}
            mode={mode}
            gradientesTexto={gradientesTexto}
          />
        ))}

        {/* Solo en modo servicios, último título */}
        {mode === "servicios" && (
          <h2
            className="text-5xl sm:text-6xl font-light leading-[1] text-white text-center sm:text-left"
            data-aos="fade-in"
            data-aos-delay="300"
          >
            PRODUCCIONES<br />AUDIOVISUALES
          </h2>
        )}

        {/* Solo en modo portfolio, subtítulo a la derecha de última card */}
        {mode === "portfolio" && (
          <div
            className="hidden sm:flex flex-col justify-center items-start text-white min-w-[220px] sm:w-[320px] aspect-video p-3"
            data-aos="fade-in"
            data-aos-delay="450"
          >
            <h3 className="text-2xl sm:text-5xl leading-[0.9]">NUESTRO TRABAJO HABLA </h3>
            <p className="text-2xl sm:text-4xl leading-[0.9]">POR NOSOTROS</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ItemCard({ item, index, mode, gradientesTexto }) {
  // Clase para el cursor y hover solo si NO es modo items
  const interactiveClasses =
    mode === "items" ? "" : "cursor-pointer hover:scale-105";

  // Wrapper cambia según modo: Link para servicios/portfolio, div para items
  const Wrapper = mode === "items" ? "div" : Link;
  const wrapperProps = mode === "items" ? {} : { href: mode === "portfolio" ? `/portfolio/${item.slug}` : item.slug };

  return (
    <Wrapper
      {...wrapperProps}
      className={`relative group w-[220px] sm:w-[320px] aspect-video p-3 rounded-2xl flex flex-col ${
        mode === "portfolio" ? "justify-end" : "justify-center"
      } border border-white/20 overflow-hidden transition-transform duration-300 ease-in-out ${interactiveClasses} backdrop-blur-sm`}
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

      {/* Luz blur solo en modo servicios */}
      {mode === "servicios" && (
        <div
          className={`absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-3xl opacity-50 pointer-events-none transition-all duration-300 group-hover:w-36 group-hover:h-36 ${
            index % 2 === 0
              ? "bg-gradient-to-br from-violet-400 to-transparent"
              : "bg-gradient-to-br from-orange-400 to-transparent"
          }`}
        />
      )}

      {/* Contenido */}
      <div className="relative z-20 flex flex-col gap-1 px-2 pb-3 text-center">
        <>
     
        <TypewriterTitle
            text={item.title}
            as="h3"
            size={mode === "items" ? "text-sm sm:text-sm" : "text-lg sm:text-xl"}
            className={`font-semibold leading-[1.1] ${gradientesTexto[index % 2]} drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}
            loop={false}
          />
        </>
        {mode !== "items" && (
          <TypewriterTitle
            text={item.description}
            as="p"
            size={`${
              mode === "portfolio" ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"
            }`}
            className={`${
              mode === "portfolio" ? "font-light" : "font-normal"
            } text-white/80 leading-[1.1] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}
            loop={false}
          />
        )}
        {mode === "portfolio" && (
          <div className="mt-1">
            <ArrowRight className="w-5 h-5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
          </div>
        )}
      </div>
    </Wrapper>
  );
}
