import { MessageSquare, Headphones, Banknote } from "lucide-react";
export const HowItWorksSection = () => {
  const steps = [{
    icon: <Headphones className="w-12 h-12 text-primary" />,
    title: "Paso #01",
    description: "Ponte tus auriculares y escucha la frecuencia por solo 3 minutos en un lugar silencioso."
  }, {
    icon: <MessageSquare className="w-12 h-12 text-primary" />,
    title: "Paso #02",
    description: "Mientras escuchas, visualiza el momento exacto del reencuentro - siente la emoción, ve su rostro, escucha las palabras que él dirá."
  }, {
    icon: <Banknote className="w-12 h-12 text-primary" />,
    title: "Paso #03",
    description: "Libera todas las expectativas y permite que tu nueva vibración magnética trabaje en su subconsciente."
  }];
  return <section className="py-12 sm:py-16 md:py-20 px-4 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/10 rounded-full blur-3xl animate-float" style={{
        animationDelay: '1s'
      }}></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-8 sm:mb-12 px-2 animate-fade-in drop-shadow-lg uppercase tracking-tighter italic">
            MIRA QUÉ SIMPLE Y PODEROSO ES:
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
          {steps.map((step, index) => <div key={index} className="bg-card/50 backdrop-blur-sm shadow-card border border-white/5 rounded-[2rem] p-8 sm:p-10 text-center hover-lift hover-glow animate-scale-in" style={{
          animationDelay: `${index * 0.2}s`
        }}>
              <div className="flex justify-center mb-8 animate-float" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="p-4 bg-primary/10 rounded-full shadow-glow border border-primary/20">
                  {React.cloneElement(step.icon as React.ReactElement, { className: "w-12 h-12 text-primary font-black" })}
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-primary mb-6 uppercase italic tracking-tighter">
                {step.title}
              </h3>
              <p className="text-white text-lg leading-relaxed font-medium">
                {step.description}
              </p>
            </div>)}
        </div>
        
        <div className="text-center mt-16 sm:mt-20 animate-fade-in" style={{
        animationDelay: '0.8s'
      }}>
          <div className="bg-gradient-to-br from-primary to-accent p-8 sm:p-10 rounded-[2.5rem] shadow-glow max-w-2xl mx-auto hover-glow animate-pulse">
            <p className="text-primary-foreground text-xl sm:text-2xl drop-shadow-md font-black uppercase tracking-tighter italic">
              RESULTADO: Él sentirá una necesidad inexplicable de buscarte. No podrá resistirse.
            </p>
          </div>
        </div>
      </div>
    </section>;
};