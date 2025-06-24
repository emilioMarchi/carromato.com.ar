"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Instagram, Facebook, Youtube } from "lucide-react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/nosotros", label: "Nosotros" },
];

const activeColors = ["#f97316", "#a78bfa"]; // naranja y lila
const gradientesHover = [
  "hover:text-orange-400 transition-colors duration-300",
  "hover:text-violet-400 transition-colors duration-300",
  "hover:text-orange-400 transition-colors duration-300",
  "hover:text-violet-400 transition-colors duration-300",
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navState, setNavState] = useState("expanded"); // "expanded" | "medium" | "hidden"
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveringHiddenNav, setHoveringHiddenNav] = useState(false);

  useEffect(() => {
    let scrollTimeout;

    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setNavState("expanded");
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        if (scrollTimeout) clearTimeout(scrollTimeout);
        setNavState("hidden");
        scrollTimeout = setTimeout(() => {
          setNavState("medium");
        }, 300);
      } else {
        // Scrolling up
        setNavState("expanded");
      }

      setLastScrollY(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [lastScrollY]);

  // Cuando el nav está oculto, si se está haciendo hover, lo mostramos expandido
  const effectiveNavState =
    navState === "hidden" && hoveringHiddenNav ? "expanded" : navState;

  // Obtener pathname para determinar el link activo
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";

  const heightByState = {
    expanded: 80,
    medium: 50,
    hidden: 4,
  };

  return (
    <>
      {/* Zona invisible para capturar hover cuando nav está oculto */}
      {navState === "hidden" && (
        <div
          onMouseEnter={() => setHoveringHiddenNav(true)}
          onMouseLeave={() => setHoveringHiddenNav(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "20px", // área sensible extendida (ajustá como prefieras)
            zIndex: 1000,
            cursor: "pointer",
          }}
        />
      )}

      <header
        onMouseEnter={() => {
          if (navState === "hidden") setHoveringHiddenNav(true);
        }}
        onMouseLeave={() => {
          if (navState === "hidden") setHoveringHiddenNav(false);
        }}
        className="fixed top-0 left-0 w-full z-50 bg-black text-white transition-all duration-200 overflow-hidden shadow-md"
        style={{
          height: heightByState[effectiveNavState],
          borderBottom:
            effectiveNavState === "hidden"
              ? `2px solid ${
                  activeColors[
                    links.findIndex((l) => l.href === pathname) % activeColors.length
                  ]
                }`
              : "none",
        }}
      >
        {/* Barra visible cuando nav no está oculto */}
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-4 h-full transition-all duration-200 ${
            effectiveNavState === "hidden" ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo.svg" alt="Carromato" width={120} height={40} />
          </Link>

          {/* Menú Desktop */}
          <nav
            className="hidden md:flex flex-1 justify-center gap-8 items-center text-sm tracking-wide text-gray-300"
            aria-label="Menú principal"
          >
            {links.map((link, i) => {
              const isActive = pathname === link.href;
              const activeColor = activeColors[i % activeColors.length];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative transition font-light ${
                    isActive
                      ? "font-extrabold"
                      : gradientesHover[i % gradientesHover.length]
                  } hover:font-semibold`}
                  style={{
                    paddingBottom: "4px",
                    color: isActive ? activeColor : undefined,
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "1px",
                        backgroundColor: activeColor,
                        borderRadius: "4px 4px 0 0",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Íconos redes Desktop */}
          <div className="hidden md:flex gap-6 ml-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-orange-400 transition-colors duration-300"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-violet-400 transition-colors duration-300"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-orange-400 transition-colors duration-300"
            >
              <Youtube size={20} />
            </a>
          </div>

          {/* Mobile icons + hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-orange-400 transition-colors duration-300"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-violet-400 transition-colors duration-300"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-orange-400 transition-colors duration-300"
              >
                <Youtube size={24} />
              </a>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Menú mobile desplegable */}
        {menuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <nav className="flex flex-col gap-4 p-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white font-semibold text-lg"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
