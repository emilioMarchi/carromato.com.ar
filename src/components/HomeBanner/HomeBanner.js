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
      className=" p-3 relative md:w-full h-[42rem] md:h-[80vh] md:pb-10 overflow-hidden md:p-5"
    
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
      <div className="flex h-full xl:p-4">
        {/* Izquierda */}
        <div
          className="relative w-[100vw] z-10 flex-1 flex flex-col justify-end text-white pt-20 p-2 lg:mr-[250px]"
          
        >
          {/* Redes sociales */}
          <div className="flex gap-4 mb-2">
            <Link
              href="https://www.instagram.com/carromato"
              target="_blank"
              className="text-white hover:text-orange-400 transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-7 h-7 md:w-8 md:h-8 lg:w-12 lg:h-12 xl:w-10 xl:h-10" />
            </Link>
            <Link
              href="https://www.facebook.com/carromato"
              target="_blank"
              className="text-white hover:text-violet-400 transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-7 h-7 md:w-8 md:h-8 lg:w-12 lg:h-12xl:w-10 xl:h-10" />
            </Link>
            <Link
              href="https://www.youtube.com/carromato"
              target="_blank"
              className="text-white hover:text-orange-400 transition-colors duration-300"
              aria-label="YouTube"
            >
              <Youtube className="w-7 h-7 md:w-8 md:h-8 lg:w-12 lg:h-12 xl:w-10 xl:h-10" />
            </Link>
          </div>

          {/* Título */}
          <TypewriterTitle className='' text="CARROMATO" as="h1" size="text-6xl md:text-8xl lg:text-8xl lg:text-7xl " />

          {/* Subtítulo */}
          <p className=" w-full xl:w-[50vw] text-lg  md:text-2xl lg:text-3xl xl:text-xl  text-gray-300 leading-[0.9]  md:mb-2">
            Producción de contenido audiovisual para marcas, proyectos y artistas.
          </p>

          {/* Botones */}
          <div className="flex flex-col justify-center md:justify-start items-center gap-2 md:gap-3 md:flex-row  md:mt-6 w-full">
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
                <span className="relative z-10 leading-[0.9] text-center text-sm md:text-xl lg:text-2xl  xl:text-[1rem] ">
                  {label}
                </span>
                <ArrowRight
                  
                  className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-7 xl:h-7 absolute md:bottom-2 right-2 z-10 transition-transform duration-300 group-hover:translate-x-1"
                />
                <span className="absolute inset-0 opacity-30 group-hover:opacity-50 transition duration-500 animate-gradient-x rounded-md"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Barra lateral derecha */}s
        
        <aside
          className="absolute p-2 w-40 top-0 right-0 z-10 md:w-72 flex flex-col gap-1 text-white m-2 justify-center item-center"
          
        >
          {/* Cuadro mapa */}
          <div className="relative rounded-md border border-white/20 bg-black/40 p-2 flex flex-col">
            <div
              ref={mapContainer}
              className="aspect-square rounded-md overflow-hidden w-full"
        
            />
            {/* Info ubicación */}
            <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-gray-300 leading-[0.9]">
              <MapPin className='w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9'/>
              <span>Buenos Aires, Argentina</span>
            </div>
          </div>

          {/* Cuadro info grabación */}
          <div className="relative rounded-md border border-white/20 bg-black/40 p-2 md-p-4 flex flex-col justify-center items-center text-center">
            <TypewriterText
              text="+30000 hs de filmación"
              className="text-sm font-semibold text-gray-300 leading-[0.9]"
            />
          </div>

          {/* Cuadro proyectos realizados */}
          <div className="relative rounded-md border border-white/20 bg-black/40 p-2 md-p-4 flex flex-col justify-center items-center text-center">
            <TypewriterText
              text="+100 proyectos realizados"
              className="text-sm font-semibold text-gray-300 leading-[0.9] "
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
