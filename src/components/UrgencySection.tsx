import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
export const UrgencySection = () => {
  return <section className="py-12 sm:py-16 md:py-20 px-4 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent/10 rounded-full blur-3xl animate-float" style={{
        animationDelay: '1.5s'
      }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-4 sm:mb-6 animate-pulse" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 px-2 leading-tight animate-slide-up drop-shadow-lg uppercase tracking-tighter italic">🔥 ÚLTIMAS 22 PLAZAS — ACCESO LIMITADO</h2>
        </div>
        
        <div className="bg-card/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-10 mb-8 hover-lift animate-scale-in shadow-card" style={{
        animationDelay: '0.3s'
      }}>
          <p className="text-gray-300 text-lg sm:text-xl mb-6 px-2 leading-relaxed font-medium">
            Por cuestiones de energía y para mantener la exclusividad, liberamos solo <span className="text-primary font-black uppercase">500 accesos por mes</span>.
          </p>
          
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
            <span className="text-xl sm:text-3xl font-black text-white uppercase tracking-tighter italic">Quedan pocas plazas para este mes.</span>
          </div>
          
          <p className="text-white/60 mb-4 text-base sm:text-lg px-2 italic font-medium">
            Cuando se agoten, tendrás que esperar hasta el próximo mes... y él puede encontrar a otra persona en ese tiempo.
          </p>
        </div>
        
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg sm:text-xl px-10 py-10 mb-6 hover-glow shadow-glow animate-pulse rounded-2xl w-full sm:w-auto uppercase tracking-widest italic transition-all" 
          style={{animationDelay: '0.6s'}}
          onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
        >
          🎧 ASEGURAR MI PLAZA AHORA
        </Button>
        
        <p className="text-primary text-base font-black px-2 animate-pulse uppercase tracking-widest">Últimas 22 plazas disponibles</p>
      </div>
    </section>;
};