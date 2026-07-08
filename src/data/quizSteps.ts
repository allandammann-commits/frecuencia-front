export type QuizOption = { label: string; points: number };
export type QuizStep = {
  id: string;
  question: string;
  options: QuizOption[];
};

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: "q1",
    question: "¿Sientes que aún existe una conexión especial entre ustedes y quieres recuperarla?",
    options: [
      { label: "Sí", points: 3 },
      { label: "Tal vez", points: 2 },
    ],
  },
  {
    id: "q2",
    question: "¿Cuánto tiempo ha pasado desde la ruptura o el distanciamiento?",
    options: [
      { label: "Menos de 1 semana", points: 3 },
      { label: "Entre 1 y 4 semanas", points: 3 },
      { label: "1 a 3 meses", points: 2 },
      { label: "Más de 3 meses", points: 1 },
    ],
  },
  {
    id: "q3",
    question: "¿Qué es lo que más te duele en este momento?",
    options: [
      { label: "Sentir que él ya no piensa en mí", points: 3 },
      { label: "Imaginar que está con otra", points: 3 },
      { label: "La ansiedad de no saber si aún siente algo", points: 3 },
      { label: "Haberme humillado rogando", points: 2 },
    ],
  },
  {
    id: "q4",
    question: "¿Cuál fue la causa principal de la ruptura o el distanciamiento?",
    options: [
      { label: "Falta de comunicación", points: 2 },
      { label: "Discusiones, celos o desconfianza", points: 3 },
      { label: "La relación se enfrió / rutina", points: 2 },
      { label: "Apareció una tercera persona", points: 3 },
      { label: "Diferencias que no supimos resolver", points: 1 },
    ],
  },
  {
    id: "q5",
    question: "¿Cómo está actuando él en este momento contigo?",
    options: [
      { label: "Me bloqueó de todo", points: 1 },
      { label: "Mira mis redes pero no me habla", points: 3 },
      { label: "Responde, pero frío y distante", points: 2 },
      { label: "A veces me escribe, pero sin profundidad", points: 3 },
      { label: "Desapareció por completo", points: 2 },
    ],
  },
  {
    id: "q6",
    question: "¿Qué fue lo primero que hiciste después de la ruptura?",
    options: [
      { label: "Le mandé muchos mensajes o lo llamé", points: 3 },
      { label: "Lo busqué en redes sociales sin parar", points: 2 },
      { label: "Lo ignoré para ver si reaccionaba", points: 2 },
      { label: "Me paralicé… no supe qué hacer", points: 1 },
      { label: "Rogué, lloré, supliqué", points: 3 },
    ],
  },
  {
    id: "q7",
    question: "¿Cuál de estas frases describe mejor lo que sientes HOY?",
    options: [
      { label: "Pienso en él todo el día. No puedo concentrarme en nada", points: 3 },
      { label: "Siento que el tiempo se acaba y él me está olvidando", points: 3 },
      { label: "No duermo bien. Mi cuerpo siente su ausencia", points: 3 },
      { label: "Finjo que estoy bien, pero por dentro me rompo", points: 2 },
    ],
  },
  {
    id: "q8",
    question: "¿Él está con otra persona en este momento?",
    options: [
      { label: "Sí", points: 3 },
      { label: "No", points: 2 },
      { label: "No estoy segura", points: 2 },
      { label: "Creo que está conociendo a alguien", points: 3 },
    ],
  },
  {
    id: "q9",
    question: "¿Cuánto tiempo estuvieron juntos?",
    options: [
      { label: "Menos de 6 meses", points: 1 },
      { label: "1 a 2 años", points: 2 },
      { label: "3 a 5 años", points: 3 },
      { label: "Más de 5 años", points: 3 },
    ],
  },
  {
    id: "q10",
    question: "¿Qué tan decidida estás a recuperarlo?",
    options: [
      { label: "Quiero intentarlo pero tengo miedo", points: 2 },
      { label: "Estoy decidida pero no sé cómo", points: 2 },
      { label: "Haré lo que sea necesario", points: 3 },
      { label: "Necesito que funcione ya", points: 3 },
    ],
  },
];

export const QUIZ_TOTAL_STEPS = QUIZ_STEPS.length;
