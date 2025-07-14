"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, Clock, MapPin, User, Monitor } from "lucide-react"; // agrego íconos
import ProjectBanner from "../ProjectBanner/ProjectBanner";
import { useProvider } from "@/context/Provider";

export default function WorkPageSection({ project }) {
  const { updateViewer } = useProvider();

  // Mapeo los íconos según posición en el arreglo technicalData
  const iconMap = [Clock, MapPin, User, Monitor];

  return (
    <section className="w-full overflow-hidden bg-black text-white">
      {/* Banner superior */}
      <ProjectBanner project={project} />

      {/* Contenedor principal: info técnica + galería */}
      <div className="flex flex-col md:flex-row border-t border-white/10 lg:px-10">
        <div className="w-full md:w-[100%] flex flex-col md:flex-row p-3 gap-4">
          {/* Info técnica */}
          <div className="flex-[3] flex flex-wrap lg:flex-nowrap justify-between gap-4 m-2 md:m-10 ">
            <div>
              <h3 className="text-white text-xl font-semibold mb-3">Ficha técnica</h3>
              <ul className="flex flex-col gap-2 text-sm text-gray-300">
                {project.technicalData.map(({ label, value }, i) => {
                  const Icon = iconMap[i]; // obtener ícono según índice
                  return (
                    <li key={i} className="flex items-center gap-2">
                      {Icon && <Icon size={16} className="text-orange-400 flex-shrink-0" />}
                      <span className="font-medium">{label}:</span>{" "}
                      <span className="truncate">{value}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Resumen */}
            {project.summary && (
              <div className="text-gray-400 text-lg lg:text-sm leading-[1.1] border-t border-white/10 pt-3">
                {project.summary}
              </div>
            )}
          </div>

          {/* Galería */}
          <div className="flex-[1] flex flex-col gap-3">
            {project.images.slice(0, 3).map((img, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-xl cursor-pointer group"
                onClick={() => {
                  updateViewer({
                    isOpen: true,
                    images: project.images,
                    currentIndex: index,
                  });
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={750}
                  height={400}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80" />
                <div className="absolute bottom-1 left-1 flex items-center gap-1 text-white opacity-90 px-2 py-1 rounded bg-black/50 backdrop-blur-sm text-xs">
                  <Maximize2 size={14} className="text-orange-300" />
                  <span>{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
