import { TypewriterTitle } from "@/helpers/TypewriterEfect";
import Link from "next/link";

export function PortfolioSectionGrid() {
  const images = [
    "/test.jpg",
    "/test.jpg",
    "/test.jpg",
    "/test.jpg",
  ];

  return (
    <section className="py-16 text-white ">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center min-w-[90vw]">
        
        {/* Columna de texto */}
        <div
        data-aos="fade-left"
        data-aos-delay="400"
        className="flex flex-col justify-start space-y-6 w-full min-w-full"
        style={{ minHeight: "160px", paddingBottom: "3rem" }} // espacio para botón
      >
        <TypewriterTitle
          text="NUESTRO TRABAJO HABLA POR NOSOTROS"
          speed={150}
          as="h2"
          size="text-5xl md:text-6xl"
          className="text-white"
        />

        <Link
          href="/nosotros"
          className="text-xl md:text-2xl inline-block text-white font-bold uppercase underline underline-offset-4 decoration-2 decoration-white transition hover:text-yellow-400 hover:decoration-yellow-400"
        >
          VER MÁS
        </Link>
      </div>


        {/* Columna de imágenes */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 m-2 ">
          {images.map((img, index) => (
            <Link
              data-aos="fade-in"
              data-aos-delay={`${index * 150}`}
              key={index}
              href="/nosotros"
              className={`block overflow-hidden rounded-xl w-full h-[160px] md:h-[200px] transition-transform duration-300 transform hover:scale-105 ${
                index === 1 || index === 3 ? "mt-4 md:mt-6" : ""
              }`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
