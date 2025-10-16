import { X } from "lucide-react";
export const ProblemsSection = () => {
  const problems = ["❌ Contacto cero (él solo te olvida más)", "❌ Juegos psicológicos (funcionan por 2 días)", "❌ Mensajes \"estratégicos\" (él se da cuenta y se aleja)", "❌ Consejos de amigas (que nunca funcionaron)"];
  return <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-subtle relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-destructive/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-destructive/5 rounded-full blur-xl animate-float" style={{animationDelay: '1.2s'}}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-gradient mb-8 sm:mb-12 leading-tight animate-fade-in drop-shadow-lg">
          REPROGRAMA TU ENERGÍA MAGNÉTICA PARA RECONQUISTAR A CUALQUIER HOMBRE
        </h2>
        
        <p className="text-base sm:text-lg text-muted-foreground mb-10 sm:mb-14 px-2 animate-slide-up" style={{animationDelay: '0.2s'}}>
          Esta frecuencia te da una ventaja psicológica devastadora. Basada en neurociencia y frecuencias binaurales, actúa directamente en el subconsciente masculino.
        </p>
        
        <div className="mb-10 sm:mb-14 animate-scale-in" style={{animationDelay: '0.4s'}}>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 px-2">
            DEJA DE PERDER TIEMPO con técnicas obsoletas:
          </h3>
          
          <div className="glassmorphism shadow-card border border-destructive/20 rounded-lg p-6 sm:p-8 max-w-2xl mx-auto hover-lift">
            <ul className="space-y-4 sm:space-y-6">
              {problems.map((problem, index) => <li key={index} className="text-left text-muted-foreground text-sm sm:text-base">
                  {problem}
                </li>)}
            </ul>
          </div>
        </div>
        
        <div className="glassmorphism bg-destructive/10 border border-destructive/20 rounded-lg p-6 sm:p-8 max-w-xl mx-auto hover-glow animate-fade-in" style={{animationDelay: '0.6s'}}>
          <p className="text-lg sm:text-xl font-bold text-destructive mb-6 sm:mb-8 px-2">
            NADA DE ESO FUNCIONA DE VERDAD.
          </p>
          
          <p className="text-base sm:text-lg text-muted-foreground px-2">
            Yo también intenté todo eso... hasta descubrir el secreto que cambió mi vida para siempre.
          </p>
        </div>
      </div>
    </section>;
};