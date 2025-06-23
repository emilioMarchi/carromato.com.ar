import Link from "next/link";
import { TypewriterTitle } from "@/helpers/TypewriterEfect";
export function UsSectionGrid() {
  const images = [
    "/test.jpg",
    "/test.jpg",
    "/test.jpg",
    "/test.jpg",
  ];

  return (
    <section  className="py-16 text-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center w-[90vw]">
        {/* Grid de cards */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 m-2">
          {images.map((img, index) => (
            <Link
            data-aos="fade-in"
            data-aos-delay={`${index * 150}`}
              key={index}
              href="/nosotros"
              className={`block overflow-hidden rounded-xl w-full h-[160px] md:h-[180px] transition-transform duration-300 transform hover:scale-105 ${
                index === 1 || index === 3 ? "mt-4 md:mt-6" : ""
              }`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Link>
          ))}
        </div>
        {/* Texto */}
        <div  data-aos="fade-left"
          data-aos-delay="400" className="space-y-6">
          <TypewriterTitle
            text="BUENAS SOMOS CARROMATO "
            speed={150}
            as="h2"
            size="text-5xl md:text-6xl"
            className="text-white"
          />
          <p className="text-lg text-gray-300">
            LO NUESTRO ES LA PRODUCCIÓN AUDIOVISUAL 
          </p>
          <Link
            href="/nosotros"
            className="text-2xl inline-block text-white font-bold uppercase underline underline-offset-4 decoration-2 decoration-white transition hover:text-yellow-400 hover:decoration-yellow-400"
            >
            Conocenos
        </Link>

        </div>

        

      </div>
    </section>
  );
}
