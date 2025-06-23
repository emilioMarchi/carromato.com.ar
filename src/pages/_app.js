import "@/styles/globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import {WpButton} from "@/components/WpButton/WpButton";



export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <WpButton/>
      <Footer/>
    </>
  );
}
