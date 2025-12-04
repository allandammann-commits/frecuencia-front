import { ReactNode } from "react";
import { Mail, MessageCircle } from "lucide-react";
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
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-white">
        <div className="mx-auto max-w-2xl px-2 py-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span className="text-[10px] sm:text-[11px] leading-tight text-center sm:text-left">dudas ou reclames? Clic abajo en la opción y contactanos.</span>
          <div className="flex items-center gap-1">
            <a
              href="mailto:correofdr@outlook.com?subject=Soporte&body=dudas%20ou%20reclames%3F%20Clic%20abajo%20en%20la%20opci%C3%B3n%20y%20contactanos."
              className="inline-flex items-center gap-1 rounded-md bg-white/10 hover:bg-white/20 px-2 py-1 text-[11px] leading-tight"
              aria-label="Enviar correo a correofdr@outlook.com"
            >
              <Mail className="h-3 w-3" />
              <span>Correo: correofdr@outlook.com</span>
            </a>
            <a
              href="https://wa.me/5511961093355?text=dudas%20ou%20reclames%3F%20Clic%20abajo%20en%20la%20opci%C3%B3n%20y%20contactanos."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-white/10 hover:bg-white/20 px-2 py-1 text-[11px] leading-tight"
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle className="h-3 w-3" />
              <span>WhatsApp: 5511961093355</span>
            </a>
          </div>
        </div>
      </div>
      {/* Bottom ambient gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-accent/10 to-transparent blur-2xl" />

      <main className="w-full max-w-2xl mx-auto pt-16 sm:pt-14">
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
};

export default Layout;
