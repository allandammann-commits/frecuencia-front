import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import draImage from "@/assets/woman-headphones-final.png"; // Usando imagem disponível como placeholder para a Dra.

interface QuizProps {
  onComplete: (answers: Record<string, string>) => void;
}

const steps = [
  {
    id: 1,
    question: "¿Sientes que aún existe una conexión especial entre ustedes y quieres recuperarla?",
    options: [
      { text: "❤️ Sí, algo dentro de mí lo sabe.", value: "si" },
      { text: "🤔 No estoy segura, pero quiero descubrirlo.", value: "no_segura" }
    ],
    showDra: true
  },
  {
    id: 2,
    question: "¿Qué es lo que más te duele en este momento?",
    options: [
      { text: "🧠 Sentir que él ya no piensa en mí.", value: "no_piensa" },
      { text: "💔 Imaginar que está con otra.", value: "otra" },
      { text: "😔 La ansiedad de no saber si aún siente algo.", value: "ansiedad" },
      { text: "😶 Haberme humillado rogando.", value: "humillacion" }
    ]
  },
  {
    id: 3,
    question: "¿Cuánto tiempo ha pasado desde que se separaron o desde que él se distanció?",
    options: [
      { text: "⏰ Menos de 1 semana", value: "menos_1_semana" },
      { text: "📆 Entre 1 y 4 semanas", value: "1_4_semanas" },
      { text: "🗓️ 1 a 3 meses", value: "1_3_meses" },
      { text: "🕰️ Más de 3 meses", value: "mas_3_meses" }
    ]
  },
  {
    id: 4,
    question: "¿Cuál fue la causa principal de la ruptura o el distanciamiento?",
    options: [
      { text: "💬 Falta de comunicación", value: "comunicacion" },
      { text: "⚡ Discusiones, celos o desconfianza", value: "discusiones" },
      { text: "🧊 La relación se enfrió / rutina", value: "rutina" },
      { text: "❌ Apareció una tercera persona", value: "tercera_persona" },
      { text: "😔 Diferencias que no supimos resolver", value: "diferencias" }
    ]
  },
  {
    id: 5,
    question: "¿Cómo está actuando él en este momento contigo?",
    options: [
      { text: "⛔ Me bloqueó de todo.", value: "bloqueado" },
      { text: "👁️ Mira mis redes pero no me habla.", value: "mira_redes" },
      { text: "🧊 Responde, pero frío y distante.", value: "frio" },
      { text: "💬 A veces me escribe, pero sin profundidad.", value: "escribe" },
      { text: "🕳️ Desapareció por completo.", value: "desaparecio" }
    ]
  },
  {
    id: 6,
    question: "¿Qué fue lo primeiro que hiciste después de la ruptura?",
    options: [
      { text: "📲 Le mandé muitos mensajes o lo llamé.", value: "mensajes" },
      { text: "🔍 Lo busqué en redes sociales sin parar.", value: "busqueda" },
      { text: "🧊 Lo ignoré para ver si reaccionaba.", value: "ignorado" },
      { text: "🤐 Me paralicé… no supe qué hacer.", value: "paralizada" },
      { text: "😭 Rogué, lloré, supliqué.", value: "rogue" }
    ]
  },
  {
    id: 7,
    question: "¿Cuál de estas frases describe mejor lo que sientes <span class=\"text-primary font-bold\">HOY</span>?",
    options: [
      { text: "🔥 Pienso en él todo el día. No puedo concentrarme en nada.", value: "pienso_todo_dia" },
      { text: "😩 Siento que el tiempo se acaba y él me está olvidando.", value: "olvidando" },
      { text: "💤 No duermo bien. Mi cuerpo siente su ausencia.", value: "no_duermo" },
      { text: "😶 Finjo que estoy bien, pero por dentro me rompo.", value: "rompo" }
    ]
  },
  {
    id: 8,
    question: "¿Qué tanto quieres recuperar esa conexión con él?",
    options: [
      { text: "1️⃣ Me gustaría intentarlo, mas tengo miedo.", value: "miedo" },
      { text: "2️⃣ Quiero reconectarme, mas no sé cómo.", value: "no_se_como" },
      { text: "3️⃣ Estoy decidida. Necesito que él sienta mi presencia otra vez.", value: "decidida" },
      { text: "4️⃣ Haré lo que sea necesario para resintonizar lo que sentíamos.", value: "lo_que_sea" }
    ]
  },
  {
    id: 9,
    question: "¿Te gustaría saber cómo reactivar la conexión emocional que él bloqueó — aunque esté lejos o con otra?",
    options: [
      { text: "❤️ Sí, quiero entender cómo funciona.", value: "entender" },
      { text: "💡 Sí, si es algo real y basado en ciencia.", value: "basado_ciencia" }
    ]
  },
  {
    id: 10,
    question: "Si existiera un vídeo corto con el paso a paso exacto para que él vuelva a sentir lo que sentía por ti… ¿lo verías hasta el final?",
    options: [
      { text: "❤️ Sí, quiero verlo ahora.", value: "ver_ahora" },
      { text: "😊 Sí, quiero verlo y aplicarlo hoy.", value: "aplicar_hoy" },
      { text: "🤗 Sí, pero quiero entender cada detalle.", value: "detalles" }
    ]
  }
];

export const Quiz = ({ onComplete }: QuizProps) => {
  const [currentStep, setCurrentStep] = useState(1); // Start directly at step 1
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleOptionClick = (value: string) => {
    const nextAnswers = { ...answers, [`step_${currentStep}`]: value };
    setAnswers(nextAnswers);

    if (currentStep < 10) {
      setCurrentStep(currentStep + 1);
    } else {
      // Small delay to feel the click before transition
      setTimeout(() => onComplete(nextAnswers), 300);
    }
  };

  const stepData = steps[currentStep - 1];

  return (
    <div className="max-w-xl mx-auto px-4 py-8 min-h-[600px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-medium text-primary">
              <span>Paso {currentStep} de 10</span>
              <span>{Math.round((currentStep / 10) * 100)}%</span>
            </div>
            <Progress value={(currentStep / 10) * 100} className="h-2 bg-muted" />
          </div>

          {stepData.showDra && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <img 
                  src={draImage} 
                  alt="Dra." 
                  className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-primary/30 relative z-10 shadow-2xl"
                />
              </div>
            </motion.div>
          )}

          <h2 
            className="text-2xl sm:text-3xl font-bold leading-tight text-center text-foreground"
            dangerouslySetInnerHTML={{ __html: stepData.question }}
          />

          <div className="grid gap-4">
            {stepData.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleOptionClick(option.value)}
                className="py-6 text-left justify-start px-6 text-lg border-border hover:border-primary hover:bg-primary/10 transition-all rounded-2xl bg-white shadow-soft text-foreground"
              >
                <span className="mr-3">{option.text.split(' ')[0]}</span>
                <span>{option.text.split(' ').slice(1).join(' ')}</span>
              </Button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
