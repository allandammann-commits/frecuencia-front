import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import heroWoman from "@/assets/hero-woman.jpg";
import mulheresIcon from "@/assets/mulheres-new.png";
export const HeroSection = () => {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);
  const [progress] = useState<number>(100);
  const [unlocked] = useState<boolean>(true);

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
    s.async = true;
    document.head.appendChild(s);

    const baseUrl = "https://scripts.converteai.net/18ab11e0-5755-45e8-a569-fa1bba31e3db/players/6936bbe078332a4bb27ceb6d/v4/embed.html";
    const fullSrc = baseUrl + (window.location.search || "?") + "&vl=" + encodeURIComponent(window.location.href);
    setEmbedSrc(fullSrc);
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
            <div id="ifr_6936bbe078332a4bb27ceb6d_wrapper" className="animate-fade-in" style={{ margin: "0 auto", width: "100%", maxWidth: 400 }}>
              <div id="ifr_6936bbe078332a4bb27ceb6d_aspect" style={{ position: "relative", padding: "176.47058823529412% 0 0 0" }}>
                <iframe
                  referrerPolicy="origin"
                  frameBorder={0}
                  allowFullScreen
                  id="ifr_6936bbe078332a4bb27ceb6d"
                  src={embedSrc || "about:blank"}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </div>
            </div>
          )}
          
          <div className={`px-2 ${unlocked ? "space-y-2 sm:space-y-3 mt-2 sm:mt-3 mb-0 sm:mb-1" : "space-y-4 sm:space-y-5 mt-4 sm:mt-5 mb-6 sm:mb-8"}`}>
            <p className="text-base sm:text-lg font-medium text-primary">ESCUCHA SOLO 5 MINUTOS AL DÍA</p>
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
