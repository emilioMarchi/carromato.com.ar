import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Work() {

  const router = useRouter()
  const {slug} = router.query
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 sm:p-20`}
    >
      <main className="flex flex-col items-center gap-8">
        {/* Tu contenido va acá */}
        <h1 className="text-3xl font-bold">Portfolio:{slug}</h1>
      </main>
    </div>
  );
}
