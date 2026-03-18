import { Shield, Clock, RefreshCw } from "lucide-react";
export const GuaranteeSection = () => {
  const guaranteePoints = ["Él no se ponga en contacto contigo", "No percibas cambios en la energía entre ustedes", "Por CUALQUIER motivo no quedes satisfecha"];
  return <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-card relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent/5 rounded-full blur-xl animate-float" style={{
        animationDelay: '1.5s'
      }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8 sm:mb-12 animate-fade-in">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-2 leading-tight animate-slide-up uppercase tracking-tighter">🛡️ GARANTÍA BLINDADA DE 30 DÍAS</h2>
          <p className="text-lg sm:text-2xl text-[#ff2d9b] font-black px-2 animate-slide-up uppercase italic" style={{
          animationDelay: '0.2s'
        }}>
            TU REENCUENTRO O TU DINERO DE VUELTA
          </p>
        </div>
        
        <div className="glassmorphism shadow-elegant border-[#ff2d9b]/20 rounded-3xl p-6 sm:p-10 mb-6 sm:mb-8 hover-lift animate-scale-in" style={{
        animationDelay: '0.4s'
      }}>
          <p className="text-lg sm:text-xl text-white mb-8 px-2 leading-relaxed">Estoy tan segura del poder transformador de la <span className="text-[#ff2d9b] font-bold italic underline">Frecuencia Límbica</span> que ofrezco una garantía incondicional de 30 días.</p>
          
          <div className="space-y-4 mb-8 text-left max-w-lg mx-auto bg-black/40 p-6 rounded-2xl border border-white/5">
            <p className="text-white font-black text-base sm:text-lg uppercase tracking-widest border-b border-white/10 pb-2">Si en hasta 30 días:</p>
            <ul className="space-y-3">
              {guaranteePoints.map((point, index) => <li key={index} className="text-gray-300 flex items-start text-base sm:text-lg">
                  <span className="text-[#ff2d9b] mr-3 font-bold">✕</span>
                  {point}
                </li>)}
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-[#ff2d9b] to-[#e91e8c] p-6 sm:p-8 rounded-2xl shadow-[0_0_20px_rgba(255,45,155,0.3)] hover-glow animate-pulse">
            <p className="text-white text-lg sm:text-xl font-black uppercase italic tracking-tighter">
              Te devuelvo el 100% de tu dinero al instante. Sin preguntas, sin burocracia, sin vueltas.
            </p>
          </div>
        </div>
        
        <p className="text-xl sm:text-2xl text-white font-black mb-2 px-2 uppercase tracking-tight">
          El riesgo es todo mío. Tú solo tienes que ganar el amor de tu vida de vuelta.
        </p>
      </div>
    </section>;
};