import "@/styles/globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect, useState } from 'react';
import { WpButton } from "@/components/WpButton/WpButton";
import {Provider} from '@/context/Provider'

import VideoPlayerModal from "@/components/VideoPlayerModal/VideoPlayerModal";

export default function App({ Component, pageProps }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lights = [
    {
      top: "5%",
      left: "-10%",
      size: 350,
      color: "rgba(255,240,200,0.8)",
      factor: 0.08
    },
    {
      top: "60%",
      right: "-20%",
      size: 400,
      color: "rgba(255,255,255,0.8)",
      factor: 0.05
    },
    {
      top: "110%",
      left: "50%",
      size: 300,
      color: "rgba(200,150,255,0.5)",
      factor: 0.06
    },
    {
      top: "30%",
      left: "80%",
      size: 250,
      color: "rgba(255,230,180,0.6)",
      factor: 0.07
    },
    {
      top: "80%",
      left: "10%",
      size: 300,
      color: "rgba(255,255,255,0.6)",
      factor: 0.045
    },
  ];

  return (
    <>
      {/* Fondo de luces */}
      <div className="fixed inset-0 z-[-10] pointer-events-none overflow-hidden">
        {lights.map((light, index) => (
          <div
            key={index}
            className="glow-light animate-soft-float"
            style={{
              width: `${light.size}px`,
              height: `${light.size}px`,
              background: `radial-gradient(circle, ${light.color}, transparent 70%)`,
              top: light.top,
              left: light.left,
              right: light.right,
              transform: `translateY(${scrollY * light.factor}px)`
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        <Provider>
          <Navbar />
          <VideoPlayerModal/>
          <Component {...pageProps} />
          <WpButton />
          <Footer />
        </Provider>
      </div>
    </>
  );
}
