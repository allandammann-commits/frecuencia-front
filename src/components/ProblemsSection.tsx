import { X } from "lucide-react";

export const ProblemsSection = () => {
  const problems = [
    "❌ Contacto cero (él solo te olvida más)", 
    "❌ Juegos psicológicos (funcionan por 2 días)", 
    "❌ Mensajes \"estratégicos\" (él se da cuenta y se aleja)", 
    "❌ Consejos de amigas (que nunca funcionaron)"
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1.2s'}}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-8 sm:mb-12 leading-tight animate-fade-in uppercase tracking-tighter italic">
          DEJA DE PERDER TIEMPO con técnicas obsoletas:
        </h2>
        
        <div className="mb-10 sm:mb-14 animate-scale-in" style={{animationDelay: '0.4s'}}>
          <div className="bg-card/50 backdrop-blur-xl shadow-card border border-white/5 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto hover-lift">
            <ul className="space-y-4 sm:space-y-6">
              {problems.map((problem, index) => (
                <li key={index} className="text-left text-white text-base sm:text-lg flex items-center gap-4 group">
                  <div className="bg-red-500/20 p-2 rounded-full group-hover:bg-red-500/40 transition-colors">
                    <X className="text-red-500 w-5 h-5 sm:w-6 sm:h-6 font-black" />
                  </div>
                  <span className="font-medium tracking-tight opacity-90">{problem.replace("❌ ", "")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 sm:p-10 max-w-xl mx-auto hover-glow animate-fade-in shadow-glow" style={{animationDelay: '0.6s'}}>
          <p className="text-3xl sm:text-4xl font-black text-primary mb-6 px-2 uppercase tracking-tighter italic">
            NADA DE ESO FUNCIONA DE VERDAD.
          </p>
          
          <p className="text-lg sm:text-xl text-white/70 px-2 italic font-medium leading-relaxed">
            Yo también intenté todo eso... hasta descubrir el secreto que cambió mi vida para siempre.
          </p>
        </div>
      </div>
    </section>
  );
};
