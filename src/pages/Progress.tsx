import { Trophy, Flame, Clock, Headphones, Star, CalendarDays } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useMemo, useState } from "react";
import { getUnlockedDays } from "@/lib/userProgress";

const PROGRAM_TOTAL_DAYS = 7;

const ProgressPage = () => {
  const [unlockedDays, setUnlockedDays] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const days = await getUnlockedDays();
      setUnlockedDays(days);
    })();
  }, []);

  const currentDay = useMemo(() => (unlockedDays.length ? Math.max(...unlockedDays) : 1), [unlockedDays]);
  const progressPercentage = useMemo(() => (currentDay / PROGRAM_TOTAL_DAYS) * 100, [currentDay]);

  const totalMinutesListened = 65;
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
          <Progress value={progressPercentage} className="h-3 mb-3" />
          <p className="text-sm text-muted-foreground">Has desbloqueado {unlockedDays.length} días</p>
        </div>

        {/* Streak */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="text-accent" />
            <h2 className="font-semibold">Racha de Días</h2>
          </div>
          <div className="text-3xl font-bold">{streakDays} días</div>
          <p className="text-sm text-muted-foreground">Sigue escuchando para mantener tu racha</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-primary" />
            <h3 className="font-semibold">Tiempo de Escucha</h3>
          </div>
          <p className="text-2xl font-bold">{totalMinutesListened} min</p>
          <p className="text-xs text-muted-foreground">Total acumulado</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Headphones className="text-primary-light" />
            <h3 className="font-semibold">Sesiones</h3>
          </div>
          <p className="text-2xl font-bold">{totalSessions}</p>
          <p className="text-xs text-muted-foreground">Frecuencias completadas</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="text-accent" />
            <h3 className="font-semibold">Logros</h3>
          </div>
          <p className="text-2xl font-bold">{Math.min(unlockedDays.length, 5)}</p>
          <p className="text-xs text-muted-foreground">Desbloqueos conseguidos</p>
        </div>
      </div>

      <div className="mt-6 glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="text-primary" />
          <h2 className="font-semibold">Días Desbloqueados</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: PROGRAM_TOTAL_DAYS }).map((_, idx) => {
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
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
