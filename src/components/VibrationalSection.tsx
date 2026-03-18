import womanHeadphones from "@/assets/woman-headphones-final.png";

export const VibrationalSection = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 bg-gradient-subtle relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 space-y-4">
          <p className="text-[#ff2d9b] font-bold text-2xl sm:text-3xl animate-pulse">ESCUCHA SOLO 5 MINUTOS AL DÍA</p>
          <h2 className="text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight">
            REPROGRAMA TU ENERGÍA MAGNÉTICA PARA RECONQUISTAR A CUALQUIER HOMBRE
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Esta frecuencia te da una ventaja psicológica devastadora. Basada en neurociencia y frecuencias binaurales, actúa directamente en el subconsciente masculino.
          </p>
        </div>
        
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Vibration rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-full h-full border-2 border-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute w-4/5 h-4/5 border border-accent/30 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute w-3/5 h-3/5 border border-primary/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          
          <img 
            src={womanHeadphones}
            alt="Mujer escuchando frecuencia con auriculares, generando ondas de energía vibracional"
            className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 h-auto object-contain rounded-lg mx-auto relative z-10 hover-lift animate-fade-in shadow-elegant"
          />
          
          {/* Sound waves */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
              <div className="flex space-x-1">
                <div className="w-1 h-8 bg-primary/60 animate-pulse"></div>
                <div className="w-1 h-12 bg-accent/60 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-1 h-6 bg-primary/60 animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <div className="flex space-x-1">
                <div className="w-1 h-6 bg-accent/60 animate-pulse" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1 h-12 bg-primary/60 animate-pulse" style={{animationDelay: '0.3s'}}></div>
                <div className="w-1 h-8 bg-accent/60 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};