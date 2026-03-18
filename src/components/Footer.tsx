export const Footer = () => {
  return <footer className="sm:py-12 px-4 bg-[#0a0a1a] border-t border-white/5 relative overflow-hidden py-8">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-5 left-10 w-24 h-24 bg-[#ff2d9b]/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-5 right-10 w-20 h-20 bg-[#ff2d9b]/5 rounded-full blur-xl animate-float" style={{
        animationDelay: '1s'
      }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="pt-6 sm:pt-8 animate-slide-up" style={{
        animationDelay: '0.3s'
      }}>
          <div className="bg-black/40 border border-white/5 p-6 rounded-2xl shadow-soft mb-6">
            <p className="text-gray-400 text-xs sm:text-sm mb-2 px-2 uppercase tracking-widest">
              © {new Date().getFullYear()} Frecuencia Límbica. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-xs px-2 mb-3 sm:mb-4 italic">
              Este producto no sustituye el acompañamiento psicológico profesional. Las investigaciones mencionadas son de carácter educativo.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <a href="#" className="text-gray-400 hover:text-[#ff2d9b] transition-all text-xs sm:text-sm font-bold uppercase tracking-tighter">
              Políticas de Privacidad
            </a>
            <span className="text-white/10 hidden sm:inline">|</span>
            <a href="#" className="text-gray-400 hover:text-[#ff2d9b] transition-all text-xs sm:text-sm font-bold uppercase tracking-tighter">
              Términos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>;
};