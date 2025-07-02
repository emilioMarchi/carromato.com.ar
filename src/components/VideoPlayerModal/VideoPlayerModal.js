"use client";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useProvider } from "@/context/Provider";

export default function VideoPlayerModal() {
  const { isVideoOpen, videoSrc, closeVideo } = useProvider();
  const [hasError, setHasError] = useState(false);

  // Controlar el overflow del body al abrir/cerrar modal
  useEffect(() => {
    console.log(isVideoOpen, videoSrc)
    if (isVideoOpen) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }


    // cleanup por si se desmonta
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVideoOpen, videoSrc]);

  if (!isVideoOpen || !videoSrc) return null;

  const isYouTube = videoSrc.includes("youtube.com") || videoSrc.includes("youtu.be");
  const isVimeo = videoSrc.includes("vimeo.com");
  const isGif = videoSrc.endsWith(".gif");
  const isVideoFile = /\.(mp4|mov|webm|ogg)$/i.test(videoSrc);
  const isImage = /\.(jpg|jpeg|png|webp)$/i.test(videoSrc);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <button
        onClick={closeVideo}
        className="absolute top-4 right-4 text-white bg-black/70 rounded-full p-2 hover:bg-orange-400 transition"
        aria-label="Cerrar"
      >
        <X size={26} />
      </button>

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
      ) : isGif || isImage ? (
        <img
          src={videoSrc}
          alt="Contenido"
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-xl"
          onError={() => setHasError(true)}
        />
      ) : isVideoFile ? (
        <video
          src={videoSrc }
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-xl"
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
