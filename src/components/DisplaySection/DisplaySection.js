import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export function DisplaySection() {
  const router = useRouter();

  const services = [
    {
      name: "Video Empresarial",
      image: "https://pandoramarketing.net/wp-content/uploads/2020/10/200.gif",
      link: "/servicios/video-empresarial",
    },
    {
      name: "Publicidad",
      image: "https://miraveo.es/wp-content/uploads/2024/05/GIF1-ezgif.com-optimize-1.gif",
      link: "/servicios/publicidad",
    },
    {
      name: "Videoclips",
      image: "https://static.wixstatic.com/media/ddca6c_33587a47b836449ea3534caccffc950b~mv2.gif",
      link: "/servicios/videoclips",
    },
    {
      name: "Contenido Redes Sociales",
      image: "https://i.gifer.com/96e4.gif",
      link: "/servicios/contenido-redes-sociales",
    },
    {
      name: "FX Visuales",
      image: "https://byimpetus.com/wp-content/uploads/2025/02/dreamteam-ezgif.com-optimize.gif",
      link: "/servicios/fx-visuales",
    },
  ];

  const [currentService, setCurrentService] = useState(services[0]);

  const navigateToService = () => {
    router.push(currentService.link);
  };

  return (
    <section
      id="inicio"
      className="relative w-full flex flex-col items-center justify-center overflow-hidden py-8 px-4 md:px-15"
    >
      <div
        data-aos="fade-left"
        data-aos-delay="400"
        className="relative w-full max-w-7xl flex flex-col overflow-hidden rounded-xl bg-transparent"
      >
        {/* Navegación */}
        <nav className="bg-black bg-opacity-90 flex flex-wrap justify-center gap-1 md:gap-2 px-3 py-2 z-30 relative rounded-t-xl">
          {services.map((service, index) => (
            <div
              key={index}
              onMouseEnter={() => setCurrentService(service)}
              onFocus={() => setCurrentService(service)}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-full cursor-pointer font-semibold text-sm md:text-base transition-colors duration-300 inline-block
                ${
                  currentService.name === service.name
                    ? "text-yellow-500"
                    : "text-white hover:text-yellow-500 bg-transparent"
                }`}
              aria-current={currentService.name === service.name ? "page" : undefined}
            >
              {service.name}
            </div>
          ))}
        </nav>

        {/* Imagen destacada */}
        <div
          onClick={navigateToService}
          className="relative flex-grow flex flex-col justify-end overflow-hidden max-h-[500px] min-h-[300px] aspect-[16/9] cursor-pointer"
          aria-label={`Ver más sobre ${currentService.name}`}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") navigateToService();
          }}
        >
          <img
            key={currentService.name}
            src={currentService.image}
            alt={currentService.name}
            className="absolute inset-0 w-full h-full object-cover filter brightness-50 transition-opacity duration-500 ease-in-out"
            onError={(e) =>
              (e.target.src =
                "https://placehold.co/1920x1080/000/FFF?text=Error+Loading+Image")
            }
          />

          {/* Degradado oscuro */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

          {/* Título y CTA */}
          <div className="relative z-20 p-8 flex flex-col items-end gap-1 text-white">
            <h2 className="text-xxl md:text-3xl lg:text-4xl font-bold" aria-hidden="true">
              {currentService.name}
            </h2>
            <a
              href={currentService.link}
              className="text-white text-sm md:text-base underline cursor-pointer hover:text-yellow-400 transition-colors duration-300  px-3 py-1 rounded"
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
            >
              VER MÁS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
