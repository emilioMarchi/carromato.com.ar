"use client";
import { createContext, useState, useContext } from "react";

const Context = createContext();

export function useProvider() {
  return useContext(Context);
}

export function Provider({ children }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);

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
    <Context.Provider value={{ isVideoOpen, videoSrc, openVideo, closeVideo }}>
      {children}
    </Context.Provider>
  );
}
