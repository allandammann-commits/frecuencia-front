import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import heroWoman from "@/assets/hero-woman.jpg";
import mulheresIcon from "@/assets/mulheres-new.png";
export const HeroSection = () => {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [unlocked, setUnlocked] = useState<boolean>(false);

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
    s.async = true;
    document.head.appendChild(s);

    const baseUrl = "https://scripts.converteai.net/1104c4ab-ccc1-4b1f-8895-b6f9849b0d15/players/68f0be9a81e93bf7cd48d7a9/v4/embed.html";
    const fullSrc = baseUrl + (window.location.search || "?") + "&vl=" + encodeURIComponent(window.location.href);
    setEmbedSrc(fullSrc);
  }, []);

  useEffect(() => {
    const durationMs = 180 * 1000; // 3 minutos
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);
      if (elapsed >= durationMs) {
        setUnlocked(true);
        clearInterval(intervalId);
      }
    };
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    pricingSection?.scrollIntoView({ behavior: "smooth" });
  };
  return <section className={`relative overflow-hidden bg-gradient-hero ${unlocked ? "pt-10 sm:pt-12 pb-0 sm:pb-1" : "py-10 sm:py-12"}`}>
      {/* Background image */}
      <div className="absolute inset-0 opacity-20 animate-scale-in">
        <img src={heroWoman} alt="Mujer escuchando frecuencia del reencuentro" className="w-full h-full object-cover" />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent/40 rounded-full animate-float" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-float" style={{
        animationDelay: '2s'
      }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in mt-6 sm:mt-8 mb-0">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-6 sm:mb-8 leading-tight px-2 animate-slide-up drop-shadow-lg">
            FRECUENCIA DEL REENCUENTRO
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 px-2 animate-slide-up" style={{
          animationDelay: '0.2s'
        }}>La Única Frecuencia Sonora Binaural que Hace que tu Ex Suplique Volver en hasta 7 días</p>

          {embedSrc && (
            <div id="ifr_68f0be9a81e93bf7cd48d7a9_wrapper" className="animate-fade-in" style={{ margin: "0 auto", width: "100%", maxWidth: 400 }}>
              <div id="ifr_68f0be9a81e93bf7cd48d7a9_aspect" style={{ position: "relative", padding: "176.47058823529412% 0 0 0" }}>
                <iframe
                  referrerPolicy="origin"
                  frameBorder={0}
                  allowFullScreen
                  id="ifr_68f0be9a81e93bf7cd48d7a9"
                  src={embedSrc || "about:blank"}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </div>
            </div>
          )}
          
          <div className={`px-2 ${unlocked ? "space-y-2 sm:space-y-3 mt-2 sm:mt-3 mb-0 sm:mb-1" : "space-y-4 sm:space-y-5 mt-4 sm:mt-5 mb-6 sm:mb-8"}`}>
            <p className="text-base sm:text-lg font-medium text-primary">ESCUCHA SOLO 5 MINUTOS AL DÍA</p>
            {/* Barra de carregamento e desbloqueio do acesso */}
            <div className="mt-2 sm:mt-3 mb-1 sm:mb-2">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-3 sm:mb-4 tracking-wide">Cargando tu acceso</p>
              <div className="w-full max-w-md mx-auto h-3 sm:h-4 md:h-5 bg-muted/60 rounded-full overflow-hidden ring-1 ring-primary/20 shadow-soft">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-primary via-primary/80 to-accent transition-[width] duration-1000 ease-linear animate-pulse-glow shadow-glow"
                />
              </div>
            </div>
            {unlocked && (
              <div className="mt-0 sm:mt-1">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground animate-fade-in">
                  Tu acceso ya fue liberado, desliza hasta el final para escuchar ahora
                </p>
              </div>
            )}
            {!unlocked && (
              <>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  ÉL TE BUSCARÁ DESESPERADAMENTE
                </p>
                <p className="text-base sm:text-lg text-muted-foreground">
                  En hasta 72 horas él te enviará el primer mensaje... ¡GARANTIZADO!
                </p>
              </>
            )}
          </div>
        </div>
        
        {/* Warning box */}
        {!unlocked && (
          <div className="glassmorphism shadow-card rounded-lg p-6 sm:p-8 mb-8 sm:mb-12 max-w-2xl mx-auto hover-lift animate-scale-in" style={{
            animationDelay: '0.6s'
          }}>
            <p className="text-red-400 font-bold text-base sm:text-lg mb-4 sm:mb-6">ATENCIÓN:</p>
            <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8">
              Esta frecuencia es tan poderosa que puede causar obsesión. Si no estás preparada para ser deseada intensamente, NO LA ESCUCHES.
            </p>
            <p className="text-foreground sm:text-base text-xs">
              Tendrás el poder total sobre sus sentimientos... Activa este "deseo límbico" en su mente y él no podrá vivir más sin ti.
            </p>
          </div>
        )}
        
        {!unlocked && (
          <div className="mb-0 animate-fade-in" style={{
            animationDelay: '1s'
          }}>
            <img src={mulheresIcon} alt="15.847 mujeres" className="w-64 sm:w-72 md:w-80 lg:w-96 h-auto mx-auto mb-0 hover-lift" />
          </div>
        )}
      </div>
    </section>;
};