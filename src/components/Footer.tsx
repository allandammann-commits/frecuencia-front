import { ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-lavender-50 to-white border-t border-lavender-100 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          
          {/* Part 1: Dra. Paola Profile */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow-md border-2 border-white">
                <img
                  src="https://i.imgur.com/C4JGtMM.jpeg"
                  alt="Foto da Dra. Paola"
                  className="w-full h-full object-cover object-[center_18%] scale-110"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Dra Paola</h3>
                <p className="text-sm font-medium text-primary mt-1 text-center">
                  Neuropsicóloga - Especialista en Nuerociencia Emocional
                </p>
              </div>
            </div>
            
            <p className="text-xs text-gray-600 leading-relaxed max-w-md">
              Este método fue desarrollado a partir de más de 12 años de investigación clínica en neurociencia afectiva, 
              combinando estudios sobre frecuencias binaurales, neuroplasticidad y el sistema límbico. 
              Cada protocolo está respaldado por evidencia científica revisada.
            </p>
          </div>

          {/* Part 2: University Logos */}
          <div className="flex flex-col items-center md:items-end space-y-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Método basado en investigaciones de:
            </p>

            <img
              src="https://i.imgur.com/2te9bwA.jpeg"
              alt="Instituciones de investigación"
              className="w-full max-w-sm md:max-w-xs rounded-xl border border-gray-100 shadow-sm"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            
            <p className="text-[10px] text-gray-400 text-center md:text-right max-w-xs leading-tight">
              Los logos representan instituciones cuyas investigaciones publicadas en neurociencia y frecuencias binaurales 
              respaldan los principios utilizados en este método. Este producto no tiene afiliación directa con estas instituciones.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 Frecuencia Límbica — Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} />
            <span>Sitio Seguro</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
