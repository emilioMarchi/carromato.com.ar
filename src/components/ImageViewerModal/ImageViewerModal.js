"use client";

import { useProvider } from "@/context/Provider";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function ImageViewerModal() {
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const {updateViewer, viewerImageConfig} = useProvider()

  useEffect(()=>{
    console.log('test')
  }, [])
  if (!viewerImageConfig.isOpen) return null;

  const handlePrev = () => {
    setDirection("prev");
    setAnimating(true);
    setTimeout(() => {
      const newIndex = (viewerImageConfig.currentIndex - 1 + viewerImageConfig.images.length) % viewerImageConfig.images.length;
      updateViewer({currentIndex:newIndex});
      setAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    setDirection("next");
    setAnimating(true);
    setTimeout(() => {
      const newIndex = (viewerImageConfig.currentIndex + 1) % viewerImageConfig.images.length;
      updateViewer({currentIndex:newIndex});
      setAnimating(false);
    }, 300);
  };
  const handleViewerClose = (boolean) => {
    updateViewer({isOpen:false})
  }
  return (
    <div className="fixed inset-0 z-[999] bg-black/95 flex flex-col items-center justify-center p-4">
      {/* Cerrar */}
      <button
        onClick={handleViewerClose}
        className="absolute top-4 right-4 text-white bg-black/70 rounded-full p-2 hover:bg-orange-400 transition"
        aria-label="Cerrar"
      >
        <X size={26} />
      </button>

      {/* Contenedor imagen fija */}
      <div className="flex items-center justify-center w-full max-w-[90vw] h-[75vh] relative overflow-hidden">

        {/* Botones flechas */}
        <button
          onClick={handlePrev}
          className="absolute left-2 text-white p-3 hover:bg-white/10 rounded-full z-10"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Imagen con animación */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            key={viewerImageConfig.currentIndex}
            src={viewerImageConfig.images[viewerImageConfig.currentIndex].src}
            alt={viewerImageConfig.images[viewerImageConfig.currentIndex].alt}
            className={`max-h-full max-w-full object-contain absolute transition-all duration-300 ${
              animating
                ? direction === "next"
                  ? "translate-x-full opacity-0"
                  : "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          />
        </div>

        <button
          onClick={handleNext}
          className="absolute right-2 text-white p-3 hover:bg-white/10 rounded-full z-10"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Miniaturas */}
      <div className="flex gap-2 mt-6 overflow-x-auto max-w-[90vw]">
        {viewerImageConfig.images.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > viewerImageConfig.currentIndex ? "next" : "prev");
              updateViewer(index);
            }}
            className={`border-2 rounded overflow-hidden w-24 h-16 flex-shrink-0 ${
              index === viewerImageConfig.currentIndex
                ? "border-orange-400"
                : "border-transparent"
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
