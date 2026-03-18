import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import phoneProduct from "@/assets/phone-product.jpg";
import pricingIcon from "@/assets/pricing-icon.svg";
import premiumIcon from "@/assets/premium-icon-new.png";
import { format } from "date-fns";
export const PricingSection = () => {
  const formattedDate = format(new Date(), "dd/MM/yyyy");
  const essentialFeatures = ["✅ Frecuencia Límbica (Audio principal para atraer a tu ex de vuelta)", "✅ Frecuencia de la Reconciliación (Para sanar heridas y resentimientos del pasado)", "✅ Guía Rápida de Uso (Instrucciones claras para activar la frecuencia)", "🎁 BONUS: Guía \"Cómo Hacer que Él Te Note en Instagram\""];
  const premiumFeatures = ["✅ Frecuencia Límbica (Audio principal para atraer a tu ex de vuelta)", "✅ Frecuencia de la Reconciliación (Para sanar heridas y resentimientos del pasado)", "✅ Guía Rápida de Uso (Instrucciones claras para activar la frecuencia)", "🎁 BONUS: Guía \"Cómo Hacer que Él Te Note en Instagram\"", "✅ Frecuencia de la Pasión Ardiente (Para intensificar su deseo por ti)", "✅ Frecuencia Anti-Rival (Para eliminar cualquier competencia)", "✅ Frecuencia del Encantamiento (Él solo tendrá ojos para ti)", "✅ Frecuencia de la Protección Amorosa (Blindar relación contra crisis)", "✅ BONUS: Guía \"7 Frases que Hacen que Cualquier Hombre Suplique por Ti\"", "⭐ Acceso DE POR VIDA a la Aplicación Exclusiva con soporte VIP"];
  return <section id="pricing" className="smartplayer-scroll-event sm:py-16 md:py-20 px-4 bg-[#0a0a1a] py-[20px]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-[#ff2d9b]/10 border border-[#ff2d9b]/20 rounded-lg px-6 py-3 mb-6 sm:mb-8 hover-lift animate-fade-in">
            <p className="text-[#ff2d9b] text-sm font-semibold">
              🔥 Promoción válida hasta: {formattedDate}
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white px-2 leading-tight animate-slide-up uppercase tracking-tight">
            🚨 ELIGE TU PLAN Y RECONQUISTA TU AMOR 🚨
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Plano Premium */}
          <div style={{
          animationDelay: '0.2s'
        }} className="bg-gradient-to-r from-[#ff2d9b] to-[#e91e8c] p-1 rounded-3xl shadow-[0_0_30px_rgba(255,45,155,0.3)] relative hover-lift animate-scale-in py-[5px] my-[40px]">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
              <img src={premiumIcon} alt="Icono Premium" className="w-40 h-40 sm:w-48 sm:h-48 animate-float" />
            </div>
            <div className="absolute top-28 sm:top-32 left-1/2 transform -translate-x-1/2 z-20 w-full text-center">
              <span className="bg-white text-[#ff2d9b] px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-base font-black animate-pulse shadow-xl border-2 border-[#ff2d9b]">
                ¡EL MÁS ELEGIDO!
              </span>
            </div>
            
            <div className="bg-[#0d0b1f] rounded-3xl p-6 sm:p-8 lg:p-10 h-full mt-4 shadow-2xl pt-24 sm:pt-32">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 mt-12 sm:mt-16 text-center uppercase italic">
                Plan Premium
              </h3>
              
              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {premiumFeatures.map((feature, index) => <li key={index} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-[#ff2d9b] mt-1">✔</span> {feature.replace("✅ ", "").replace("🎁 ", "").replace("⭐ ", "")}
                  </li>)}
              </ul>
              
              <div className="text-center mb-6 sm:mb-8 border-t border-gray-800 pt-6">
                <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest">por solo</p>
                <span className="text-4xl sm:text-5xl font-black text-[#ff2d9b]">$ 9,90</span>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-2 italic">Este valor será convertido a tu moneda local.</p>
                <p className="text-xs sm:text-sm text-[#ff2d9b] font-bold mt-2 uppercase">Un solo pago, sin mensualidades. Acceso de por vida.</p>
              </div>
              
              <a href="https://pay.hotmart.com/W99845697O?off=epltkvrf&checkoutMode=10" target="_blank" rel="noopener noreferrer">
                <Button className="w-full py-8 text-lg font-bold bg-[#ff2d9b] hover:bg-[#e91e8c] text-white shadow-[0_0_20px_rgba(255,45,155,0.4)] transition-all rounded-xl">
                  🎧 QUIERO EL PLAN PREMIUM
                </Button>
              </a>
            </div>
          </div>

          {/* Plano Essencial */}
          <div className="relative hover-lift animate-scale-in" style={{
          animationDelay: '0.4s'
        }}>
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
              <img src={pricingIcon} alt="Icono de Precio" className="w-40 h-40 sm:w-48 sm:h-48 animate-float" />
            </div>
            <div className="bg-[#0d0b1f] shadow-card border border-gray-800 rounded-3xl p-6 sm:p-8 lg:p-10 pt-24 sm:pt-32 hover-glow mt-[40px]">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 mt-12 sm:mt-16 text-center uppercase italic">
                Plan Esencial
              </h3>
            
            <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {essentialFeatures.map((feature, index) => <li key={index} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-[#ff2d9b] mt-1">✔</span> {feature.replace("✅ ", "").replace("🎁 ", "")}
                </li>)}
            </ul>
            
            <div className="text-center mb-6 sm:mb-8 border-t border-gray-800 pt-6">
              <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest">por solo</p>
              <span className="text-4xl sm:text-5xl font-black text-white">$ 4,90</span>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-2 italic">Este valor será convertido a tu moneda local.</p>
              <p className="text-xs sm:text-sm text-white/80 font-bold mt-2 uppercase">Un solo pago, sin mensualidades. Acceso de por vida.</p>
            </div>
            
            <a href="https://pay.hotmart.com/W99845697O?off=vr76jf4s&checkoutMode=10" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full py-8 text-lg font-bold border-[#ff2d9b] text-[#ff2d9b] hover:bg-[#ff2d9b]/10 transition-all rounded-xl">
                🎧 QUIERO EL PLAN ESENCIAL
              </Button>
            </a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 sm:mt-16 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm sm:text-base bg-white/5 px-6 py-3 rounded-full border border-white/10">
            <span className="text-green-500">🔒</span> Pago 100% seguro vía tarjeta
          </div>
        </div>
        
        {/* Product showcase */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="max-w-xs sm:max-w-md mx-auto">
            
          </div>
        </div>
      </div>
    </section>;
};
