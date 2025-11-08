import { useEffect, useState } from "react";
import { Calendar, CheckCircle, Clock, Trophy, Target } from "lucide-react";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProgressSummary, updateProgressOnEntry } from "@/lib/progress";
import { toast } from "sonner";

const PROGRAM_TOTAL_DAYS = 7;

const ProgressPage = () => {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [summary, setSummary] = useState<{ 
    percentage: number; 
    completedCount: number; 
    totalCount: number; 
    byDay: Record<number, number> 
  }>({ 
    percentage: 0, 
    completedCount: 0, 
    totalCount: 0, 
    byDay: {} 
  });

  useEffect(() => {
    const loadProgress = async () => {
      try {
        setLoading(true);
        
        // Atualiza progresso e obtém dia atual
        const { currentDay } = await updateProgressOnEntry();
        setCurrentDay(currentDay || 1);
        
        // Carrega resumo do progresso
        const progressSummary = await getProgressSummary();
        setSummary(progressSummary);
        
      } catch (error) {
        console.error("[Progress] Erro ao carregar progresso:", error);
        toast.error("Erro ao carregar progresso");
      } finally {
        setLoading(false);
      }
    };

    loadProgress();

    // Escuta atualizações de progresso
    const handleProgressUpdate = () => {
      loadProgress();
    };

    window.addEventListener("progress:update", handleProgressUpdate);
    return () => window.removeEventListener("progress:update", handleProgressUpdate);
  }, []);

  const getUnlockedDays = () => {
    return Array.from({ length: currentDay }, (_, i) => i + 1);
  };

  const getDayStatus = (day: number) => {
    if (day > currentDay) return "locked";
    const completedInDay = summary.byDay[day] || 0;
    return completedInDay > 0 ? "completed" : "available";
  };

  if (loading) {
    return (
      <div className="min-h-screen pb-24 px-4 pt-6">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold gradient-text mb-2">
          Tu Progreso
        </h1>
        <p className="text-muted-foreground">
          Día {currentDay} de {PROGRAM_TOTAL_DAYS} • {summary.completedCount} de {summary.totalCount} completadas
        </p>
      </header>

      {/* Tarjeta de Progreso General */}
      <Card className="glass-card mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            Progreso General
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Completado</span>
              <span className="text-2xl font-bold gradient-text">{summary.percentage}%</span>
            </div>
            <ProgressBar value={summary.percentage} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{summary.completedCount} completadas</span>
              <span>{summary.totalCount} total</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendario de Días */}
      <Card className="glass-card mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            Calendario de Transformación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-3">
            {Array.from({ length: PROGRAM_TOTAL_DAYS }).map((_, index) => {
              const day = index + 1;
              const status = getDayStatus(day);
              const completedInDay = summary.byDay[day] || 0;
              
              return (
                <div
                  key={day}
                  className={`
                    relative p-4 rounded-xl text-center transition-all duration-300
                    ${status === "completed" 
                      ? "bg-accent/20 border-2 border-accent text-accent" 
                      : status === "available"
                      ? "bg-primary/10 border-2 border-primary/30 text-primary hover:bg-primary/20"
                      : "bg-muted/50 border-2 border-muted text-muted-foreground"
                    }
                  `}
                >
                  <div className="font-bold text-lg mb-1">Día {day}</div>
                  <div className="text-xs">
                    {status === "completed" && (
                      <div className="flex items-center justify-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>{completedInDay}</span>
                      </div>
                    )}
                    {status === "available" && (
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Disponible</span>
                      </div>
                    )}
                    {status === "locked" && (
                      <div className="flex items-center justify-center gap-1">
                        <Target className="w-3 h-3" />
                        <span>Bloqueado</span>
                      </div>
                    )}
                  </div>
                  
                  {status === "completed" && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas Detalladas */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">{summary.completedCount}</div>
                <div className="text-xs text-muted-foreground">Completadas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{currentDay}</div>
                <div className="text-xs text-muted-foreground">Día Actual</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;
