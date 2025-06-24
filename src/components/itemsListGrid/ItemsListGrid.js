import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import Link from "next/link";

export default function ItemsListGrid() {
  const servicios = [
    { slug: "/servicios/videos-empresariales", nombre: "Videos empresariales" },
    { slug: "/servicios/publicidad", nombre: "Publicidad" },
    { slug: "/servicios/videoclips", nombre: "Videoclips" },
    { slug: "/servicios/contenido-redes-sociales", nombre: "Contenido redes sociales" },
    { slug: "/servicios/fx-visuales", nombre: "FX visuales" },
  ];

  const gradientesTexto = [
    "bg-gradient-to-r from-white to-violet-400 bg-clip-text text-transparent",
    "bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent",
  ];

  return (
    <div className="w-full flex flex-col items-center gap-10">

      {/* Primera fila: título y primera card */}
      <div className="flex flex-row items-center justify-center gap-4 w-full max-w-6xl">
        <h2
          className="text-5xl sm:text-8xl font-extrabold leading-[0.8] text-white text-center sm:text-left flex-shrink-0 w-[180px] sm:w-auto"
          data-aos="fade-in"
        >
          CARRO_<br />MATO
        </h2>

        <Link
          href={servicios[0].slug}
          className="relative group w-[220px] sm:w-[320px] aspect-video p-3 rounded-2xl bg-black/50 backdrop-blur-sm flex flex-col justify-center border border-white/20 overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
          data-aos="fade-in"
          data-aos-delay="150"
        >
          <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-3xl opacity-50 pointer-events-none transition-all duration-300 group-hover:w-36 group-hover:h-36 bg-gradient-to-br from-violet-400 to-transparent" />
          <TypewriterTitle
            text={servicios[0].nombre}
            as="h3"
            size="text-lg sm:text-xl"
            className={`font-semibold mb-1 leading-[1.1] ${gradientesTexto[0]}`}
            loop={false}
          />
          <TypewriterTitle
            text="Descripción breve de servicio"
            as="p"
            size="text-xs sm:text-sm"
            className="text-white/80 leading-[1.1]"
            loop={false}
          />
        </Link>
      </div>

      {/* Segunda fila de cards */}
      <div className="flex flex-col sm:flex-wrap sm:flex-row justify-center gap-4 sm:gap-6 w-full max-w-6xl">
        {servicios.slice(1).map((servicio, index) => (
          <Link
            key={index}
            href={servicio.slug}
            className="relative group w-[220px] sm:w-[320px] aspect-video p-3 rounded-2xl bg-black/50 backdrop-blur-sm flex flex-col justify-center border border-white/20 overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
            data-aos="fade-in"
            data-aos-delay={`${index * 150}`}
          >
            <div
              className={`absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-3xl opacity-50 pointer-events-none transition-all duration-300 group-hover:w-36 group-hover:h-36 ${
                index % 2 === 0
                  ? "bg-gradient-to-br from-violet-400 to-transparent"
                  : "bg-gradient-to-br from-orange-400 to-transparent"
              }`}
            />
            <TypewriterTitle
              text={servicio.nombre}
              as="h3"
              size="text-lg sm:text-xl"
              className={`font-semibold mb-1 leading-[1.1] ${gradientesTexto[index % 2]}`}
              loop={false}
            />
            <TypewriterTitle
              text="Descripción breve de servicio"
              as="p"
              size="text-xs sm:text-sm"
              className="text-white/80 leading-[1.1]"
              loop={false}
            />
          </Link>
        ))}
        <h2
          className="text-5xl sm:text-6xl font-light leading-[1] text-white text-center sm:text-left"
          data-aos="fade-in"
          data-aos-delay="300"
        >
          PRODUCCIONES<br />AUDIOVISUALES
        </h2>
      </div>
    </div>
  );
}
