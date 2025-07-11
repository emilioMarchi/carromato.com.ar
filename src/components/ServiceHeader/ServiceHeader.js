"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, MapPin } from "lucide-react";
import { TypewriterTitle } from "@/helpers/TypewriterEfect";

export default function ServiceHeader({ item }) {
  const [liked, setLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock(); // Set inicial al montar
    const interval = setInterval(updateClock, 1000); // 👉 cada segundo
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full pt-20 flex flex-col md:flex-row justify-between items-center gap-4 lg:px-15 py-4 bg-black/60 text-white backdrop-blur-lg border-b border-white/10">
      {/* Izquierda */}
      <div className="flex flex-col gap-1 md:gap-2 max-w-xl px-4">
        <p>SERVICIO</p>
        <TypewriterTitle text={item.title} as="h1" size="text-4xl md:text-6xl" loop={false} />
        <p className="text-sm md:text-base text-white/70">{item.description}</p>
        <div className="flex items-center gap-4 text-xs md:text-sm text-white/50 mt-1">
          <span className="flex items-center gap-1">
            <MapPin size={14} /> Buenos Aires, Argentina
          </span>
          <span>🕒 {currentTime} hs</span>
        </div>
      </div>

      {/* Derecha */}
      <div className="flex items-center gap-4 px-4">
        <button
          onClick={() => setLiked(!liked)}
          className={`p-2 rounded-full border border-white/20 transition hover:bg-white/10 ${
            liked ? "text-red-500" : "text-white"
          }`}
        >
          <Heart size={22} fill={liked ? "currentColor" : "none"} />
        </button>

        <button
          onClick={() => alert("Contacto abierto")}
          className="flex items-center gap-2 p-2 px-4 border border-white text-white text-sm rounded-md hover:bg-white/10 transition"
        >
          <MessageCircle size={18} />
          <span>Contactar</span>
        </button>
      </div>
    </div>
  );
}
