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
        <div className="glassmorphism bg-[#ff2d9b]/5 border-[#ff2d9b]/20 rounded-3xl p-6 sm:p-10 text-center shadow-elegant hover-lift animate-scale-in">
          <div className="p-4 bg-[#ff2d9b]/20 rounded-full w-fit mx-auto mb-4 sm:mb-6 animate-pulse">
            <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-[#ff2d9b]" />
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 sm:mb-6 px-2 animate-slide-up uppercase tracking-tighter">
            ⚠️ AVISO IMPORTANTE
          </h3>
          
          <p className="text-gray-300 mb-8 text-base sm:text-lg px-2 animate-fade-in leading-relaxed" style={{animationDelay: '0.2s'}}>
            Esta frecuencia está basada en investigaciones científicas sobre ondas cerebrales y neuroplasticidad. Actúa en niveles profundos de la mente y puede generar resultados intensos.
          </p>
          
          <div className="mb-8 glassmorphism bg-black/40 border border-white/10 p-6 rounded-2xl shadow-soft animate-slide-up" style={{animationDelay: '0.4s'}}>
            <p className="text-[#ff2d9b] font-black mb-4 text-base sm:text-lg px-2 uppercase tracking-widest">NO recomendamos para:</p>
            <ul className="space-y-2 px-2 text-left max-w-md mx-auto">
              {warnings.map((warning, index) => (
                <li key={index} className="text-white text-base sm:text-lg flex items-center gap-3">
                  <span className="text-[#ff2d9b] font-bold">•</span> {warning}
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-white font-black text-lg sm:text-xl px-2 mt-2 uppercase italic tracking-tight animate-pulse">
            ⚠️ Usa con responsabilidad.
          </p>
        </div>
      </div>
    </section>
  );
};