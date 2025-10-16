import { Button } from "@/components/ui/button";
import storyImage from "@/assets/story-image.svg";
export const StorySection = () => {
  const painPoints = ["\"¿Por qué conmigo siempre es diferente?\"", "\"¿Será que no soy lo suficientemente buena?\"", "\"¿Por qué él puede olvidarme tan fácil?\"", "\"¿Será que nunca voy a ser verdaderamente amada?\""];
  return <section className="py-1 px-4 bg-gradient-card relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-xl animate-float" style={{
        animationDelay: '1.5s'
      }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-4 sm:mb-6 leading-tight px-2 mt-2 sm:mt-3 drop-shadow-lg">
            SÉ EXACTAMENTE CÓMO TE SIENTES... PORQUE YO YA ESTUVE EN TU LUGAR
          </h2>
          <div className="mb-4 sm:mb-6">
            <img src={storyImage} alt="Ilustración de la transformación" className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto mx-auto hover-lift animate-float shadow-elegant" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg text-muted-foreground px-2">
              Veía a otras mujeres siendo tratadas como reinas, recibiendo flores, cenas románticas, declaraciones... ¿Y yo? Revisando WhatsApp cada 5 minutos, stalkeando sus redes sociales, fingiendo que estaba bien cuando por dentro estaba destrozada.
            </p>
            
            <div className="glassmorphism shadow-card border border-border rounded-lg p-6 sm:p-8 hover-lift animate-slide-up" style={{
            animationDelay: '0.3s'
          }}>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">
                Las preguntas que me torturaban:
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {painPoints.map((point, index) => <li key={index} className="text-muted-foreground text-sm sm:text-base">
                    • {point}
                  </li>)}
              </ul>
            </div>
            
            <div className="glassmorphism bg-primary/10 border border-primary/20 rounded-lg p-6 sm:p-8 hover-glow animate-scale-in" style={{
            animationDelay: '0.5s'
          }}>
              <p className="text-foreground font-medium text-sm sm:text-base mb-4 sm:mb-6">
                La verdad dolorosa: Estaba vibrando en la frecuencia de la carencia, la desesperación, la baja autoestima. Y eso repelía a cualquier hombre.
              </p>
              <p className="text-primary font-bold text-sm sm:text-base mb-3 sm:mb-4">
                Hasta que descubrí esta FRECUENCIA DEL REENCUENTRO... y todo cambió en 48 horas.
              </p>
              <p className="text-foreground text-sm sm:text-base">
                Él me llamó llorando, pidiendo una segunda oportunidad.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8 sm:mt-0 animate-fade-in" style={{
          animationDelay: '0.7s'
        }}>
            
          </div>
        </div>
      </div>
    </section>;
};