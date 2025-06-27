"use client";

import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import { MapPin, Briefcase, Calendar } from "lucide-react";

export default function BannerPanelData() {
  return (
    <div className="w-full flex flex-col md:flex-row h-[85vh] relative overflow-hidden">

      {/* Video fondo */}
      <div className="relative w-full md:w-3/4 h-[85vh] overflow-hidden">
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
        <div className="relative z-10 flex flex-col justify-center h-full p-10 text-white max-w-3xl">
          <p className="uppercase text-sm tracking-widest text-gray-400 mb-4">
            Conocenos
          </p>
          <TypewriterTitle
            text="Creamos contenido que conecta."
            as="h1"
            size="text-5xl md:text-7xl"
            className="font-extrabold"
          />
          <p className="text-lg text-gray-300 max-w-prose mt-4">
            Somos un equipo de creativos, diseñadores y realizadores audiovisuales que transforman ideas en imágenes con identidad y propósito.
          </p>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="w-full md:w-1/4 h-[85vh] bg-black/90 text-white flex flex-col justify-center gap-6 p-8">
        {/* Caja 1 */}
        <div className="flex items-center gap-4 border border-white/20 rounded-2xl p-5 backdrop-blur-sm">
          <MapPin className="w-8 h-8 text-orange-400" />
          <div>
            <p className="text-sm text-gray-400">Estamos en</p>
            <TypewriterTitle
              text="Santa Fe, Argentina"
              as="h3"
              size="text-lg md:text-xl"
              className="font-bold text-white"
              loop={false}
            />
          </div>
        </div>

        {/* Caja 2 */}
        <div className="flex items-center gap-4 border border-white/20 rounded-2xl p-5 backdrop-blur-sm">
          <Briefcase className="w-8 h-8 text-violet-400" />
          <div>
            <p className="text-sm text-gray-400">Proyectos realizados</p>
            <TypewriterTitle
              text="+150"
              as="h3"
              size="text-lg md:text-xl"
              className="font-bold text-white"
              loop={false}
            />
          </div>
        </div>

        {/* Caja 3 */}
        <div className="flex items-center gap-4 border border-white/20 rounded-2xl p-5 backdrop-blur-sm">
          <Calendar className="w-8 h-8 text-orange-400" />
          <div>
            <p className="text-sm text-gray-400">Desde</p>
            <TypewriterTitle
              text="2017"
              as="h3"
              size="text-lg md:text-xl"
              className="font-bold text-white"
              loop={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
