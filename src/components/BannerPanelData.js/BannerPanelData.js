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
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=nK1d2De6d23VzpHvim46",
        center: [-58.4449133, -34.5886786],
        zoom: 11,
        interactive: true,
        attributionControl: false,
      });

      mapInstance.current = map;

      // Popup custom como en HomeBanner
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

      new maplibregl.Marker({ color: "#E60023" })
        .setLngLat([-58.4449133, -34.5886786])
        .addTo(map);
    } else if (mapInstance.current) {
      mapInstance.current.resize();
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-black md:h-[60vh] lg:h-[90vh] flex flex-col justify-center pt-10">
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
          className="w-full md:w-64 xl:w-[30vw] h-48 rounded-2xl border border-white/20 shadow-lg"
        />

        {/* Cajas de info */}
        <div className="flex flex-col gap-2 w-full md:w-64 xl:w-[30vw]  mt-2">
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
