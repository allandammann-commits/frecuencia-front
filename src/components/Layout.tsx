import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const hideNavOn = ["/", "/auth"]; // Oculta nav na Welcome e login

  const showNav = !hideNavOn.includes(location.pathname);

  return (
    <div className="min-h-screen relative">
      {/* Top ambient gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent blur-2xl" />
      {/* Fixed top banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-white text-center text-xs sm:text-sm py-2">
        USA LA APLICACIÓN DURANTE 7 DÍAS PARA GANAR UN REGALO DE HASTA 50 DÓLARES
      </div>
      {/* Bottom ambient gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-accent/10 to-transparent blur-2xl" />

      <main className="w-full max-w-2xl mx-auto pt-12">
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
};

export default Layout;
