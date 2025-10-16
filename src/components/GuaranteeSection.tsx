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
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 px-2 leading-tight animate-slide-up">🛡️ GARANTÍA BLINDADA DE 30 DÍAS</h2>
          <p className="text-lg sm:text-xl text-gradient font-bold px-2 animate-slide-up" style={{
          animationDelay: '0.2s'
        }}>
            TU REENCUENTRO O TU DINERO DE VUELTA
          </p>
        </div>
        
        <div className="glassmorphism shadow-elegant border border-border rounded-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 hover-lift animate-scale-in" style={{
        animationDelay: '0.4s'
      }}>
          <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 px-2">Estoy tan segura del poder transformador de la Frecuencia del Reencuentro que ofrezco una garantía incondicional de 30 días.</p>
          
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <p className="text-foreground font-bold text-sm sm:text-base px-2">Si en hasta 30 días:</p>
            <ul className="space-y-2 sm:space-y-3 px-2">
              {guaranteePoints.map((point, index) => <li key={index} className="text-muted-foreground flex items-start text-sm sm:text-base">
                  <span className="text-red-400 mr-2 flex-shrink-0">•</span>
                  {point}
                </li>)}
            </ul>
          </div>
          
          <div className="bg-gradient-primary p-4 sm:p-6 rounded-lg shadow-glow hover-glow animate-pulse-glow">
            <p className="text-white sm:text-lg text-sm font-semibold">
              Te devuelvo el 100% de tu dinero al instante. Sin preguntas, sin burocracia, sin vueltas.
            </p>
          </div>
        </div>
        
        <p className="text-lg sm:text-xl text-foreground font-bold mb-2 px-2">
          El riesgo es todo mío. Tú solo tienes que ganar el amor de tu vida de vuelta.
        </p>
      </div>
    </section>;
};