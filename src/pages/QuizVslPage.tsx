import { useEffect, useMemo, useState, type ReactNode } from "react";
import VslPage from "@/pages/VslPage";

type QuizOption = { emoji: string; label: string };
type QuizStep = { id: string; question: ReactNode; options: QuizOption[] };
type Answer = { stepId: string; optionLabel: string };

type Phase = "quiz" | "loading" | "result" | "vsl";

const badgeText = "⬇️ EVALUACIÓN GRATUITA PARA LA RECONQUISTA ⬇️";

export const QuizVslPage = () => {
  const steps: QuizStep[] = useMemo(
    () => [
      {
        id: "q1",
        question: "¿Sientes que aún existe una conexión especial entre ustedes y quieres recuperarla?",
        options: [
          { emoji: "✅", label: "Sí" },
          { emoji: "🟡", label: "Tal vez" },
        ],
      },
      {
        id: "q2",
        question: "¿Cuánto tiempo ha pasado desde la ruptura o el distanciamiento?",
        options: [
          { emoji: "⏰", label: "Menos de 1 semana" },
          { emoji: "📆", label: "Entre 1 y 4 semanas" },
          { emoji: "🗓️", label: "1 a 3 meses" },
          { emoji: "🕰️", label: "Más de 3 meses" },
        ],
      },
      {
        id: "q3",
        question: "¿Qué es lo que más te duele en este momento?",
        options: [
          { emoji: "🧠", label: "Sentir que él ya no piensa en mí" },
          { emoji: "💔", label: "Imaginar que está con otra" },
          { emoji: "😔", label: "La ansiedad de no saber si aún siente algo" },
          { emoji: "😶", label: "Haberme humillado rogando" },
        ],
      },
      {
        id: "q4",
        question: "¿Cuál fue la causa principal de la ruptura o el distanciamiento?",
        options: [
          { emoji: "💬", label: "Falta de comunicación" },
          { emoji: "⚡", label: "Discusiones, celos o desconfianza" },
          { emoji: "🧊", label: "La relación se enfrió / rutina" },
          { emoji: "❌", label: "Apareció una tercera persona" },
          { emoji: "😔", label: "Diferencias que no supimos resolver" },
        ],
      },
      {
        id: "q5",
        question: "¿Cómo está actuando él en este momento contigo?",
        options: [
          { emoji: "⛔", label: "Me bloqueó de todo" },
          { emoji: "👁️", label: "Mira mis redes pero no me habla" },
          { emoji: "🧊", label: "Responde, pero frío y distante" },
          { emoji: "💬", label: "A veces me escribe, pero sin profundidad" },
          { emoji: "🕳️", label: "Desapareció por completo" },
        ],
      },
      {
        id: "q6",
        question: "¿Qué fue lo primero que hiciste después de la ruptura?",
        options: [
          { emoji: "📲", label: "Le mandé muchos mensajes o lo llamé" },
          { emoji: "🔍", label: "Lo busqué en redes sociales sin parar" },
          { emoji: "🧊", label: "Lo ignoré para ver si reaccionaba" },
          { emoji: "🤐", label: "Me paralicé… no supe qué hacer" },
          { emoji: "😭", label: "Rogué, lloré, supliqué" },
        ],
      },
      {
        id: "q7",
        question: (
          <span>
            ¿Cuál de estas frases describe mejor lo que sientes{" "}
            <span className="font-bold text-pink-600">HOY</span>?
          </span>
        ),
        options: [
          { emoji: "🔥", label: "Pienso en él todo el día. No puedo concentrarme en nada" },
          { emoji: "😩", label: "Siento que el tiempo se acaba y él me está olvidando" },
          { emoji: "💤", label: "No duermo bien. Mi cuerpo siente su ausencia" },
          { emoji: "😶", label: "Finjo que estoy bien, pero por dentro me rompo" },
        ],
      },
      {
        id: "q8",
        question: "¿Él está con otra persona en este momento?",
        options: [
          { emoji: "💔", label: "Sí" },
          { emoji: "🙅‍♀️", label: "No" },
          { emoji: "🤷‍♀️", label: "No estoy segura" },
          { emoji: "👀", label: "Creo que está conociendo a alguien" },
        ],
      },
      {
        id: "q9",
        question: "¿Cuánto tiempo estuvieron juntos?",
        options: [
          { emoji: "💞", label: "Menos de 6 meses" },
          { emoji: "💑", label: "1 a 2 años" },
          { emoji: "🥰", label: "3 a 5 años" },
          { emoji: "💍", label: "Más de 5 años" },
        ],
      },
      {
        id: "q10",
        question: "¿Qué tan decidida estás a recuperarlo?",
        options: [
          { emoji: "🤍", label: "Quiero intentarlo pero tengo miedo" },
          { emoji: "💜", label: "Estoy decidida pero no sé cómo" },
          { emoji: "🔥", label: "Haré lo que sea necesario" },
          { emoji: "⚡", label: "Necesito que funcione ya" },
        ],
      },
    ],
    [],
  );

  const [phase, setPhase] = useState<Phase>("quiz");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);
  const loadingTexts = ["Analizando tus respuestas…", "Evaluando tu perfil emocional…", "Calculando tu probabilidad de reconquista…"];

  useEffect(() => {
    if (phase !== "loading") return;
    const i = window.setInterval(() => setLoadingTextIndex((v) => (v + 1) % loadingTexts.length), 2000);
    return () => window.clearInterval(i);
  }, [phase, loadingTexts.length]);

  const handleAnswer = (opt: QuizOption) => {
    const step = steps[stepIndex];
    const nextAnswers = [...answers, { stepId: step.id, optionLabel: opt.label }];
    setAnswers(nextAnswers);

    const isLast = stepIndex === steps.length - 1;
    if (!isLast) {
      window.setTimeout(() => setStepIndex((v) => v + 1), 300);
      return;
    }

    setPhase("loading");
    const totalMs = 6500;
    window.setTimeout(() => setPhase("result"), totalMs);
  };

  const goToVsl = () => {
    setPhase("vsl");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (phase === "vsl") {
    return <VslPage offerDelayMs={278000} />;
  }

  return (
    <div className="min-h-screen bg-[#FDF2F4] text-[#2D1B4E] px-4 py-10 sm:py-14">
      <style>{`
        @keyframes quizSoftPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(236,72,153,0)); }
          50% { transform: scale(1.04); filter: drop-shadow(0 10px 18px rgba(236,72,153,0.25)); }
        }
        .quiz-soft-pulse { animation: quizSoftPulse 1.9s ease-in-out infinite; }

        @keyframes quizShimmer {
          0% { transform: translateX(-120%) skewX(-15deg); opacity: 0; }
          10% { opacity: 1; }
          60% { opacity: 1; }
          100% { transform: translateX(220%) skewX(-15deg); opacity: 0; }
        }
        .quiz-shimmer { animation: quizShimmer 2.4s ease-in-out infinite; }
      `}</style>
      <div className="max-w-[600px] mx-auto">
        {phase === "quiz" && (
          <>
            <div className="h-1 w-full rounded-full bg-white/70 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <div className="rounded-full bg-yellow-100 text-yellow-900 font-bold text-xs sm:text-sm px-4 py-2 text-center">
                {badgeText}
              </div>
            </div>

            <div key={steps[stepIndex].id} className="animate-fade-in">
              <div className="mt-8 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">{steps[stepIndex].question}</h2>
              </div>

              <div className="mt-8 space-y-3">
                {steps[stepIndex].options.map((opt) => (
                  <button
                    key={`${steps[stepIndex].id}-${opt.label}`}
                    type="button"
                    onClick={() => handleAnswer(opt)}
                    className="w-full rounded-2xl border border-black/5 bg-white/80 hover:bg-white active:bg-white px-4 py-4 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{opt.emoji}</span>
                      <span className="text-base sm:text-lg font-semibold text-[#2D1B4E]">{opt.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {stepIndex === 0 && (
              <div className="mt-10 text-center">
                <p className="text-sm font-semibold text-[#2D1B4E]">Creado por la Dra. Paola</p>
                <div className="mt-4 mx-auto h-24 w-24 rounded-full bg-white border border-pink-200 overflow-hidden shadow-sm">
                  <img
                    src="https://i.imgur.com/C4JGtMM.jpeg"
                    alt="Foto da Dra. Paola"
                    className="block w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="mt-4 text-xs italic text-gray-500 max-w-sm mx-auto">
                  Especialista en relaciones y en la mente masculina. Ayuda a mujeres a restaurar el vínculo afectivo y a recuperar a sus ex parejas.
                </p>
              </div>
            )}
          </>
        )}

        {phase === "loading" && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full border-4 border-violet-200 border-t-violet-500 animate-spin" />
            <p className="mt-6 text-base sm:text-lg font-semibold text-[#2D1B4E]">{loadingTexts[loadingTextIndex]}</p>
          </div>
        )}

        {phase === "result" && (
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="w-full rounded-3xl bg-white shadow-[0_18px_60px_-30px_rgba(236,72,153,0.35)] border border-pink-100 p-6 sm:p-10 text-center">
              <p className="text-sm text-gray-600">Resultado de tu evaluación:</p>
              <div className="mt-4 text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent drop-shadow quiz-soft-pulse">
                94%
              </div>
              <div className="mt-4 h-px w-16 mx-auto bg-fuchsia-500/80" />
              <p className="mt-2 text-base sm:text-lg text-[#2D1B4E]">de probabilidad de recuperar tu conexión con él</p>
              <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-pink-400 to-violet-400" />
              <p className="mt-6 text-sm sm:text-base text-gray-700">
                Esto significa que la frecuencia límbica entre tú y él todavía tiene señal. Él no te olvidó — su cerebro solo perdió la conexión. Y eso tiene solución.
              </p>
              <p className="mt-3 text-xs sm:text-sm italic text-gray-500">Miles de mujeres en tu misma situación ya reactivaron esa frecuencia.</p>
              <p className="mt-3 text-sm sm:text-base font-bold text-[#2D1B4E]">Mira este corto vídeo donde te explico el paso a paso exacto.</p>
              <button
                type="button"
                onClick={goToVsl}
                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-bold py-4 shadow-[0_16px_40px_-18px_rgba(139,92,246,0.7)] relative overflow-hidden"
              >
                <span className="pointer-events-none absolute inset-0 quiz-shimmer">
                  <span className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </span>
                VER EL MÉTODO AHORA
              </button>
              <input type="hidden" value={JSON.stringify(answers)} readOnly />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizVslPage;
