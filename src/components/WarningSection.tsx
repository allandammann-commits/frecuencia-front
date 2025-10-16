import { AlertTriangle } from "lucide-react";

export const WarningSection = () => {
  const warnings = [
    "Menores de 18 años",
    "Personas con historial de relaciones abusivas",
    "Quien no está preparada para una relación seria"
  ];

  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-subtle relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-destructive/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-destructive/5 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="glassmorphism bg-destructive/10 border border-destructive/20 rounded-lg p-4 sm:p-6 lg:p-8 text-center shadow-elegant hover-lift animate-scale-in">
          <div className="p-4 glassmorphism rounded-full w-fit mx-auto mb-4 sm:mb-6 animate-pulse-glow">
            <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-destructive" />
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 px-2 animate-slide-up">
            ⚠️ AVISO IMPORTANTE
          </h3>
          
          <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base px-2 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Esta frecuencia está basada en investigaciones científicas sobre ondas cerebrales y neuroplasticidad. Actúa en niveles profundos de la mente y puede generar resultados intensos.
          </p>
          
          <div className="mb-4 sm:mb-6 glassmorphism p-4 rounded-lg shadow-soft animate-slide-up" style={{animationDelay: '0.4s'}}>
            <p className="text-foreground font-bold mb-3 sm:mb-4 text-sm sm:text-base px-2">NO recomendamos para:</p>
            <ul className="space-y-1 sm:space-y-2 px-2">
              {warnings.map((warning, index) => (
                <li key={index} className="text-white text-sm sm:text-base">
                  • {warning}
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-foreground font-bold text-sm sm:text-base px-2 mt-2">
            ⚠️ Usa con responsabilidad.
          </p>
        </div>
      </div>
    </section>
  );
};