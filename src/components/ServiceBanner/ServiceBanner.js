"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { ArrowRight, CheckCircle, Film, Video, Play } from "lucide-react";
import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import VideoPlayerModal from "@/components/VideoPlayerModal/VideoPlayerModal";
import { ModelDetailServicesItems, ModelServicesItems } from "@/data/dataModels";
import { useProvider } from "@/context/Provider";

export default function ServiceBanner({ slug, items }) {
  const [service, setService] = useState(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState(null);
  const { openVideo, isVideoOpen, videoSrc, closeVideo } = useProvider();
  const intervalRef = useRef(null);
  const router = useRouter(); // 👉 agregamos el hook

  useEffect(() => {
    if (slug) {
      const found = ModelDetailServicesItems.find(
        (item) =>
          item.slug.endsWith(`/servicios/${slug}`) ||
          item.slug.replace("/servicios/", "") === slug
      );
      setService(found);
    }
  }, [slug]);

  useEffect(() => {
    if (items.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentItemIndex((prev) => (prev + 1) % items.length);
      }, 5000);
      return () => clearInterval(intervalRef.current);
    }
  }, [items]);

  if (!service) return null;

  const currentItem = items[currentItemIndex];

  const handleGoToProject = () => {
    if (currentItem?.slug) {
      router.push(`/${currentItem.slug}`);
    }
  };

  return (
    <div className="relative w-full flex flex-col md:flex-row overflow-hidden text-white">
      {/* Video mitad izquierda */}
      <div className="relative w-full md:w-1/2 h-[50vh]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url(${currentItem.video})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

        {/* Footer sobre video */}
        <div className="absolute bottom-0 left-0 w-full bg-black/30 backdrop-blur-sm p-4 flex justify-between items-center text-sm">
          <div className="flex flex-col">
            <span className="font-medium">{currentItem.title}</span>
            <span className="text-white/50">{service.title}</span>
          </div>
          <button
            onClick={handleGoToProject}
            className="relative flex items-center justify-center gap-2 p-3 px-5 border border-white text-white text-base font-medium rounded-md overflow-hidden group transition-all duration-300 hover:scale-105 w-max"
          >
            <span className="relative z-10 cursor-pointer leading-[0.9]">Ver proyecto</span>
            <Play size={18} className="relative z-10" />
            <span
              className="absolute inset-0 opacity-30 group-hover:opacity-25 transition duration-500 rounded-md gradient-animated"
              style={{
                background: 'linear-gradient(90deg, #a78bfa, #c4b5fd)',
              }}
            />
          </button>



        </div>
      </div>

      {/* Contenido lado derecho */}
      <div className="relative z-10 flex flex-col justify-center gap-6 p-8 md:w-1/2 backdrop-blur-lg">
        <p className="text-white/80 text-base md:text-lg">{service.description}</p>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm md:text-base text-white/80">
            <Video size={18} />
            Producción en calidad 4K
          </div>
          <div className="flex items-center gap-3 text-sm md:text-base text-white/80">
            <Film size={18} />
            Edición profesional y motion graphics
          </div>
          <div className="flex items-center gap-3 text-sm md:text-base text-white/80">
            <CheckCircle size={18} />
            Asesoramiento en difusión y publicación
          </div>
        </div>
        <a
          href="#contacto"
          className="relative flex items-center justify-center gap-2 p-3 px-5 border border-white text-white text-base font-medium rounded-md overflow-hidden group transition-all duration-300 hover:scale-105 w-max"
        >
          <span className="relative z-10">Consultar</span>
          <ArrowRight size={18} className="relative z-10" />
          <span
            className="absolute inset-0 opacity-30 group-hover:opacity-25transition duration-500 rounded-md gradient-animated"
            style={{
              background: 'linear-gradient(90deg, #fca969, #fed7aa)',
            }}
          />
        </a>


      </div>
    </div>
  );
}
