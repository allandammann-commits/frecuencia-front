import { Bell, Sparkles, Headphones, BookOpen, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
const logoUrl = "https://i.imgur.com/1eS0cCx.png";
import { getTodayFrequencies } from "@/data/frequencies";
import GuideMaster from "@/components/GuideMaster";
import { useEffect, useMemo, useState } from "react";
import { updateProgressOnEntry, getProgressSummary } from "@/lib/progress";
import { getUser } from "@/lib/auth";
import { toast } from "sonner";

const PROGRAM_TOTAL_DAYS = 7;

const Home = () => {
  const navigate = useNavigate();
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [userName, setUserName] = useState<string>("")
  const [summaryPct, setSummaryPct] = useState<number>(0);
  const [summaryCounts, setSummaryCounts] = useState<{ completed: number; total: number }>({ completed: 0, total: 0 });

  useEffect(() => {
    // Atualiza desbloqueios e dia atual ao entrar na Home
    (async () => {
      try {
        const { currentDay, error } = await updateProgressOnEntry();
        if (error) {
          console.warn("[Home] updateProgressOnEntry error:", error);
        }
        setCurrentDay(currentDay || 1);
      } catch (e: any) {
        console.warn("[Home] erro ao obter progresso:", e?.message || e);
        setCurrentDay(1);
      }
    })();

    // Carrega nome do usuário (se disponível)
    (async () => {
      const storedName = localStorage.getItem("user_name") || "";
      if (storedName) {
        setUserName(storedName);
        return;
      }
      const { user } = await getUser();
      if (user) {
        const name = (user.user_metadata as any)?.name || user.email || "";
        setUserName(name);
      }
    })();
  }, []);

  // Carrega resumo de progresso (0% inicial; atualiza em eventos)
  useEffect(() => {
    const loadProgress = async () => {
      console.log(`[DEBUG] Home - loading progress summary`);
      const summary = await getProgressSummary();
      console.log(`[DEBUG] Home - progress summary:`, summary);
      setSummaryPct(summary.percentage);
      setSummaryCounts({ completed: summary.completedCount, total: summary.totalCount });
    };
    loadProgress();

    const handleProgressUpdate = () => {
      console.log(`[DEBUG] Home - progress:update event received`);
      loadProgress();
    };

    window.addEventListener("progress:update", handleProgressUpdate);
    return () => window.removeEventListener("progress:update", handleProgressUpdate);
  }, []);

  const totalDays = PROGRAM_TOTAL_DAYS;
  const progressPercentage = useMemo(() => summaryPct, [summaryPct]);
  const todayFrequencies = useMemo(() => getTodayFrequencies(currentDay), [currentDay]);

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Logo" className="w-16 h-16 object-contain" />
          <div>
            <h2 className="font-display text-2xl font-bold gradient-text">{userName ? `Hola, ${userName}` : "Bienvenida"}</h2>
            <p className="text-sm text-muted-foreground">Día {currentDay} de tu transformación</p>
          </div>
        </div>
        <button className="relative p-2 rounded-full glass-card hover-scale">
          <Bell size={24} className="text-primary-light" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-glow-pulse" />
        </button>
      </header>

      {/* Progress Card removido temporariamente */}

      {/* Today's Frequencies */}
      <div className="mb-6">
        <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2 gradient-text">
          <Headphones size={24} className="text-primary" />
          Frecuencias Disponibles
        </h2>
        
        <div className="space-y-3">
          {todayFrequencies.length > 0 ? (
            todayFrequencies.map((freq) => (
              <div
                key={freq.id}
                className="glass-card rounded-xl p-4 hover-scale cursor-pointer transition-all duration-300"
                style={{ borderColor: freq.accentColor }}
                onClick={() => navigate("/frequencies")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 flex items-center gap-2">
                      {freq.title}
                      {freq.isPremium && (
                        <span 
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            backgroundColor: `${freq.accentColor}20`,
                            color: freq.accentColorHex
                          }}
                        >
                          Premium
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {freq.shortDescription}
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-muted-foreground">{freq.duration}</span>
                      <span>•</span>
                      <span 
                        className="font-medium"
                        style={{ color: freq.accentColorHex }}
                      >
                        {freq.specifications}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    className="hover:opacity-90"
                    style={{
                      background: `linear-gradient(135deg, ${freq.accentColor}, ${freq.accentColorHex})`,
                      color: 'white'
                    }}
                  >
                    Escuchar
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-card rounded-xl p-6 text-center space-y-3">
              <p className="text-muted-foreground">Aún no hay nuevas frecuencias hoy.</p>
              <p className="text-sm">Explora todas en la sección de Frecuencias.</p>
              <Button onClick={() => navigate("/frequencies")} className="w-full">Ir a Frecuencias</Button>
            </div>
          )}
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="mb-6">
        <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
          <Sparkles size={24} className="text-accent" />
          Tareas de Hoy
        </h2>
        
        <div className="space-y-3">
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-primary accent-primary"
                defaultChecked
              />
              <div className="flex-1">
                <h3 className="font-semibold">Escuchar frecuencia diaria</h3>
                <p className="text-xs text-muted-foreground">Completa al menos una frecuencia</p>
              </div>
              <span className="text-xs text-accent font-medium">+10 puntos</span>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-primary accent-primary"
              />
              <div className="flex-1">
                <h3 className="font-semibold">Leer guía del día</h3>
                <p className="text-xs text-muted-foreground">Aprende técnicas nuevas</p>
              </div>
              <span className="text-xs text-accent font-medium">+5 puntos</span>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-primary accent-primary"
              />
              <div className="flex-1">
                <h3 className="font-semibold">Visualización guiada</h3>
                <p className="text-xs text-muted-foreground">5 minutos de meditación</p>
              </div>
              <span className="text-xs text-accent font-medium">+5 puntos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <GuideMaster />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate("/guides")}
          className="glass-card rounded-xl p-4 hover-scale text-left"
        >
          <BookOpen size={32} className="text-accent mb-2" />
          <h3 className="font-semibold mb-1">Guías Diarias</h3>
          <p className="text-xs text-muted-foreground">Lee tu guía de hoy</p>
        </button>
        
        <button
          onClick={() => navigate("/bonus")}
          className="glass-card rounded-xl p-4 hover-scale text-left"
        >
          <Sparkles size={32} className="text-primary mb-2" />
          <h3 className="font-semibold mb-1">Bonos</h3>
          <p className="text-xs text-muted-foreground">Accede a materiales extra</p>
        </button>
      </div>
    </div>
  );
};

export default Home;
