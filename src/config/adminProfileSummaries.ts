import type { QuizProfile } from "@/lib/quizScoring";

/** Resumos em português para o painel admin (não altera copy do funil em espanhol). */
export const ADMIN_PROFILE_SUMMARIES_PT: Record<
  QuizProfile,
  { tag: string; summary: string }
> = {
  1: {
    tag: "Conexão emocional ativa",
    summary: "Vínculo ainda vivo, com memória emocional forte e desejo real de reconstruir.",
  },
  2: {
    tag: "Porta emocional aberta",
    summary: "Conexão residual; ele ainda processa o relacionamento e a porta não fechou.",
  },
  3: {
    tag: "Vínculo latente",
    summary: "Nostalgia e desejo por dentro; contato frio, mas a conexão não morreu.",
  },
  4: {
    tag: "Conexão em repouso",
    summary: "Mais distante hoje, mas ainda há marca emocional — cenário menos urgente.",
  },
};
