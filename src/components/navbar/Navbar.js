"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Instagram, Facebook, Youtube } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black text-white">
  <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
    {/* Logo a la izquierda */}
    <Link href="/">
      <Image src="/logo.svg" alt="Carromato" width={120} height={40} />
    </Link>

    {/* Menú centrado (solo desktop) */}
    <nav className="hidden md:flex flex-1 justify-center gap-6 items-center text-sm font-medium">
      <Link href="/">Inicio</Link>
      <Link href="/servicios">Servicios</Link>
      <Link href="/portfolio">Portfolio</Link>
      <Link href="/nosotros">Nosotros</Link>
    </nav>

    {/* Íconos redes desktop (separados un poco del centro) */}
    <div className="hidden md:flex gap-6 ml-8">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <Instagram size={20} />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <Facebook size={20} />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
        <Youtube size={20} />
      </a>
    </div>

    {/* En mobile: íconos redes a la izquierda + botón hamburguesa a la derecha */}
    <div className="flex md:hidden items-center gap-4">
      <div className="flex gap-4">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram size={24} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <Facebook size={24} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <Youtube size={24} />
        </a>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  </div>

  {/* Menú mobile desplegable */}
  {menuOpen && (
    <div className="md:hidden bg-black border-t border-gray-800">
      <nav className="flex flex-col gap-4 p-4">
        <Link href="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
        <Link href="/servicios" onClick={() => setMenuOpen(false)}>Servicios</Link>
        <Link href="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
        <Link href="/nosotros" onClick={() => setMenuOpen(false)}>Nosotros</Link>
      </nav>
    </div>
  )}
</header>

  );
}

