"use client";

import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import { MapPin, Briefcase, Calendar } from "lucide-react";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function BannerPanelData() {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapInstance.current && mapContainer.current) {
      mapInstance.current = new maplibregl.Map({
        container: mapContainer.current,
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=nK1d2De6d23VzpHvim46",
        center: [-58.4449133, -34.5886786],
        zoom: 11,
        interactive: true,
        attributionControl: false,
      });

      new maplibregl.Marker()
        .setLngLat([-58.4449133, -34.5886786])
        .addTo(mapInstance.current);
    } else if (mapInstance.current) {
      mapInstance.current.resize();
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-black  md:h-[60vh] lg:h-[90vh] flex flex-col justify-center pt-10">

      {/* Video fondo */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://pandoramarketing.net/wp-content/uploads/2020/10/200.gif)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      </div>

      {/* Texto sobre video */}
      <div className="relative z-10 flex flex-col justify-center p-6 md:p-10 text-white md:mr-[250px]">
        <p className="uppercase text-sm lg:text-lg tracking-widest text-gray-400 mb-4">
          Conocenos
        </p>
        <TypewriterTitle
          text={`CARRO_\nMATO\nPRODS`}
          as="h1"
          size="text-7xl md:text-6xl lg:text-8lg"
          className="font-extrabold leading-[0.8] aspect-video md:aspect-auto"
        />
        <p className="text-lg lg:text-3lg text-gray-300 max-w-prose mt-4 leading-[1]">
          Somos un equipo de creativos, diseñadores y realizadores audiovisuales que transforman ideas en imágenes con identidad y propósito.
        </p>
      </div>

      {/* Panel info */}
      <div className="relative z-20 flex flex-col md:absolute md:mt-20 lg:mt-15 md:top-0 md:right-0 md:justify-center md:items-end gap-4 p-4 md:p-8">

        {/* Mapa */}
        <div
          ref={mapContainer}
          className="w-full md:w-64 h-48 rounded-2xl border border-white/20 shadow-lg"
        />

        {/* Cajas de info */}
        <div className="flex flex-col gap-2 w-full md:w-64  mt-2">
          {/* Caja 1 */}
          <div className="flex items-center gap-2 border border-white/20 rounded-2xl p-3 backdrop-blur-sm w-full">
            <MapPin className="w-7 h-7 text-orange-200" />
            <div>
              <p className="text-xs text-white">Estamos en</p>
              <TypewriterTitle
                text="Buenos Aires, Argentina"
                as="h3"
                size="text-sm"
                className="font-bold text-white"
                loop={false}
              />
            </div>
          </div>

          {/* Caja 2 */}
          <div className="flex items-center gap-2 border border-white/20 rounded-2xl p-3 backdrop-blur-sm w-full">
            <Briefcase className="w-7 h-7 text-violet-200" />
            <div>
              <p className="text-xs text-white">Proyectos realizados</p>
              <TypewriterTitle
                text="+150"
                as="h3"
                size="text-sm"
                className="font-bold text-white"
                loop={false}
              />
            </div>
          </div>

          {/* Caja 3 */}
          <div className="flex items-center gap-2 border border-white/20 rounded-2xl p-3 backdrop-blur-sm w-full">
            <Calendar className="w-7 h-7 text-orange-200" />
            <div>
              <p className="text-xs text-white">Desde</p>
              <TypewriterTitle
                text="2017"
                as="h3"
                size="text-sm"
                className="font-bold text-white"
                loop={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
