import { useEffect, useMemo, useState, type ReactNode } from "react";
import VslPage from "@/pages/VslPage";

type QuizOption = { emoji: string; label: string };
type QuizStep = { id: string; question: ReactNode; options: QuizOption[] };
type Answer = { stepId: string; optionLabel: string };

type Phase = "quiz" | "loading" | "result" | "vsl";

const badgeText = "⬇️ TEST GRATUITO: DESCUBRE EN 2 MINUTOS SI AÚN HAY UN VÍNCULO ENTRE USTEDES ⬇️";

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
  const [selectedOptionLabel, setSelectedOptionLabel] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);
  const loadingTexts = ["Analizando tus respuestas…", "Evaluando tu perfil emocional…", "Calculando tu probabilidad de reconquista…"];

  useEffect(() => {
    if (phase !== "loading") return;
    const i = window.setInterval(() => setLoadingTextIndex((v) => (v + 1) % loadingTexts.length), 2000);
    return () => window.clearInterval(i);
  }, [phase, loadingTexts.length]);

  useEffect(() => {
    if (phase !== "quiz") return;
    setSelectedOptionLabel(null);
    setLocked(false);
  }, [phase, stepIndex]);

  const handleAnswer = (opt: QuizOption) => {
    if (locked || phase !== "quiz") return;
    setSelectedOptionLabel(opt.label);
    setLocked(true);

    const step = steps[stepIndex];
    const nextAnswers = [...answers, { stepId: step.id, optionLabel: opt.label }];
    setAnswers(nextAnswers);

    const isLast = stepIndex === steps.length - 1;
    if (!isLast) {
      window.setTimeout(() => setStepIndex((v) => v + 1), 360);
      return;
    }

    window.setTimeout(() => {
      setPhase("loading");
      const totalMs = 6500;
      window.setTimeout(() => setPhase("result"), totalMs);
    }, 420);
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

        @keyframes quizSelectPop {
          0% { transform: scale(1); }
          45% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        .quiz-select-pop { animation: quizSelectPop 420ms ease-out; }
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

            {stepIndex === 0 && (
              <div className="mt-6 flex justify-center">
                <div className="relative mx-auto rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 font-extrabold text-[11px] sm:text-sm px-2 sm:px-3 py-[6px] text-center shadow-[0_8px_18px_-10px_rgba(245,158,11,0.5)] border border-amber-200 ring-1 ring-amber-300/50 leading-snug tracking-wide max-w-[22rem] sm:max-w-[36rem] break-words">
                  {badgeText}
                </div>
              </div>
            )}

            <div key={steps[stepIndex].id} className="animate-fade-in">
              <div className="mt-8 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">{steps[stepIndex].question}</h2>
              </div>

              <div className="mt-8 space-y-3">
                {steps[stepIndex].options.map((opt) => (
                  (() => {
                    const isSelected = selectedOptionLabel === opt.label;
                    const isDimmed = locked && !isSelected;
                    return (
                  <button
                    key={`${steps[stepIndex].id}-${opt.label}`}
                    type="button"
                    onClick={() => handleAnswer(opt)}
                    disabled={locked}
                    aria-pressed={isSelected}
                    className={[
                      "w-full rounded-2xl border bg-white/80 px-4 py-4 text-left transition-all duration-200 ease-out",
                      "hover:bg-white hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99]",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDF2F4]",
                      isSelected
                        ? "bg-white border-pink-200 ring-2 ring-pink-400 shadow-[0_18px_45px_-30px_rgba(236,72,153,0.65)] quiz-select-pop"
                        : "border-black/5 shadow-[0_8px_26px_-18px_rgba(45,27,78,0.22)]",
                      isDimmed ? "opacity-55" : "",
                      locked ? "cursor-not-allowed" : "",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{opt.emoji}</span>
                      <span className="text-base sm:text-lg font-semibold text-[#2D1B4E]">{opt.label}</span>
                      {isSelected && (
                        <span className="ml-auto flex items-center gap-2">
                          <span className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white flex items-center justify-center text-sm shadow-sm">
                            ✓
                          </span>
                        </span>
                      )}
                    </div>
                  </button>
                    );
                  })()
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
                    className="block w-full h-full object-cover object-[center_18%] scale-110"
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
              <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">Resultado de tu evaluación</p>
              <div className="mt-4 text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent drop-shadow quiz-soft-pulse">
                94%
              </div>
              <p className="mt-3 text-lg sm:text-xl font-semibold text-[#2D1B4E] max-w-[28rem] sm:max-w-md mx-auto">
                Probabilidad estimada de recuperar tu conexión con él
              </p>
              <div className="mt-5 h-px w-20 mx-auto bg-fuchsia-500/80" />

              <div className="mt-7 rounded-2xl bg-gradient-to-b from-pink-50/70 to-violet-50/70 border border-pink-100 px-5 py-5 sm:px-7 sm:py-6 text-left">
                <p className="text-sm sm:text-base font-bold text-[#2D1B4E]">Buenas noticias:</p>
                <p className="mt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                  Según tus respuestas,{" "}
                  <span className="font-semibold text-[#2D1B4E]">tu vínculo todavía tiene “señal”</span>. Eso significa que todavía hay una puerta abierta para
                  recuperar la conexión sin desgastarte.
                </p>
                <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                  <span className="font-semibold text-[#2D1B4E]">Lo que casi nadie te dice:</span> después de una ruptura, el cerebro de él no procesa las
                  emociones como tú imaginas. Entra en modo protección… pero{" "}
                  <span className="font-semibold text-[#2D1B4E]">hay un mecanismo que sigue activo</span>.
                </p>
                <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                  En el video de abajo vas a ver el disparador exacto y cómo activarlo{" "}
                  <span className="font-semibold text-[#2D1B4E]">sin contacto, sin mensajes, sin rogar</span>.
                </p>
                <p className="mt-4 text-sm sm:text-base font-bold text-[#2D1B4E]">
                  Te tomará pocos minutos. Y cuando lo veas, vas a entender por qué él actúa como actúa. 👇
                </p>
              </div>
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
