import storyImage from "@/assets/story-image.svg";

export const StorySection = () => {
  const painPoints = [
    "\"¿Por qué conmigo siempre es diferente?\"", 
    "\"¿Será que no soy lo suficientemente buena?\"", 
    "\"¿Por qué él puede olvidarme tan fácil?\"", 
    "\"¿Será que nunca voy a ser verdaderamente amada?\""
  ];

  return (
    <section className="py-12 sm:py-16 px-4 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight px-2 uppercase tracking-tighter italic">
            SÉ EXACTAMENTE CÓMO TE SIENTES... PORQUE YO YA ESTUVE EN TU LUGAR
          </h2>
          <div className="mb-6 sm:mb-8">
            <img 
              src={storyImage} 
              alt="Ilustración de la transformación" 
              className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto mx-auto hover-lift animate-float shadow-elegant opacity-40 grayscale hover:grayscale-0 transition-all" 
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 items-start">
          <div className="space-y-8">
            <p className="text-lg sm:text-xl text-white/70 px-2 leading-relaxed font-medium">
              Veía a otras mujeres siendo tratadas como reinas, recibiendo flores, cenas románticas, declaraciones... ¿Y yo? Revisando WhatsApp cada 5 minutos, stalkeando sus redes sociales, fingiendo que estaba bien quando por dentro estava destrozada.
            </p>
            
            <div className="bg-card/50 backdrop-blur-xl shadow-card border border-white/5 rounded-3xl p-6 sm:p-8 hover-lift animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-xl sm:text-2xl font-black text-primary mb-4 sm:mb-6 uppercase italic tracking-tighter">
                Las preguntas que me torturaban:
              </h3>
              <ul className="space-y-4">
                {painPoints.map((point, index) => (
                  <li key={index} className="text-white/80 text-base sm:text-lg flex items-start gap-3 italic font-medium">
                    <span className="text-primary mt-1 font-black">»</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 sm:p-10 hover-glow animate-scale-in shadow-glow" style={{ animationDelay: '0.5s' }}>
              <p className="text-white text-base sm:text-lg font-medium mb-6 leading-relaxed">
                La verdad dolorosa: Estaba vibrando en la frecuencia de la carencia, la desesperación, la baja autoestima. Y eso repelía a cualquier hombre.
              </p>
              <p className="text-primary font-black text-xl sm:text-2xl mb-4 uppercase italic tracking-tighter">
                Hasta que descubrí esta FRECUENCIA LÍMBICA... y todo cambió en 48 horas.
              </p>
              <p className="text-white text-lg sm:text-xl font-black italic border-l-4 border-primary pl-4">
                Él me llamó llorando, pidiendo una segunda oportunidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
