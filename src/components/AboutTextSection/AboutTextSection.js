"use client";

import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import { Camera, Film, Video, Mic, Play, Monitor } from "lucide-react";

export default function AboutTextSection() {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 py-20 text-white overflow-hidden">
      {/* Íconos decorativos */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <FloatingIcon icon={Camera} top="10%" left="15%" delay="0s" />
        <FloatingIcon icon={Film} top="70%" left="10%" delay="2s" />
        <FloatingIcon icon={Video} top="20%" left="80%" delay="1s" />
        <FloatingIcon icon={Mic} top="80%" left="75%" delay="2.5s" />
        <FloatingIcon icon={Play} top="50%" left="50%" delay="1.5s" />
        <FloatingIcon icon={Monitor} top="35%" left="25%" delay="3s" />
      </div>

      {/* Contenido en columnas en desktop */}
      <div className="relative z-10 flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
        {/* Izquierda: título + primer párrafo */}
        <div className="md:w-1/2 text-center md:text-left">
          <TypewriterTitle
            text="Carromato es..."
            as="h2"
            size="text-5xl md:text-4xl"
            className="font-extrabold mb-6 text-white bg-gradient-to-r from-white to-violet-400 bg-clip-text "
            data-aos="fade-up"
            data-aos-delay="100"
          />
          <p
            className="text-lg md:text-xl text-gray-300 leading-[0.9] max-w-prose mx-auto md:mx-0"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Somos un equipo de creativos y realizadores audiovisuales enfocados en potenciar ideas, marcas y proyectos con contenido original, estratégico y emocional.
          </p>
        </div>

        {/* Derecha: segundo párrafo */}
        <div className="md:w-1/2 text-center md:text-left flex items-center">
          <p
            className="text-lg md:text-xl text-gray-300 leading-[0.9] max-w-prose mx-auto md:mx-0"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Desde 2012 trabajamos junto a artistas, emprendedores y empresas para contar historias con identidad y estilo propio, combinando creatividad, técnica y cercanía.
          </p>
        </div>
      </div>
    </section>
  );
}

function FloatingIcon({ icon: Icon, top, left, delay }) {
  return (
    <div
      className="absolute text-white/10"
      style={{
        top,
        left,
        animation: `float 6s ease-in-out infinite`,
        animationDelay: delay,
      }}
    >
      <Icon size={64} />
    </div>
  );
}
