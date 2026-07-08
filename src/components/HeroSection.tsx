import { VslPlayer } from "@/components/VslPlayer";

export const HeroSection = () => {
  return (
    <section className="w-full flex flex-col items-center justify-start bg-gradient-hero px-4 pt-2 pb-1 sm:pt-6 sm:pb-2 overflow-hidden">
      <div className="max-w-4xl w-full flex flex-col items-center gap-2 sm:gap-4 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground leading-tight tracking-tight max-w-md px-1 mt-4 sm:mt-6 mb-1 sm:mb-2">
          Al final de este corto vídeo vas a descubrir por qué él se alejó y el truco exacto para que te busque en{" "}
          <span className="text-primary">menos de 48 horas</span>{" "}
          <span className="text-primary">sin enviarle un solo mensaje</span> 👇
        </h1>

        <div className="w-full max-w-[400px] relative group mt-2">
          <div className="absolute -inset-2 bg-primary/5 rounded-[2.5rem] blur-2xl group-hover:bg-primary/10 transition-all duration-700"></div>
          <div className="relative w-full bg-white rounded-3xl shadow-elegant overflow-hidden border border-border/40">
            <VslPlayer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
