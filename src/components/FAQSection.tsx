import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cómo voy a recibir el producto?",
      answer: "Inmediatamente después de la confirmación del pago, recibirás un email con el enlace para descargar todos los audios y bonos. Si eliges el Plan Premium, recibirás también el acceso a la aplicación exclusiva \"Reencuentro Magnético\"."
    },
    {
      question: "¿Es realmente seguro?",
      answer: "¡Sí! Utilizamos la misma tecnología de seguridad de los bancos. Tus datos están 100% protegidos."
    },
    {
      question: "¿Funciona realmente?",
      answer: "Más de 15.847 mujeres ya comprobaron la eficacia. Nuestra tasa de éxito es del 94,7%."
    },
    {
      question: "¿Y si no funciona conmigo?",
      answer: "¡Imposible! Pero si por algún motivo no funciona, tienes 30 días de garantía total."
    },
    {
      question: "¿Necesito pagar mensualidad?",
      answer: "¡No! Es un pago único. Tendrás acceso de por vida a todo el contenido de tu plan."
    },
    {
      question: "¿Cuánto tiempo demora en hacer efecto?",
      answer: "La mayoría de las mujeres reportan las primeras señales en 24-72 horas. Algunas en pocas horas."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-12 sm:mb-16 px-2 animate-fade-in">
          ❓ PREGUNTAS FRECUENTES
        </h2>
        
        <div className="space-y-4 sm:space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="glassmorphism shadow-soft rounded-lg overflow-hidden hover-lift animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 sm:p-8 text-left flex justify-between items-center hover:bg-muted/10 transition-smooth"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground pr-4 sm:pr-6">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};