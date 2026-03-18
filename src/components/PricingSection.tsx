import { Button } from "@/components/ui/button";
import pricingIcon from "@/assets/pricing-icon.svg";
import premiumIcon from "@/assets/premium-icon-new.png";
import { format } from "date-fns";

export const PricingSection = () => {
  const formattedDate = format(new Date(), "dd/MM/yyyy");
  
  const essentialFeatures = [
    "✅ Frecuencia Límbica (Audio principal para atraer a tu ex de vuelta)", 
    "✅ Frecuencia de la Reconciliación (Para sanar heridas y resentimientos del pasado)", 
    "✅ Guía Rápida de Uso (Instrucciones claras para activar la frecuencia)", 
    "🎁 BONUS: Guía \"Cómo Hacer que Él Te Note en Instagram\""
  ];
  
  const premiumFeatures = [
    "✅ Frecuencia Límbica (Audio principal para atraer a tu ex de vuelta)", 
    "✅ Frecuencia de la Reconciliación (Para sanar heridas y resentimientos del pasado)", 
    "✅ Guía Rápida de Uso (Instrucciones claras para activar la frecuencia)", 
    "🎁 BONUS: Guía \"Cómo Hacer que Él Te Note en Instagram\"", 
    "✅ Frecuencia de la Pasión Ardiente (Para intensificar su deseo por ti)", 
    "✅ Frecuencia Anti-Rival (Para eliminar cualquier competencia)", 
    "✅ Frecuencia del Encantamiento (Él solo tendrá ojos para ti)", 
    "✅ Frecuencia de la Protección Amorosa (Blindar relación contra crisis)", 
    "✅ BONUS: Guía \"7 Frases que Hacen que Cualquier Hombre Suplique por Ti\"", 
    "⭐ Acceso DE POR VIDA a la Aplicación Exclusiva con soporte VIP"
  ];

  return (
    <section id="pricing" className="smartplayer-scroll-event sm:py-16 md:py-20 px-4 bg-background py-[20px]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-primary/10 border border-primary/20 rounded-2xl px-6 py-3 mb-6 sm:mb-8 hover-lift animate-fade-in">
            <p className="text-primary text-sm font-black uppercase tracking-widest">
              🔥 Promoción válida hasta: {formattedDate}
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white px-2 leading-tight animate-slide-up uppercase tracking-tighter italic">
            🚨 ELIGE TU PLAN Y RECONQUISTA TU AMOR 🚨
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-5xl mx-auto items-stretch">
          {/* Plano Premium */}
          <div style={{ animationDelay: '0.2s' }} className="bg-gradient-to-br from-primary to-accent p-[2px] rounded-[2.5rem] shadow-card relative hover-lift animate-scale-in my-[40px] flex flex-col">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
              <img src={premiumIcon} alt="Icono Premium" className="w-40 h-40 sm:w-48 sm:h-48 animate-float drop-shadow-2xl" />
            </div>
            <div className="absolute top-28 sm:top-32 left-1/2 transform -translate-x-1/2 z-20 w-full text-center">
              <span className="bg-white text-primary px-6 py-2 rounded-full text-xs sm:text-base font-black animate-pulse shadow-xl border-2 border-primary uppercase tracking-widest">
                ¡EL MÁS ELEGIDO!
              </span>
            </div>
            
            <div className="bg-card rounded-[2.4rem] p-6 sm:p-8 lg:p-10 h-full mt-4 flex flex-col pt-24 sm:pt-32">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 mt-12 sm:mt-16 text-center uppercase italic tracking-tighter">
                Plan Premium
              </h3>
              
              <ul className="space-y-4 mb-8 sm:mb-10 flex-grow">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-start gap-3">
                    <span className="text-primary mt-1 font-black">✓</span>
                    <span className="leading-tight">{feature.replace("✅ ", "").replace("🎁 ", "").replace("⭐ ", "")}</span>
                  </li>
                ))}
              </ul>
              
              <div className="text-center mb-6 sm:mb-8 border-t border-white/5 pt-8">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-[0.2em] font-bold">por solo</p>
                <span className="text-5xl sm:text-6xl font-black text-primary tracking-tighter">$ 9,90</span>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-3 italic opacity-70">Este valor será convertido a tu moneda local.</p>
                <p className="text-xs sm:text-sm text-primary font-black mt-3 uppercase tracking-wider">Un solo pago, sin mensualidades. Acceso de por vida.</p>
              </div>
              
              <a href="https://pay.hotmart.com/W99845697O?off=epltkvrf&checkoutMode=10" target="_blank" rel="noopener noreferrer">
                <Button className="w-full py-10 text-xl font-black bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all rounded-2xl uppercase tracking-widest">
                  🎧 QUIERO EL PLAN PREMIUM
                </Button>
              </a>
            </div>
          </div>

          {/* Plano Essencial */}
          <div className="relative hover-lift animate-scale-in flex flex-col" style={{ animationDelay: '0.4s' }}>
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
              <img src={pricingIcon} alt="Icono de Precio" className="w-40 h-40 sm:w-48 sm:h-48 animate-float drop-shadow-2xl" />
            </div>
            <div className="bg-card shadow-card border border-white/5 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 pt-24 sm:pt-32 hover-glow mt-[40px] flex flex-col h-full">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 mt-12 sm:mt-16 text-center uppercase italic tracking-tighter">
                Plan Esencial
              </h3>
            
              <ul className="space-y-4 mb-8 sm:mb-10 flex-grow">
                {essentialFeatures.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-start gap-3">
                    <span className="text-accent mt-1 font-black">✓</span>
                    <span className="leading-tight">{feature.replace("✅ ", "").replace("🎁 ", "")}</span>
                  </li>
                ))}
              </ul>
            
              <div className="text-center mb-6 sm:mb-8 border-t border-white/5 pt-8">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-[0.2em] font-bold">por solo</p>
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter">$ 4,90</span>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-3 italic opacity-70">Este valor será convertido a tu moneda local.</p>
                <p className="text-xs sm:text-sm text-white/60 font-black mt-3 uppercase tracking-wider">Un solo pago, sin mensualidades. Acceso de por vida.</p>
              </div>
            
              <a href="https://pay.hotmart.com/W99845697O?off=vr76jf4s&checkoutMode=10" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full py-10 text-xl font-black border-2 border-primary text-primary hover:bg-primary/10 transition-all rounded-2xl uppercase tracking-widest">
                  🎧 QUIERO EL PLAN ESENCIAL
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 sm:mt-16 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-gray-400 text-sm sm:text-base bg-white/5 px-8 py-4 rounded-full border border-white/10 shadow-soft">
            <span className="text-accent text-xl">🔒</span> <span className="font-bold uppercase tracking-widest text-xs">Pago 100% seguro vía tarjeta</span>
          </div>
        </div>
      </div>
    </section>
  );
};
