"use client";

import { useEffect, useState, useRef } from "react";
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

  useEffect(() => {
    
    if (slug) {
      const found = ModelDetailServicesItems.find((item) =>
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

  const handleOpenVideo = () => {
    openVideo(currentItem.video)

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
            onClick={handleOpenVideo}
            className="flex items-center gap-2 text-sm border border-white/30 px-3 py-1 rounded hover:bg-white/10 transition"
          >
            <Play size={16} /> Ver video
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
          className="flex items-center gap-2 w-max mt-4 border border-white p-3 px-6 rounded-md hover:bg-white/10 transition"
        >
          <span>Consultar</span>
          <ArrowRight size={18} />
        </a>
      </div>

      {/* Video Modal */}

    </div>
  );
}
