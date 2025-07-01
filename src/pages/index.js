import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";


import { FAQContactSection } from "@/components/FaqContactSection/FaqContactSection";
import HomeBanner from "@/components/HomeBanner/HomeBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} w-full `}
    >
      <main className="flex flex-col items-center gap-8">
        <HomeBanner/>

      
        <FAQContactSection/>  
      </main>
    </div>
  );
}
