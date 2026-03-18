import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
export const UrgencySection = () => {
  return <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-[#0a0a1a] to-[#0d0b1f] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#ff2d9b]/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#ff2d9b]/10 rounded-full blur-xl animate-float" style={{
        animationDelay: '1.5s'
      }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-[#ff2d9b] mx-auto mb-4 sm:mb-6 animate-pulse" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 px-2 leading-tight animate-slide-up drop-shadow-lg uppercase tracking-tighter">🔥 ÚLTIMAS 22 PLAZAS — ACCESO LIMITADO</h2>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 mb-8 hover-lift animate-scale-in shadow-2xl" style={{
        animationDelay: '0.3s'
      }}>
          <p className="text-gray-300 text-lg sm:text-xl mb-6 px-2 leading-relaxed">
            Por cuestiones de energía y para mantener la exclusividad, liberamos solo <span className="text-[#ff2d9b] font-bold">500 accesos por mes</span>.
          </p>
          
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff2d9b] flex-shrink-0" />
            <span className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">Quedan pocas plazas para este mes.</span>
          </div>
          
          <p className="text-white/70 mb-4 text-base sm:text-lg px-2 italic">
            Cuando se agoten, tendrás que esperar hasta el próximo mes... y él puede encontrar a otra persona en ese tiempo.
          </p>
        </div>
        
        <Button 
          className="bg-[#ff2d9b] hover:bg-[#e91e8c] text-white font-black text-lg sm:text-xl px-8 py-8 mb-4 hover-glow shadow-[0_0_20px_rgba(255,45,155,0.4)] animate-pulse rounded-2xl w-full sm:w-auto uppercase tracking-widest" 
          style={{animationDelay: '0.6s'}}
          onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
        >
          🎧 ASEGURAR MI PLAZA AHORA
        </Button>
        
        <p className="text-[#ff2d9b] text-base font-bold px-2 animate-pulse">Últimas 22 plazas disponibles</p>
      </div>
    </section>;
};