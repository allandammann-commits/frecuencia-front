import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
export const UrgencySection = () => {
  return <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-primary relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full blur-xl animate-float" style={{
        animationDelay: '1.5s'
      }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-4 sm:mb-6 animate-pulse-glow" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-2 leading-tight animate-slide-up drop-shadow-lg">🔥 ÚLTIMAS 22 PLAZAS ACCESO LIMITADO</h2>
        </div>
        
        <div className="glassmorphism bg-white/10 border border-white/20 rounded-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 hover-lift animate-scale-in shadow-elegant" style={{
        animationDelay: '0.3s'
      }}>
          <p className="text-white text-base sm:text-lg mb-4 sm:mb-6 px-2">
            Por cuestiones de energía y para mantener la exclusividad, liberamos solo 500 accesos por mes.
          </p>
          
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white flex-shrink-0" />
            <span className="sm:text-2xl font-bold text-white text-sm">Quedan pocas plazas para este mes.</span>
          </div>
          
          <p className="text-white/90 mb-4 sm:mb-6 text-sm sm:text-base px-2">
            Cuando se agoten, tendrás que esperar hasta el próximo mes... y él puede encontrar a otra persona en ese tiempo.
          </p>
        </div>
        
        <Button 
          variant="hero"
          className="bg-white text-primary hover:bg-white/90 font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 mb-2 sm:mb-3 hover-glow shadow-elegant animate-scale-in" 
          style={{animationDelay: '0.6s'}}
          onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
        >
          🎧 ASEGURAR MI PLAZA AHORA
        </Button>
        
        <p className="text-white/80 text-xs sm:text-sm px-2">Últimas 22 plazas disponibles</p>
      </div>
    </section>;
};