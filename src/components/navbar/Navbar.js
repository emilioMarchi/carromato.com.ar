"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Instagram, Facebook, Youtube, ChevronDown } from "lucide-react";
import { ModelPortfolioItems } from "@/data/dataModels";
import { ModelServicesItems } from "@/data/dataModels";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/nosotros", label: "Nosotros" },
];

const activeColors = ["#f97316", "#a78bfa"];
const gradientesHover = [
  "hover:text-orange-400 transition-colors duration-300",
  "hover:text-violet-400 transition-colors duration-300",
  "hover:text-orange-400 transition-colors duration-300",
  "hover:text-violet-400 transition-colors duration-300",
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navState, setNavState] = useState("expanded");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveringHiddenNav, setHoveringHiddenNav] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const submenuTimeout = useRef(null);

  if (pathname === "/") return null;

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

  function formatSlug(slug) {
    const clean = slug.split("/").pop().replace(/-/g, " ");
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }

  const currentSectionIndex = pathname
    ? links.findIndex((l) => pathname.startsWith(l.href))
    : 0;
  const currentColor = activeColors[currentSectionIndex % activeColors.length];

  return (
    <>
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
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo.svg" alt="Carromato" width={120} height={40} />
          </Link>

          <nav className="hidden md:flex flex-1 justify-center gap-8 items-center text-sm tracking-wide text-gray-300 relative">
            {links.map((link, i) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");
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
                        const isSubActive = pathname === item.slug;
                        return (
                          <Link
                            key={item.slug}
                            href={item.slug}
                            className={`block px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                              isSubActive
                                ? `font-bold`
                                : "text-gray-300 hover:text-orange-400"
                            }`}
                            style={{
                              color: isSubActive ? activeColor : undefined,
                            }}
                          >
                            {formatSlug(item.slug)}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

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

          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

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
