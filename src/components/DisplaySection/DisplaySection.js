"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export function DisplaySection({ type = "default" }) {
  const router = useRouter();

  const services = [
    {
      title: "Video Empresarial",
      image: "https://pandoramarketing.net/wp-content/uploads/2020/10/200.gif",
      link: "/servicios/video-empresarial",
    },
    {
      title: "Publicidad",
      image: "https://miraveo.es/wp-content/uploads/2024/05/GIF1-ezgif.com-optimize-1.gif",
      link: "/servicios/publicidad",
    },
    {
      title: "Videoclips",
      image: "https://static.wixstatic.com/media/ddca6c_33587a47b836449ea3534caccffc950b~mv2.gif",
      link: "/servicios/videoclips",
    },
    {
      title: "Contenido Redes Sociales",
      image: "https://i.gifer.com/96e4.gif",
      link: "/servicios/contenido-redes-sociales",
    },
    {
      title: "FX Visuales",
      image: "https://byimpetus.com/wp-content/uploads/2025/02/dreamteam-ezgif.com-optimize.gif",
      link: "/servicios/fx-visuales",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [titleKey, setTitleKey] = useState(0);

  const currentService = services[currentIndex];

  const navigateToService = () => {
    router.push(currentService.link);
  };

  useEffect(() => {
    if (type === "banner" || type === "display") {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
        setTitleKey((prevKey) => prevKey + 1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [type]);

  const isVideo = (url) => url.match(/\.(mp4|webm|mov)$/i);

  if (type === "display") {
    return (
      <section className="relative w-full max-w-7xl mx-auto rounded-xl overflow-hidden" style={{ aspectRatio: "16 / 9", maxHeight: "500px" }}>
        {/* Contenedor fijo, position relative */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          {isVideo(currentService.image) ? (
            <video
              key={currentService.image}
              src={currentService.image}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              key={currentService.image}
              src={currentService.image}
              alt={currentService.title}
              className="w-full h-full object-cover"
              onError={(e) =>
                (e.target.src =
                  "https://placehold.co/1920x1080/000/FFF?text=Error+Loading+Image")
              }
            />
          )}
        </div>
      </section>
    );
  }

  // ----------- Render normal para los otros tipos ("banner", "default", etc)
  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden py-8 px-4 md:px-15">
      <div className="relative w-full max-w-7xl flex flex-col overflow-hidden rounded-xl bg-transparent">
        {/* Menú solo en modo distinto a banner */}
        {type !== "banner" && (
          <nav className="bg-black bg-opacity-90 flex flex-wrap justify-center gap-1 md:gap-2 px-3 py-2 z-30 relative rounded-t-xl">
            {services.map((service, index) => (
              <div
                key={index}
                onMouseEnter={() => {
                  setCurrentIndex(index);
                  setTitleKey((prevKey) => prevKey + 1);
                }}
                onFocus={() => {
                  setCurrentIndex(index);
                  setTitleKey((prevKey) => prevKey + 1);
                }}
                className={`px-3 py-1 md:px-4 md:py-2 rounded-full cursor-pointer font-semibold text-sm md:text-base transition-colors duration-300 inline-block ${
                  currentIndex === index
                    ? "text-yellow-500"
                    : "text-white hover:text-yellow-500"
                }`}
              >
                {service.title}
              </div>
            ))}
          </nav>
        )}

        {/* Imagen destacada */}
        <div
          onClick={navigateToService}
          className={`relative flex-grow flex flex-col justify-end overflow-hidden max-h-[500px] min-h-[300px] aspect-[16/9] group transition duration-500 ${
            type !== "banner" ? "cursor-pointer" : ""
          }`}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") navigateToService();
          }}
        >
          <img
            key={currentService.image}
            src={currentService.image}
            alt={currentService.title}
            className="absolute inset-0 w-full h-full object-cover filter brightness-50 transition-opacity duration-500 ease-in-out"
            onError={(e) =>
              (e.target.src =
                "https://placehold.co/1920x1080/000/FFF?text=Error+Loading+Image")
            }
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

          {/* Hover scale leve */}
          <div className="absolute inset-0 z-0 group-hover:scale-[1.02] transition-transform duration-500 ease-out" />

          {/* Título visible en banner y default */}
          {(type === "banner" || type === "default") && (
            <div
              key={titleKey}
              className={`leading-[0.9] absolute z-30 text-white font-extrabold uppercase tracking-tight drop-shadow-lg whitespace-pre-wrap max-w-[280px] ${
                type === "banner"
                  ? "text-lg md:text-2xl animate-fadeUp right-4 bottom-4 text-left"
                  : "text-2xl md:text-4xl bottom-24 right-6"
              }`}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {currentService.title}
            </div>
          )}

          {/* CTA "VER MÁS" sólo en modo distinto a banner, debajo del título */}
          {type !== "banner" && (
            <div className="relative z-20 p-8 flex flex-col items-end gap-3 text-white">
              <a
                href={currentService.link}
                className="text-white text-2xl font-semibold uppercase underline cursor-pointer hover:text-yellow-400 transition duration-300 px-8 py-4 rounded"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
                role="button"
              >
                VER MÁS
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Animaciones */}
      <style jsx global>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 0.7s ease forwards;
        }
      `}</style>
    </section>
  );
}
