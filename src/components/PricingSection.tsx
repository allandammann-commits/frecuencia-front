import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import phoneProduct from "@/assets/phone-product.jpg";
import pricingIcon from "@/assets/pricing-icon.svg";
import premiumIcon from "@/assets/premium-icon-new.png";
import { format } from "date-fns";
export const PricingSection = () => {
  const formattedDate = format(new Date(), "dd/MM/yyyy");
  const essentialFeatures = ["✅ Frecuencia del Reencuentro (Audio principal para atraer a tu ex de vuelta)", "✅ Frecuencia de la Reconciliación (Para sanar heridas y resentimientos del pasado)", "✅ Guía Rápida de Uso (Instrucciones claras para activar la frecuencia)", "🎁 BONUS: Guía \"Cómo Hacer que Él Te Note en Instagram\""];
  const premiumFeatures = ["✅ Frecuencia del Reencuentro (Audio principal para atraer a tu ex de vuelta)", "✅ Frecuencia de la Reconciliación (Para sanar heridas y resentimientos del pasado)", "✅ Guía Rápida de Uso (Instrucciones claras para activar la frecuencia)", "🎁 BONUS: Guía \"Cómo Hacer que Él Te Note en Instagram\"", "✅ Frecuencia de la Pasión Ardiente (Para intensificar su deseo por ti)", "✅ Frecuencia Anti-Rival (Para eliminar cualquier competencia)", "✅ Frecuencia del Encantamiento (Él solo tendrá ojos para ti)", "✅ Frecuencia de la Protección Amorosa (Blindar relación contra crisis)", "✅ BONUS: Guía \"7 Frases que Hacen que Cualquier Hombre Suplique por Ti\"", "⭐ Acceso DE POR VIDA a la Aplicación Exclusiva con soporte VIP"];
  return <section id="pricing" className="sm:py-16 md:py-20 px-4 bg-gradient-subtle py-[20px]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block glassmorphism bg-destructive/10 border border-destructive/20 rounded-lg px-6 py-3 mb-6 sm:mb-8 hover-lift animate-fade-in">
            <p className="text-destructive text-sm font-semibold">
              🔥 Promoción válida hasta: {formattedDate}
            </p>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground px-2 leading-tight animate-slide-up">
            🚨 ELIGE TU PLAN Y RECONQUISTA TU AMOR 🚨
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Plano Premium */}
          <div style={{
          animationDelay: '0.2s'
        }} className="bg-gradient-primary p-1 rounded-lg shadow-glow relative hover-lift animate-scale-in animate-pulse-glow py-[5px] my-[40px]">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
              <img src={premiumIcon} alt="Icono Premium" className="w-40 h-40 sm:w-48 sm:h-48 animate-float" />
            </div>
            <div className="absolute top-32 sm:top-36 left-1/2 transform -translate-x-1/2 z-20">
              <span className="bg-yellow-500 text-black px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold animate-float shadow-elegant">
                ¡EL MÁS ELEGIDO!
              </span>
            </div>
            
            <div className="bg-card rounded-lg p-6 sm:p-8 lg:p-10 h-full mt-4 shadow-card pt-16 sm:pt-20">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 mt-20 sm:mt-24">
                Plan Premium
              </h3>
              
              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {premiumFeatures.map((feature, index) => <li key={index} className="text-xs sm:text-sm text-muted-foreground">
                    {feature}
                  </li>)}
              </ul>
              
              <div className="text-center mb-6 sm:mb-8">
                <p className="text-sm text-muted-foreground mb-2">por solo</p>
                <span className="text-2xl sm:text-3xl font-bold text-primary">$ 9,90</span>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Este valor será convertido a tu moneda local.</p>
              </div>
              
              <a href="https://pay.hotmart.com/W99845697O?off=5ijqcghe&checkoutMode=10" target="_blank" rel="noopener noreferrer">
                <Button variant="hero" className="w-full text-xs sm:text-sm px-3 py-3 sm:px-4 sm:py-4 hover-glow animate-pulse-glow">
                  🎧 QUIERO EL PLAN PREMIUM
                </Button>
              </a>
            </div>
          </div>

          {/* Plano Essencial */}
          <div className="relative hover-lift animate-scale-in" style={{
          animationDelay: '0.4s'
        }}>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
              <img src={pricingIcon} alt="Icono de Precio" className="w-40 h-40 sm:w-48 sm:h-48 animate-float" />
            </div>
            <div className="glassmorphism shadow-card border border-border rounded-lg p-6 sm:p-8 lg:p-10 pt-16 sm:pt-20 hover-glow">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 mt-20 sm:mt-24">
                Plan Esencial
              </h3>
            
            <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {essentialFeatures.map((feature, index) => <li key={index} className="text-xs sm:text-sm text-muted-foreground">
                  {feature}
                </li>)}
            </ul>
            
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-sm text-muted-foreground mb-2">por solo</p>
              <span className="text-2xl sm:text-3xl font-bold text-primary">$ 4,90</span>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Este valor será convertido a tu moneda local.</p>
            </div>
            
            <a href="https://pay.hotmart.com/W99845697O?off=348uh2vx&checkoutMode=10" target="_blank" rel="noopener noreferrer">
              <Button variant="cta" className="w-full text-xs sm:text-sm px-3 py-3 sm:px-4 sm:py-4 hover-glow animate-pulse-glow">
                🎧 QUIERO EL PLAN ESENCIAL
              </Button>
            </a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10 sm:mt-12">
          <p className="text-muted-foreground text-sm sm:text-base px-2">
            Pago100% seguro vía tarjeta
          </p>
        </div>
        
        {/* Product showcase */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="max-w-xs sm:max-w-md mx-auto">
            
          </div>
        </div>
      </div>
    </section>;
};