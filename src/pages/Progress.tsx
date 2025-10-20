import { Trophy, Flame, Headphones, Star, CalendarDays } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useMemo, useState } from "react";
import { getUnlockedDays, PROGRAM_TOTAL_DAYS, updateProgressOnEntry } from "@/lib/userProgress";
import { toast } from "sonner";

const ProgressPage = () => {
  const [unlockedDays, setUnlockedDays] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const { error: updError } = await updateProgressOnEntry();
        if (updError) {
          console.warn("[Progress] updateProgressOnEntry error:", updError);
        }
        const { days, error } = await getUnlockedDays();
        if (error) {
          console.warn("[Progress] getUnlockedDays error:", error);
          // Silenciar toast para evitar incômodo ao usuário; manter lógica intacta
        }
        setUnlockedDays(days || [1]);
      } catch (e: any) {
        const msg = String(e?.message || e);
        console.error("[Progress] Erro ao carregar progresso:", msg);
        // Silenciar qualquer toast inesperado no carregamento inicial
        setUnlockedDays([1]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const currentDay = useMemo(() => (unlockedDays.length ? Math.max(...unlockedDays) : 1), [unlockedDays]);
  const progressPercentage = useMemo(() => (currentDay / PROGRAM_TOTAL_DAYS) * 100, [currentDay]);

  const totalSessions = unlockedDays.length * 2;
  const streakDays = unlockedDays.length;

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold">Mi Progreso</h1>
        <p className="text-muted-foreground">Resumen y estadísticas del programa</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        {/* Overall Progress */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="text-primary" />
              <h2 className="font-semibold">Progreso del Programa</h2>
            </div>
            <span className="text-sm text-muted-foreground">Día {currentDay} de {PROGRAM_TOTAL_DAYS}</span>
          </div>
          {loading ? (
            <>
              <Progress value={0} className="h-3 mb-3" />
              <Skeleton className="h-4 w-32" />
            </>
          ) : (
            <>
              <Progress value={progressPercentage} className="h-3 mb-3" />
              <p className="text-sm text-muted-foreground">Has desbloqueado {unlockedDays.length} días</p>
            </>
          )}
        </div>

        {/* Streak */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="text-accent" />
            <h2 className="font-semibold">Racha de Días</h2>
          </div>
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-3xl font-bold">{streakDays} días</div>
          )}
          <p className="text-sm text-muted-foreground">Sigue escuchando para mantener tu racha</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Headphones className="text-primary-light" />
            <h3 className="font-semibold">Sesiones</h3>
          </div>
          {loading ? <Skeleton className="h-8 w-12" /> : <p className="text-2xl font-bold">{totalSessions}</p>}
          <p className="text-xs text-muted-foreground">Frecuencias completadas</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="text-accent" />
            <h3 className="font-semibold">Logros</h3>
          </div>
          {loading ? <Skeleton className="h-8 w-12" /> : <p className="text-2xl font-bold">{Math.min(unlockedDays.length, 5)}</p>}
          <p className="text-xs text-muted-foreground">Desbloqueos conseguidos</p>
        </div>
      </div>

      <div className="mt-6 glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="text-primary" />
          <h2 className="font-semibold">Días Desbloqueados</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {loading ? (
            Array.from({ length: PROGRAM_TOTAL_DAYS }).map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-20 rounded-full" />
            ))
          ) : (
            Array.from({ length: PROGRAM_TOTAL_DAYS }).map((_, idx) => {
              const day = idx + 1;
              const unlocked = unlockedDays.includes(day);
              return (
                <span
                  key={day}
                  className={`px-3 py-1 rounded-full text-sm ${unlocked ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
                >
                  Día {day}
                </span>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
