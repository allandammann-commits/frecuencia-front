import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Faq = { question: string; answer: string };

const FAQS: Faq[] = [
  {
    question: "¿Cómo recibo el acceso?",
    answer:
      "Al confirmarse el pago recibes un email con tus datos de acceso, en minutos. Puedes escuchar las frecuencias desde tu celular, tablet o computadora, sin instalar nada.",
  },
  {
    question: "¿Tengo que escribirle o buscarlo?",
    answer:
      "No. Todo el protocolo funciona sin contacto: no necesitas escribirle, ni llamarlo, ni rogar. De hecho, la idea es justamente que él dé el primer paso.",
  },
  {
    question: "¿Funciona si él me bloqueó?",
    answer:
      "Sí. Muchas alumnas empezaron bloqueadas de todo. El protocolo no depende de que exista un canal abierto entre ustedes, sino de la memoria afectiva que él ya tiene.",
  },
  {
    question: "¿Funciona si él ya está con otra persona?",
    answer:
      "Funciona igual. Una relación nueva después de una ruptura casi siempre es un intento de tapar lo que quedó pendiente. La Frecuencia Anti-Rival del Plan Premium fue creada exactamente para ese escenario.",
  },
  {
    question: "¿En cuánto tiempo voy a ver resultados?",
    answer:
      "Muchas usuarias reportan el primer cambio de actitud entre las 48 y 72 horas de uso constante. Otras tardan un poco más: depende del tiempo que llevan separados y de cómo terminó la relación.",
  },
  {
    question: "¿Él se va a dar cuenta de que estoy haciendo algo?",
    answer:
      "No. Las frecuencias las escuchas tú, en privado, con audífonos. Para él solo va a parecer que algo cambió en la forma en que te siente.",
  },
  {
    question: "¿Es un pago único o una mensualidad?",
    answer:
      "Es un pago único. No hay mensualidades ni renovaciones. El acceso queda contigo de por vida, junto con los bonos de tu plan.",
  },
  {
    question: "¿Es seguro pagar aquí?",
    answer:
      "Sí. El pago se procesa en Hotmart, una de las plataformas de productos digitales más grandes del mundo. Tus datos van cifrados y nunca pasan por nuestro sitio.",
  },
  {
    question: "¿Y si no funciona conmigo?",
    answer:
      "Tienes 30 días de garantía total. Si no ves resultados o simplemente no quedas satisfecha, escribes y te devolvemos el 100% del dinero. Sin preguntas.",
  },
];

const FaqItem = ({ faq, isOpen, onToggle }: { faq: Faq; isOpen: boolean; onToggle: () => void }) => (
  <div className="rounded-2xl bg-white border border-pink-100 shadow-[0_10px_30px_-24px_rgba(45,27,78,0.5)] overflow-hidden">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-pink-50/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-inset"
    >
      <span className="text-[15px] sm:text-base font-semibold text-[#2D1B4E] leading-snug">{faq.question}</span>
      <ChevronDown
        className={`h-5 w-5 flex-shrink-0 text-violet-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>

    <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
      <div className="overflow-hidden">
        <p className="px-5 pb-5 text-sm sm:text-[15px] text-gray-600 leading-relaxed border-t border-pink-100 pt-4">
          {faq.answer}
        </p>
      </div>
    </div>
  </div>
);

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="preguntas" className="w-full px-4 pt-4 pb-10 sm:pt-6 sm:pb-14 bg-[#FDF2F4] animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D1B4E] leading-tight">Preguntas frecuentes</h2>
          <div className="mt-4 mx-auto h-px w-16 bg-gradient-to-r from-pink-400 to-violet-400" />
        </div>

        <div className="mt-6 space-y-3">
          {FAQS.map((faq, index) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600">¿Ya no tienes dudas?</p>
          <a
            href="#oferta"
            className="mt-3 inline-block rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-bold px-8 py-4 shadow-[0_16px_40px_-18px_rgba(139,92,246,0.7)] transition-colors"
          >
            QUIERO RECUPERARLO ✨
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
