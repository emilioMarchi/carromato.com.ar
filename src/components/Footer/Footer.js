import Link from "next/link";
export function Footer() {
    return (
      <footer className="bg-black text-gray-400 py-8">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-6">
          <nav className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
            {[
              { label: 'Inicio', href: '/' },
              { label: 'Servicios', href: '/servicios' },
              { label: 'Portfolio', href: '/portfolio' },
              { label: 'Nosotros', href: '/nosotros' },
              { label: 'Preguntas Frecuentes', href: '/faq' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="text-center md:text-right text-xs">
            <p>© 2025 OVNIcanal. Todos los derechos reservados.</p>
            <p>Desarrollo OVNIcanal • Santa Fe, Argentina</p>
          </div>
        </div>
      </footer>
    );
  }