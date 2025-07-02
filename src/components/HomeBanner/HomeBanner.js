"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube, ArrowRight, MapPin } from "lucide-react";
import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function TypewriterText({ text, className }) {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return <p className={className}>{displayedText}</p>;
}

export default function HomeBanner() {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!mapInstance.current && mapContainer.current) {
      mapInstance.current = new maplibregl.Map({
        container: mapContainer.current,
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=nK1d2De6d23VzpHvim46",
        center: [-58.4449133, -34.5886786], // Buenos Aires coords
        zoom: 11,
        interactive: true,
        attributionControl: false,
      });

      new maplibregl.Marker()
        .setLngLat([-58.4449133, -34.5886786])
        .addTo(mapInstance.current);
    } else if (mapInstance.current) {
      // Forzar resize al cambiar ruta para que el mapa se renderice bien
      mapInstance.current.resize();
    }
  }, [pathname]);

  return (
    <div
      className="w-full relative h-[80vh] mx-auto p-8 pb-10 overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Fondo GIF */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover transition-all duration-700 -z-10"
        style={{
          backgroundImage:
            "url('https://byimpetus.com/wp-content/uploads/2025/02/dreamteam-ezgif.com-optimize.gif')",
        }}
      />
      {/* Gradiente overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-0" />

      {/* Contenido principal */}
      <div className="flex h-full w-full">
        {/* Izquierda */}
        <div
          className="relative z-10 flex-1 flex flex-col justify-end text-white max-w-[60%]"
          style={{ marginRight: "288px" }} // espacio para barra lateral
        >
          {/* Redes sociales */}
          <div className="flex gap-4 mb-2">
            <Link
              href="https://www.instagram.com/carromato"
              target="_blank"
              className="text-white hover:text-orange-400 transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={28} />
            </Link>
            <Link
              href="https://www.facebook.com/carromato"
              target="_blank"
              className="text-white hover:text-violet-400 transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook size={28} />
            </Link>
            <Link
              href="https://www.youtube.com/carromato"
              target="_blank"
              className="text-white hover:text-orange-400 transition-colors duration-300"
              aria-label="YouTube"
            >
              <Youtube size={28} />
            </Link>
          </div>

          {/* Título */}
          <TypewriterTitle text="CARROMATO" as="h1" size="text-7xl" />

          {/* Subtítulo */}
          <p className="text-xl md:text-1xl text-gray-300 max-w-prose leading-[0.9] mt-2 mb-5">
            Producción de contenido audiovisual para marcas, proyectos y artistas.
          </p>

          {/* Botones */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { href: "/servicios", label: "SERVICIOS AUDIOVISUALES" },
              { href: "/portfolio", label: "CONOCÉ NUESTRO TRABAJO" },
              { href: "/nosotros", label: "¿QUIÉNES SOMOS?" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative flex justify-center items-center aspect-[16/9] px-5 border border-white text-white text-base font-medium rounded-md overflow-hidden group transition-all duration-300 hover:scale-105 w-45"
              >
                <span className="relative z-10 leading-[0.9] text-center text-sm">
                  {label}
                </span>
                <ArrowRight
                  size={20}
                  className="absolute bottom-2 right-2 z-10 transition-transform duration-300 group-hover:translate-x-1"
                />
                <span className="absolute inset-0 opacity-30 group-hover:opacity-50 transition duration-500 animate-gradient-x rounded-md"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Barra lateral derecha */}
        <aside
          className="absolute top-0 right-0 z-10 w-72 flex flex-col gap-4 text-white m-5"
          style={{
            paddingRight: "6px",
            maxHeight: "80vh",
            overflow: "hidden",
            justifyContent: "flex-start",
          }}
        >
          {/* Cuadro mapa */}
          <div className="relative rounded-md border border-white/20 bg-black/40 p-2 flex flex-col">
            <div
              ref={mapContainer}
              className="aspect-square rounded-md overflow-hidden w-full"
              style={{ minHeight: "180px" }}
            />
            {/* Info ubicación */}
            <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-gray-300">
              <MapPin size={18} />
              <span>Buenos Aires, Argentina</span>
            </div>
          </div>

          {/* Cuadro info grabación */}
          <div className="relative rounded-md border border-white/20 bg-black/40 p-4 flex flex-col justify-center items-center text-center">
            <TypewriterText
              text="+30000 hs de filmación"
              className="text-sm font-semibold text-gray-300 leading-snug"
            />
          </div>

          {/* Cuadro proyectos realizados */}
          <div className="relative rounded-md border border-white/20 bg-black/40 p-4 flex flex-col justify-center items-center text-center">
            <TypewriterText
              text="+100 proyectos realizados"
              className="text-sm font-semibold text-gray-300 leading-snug"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
