import { TypewriterTitle } from "@/helpers/TypewriterEfect";

export function HeroHome() {
    return (
        <div className="w-full flex items-center justify-center text-white h-[20vh] mt-5">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <TypewriterTitle text="Carromato" as="h1" size="text-7xl" className="text-white" />
        
          <span className="text-xl md:text-3xl font-semibold uppercase tracking-wide text-gray-300">
            Productora Audiovisual
          </span>
        </div>
      </div>
    );
  }
  