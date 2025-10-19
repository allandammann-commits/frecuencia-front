import { Home, Headphones, BookOpen, TrendingUp, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Inicio", path: "/home" },
    { icon: Headphones, label: "Audios", path: "/frequencies" },
    { icon: BookOpen, label: "Guías", path: "/guides" },
    { icon: TrendingUp, label: "Progreso", path: "/progress" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/20 bg-background/95 backdrop-blur-lg">
      <div className="flex items-center justify-around h-18 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "text-primary glow-effect" 
                  : "text-muted-foreground hover:text-primary-light"
              }`}
            >
              <Icon size={24} className={isActive ? "animate-scale-in" : ""} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
