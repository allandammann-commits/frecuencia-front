import { BookOpen, Lock, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Guides = () => {
  const navigate = useNavigate();
  const guides = [
    {
      id: 1,
      day: 1,
      title: "Reconociendo Tu Valor",
      description: "Aprende a valorarte y reconocer tu poder interior antes de reconquistar",
      duration: "5 min lectura",
      unlocked: true,
      completed: false,
      path: "/guides/reconociendo-valor",
    },
    {
      id: 3,
      day: 3,
      title: "Sanando Heridas del Pasado",
      description: "Técnicas para liberar dolor emocional y empezar de nuevo",
      duration: "8 min lectura",
      unlocked: true,
      completed: false,
      path: "/guides/sanando-heridas",
    },
    {
      id: 4,
      day: 4,
      title: "Conexión Energética",
      description: "Cómo crear y mantener un vínculo energético con tu persona amada",
      duration: "6 min lectura",
      unlocked: true,
      completed: false,
      path: "/guides/conexion-energetica",
    },
    {
      id: 5,
      day: 5,
      title: "Manifestación Consciente",
      description: "Técnicas avanzadas de visualización para el reencuentro",
      duration: "10 min lectura",
      unlocked: true,
      completed: false,
      path: "/guides/manifestacion-consciente",
    },
  ];

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold gradient-text mb-2">
          Guías Diarias
        </h1>
        <p className="text-muted-foreground">
          Conocimiento para potenciar tu transformación
        </p>
      </header>

      {/* Current Guide Highlight */}
      <div className="glass-card rounded-2xl p-6 mb-6 bg-gradient-to-br from-primary/20 to-accent/10 border-primary/40 animate-slide-up">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
            <BookOpen size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-primary-light font-medium mb-1">GUÍA DE HOY</div>
            <h2 className="font-display text-xl font-bold mb-2">
              Sanando Heridas del Pasado
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Aprende técnicas poderosas para liberar el dolor emocional y prepararte para un nuevo comienzo.
            </p>
            <button onClick={() => window.location.href = '/guides/sanando-heridas'} className="px-6 py-2 bg-gradient-to-r from-primary to-accent rounded-full text-white font-semibold hover-scale">
              Leer Ahora
            </button>
          </div>
        </div>
      </div>

      {/* All Guides */}
      <div className="space-y-3">
        {guides.map((guide, index) => (
          <div
            key={guide.id}
            className={`glass-card rounded-xl p-4 transition-all duration-300 ${
              guide.unlocked ? "hover-scale cursor-pointer" : "opacity-60"
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => guide.unlocked && guide.path && navigate(guide.path)}
          >
            <div className="flex items-center gap-4">
              {/* Day Badge */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${
                guide.completed
                  ? "bg-accent/20 text-accent"
                  : guide.unlocked
                  ? "bg-primary/20 text-primary"
                  : "glass-card text-muted-foreground"
              }`}>
                {guide.completed ? (
                  <CheckCircle2 size={24} />
                ) : guide.unlocked ? (
                  `D${guide.day}`
                ) : (
                  <Lock size={20} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  {guide.title}
                  {guide.completed && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                      Completada
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {guide.description}
                </p>
              <div className="text-xs text-muted-foreground">
                {guide.duration}
              </div>
              {guide.unlocked && guide.path && (
                <div className="mt-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(guide.path); }}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-full text-white font-semibold text-xs hover-scale"
                  >
                    Leer Ahora
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      </div>

      {/* Tips Card */}
      <div className="mt-6 glass-card rounded-2xl p-5 bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
        <h3 className="font-semibold mb-2 text-accent flex items-center gap-2">
          <span>✨</span>
          Consejo de Experta
        </h3>
        <p className="text-sm text-muted-foreground">
          Lee cada guía con calma y toma notas de lo que más resuena contigo. 
          La comprensión profunda es clave para la transformación.
        </p>
      </div>
    </div>
  );
};

export default Guides;
