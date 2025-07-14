'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  Instagram,
  Facebook,
  Youtube,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ModelPortfolioItems, ModelServicesItems } from "@/data/dataModels";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/nosotros", label: "Nosotros" },
];

const activeColors = ["#ff9c4f", "#a98fff"];
const gradientesHover = [
  "hover:text-[#ff9c4f] transition-colors duration-300",
  "hover:text-[#a98fff] transition-colors duration-300",
  "hover:text-[#ff9c4f] transition-colors duration-300",
  "hover:text-[#a98fff] transition-colors duration-300",
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navState, setNavState] = useState("expanded");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveringHiddenNav, setHoveringHiddenNav] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const submenuTimeout = useRef(null);

  // Estado para submenú mobile abierto
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);

  useEffect(() => {
    let scrollTimeout;
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setNavState("expanded");
      } else if (currentScrollY > lastScrollY) {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        setNavState("hidden");
        scrollTimeout = setTimeout(() => {
          setNavState("medium");
        }, 300);
      } else {
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

  const effectiveNavState =
    navState === "hidden" && hoveringHiddenNav ? "expanded" : navState;

  const heightByState = {
    expanded: 80,
    medium: 50,
    hidden: 4,
  };

  const currentSectionIndex =
    typeof pathname === "string"
      ? links.findIndex((l) => pathname.startsWith(l.href))
      : 0;

  const currentColor = activeColors[currentSectionIndex % activeColors.length];

  if (typeof pathname !== "string" || pathname === "/") {
    return null;
  }

  // Función para chequear si ruta está activa (igual o comienza con)
  function isActiveLink(href) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  // Para subitems activos
  function isSubActive(slug) {
    return decodeURIComponent(pathname) === slug;
  }

  return (
    <>
      {/* Barra muy fina cuando el nav está oculto */}
      {navState === "hidden" && (
        <div
          onMouseEnter={() => setHoveringHiddenNav(true)}
          onMouseLeave={() => setHoveringHiddenNav(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            zIndex: 1000,
            cursor: "pointer",
            backgroundColor: currentColor,
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
        className="fixed top-0 left-0 w-full z-50 bg-black text-white transition-all duration-200 overflow-visible shadow-md"
        style={{ height: heightByState[effectiveNavState] }}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-4 h-full transition-all duration-200 ${
            effectiveNavState === "hidden"
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo.svg" alt="Carromato" width={120} height={40} />
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex flex-1 justify-center gap-8 items-center text-sm tracking-wide text-gray-300 relative">
            {links.map((link, i) => {
              const isActive = isActiveLink(link.href);
              const activeColor = activeColors[i % activeColors.length];
              const hasSubmenu =
                link.label === "Servicios" || link.label === "Portfolio";

              return (
                <div
                  key={link.href}
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => {
                    clearTimeout(submenuTimeout.current);
                    setOpenSubmenu(hasSubmenu ? link.label : null);
                  }}
                  onMouseLeave={() => {
                    submenuTimeout.current = setTimeout(() => {
                      setOpenSubmenu(null);
                    }, 250);
                  }}
                >
                  <Link
                    href={link.href}
                    className={`relative transition font-light flex items-center gap-1 ${
                      isActive ? "font-extrabold" : gradientesHover[i]
                    }`}
                    style={{ paddingBottom: "4px", color: isActive ? activeColor : undefined }}
                  >
                    {link.label}
                    {hasSubmenu && <ChevronDown size={16} />}
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

                  {/* Submenu desktop */}
                  {hasSubmenu && openSubmenu === link.label && (
                    <div
                      className="absolute top-full mt-2 w-52 bg-black border border-white/10 rounded-lg shadow-lg p-2 flex flex-col z-50"
                      onMouseEnter={() => clearTimeout(submenuTimeout.current)}
                      onMouseLeave={() => {
                        submenuTimeout.current = setTimeout(() => {
                          setOpenSubmenu(null);
                        }, 250);
                      }}
                    >
                      {(link.label === "Servicios"
                        ? ModelServicesItems
                        : ModelPortfolioItems
                      ).map((item) => {
                        const subActive = isSubActive(item.slug);
                        return (
                          <Link
                            key={item.slug}
                            href={item.slug}
                            className={`block px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                              subActive ? "font-bold" : ""
                            }`}
                            style={{ color: subActive ? activeColor : undefined }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = activeColor)}
                            onMouseLeave={(e) => {
                              if (!subActive) e.currentTarget.style.color = "";
                            }}
                          >
                            {item.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Íconos redes desktop */}
          <div className="hidden md:flex gap-6 ml-8">
            <a
              href="https://www.instagram.com/carromatoprods/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors duration-300 hover:text-[#ff9c4f]"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-colors duration-300 hover:text-[#a98fff]"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCDyVOTieTNygeziympCUlAg/videos"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transition-colors duration-300 hover:text-[#ff9c4f]"
            >
              <Youtube size={20} />
            </a>
          </div>

          {/* Botón menú mobile */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="relative w-10 h-10 flex flex-col justify-center items-center gap-1 focus:outline-none"
            >
              {/* Barras animadas hamburguesa <-> cruz */}
              <span
                className={`block h-0.5 w-6 bg-white rounded-sm transition-transform duration-300 ease-in-out ${
                  menuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white rounded-sm transition-opacity duration-300 ease-in-out ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white rounded-sm transition-transform duration-300 ease-in-out ${
                  menuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Menú mobile */}
        {menuOpen && (
          <nav
            className="md:hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-xs rounded-lg z-50 p-6 bg-gradient-to-br from-black/95 via-black/80 to-black/95 backdrop-blur-md border border-white/20 shadow-lg text-white flex flex-col gap-3 opacity-0 animate-fadeIn"
            style={{ animationFillMode: "forwards" }}
          >
            {links.map((link) => {
              const hasSubmenu =
                link.label === "Servicios" || link.label === "Portfolio";
              const isActive = isActiveLink(link.href);
              const activeColor = activeColors[links.indexOf(link) % activeColors.length];

              return (
                <div key={link.href} className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-lg font-semibold rounded transition-colors duration-200 px-4 py-3 block ${
                        isActive ? "font-extrabold" : ""
                      }`}
                      style={{ color: isActive ? activeColor : "white" }}
                    >
                      {link.label}
                    </Link>

                    {hasSubmenu && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileSubmenuOpen(
                            mobileSubmenuOpen === link.label ? null : link.label
                          );
                        }}
                        aria-label="Toggle Submenu"
                        className="ml-2 flex items-center justify-center p-3 rounded-full focus:outline-none hover:bg-white/10 active:bg-white/20 transition"
                        style={{ minWidth: "40px", minHeight: "40px" }}
                      >
                        {mobileSubmenuOpen === link.label ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Submenu mobile */}
                  {hasSubmenu && mobileSubmenuOpen === link.label && (
                    <div className="flex flex-col ml-4 mt-2 border-l border-white/20">
                      {(link.label === "Servicios"
                        ? ModelServicesItems
                        : ModelPortfolioItems
                      ).map((item) => {
                        const subActive = isSubActive(item.slug);
                        return (
                          <Link
                            key={item.slug}
                            href={item.slug}
                            onClick={() => setMenuOpen(false)}
                            className={`block px-4 py-3 rounded text-base font-medium transition-colors duration-200 ${
                              subActive ? "font-bold" : "hover:text-white/80"
                            }`}
                            style={{ color: subActive ? activeColor : "white" }}
                          >
                            {item.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        )}

      </header>

      {/* Animación fadeIn (usa tailwind o define en global.css) */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </>
  );
}
