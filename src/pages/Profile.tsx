import { User, Mail, Bell, Lock, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signOut } from "@/lib/auth";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Error al cerrar sesión");
      return;
    }
    toast.success("Sesión cerrada correctamente");
    navigate("/");
  };

  const menuItems = [
    {
      icon: User,
      title: "Editar Perfil",
      description: "Actualiza tu información personal",
      action: () => toast.info("Función próximamente"),
    },
    {
      icon: Bell,
      title: "Notificaciones",
      description: "Configura tus recordatorios",
      action: () => toast.info("Función próximamente"),
    },
    {
      icon: Lock,
      title: "Privacidad y Seguridad",
      description: "Administra tu cuenta",
      action: () => toast.info("Función próximamente"),
    },
    {
      icon: HelpCircle,
      title: "Ayuda y Soporte",
      description: "¿Necesitas ayuda?",
      action: () => toast.info("Función próximamente"),
    },
  ];

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold gradient-text mb-2">
          Mi Perfil
        </h1>
      </header>

      {/* Profile Card */}
      <div className="glass-card rounded-2xl p-6 mb-6 text-center animate-slide-up">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
          <User size={48} className="text-white" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-1">María González</h2>
        <p className="text-muted-foreground flex items-center justify-center gap-2">
          <Mail size={16} />
          maria@email.com
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-light text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
          Plan Premium Activo
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold gradient-text mb-1">3</div>
          <p className="text-xs text-muted-foreground">Días activos</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold gradient-text mb-1">3</div>
          <p className="text-xs text-muted-foreground">Frecuencias</p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold gradient-text mb-1">8</div>
          <p className="text-xs text-muted-foreground">Tareas</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-3 mb-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.action}
              className="w-full glass-card rounded-xl p-4 hover-scale text-left flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-0.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
          );
        })}
      </div>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full h-12 glass-card border-destructive/50 text-destructive hover:bg-destructive/10"
      >
        <LogOut size={20} className="mr-2" />
        Cerrar Sesión
      </Button>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-muted-foreground space-y-2">
        <p>Versión 1.0.0</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-primary transition-colors">
            Términos de Servicio
          </a>
          <span>•</span>
          <a href="#" className="hover:text-primary transition-colors">
            Privacidad
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
