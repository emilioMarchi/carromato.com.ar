"use client";
import { createContext, useState, useContext } from "react";

const Context = createContext();

export function useProvider() {
  return useContext(Context);
}

export function Provider({ children }) {
  const [proyectSelected, setProyectSelected] = useState(null)
  
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);

  const [viewerImageConfig, setViewer] = useState({
    isOpen:false,
    images:[],
    currentIndex:null,
  })
  
  const updateViewer = (updates) => {
    setViewer((prev) => ({
      ...prev,
      ...updates,
    }));
  };


  const setProyect = (proyect) => {
    setProyectSelected(proyect)
    console.log(proyectSelected, proyect)
  }
  const openVideo = (src) => {
    console.log('asdas')
    setVideoSrc(src);
    setIsVideoOpen(true);
    
  };

  const closeVideo = () => {
    setVideoSrc(null);
    setIsVideoOpen(false);
  };

  return (
    <Context.Provider value={{ 
       updateViewer, viewerImageConfig,
      isVideoOpen, videoSrc, openVideo, closeVideo, setProyect, proyectSelected }}>
      {children}
    </Context.Provider>
  );
}
