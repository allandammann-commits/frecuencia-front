import { Shield, Clock, RefreshCw } from "lucide-react";
export const GuaranteeSection = () => {
  const guaranteePoints = ["Él no se ponga en contacto contigo", "No percibas cambios en la energía entre ustedes", "Por CUALQUIER motivo no quedes satisfecha"];
  return <section className="py-12 sm:py-16 md:py-20 px-4 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent/10 rounded-full blur-3xl animate-float" style={{
        animationDelay: '1.5s'
      }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8 sm:mb-12 animate-fade-in">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-4 px-2 leading-tight animate-slide-up uppercase tracking-tighter italic">🛡️ GARANTÍA BLINDADA DE 30 DÍAS</h2>
          <p className="text-lg sm:text-2xl text-primary font-black px-2 animate-slide-up uppercase italic tracking-widest" style={{
          animationDelay: '0.2s'
        }}>
            TU REENCUENTRO O TU DINERO DE VUELTA
          </p>
        </div>
        
        <div className="bg-card shadow-elegant border border-border rounded-[2.5rem] p-6 sm:p-10 mb-6 sm:mb-8 hover-lift animate-scale-in" style={{
        animationDelay: '0.4s'
      }}>
          <p className="text-lg sm:text-xl text-foreground mb-8 px-2 leading-relaxed font-medium">Estoy tan segura del poder transformador de la <span className="text-primary font-black italic underline">Frecuencia Límbica</span> que ofrezco una garantia incondicional de 30 días.</p>
          
          <div className="space-y-4 mb-8 text-left max-w-lg mx-auto bg-muted p-8 rounded-3xl border border-border shadow-soft">
            <p className="text-foreground font-black text-base sm:text-lg uppercase tracking-widest border-b border-border pb-3">Si en hasta 30 días:</p>
            <ul className="space-y-4 pt-4">
              {guaranteePoints.map((point, index) => <li key={index} className="text-foreground/70 flex items-start text-base sm:text-lg font-medium">
                  <span className="text-primary mr-3 font-black text-xl italic">»</span>
                  {point}
                </li>)}
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-primary to-accent p-8 sm:p-10 rounded-3xl shadow-glow hover-glow animate-pulse">
            <p className="text-primary-foreground text-lg sm:text-xl font-black uppercase italic tracking-tighter">
              Te devuelvo el 100% de tu dinero al instante. Sin preguntas, sin burocracia, sin vueltas.
            </p>
          </div>
        </div>
        
        <p className="text-xl sm:text-2xl text-foreground font-black mb-2 px-2 uppercase tracking-tighter italic">
          El riesgo es todo mío. Tú solo tienes que ganar el amor de tu vida de vuelta.
        </p>
      </div>
    </section>;
};