import Link from "next/link";
import { useEffect, useState } from "react";

export function WpButton({
  phone = "+5492216191340",
  message = "¡Hola Carromato!"
}) {
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
        className="fixed bottom-4 right-4 bg-green-500 rounded-full shadow-lg hover:scale-110 transition-transform z-50 flex items-center justify-center text-white"
        style={{ width: size, height: size }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size * 0.5}
          height={size * 0.5}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.52 3.48A11.77 11.77 0 0 0 12 0a11.77 11.77 0 0 0-8.52 3.48A11.77 11.77 0 0 0 0 12c0 2.12.56 4.19 1.62 6.02L0 24l6.25-1.63A11.86 11.86 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.17-3.48-8.52zM12 22a9.9 9.9 0 0 1-5.07-1.38l-.36-.21-3.7.97.99-3.61-.23-.37A9.95 9.95 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.33-7.62c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.15-.17.2-.35.22-.65.07a8.02 8.02 0 0 1-2.36-1.45 8.4 8.4 0 0 1-1.55-1.93c-.17-.3 0-.46.13-.6.13-.13.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.56-.48-.48-.66-.48l-.56-.01a1.08 1.08 0 0 0-.78.36c-.27.3-1.03 1.01-1.03 2.48 0 1.47 1.06 2.89 1.2 3.08.15.2 2.08 3.17 5.05 4.45.7.3 1.24.48 1.66.62.7.22 1.34.19 1.85.11.56-.08 1.77-.72 2.03-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.19-.56-.34z" />
        </svg>
      </div>
    </Link>
  );
}
