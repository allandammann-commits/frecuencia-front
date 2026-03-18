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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2 mt-2 sm:mt-3 drop-shadow-lg uppercase">
            SÉ EXACTAMENTE CÓMO TE SIENTES... PORQUE YO YA ESTUVE EN TU LUGAR
          </h2>
          <div className="mb-4 sm:mb-6">
            <img src={storyImage} alt="Ilustración de la transformación" className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto mx-auto hover-lift animate-float shadow-elegant opacity-50 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg text-muted-foreground px-2 leading-relaxed">
              Veía a otras mujeres siendo tratadas como reinas, recibiendo flores, cenas románticas, declaraciones... ¿Y yo? Revisando WhatsApp cada 5 minutos, stalkeando sus redes sociales, fingiendo que estaba bien quando por dentro estava destrozada.
            </p>
            
            <div className="glassmorphism shadow-card border-[#ff2d9b]/10 rounded-lg p-6 sm:p-8 hover-lift animate-slide-up" style={{
            animationDelay: '0.3s'
          }}>
              <h3 className="text-lg sm:text-xl font-bold text-[#ff2d9b] mb-4 sm:mb-6">
                Las preguntas que me torturaban:
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {painPoints.map((point, index) => <li key={index} className="text-muted-foreground text-sm sm:text-base flex items-start gap-2">
                    <span className="text-[#ff2d9b] mt-1">•</span> {point}
                  </li>)}
              </ul>
            </div>
            
            <div className="glassmorphism bg-[#ff2d9b]/5 border-[#ff2d9b]/20 rounded-lg p-6 sm:p-8 hover-glow animate-scale-in" style={{
            animationDelay: '0.5s'
          }}>
              <p className="text-white font-medium text-sm sm:text-base mb-4 sm:mb-6">
                La verdad dolorosa: Estaba vibrando en la frecuencia de la carencia, la desesperación, la baja autoestima. Y eso repelía a cualquier hombre.
              </p>
              <p className="text-[#ff2d9b] font-bold text-lg sm:text-xl mb-3 sm:mb-4 uppercase">
                Hasta que descubrí esta FRECUENCIA LÍMBICA... y todo cambió en 48 horas.
              </p>
              <p className="text-white text-base sm:text-lg font-semibold italic">
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