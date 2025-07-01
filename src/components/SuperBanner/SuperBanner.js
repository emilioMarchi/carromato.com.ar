import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { TypewriterTitle } from "@/helpers/TypewriterEfect";

export default function ServicesBanner({ items, subtitle = "SERVICIOS AUDIOVISUALES" }) {
  const [selected, setSelected] = useState(items[0]);

  return (
    <div
      className="w-full relative h-[75vh] overflow-hidden flex flex-col justify-between text-white p-10 pt-20"
      style={{
        backgroundImage: `url(${selected.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay general */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Gradiente sombra uniforme desde abajo */}
      <div
        className="absolute inset-0 z-5 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col gap-2 max-w-5xl">
        <div className="p-8">
          <p className="text-sm font-light text-white/80 tracking-wide">{subtitle}</p>
          <TypewriterTitle text={selected.title} as="h1" size="text-6xl" loop={false} />

          {/* Botón */}
          <Link
            href={selected.slug}
            className="relative flex justify-center items-center p-3 px-5 border border-white text-white text-base font-medium rounded-md overflow-hidden group transition-all duration-300 hover:scale-105 w-56 mt-4"
          >
            <span className="relative z-10 leading-[0.9] text-center">Ver servicio</span>
            <ArrowRight
              size={20}
              className="m-1 z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
            <span className="absolute inset-0 opacity-30 group-hover:opacity-50 transition duration-500 animate-gradient-x rounded-md" />
          </Link>
        </div>
      </div>

      {/* Service cards bien distribuidas */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 p-4 pt-0">
        {items.map((item) => (
          <Link
            href={item.slug}
            key={item.slug}
            onMouseEnter={() => setSelected(item)}
            className="group relative flex-shrink-0 w-48 aspect-video rounded-md border border-white/20 overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition duration-300" />
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-sm font-medium">
              <span>{item.title}</span>
              <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
