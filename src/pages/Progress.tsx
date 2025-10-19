import { TrendingUp, Calendar, Headphones, BookOpen, Flame } from "lucide-react";
import { Progress as ProgressBar } from "@/components/ui/progress";

const Progress = () => {
  const stats = {
    currentDay: 3,
    totalDays: 30,
    listenedAudios: 3,
    readGuides: 2,
    streak: 3,
    completedTasks: 8,
  };

  const weeklyProgress = [
    { day: "L", completed: true },
    { day: "M", completed: true },
    { day: "M", completed: true },
    { day: "J", completed: false },
    { day: "V", completed: false },
    { day: "S", completed: false },
    { day: "D", completed: false },
  ];

  const achievements = [
    {
      id: 1,
      title: "Primera Sesión",
      description: "Completaste tu primera frecuencia",
      icon: "🎯",
      unlocked: true,
    },
    {
      id: 2,
      title: "Constancia",
      description: "3 días seguidos de práctica",
      icon: "🔥",
      unlocked: true,
    },
    {
      id: 3,
      title: "Lectora Dedicada",
      description: "Lee 5 guías completas",
      icon: "📚",
      unlocked: false,
    },
    {
      id: 4,
      title: "Semana Completa",
      description: "Completa 7 días consecutivos",
      icon: "⭐",
      unlocked: false,
    },
  ];

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold gradient-text mb-2">
          Tu Progreso
        </h1>
        <p className="text-muted-foreground">
          Sigue tu transformación día a día
        </p>
      </header>

      {/* Main Progress Card */}
      <div className="glass-card rounded-2xl p-6 mb-6 bg-gradient-to-br from-primary/20 to-accent/10 border-primary/40 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-2xl font-bold mb-1">
              Día {stats.currentDay} de {stats.totalDays}
            </h2>
            <p className="text-muted-foreground">Tu viaje de transformación</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold gradient-text">
              {Math.round((stats.currentDay / stats.totalDays) * 100)}%
            </div>
          </div>
        </div>
        
        <ProgressBar 
          value={(stats.currentDay / stats.totalDays) * 100} 
          className="h-3"
        />
      </div>

      {/* Weekly Progress */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-primary" />
          Esta Semana
        </h3>
        <div className="flex justify-between gap-2">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                day.completed
                  ? "bg-gradient-to-br from-primary to-accent text-white animate-scale-in"
                  : "glass-card text-muted-foreground"
              }`}>
                {day.day}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Headphones size={20} className="text-primary" />
            </div>
            <div className="text-3xl font-bold">{stats.listenedAudios}</div>
          </div>
          <p className="text-sm text-muted-foreground">Frecuencias escuchadas</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <BookOpen size={20} className="text-accent" />
            </div>
            <div className="text-3xl font-bold">{stats.readGuides}</div>
          </div>
          <p className="text-sm text-muted-foreground">Guías leídas</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Flame size={20} className="text-white" />
            </div>
            <div>
              <div className="text-3xl font-bold">{stats.streak}</div>
              <p className="text-sm text-muted-foreground">Días seguidos</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <TrendingUp size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-3xl font-bold">{stats.completedTasks}</div>
              <p className="text-sm text-muted-foreground">Tareas completadas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-primary" />
          Logros Desbloqueados
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`glass-card rounded-xl p-4 text-center transition-all ${
                achievement.unlocked 
                  ? "hover-scale cursor-pointer" 
                  : "opacity-50"
              }`}
            >
              <div className={`text-4xl mb-2 ${
                achievement.unlocked ? "animate-scale-in" : "grayscale"
              }`}>
                {achievement.icon}
              </div>
              <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
              <p className="text-xs text-muted-foreground">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Motivation Card */}
      <div className="glass-card rounded-2xl p-5 bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
        <h3 className="font-semibold mb-2 text-accent flex items-center gap-2">
          <span>💪</span>
          Motivación
        </h3>
        <p className="text-sm text-muted-foreground">
          ¡Vas por excelente camino! La constancia es la clave del éxito durante estos 30 días. 
          Cada frecuencia que escuchas y cada tarea que completas te acerca más a tu reencuentro.
        </p>
      </div>
    </div>
  );
};

export default Progress;
