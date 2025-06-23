import Link from "next/link";
import { useEffect, useState } from "react";
import { WhatsApp } from "lucide-react";

export function WpButton({ phone = "+5493424414637", message = "¡Hola!" }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
    phone
  )}&text=${encodeURIComponent(message)}`;

  const size = isMobile ? 48 : 64;

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <div
        className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg hover:scale-110 transition-transform z-50 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
       
      </div>
    </Link>
  );
}
