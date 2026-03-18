import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cómo voy a recibir el producto?",
      answer: "Inmediatamente después de la confirmación del pago, recibirás un email con tus datos de acceso. Podrás escuchar las frecuencias directamente desde tu celular, tablet o computadora."
    },
    {
      question: "¿Es realmente seguro?",
      answer: "¡Totalmente! El pago se procesa a través de Hotmart, la plataforma de productos digitales más grande y segura del mundo. Tus datos están 100% protegidos."
    },
    {
      question: "¿Funciona realmente?",
      answer: "Sí. La Frecuencia Límbica utiliza ondas binaurales científicamente probadas para estimular áreas específicas del cerebro masculino relacionadas con la memoria afectiva y el deseo."
    },
    {
      question: "¿Y si no funciona conmigo?",
      answer: "Aunque es raro que no funcione, tienes nuestra garantía blindada de 30 días. Si no ves resultados, te devolvemos el 100% de tu inversión."
    },
    {
      question: "¿Necesito pagar mensualidad?",
      answer: "No. Este es un pago único que te da acceso de por vida a la Frecuencia Límbica y a todos los bonos incluidos en tu plan."
    },
    {
      question: "¿Cuánto tiempo demora en hacer efecto?",
      answer: "Muchas usuarias reportan cambios en la actitud de su ex y el primer contacto en menos de 48 a 72 horas de uso constante."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-[#0a0a1a]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-12 sm:mb-16 px-2 animate-fade-in uppercase tracking-tighter">
          ❓ PREGUNTAS FRECUENTES
        </h2>
        
        <div className="space-y-4 sm:space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#0d0b1f] border border-white/5 shadow-soft rounded-2xl overflow-hidden hover-lift animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 sm:p-8 text-left flex justify-between items-center hover:bg-white/5 transition-all"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white pr-4 sm:pr-6">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff2d9b] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff2d9b] flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-white/5 pt-6">
                  <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
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