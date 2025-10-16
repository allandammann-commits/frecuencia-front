export const Footer = () => {
  return <footer className="sm:py-12 px-4 bg-gradient-card border-t border-border/50 relative overflow-hidden py-0">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-5 left-10 w-24 h-24 bg-primary/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-5 right-10 w-20 h-20 bg-accent/5 rounded-full blur-xl animate-float" style={{
        animationDelay: '1s'
      }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-6 sm:mb-8 animate-fade-in">
          
        </div>
        
        <div className="border-t border-border/30 pt-6 sm:pt-8 animate-slide-up" style={{
        animationDelay: '0.3s'
      }}>
          <div className="glassmorphism p-4 rounded-lg shadow-soft mb-4">
            <p className="text-muted-foreground text-xs sm:text-sm mb-2 px-2">
              © 2025 Frecuencia del Reencuentro. Todos los derechos reservados.
            </p>
            <p className="text-muted-foreground text-xs px-2 mb-3 sm:mb-4">
              Este producto no sustituye el acompañamiento psicológico profesional.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <a href="#" className="text-primary hover:text-accent transition-smooth text-xs sm:text-sm hover:scale-105 font-medium">
              Políticas de Privacidad
            </a>
            <span className="text-muted-foreground/50 hidden sm:inline">|</span>
            <a href="#" className="text-primary hover:text-accent transition-smooth text-xs sm:text-sm hover:scale-105 font-medium">
              Términos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>;
};