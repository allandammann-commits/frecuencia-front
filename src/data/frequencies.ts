export interface Frequency {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  duration: string;
  specifications: string;
  accentColor: string;
  accentColorHex: string;
  idealFor: string;
  usageTip: string;
  unlockDay: number;
  isPremium: boolean;
  // campo opcional para o áudio; será preenchido depois
  audioSrc?: string;
}

export const frequencies: Frequency[] = [
  {
    id: 1,
    title: "Frecuencia del Reencuentro",
    shortDescription: "Atrae a tu ex de vuelta",
    longDescription: "Activa el 'interruptor neurológico' en su cerebro. Esta frecuencia actúa en las ondas cerebrales Theta y Delta del subconsciente masculino, creando una conexión magnética irresistible. Él sentirá tu falta de forma desesperada e inexplicable.",
    duration: "5 min",
    specifications: "528Hz + Theta 7.83Hz",
    accentColor: "hsl(258 90% 66%)", // roxo
    accentColorHex: "#8B5CF6",
    idealFor: "Primer contacto después de la separación",
    usageTip: "Escucha con audífonos en un lugar tranquilo, cierra los ojos y visualiza el reencuentro con emociones positivas.",
    unlockDay: 1,
    isPremium: false,
    audioSrc: "/frecuenciadelreencuentro.mp3",
  },
  {
    id: 2,
    title: "Frecuencia de la Reconciliación",
    shortDescription: "Sana heridas del pasado",
    longDescription: "Elimina resentimientos, cura heridas emocionales y disuelve bloqueos energéticos que impiden la reconexión. Las ondas Delta actúan en el nivel más profundo del subconsciente, liberando patrones de dolor y abriendo espacio para el perdón mutuo.",
    duration: "7 min",
    specifications: "432Hz + Delta 3Hz",
    accentColor: "hsl(142 76% 36%)", // verde
    accentColorHex: "#10B981",
    idealFor: "Después de peleas o malentendidos graves",
    usageTip: "Escucha antes de dormir. Mientras escuchas, respira profundo y libera mentalmente cada resentimiento.",
    unlockDay: 1,
    isPremium: false,
    audioSrc: "/frecuenciadereconciliacion.mp3",
  },
  {
    id: 3,
    title: "Frecuencia de la Pasión Ardiente",
    shortDescription: "Despierta deseo incontrolable",
    longDescription: "Enciende la atracción física y emocional a niveles máximos. La frecuencia 639Hz es conocida como la frecuencia de la conexión y las relaciones armoniosas. Combinada con ondas Theta, crea un campo de energía apasionada que él sentirá como deseo intenso e irresistible por ti.",
    duration: "6 min",
    specifications: "639Hz + Theta 6Hz",
    accentColor: "hsl(0 84% 60%)", // rojo
    accentColorHex: "#EF4444",
    idealFor: "Cuando la relación necesita más fuego y pasión",
    usageTip: "Escucha por la noche, visualízate irradiando una energía magnética y seductora.",
    unlockDay: 1,
    isPremium: true,
    audioSrc: "/frecuenciapasion.mp3",
  },
  {
    id: 4,
    title: "Frecuencia Anti-Rival",
    shortDescription: "Elimina a la competencia",
    longDescription: "Borra literalmente la presencia de cualquier rival de su mente y corazón. La frecuencia 741Hz desintoxica energéticamente, mientras que las ondas Beta reprograman sus patrones de atracción. Él dejará de ver a otras mujeres y solo tendrá ojos para ti.",
    duration: "8 min",
    specifications: "741Hz + Beta 15Hz",
    accentColor: "hsl(217 91% 60%)", // azul oscuro
    accentColorHex: "#3B82F6",
    idealFor: "Cuando él está con otra persona o hay rivales",
    usageTip: "Escucha con intención firme pero sin apego ni desesperación. Confía en el proceso.",
    unlockDay: 1,
    isPremium: true,
    audioSrc: "/frecuenciaantirival.mp3",
  },
  {
    id: 5,
    title: "Frecuencia del Encantamiento",
    shortDescription: "Solo tenga ojos para ti",
    longDescription: "Crea un vínculo magnético único que lo hace verte como la única mujer en el mundo. La frecuencia 852Hz activa la intuición y despierta la visión espiritual. Las ondas Alpha inducen un estado de relajación y apertura emocional, haciéndolo vulnerable a tu energía encantadora.",
    duration: "5 min",
    specifications: "852Hz + Alpha 10Hz",
    accentColor: "hsl(330 81% 60%)", // rosado
    accentColorHex: "#EC4899",
    idealFor: "Mantener su atención exclusiva en ti",
    usageTip: "Escucha mientras te preparas o te arreglas, infundiendo esa energía en tu presencia.",
    unlockDay: 7,
    isPremium: true,
  },
  {
    id: 6,
    title: "Frecuencia de la Protección Amorosa",
    shortDescription: "Blinda tu relación",
    longDescription: "Crea un escudo energético poderoso que protege tu relación de Crisis, tentaciones externas, energías negativas y conflictos futuros. La frecuencia 396Hz libera el miedo y la culpa, mientras que las ondas Theta profundas crean un campo de protección duradero alrededor de tu vínculo amoroso.",
    duration: "10 min",
    specifications: "396Hz + Theta 5Hz",
    accentColor: "hsl(38 92% 50%)", // dorado
    accentColorHex: "#F59E0B",
    idealFor: "Una vez que hayan vuelto, para mantener la relación sólida",
    usageTip: "Escucha semanalmente como mantenimiento energético de la relación.",
    unlockDay: 7,
    isPremium: true,
  },
];

export const getFrequenciesByDay = (currentDay: number): Frequency[] => {
  return frequencies.filter(freq => freq.unlockDay <= currentDay);
};

export const getTodayFrequencies = (currentDay: number): Frequency[] => {
  // Retorna frequências desbloqueadas recentemente (últimos 3 dias)
  return frequencies.filter(
    freq => freq.unlockDay <= currentDay && freq.unlockDay >= currentDay - 2
  );
};
