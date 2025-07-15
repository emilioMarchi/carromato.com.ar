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
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://api.maptiler.com/maps/streets/style.json?key=nK1d2De6d23VzpHvim46",
        center: [-58.4449133, -34.5886786],
        zoom: 12,
        interactive: true,
        attributionControl: false,
      });
  
      mapInstance.current = map;
  
      // Popup con imagen + texto + link limpio
      const popupHTML = `
        <div style="display: flex; align-items: center; gap: 8px; background: white; color: black; padding: 8px 12px; border-radius: 6px; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.2); max-width: 240px;">
          <img src="/logo.jpg" alt="Carromato Logo" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid #ccc;" />
          <div style="display: flex; flex-direction: column;">
            <div style="margin-bottom: 2px;">📍 Carromato</div>
            <a href="https://maps.app.goo.gl/yxZLg1woi5RTYmfq5" target="_blank"
               style="font-weight: normal; font-size: 0.85rem; color: #E60023; border:none; text-decoration: none; background: transparent; padding: 0; margin: 0;">
               Ver en Google Maps
            </a>
          </div>
        </div>
      `;
  
      const popup = new maplibregl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
      })
        .setLngLat([-58.4449133, -34.5886786])
        .setHTML(popupHTML)
        .addTo(map);
  
      // Marker simple
      new maplibregl.Marker({ color: "#E60023" })
        .setLngLat([-58.4449133, -34.5886786])
        .addTo(map);
    } else if (mapInstance.current) {
      mapInstance.current.resize();
    }
  }, [pathname]);
  
  

  return (
    <div className="relative p-3 md:p-5 w-[100vw] md:h-[75vh] xl:h-[100vh] overflowx-hidden">
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
      <div className="flex flex-col md:flex-row xl:p-4 md:h-full xl:pb-15">
        {/* Izquierda */}
        <div className="relative z-10 flex-1 flex flex-col justify-end text-white pt-20 p-2 lg:mr-[250px]">
          {/* Redes sociales */}
          <div className="flex gap-4 mb-2">
            <Link
              href="https://www.instagram.com/carromatoprods/?hl=es"
              target="_blank"
              className="text-white hover:text-orange-400 transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-7 h-7 md:w-8 md:h-8 lg:w-11 lg:h-11 xl:w-10 xl:h-10" />
            </Link>
            <Link
              href="https://www.facebook.com/carromato"
              target="_blank"
              className="text-white hover:text-violet-400 transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-7 h-7 md:w-8 md:h-8 lg:w-11 lg:h-11 xl:w-10 xl:h-10" />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCDyVOTieTNygeziympCUlAg/videos"
              target="_blank"
              className="text-white hover:text-orange-400 transition-colors duration-300"
              aria-label="YouTube"
            >
              <Youtube className="w-7 h-7 md:w-8 md:h-8 lg:w-11 lg:h-11 xl:w-10 xl:h-10" />
            </Link>
          </div>

          {/* Título */}
          <TypewriterTitle
            className=""
            text="CARROMATO"
            as="h1"
            size="text-6xl md:text-8xl lg:text-6xl xl:text-7xl"
          />

          {/* Subtítulo */}
          <p className="w-full lg:w-[60vw] xl:w-[50vw] text-lg md:text-2xl lg:text-2xl xl:text-xl text-gray-300 leading-[0.9] mb-2">
            Producción de contenido audiovisual para marcas, proyectos y artistas.
          </p>

          {/* Botones */}
          <div className="flex flex-col justify-center md:justify-start items-center gap-2 md:gap-3 md:flex-row md:mt-6 w-full lg:w-[60vw]">
            {[
              { href: "/servicios", label: "SERVICIOS AUDIOVISUALES" },
              { href: "/portfolio", label: "CONOCÉ NUESTRO TRABAJO" },
              { href: "/nosotros", label: "¿QUIÉNES SOMOS?" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="w-full md:w-[33%] lg:w-60 xl:w-50 p-4 md:p-5 relative flex justify-center items-center md:aspect-[16/9] border border-white text-white text-base font-medium rounded-md overflow-hidden group transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 leading-[0.9] text-center text-sm md:text-xl lg:text-1xl xl:text-[1rem] ">
                  {label}
                </span>
                <ArrowRight
                  className="m-1 w-7 h-7 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-7 xl:h-7 absolute md:bottom-2 right-2 z-10 transition-transform duration-300 group-hover:translate-x-1"
                />
                <span className="absolute inset-0 opacity-30 group-hover:opacity-50 transition duration-500 animate-gradient-x rounded-md"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Barra lateral derecha */}
        <aside className="relative md:absolute bottom-0 md:top-0 md:right-0 w-full md:w-72 xl:w-[35vw] rounded-t-xl md:rounded-l-xl p-4 flex flex-col gap-2 z-20">
          {/* Mapa */}
          <div className="relative rounded-md border border-white/20 bg-black/40 p-2 flex flex-col">
            <div
              ref={mapContainer}
              className="aspect-video rounded-md overflow-hidden w-full"
            />
            <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-white leading-[0.9]">
              <MapPin className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" />
              <span>Buenos Aires, Argentina</span>
            </div>
          </div>

          {/* Info filmación */}
          <div className="relative rounded-md border border-white/20 bg-black/40 p-2 md:p-4 flex flex-col justify-center items-center text-center">
            <TypewriterText
              text="+5000 hs de filmación"
              className="text-sm font-semibold text-white leading-[0.9]"
            />
          </div>

          {/* Proyectos */}
          <div className="relative rounded-md border border-white/20 bg-black/40 p-2 md:p-4 flex flex-col justify-center items-center text-center">
            <TypewriterText
              text="+100 proyectos realizados"
              className="text-sm font-semibold text-white leading-[0.9]"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
