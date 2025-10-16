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
  return <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-subtle relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/5 rounded-full blur-xl animate-float" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-8 sm:mb-12 px-2 animate-fade-in drop-shadow-lg">
            MIRA QUÉ SIMPLE Y PODEROSO ES:
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {steps.map((step, index) => <div key={index} className="glassmorphism shadow-card rounded-lg p-6 sm:p-8 lg:p-10 text-center hover-lift hover-glow animate-scale-in" style={{
          animationDelay: `${index * 0.2}s`
        }}>
              <div className="flex justify-center mb-6 sm:mb-8 animate-float" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="p-3 glassmorphism rounded-full shadow-glow">{step.icon}</div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                {step.description}
              </p>
            </div>)}
        </div>
        
        <div className="text-center mt-12 sm:mt-16 animate-fade-in" style={{
        animationDelay: '0.8s'
      }}>
          <div className="bg-gradient-primary p-6 sm:p-8 rounded-lg shadow-elegant max-w-2xl mx-auto hover-glow animate-pulse-glow">
            <p className="text-white sm:text-xl drop-shadow-lg font-bold text-base">
              RESULTADO: Él sentirá una necesidad inexplicable de buscarte. No podrá resistirse.
            </p>
          </div>
        </div>
      </div>
    </section>;
};