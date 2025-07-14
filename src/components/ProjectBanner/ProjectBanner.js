"use client";

import { Play, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useProvider } from "@/context/Provider";

export default function ProjectBanner({ project }) {
  const { openVideo } = useProvider();
  const [liked, setLiked] = useState(false);

  const localStorageKey = `like_${project.slug}`;

  useEffect(() => {
    const storedLike = localStorage.getItem(localStorageKey);
    setLiked(storedLike === "true");
  }, [localStorageKey]);

  const toggleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    localStorage.setItem(localStorageKey, newLikedState.toString());
  };

  const handleVideoPlayer = () => {
    openVideo(project.background);
  };

  return (
    <div
      className="w-full relative h-[55vh] overflow-hidden flex flex-col justify-end lg:px-5"
      style={{
        backgroundImage: `url(${project.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

      <div className="relative z-20 w-full max-w-7xl mx-auto p-6 flex flex-col gap-4">
        {/* Título arriba, ocupa todo el ancho */}
        <h2 className="text-3xl md:text-5xl font-extrabold leading-[.9] gradient-text">
          {project.title}
        </h2>

        {/* Detalles y botones abajo, en fila */}
        <div className="flex justify-between items-center">
          {/* Detalles técnicos */}
          <div className="flex gap-1 p-1 text-sm text-white/80 flex-wrap">
            {project.technicalData.map((item) => {
              if (item.label === "Cliente" || item.label === "Formato") return null;
              return <span key={item.label}>{item.value}</span>;
            })}
          </div>

          {/* Botones */}
          <div className="flex gap-3 items-center flex-shrink-0">
            <button
              onClick={toggleLike}
              className={`p-3 rounded-full cursor-pointer transition border-none gradient-button ${
                liked ? "text-red-500" : "text-white"
              }`}
              aria-label="Like"
            >
              <Heart size={30} fill={liked ? "currentColor" : "none"} />
            </button>

            <button
              onClick={handleVideoPlayer}
              className="p-3 rounded-full cursor-pointer transition border-none gradient-button text-white"
              aria-label="Ver video"
            >
              <Play size={30} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .gradient-text {
          background: linear-gradient(
            270deg,
            rgba(255, 255, 255, 1),
            rgba(255, 156, 79, 0.6),
            rgba(255, 255, 255, 1)
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-x 6s ease infinite;
        }

        .gradient-button {
          background: linear-gradient(
            270deg,
            rgba(255, 156, 79, 0.3),
            rgba(255, 156, 79, 0.1),
            rgba(255, 156, 79, 0.3)
          );
          background-size: 300% 300%;
          animation: gradient-x 8s ease infinite;
          border: 1px solid rgba(255, 156, 79, 0.3);
          transition: all 0.3s ease;
        }

        .gradient-button:hover {
          background: linear-gradient(
            270deg,
            rgba(255, 156, 79, 0.6),
            rgba(255, 156, 79, 0.3),
            rgba(255, 156, 79, 0.6)
          );
          background-size: 300% 300%;
          border-color: rgba(255, 156, 79, 0.5);
        }
      `}</style>
    </div>
  );
}
