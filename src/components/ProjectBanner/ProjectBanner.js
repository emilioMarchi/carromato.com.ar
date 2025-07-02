"use client";

import { Play, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useProvider } from "@/context/Provider";

export default function ProjectBanner({ project, onPlay }) {
  const [liked, setLiked] = useState(false);
  const {openVideo} = useProvider()

  const HandleVideoPlayer = () => {
    openVideo(project.background)
  }

  return (
    <div
      className="w-full relative h-[55vh] overflow-hidden flex items-end"
      style={{
        backgroundImage: `url(${project.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

      {/* Contenido */}
      <div className="relative z-20 flex justify-between items-end w-full max-w-7xl mx-auto p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            {project.title}
          </h2>
          <div className="flex gap-4 text-sm text-white/80">
            {project.technicalData.map((item) => {
              if (item.label === "Cliente" || item.label === "Formato") return null;
              return <span key={item.label}>{item.value}</span>;
            })}
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-3 rounded-full bg-white/10 backdrop-blur hover:bg-orange-400 transition ${
              liked ? "text-orange-400" : "text-white"
            }`}
            aria-label="Like"
          >
            <Heart size={30} fill={liked ? "currentColor" : "none"} />
          </button>

          <button
            onClick={HandleVideoPlayer}
            className="p-3 rounded-full bg-white/10 backdrop-blur hover:bg-orange-400 transition text-white"
            aria-label="Ver video"
          >
            <Play size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}
