"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function VideoPlayerModal({ src, isOpen, onClose }) {
  const [hasError, setHasError] = useState(false);

  if (!isOpen) return null;

  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
  const isVimeo = src.includes("vimeo.com");
  const isGif = src.endsWith(".gif");
  const isVideoFile = /\.(mp4|mov|webm|ogg)$/i.test(src);

  return (
    <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center">
      {/* Botón de cierre */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/70 rounded-full p-2 hover:bg-orange-400 transition"
        aria-label="Cerrar"
      >
        <X size={26} />
      </button>

      {/* Contenido */}
      {hasError ? (
        <div className="text-white text-center p-6">
          <p className="text-xl font-semibold mb-2">No se pudo cargar el contenido.</p>
          <p className="text-gray-400">Verificá que el link sea válido o intenta más tarde.</p>
        </div>
      ) : isYouTube ? (
        <iframe
          src={convertYouTubeURL(src)}
          className="w-full h-full max-h-[90vh] max-w-[90vw]"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      ) : isVimeo ? (
        <iframe
          src={convertVimeoURL(src)}
          className="w-full h-full max-h-[90vh] max-w-[90vw]"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      ) : isGif ? (
        <img
          src={src}
          alt="GIF animado"
          className="w-full h-full max-h-[90vh] max-w-[90vw] object-contain"
          onError={() => setHasError(true)}
        />
      ) : isVideoFile ? (
        <video
          src={src}
          className="w-full h-full max-h-[90vh] max-w-[90vw] object-contain"
          autoPlay
          controls
          playsInline
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="text-white text-center p-6">
          <p className="text-xl font-semibold mb-2">Formato no soportado.</p>
        </div>
      )}
    </div>
  );
}

function convertYouTubeURL(url) {
  const videoId = url.includes("youtu.be")
    ? url.split("/").pop()
    : new URL(url).searchParams.get("v");
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

function convertVimeoURL(url) {
  const videoId = url.split("/").pop();
  return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
}
