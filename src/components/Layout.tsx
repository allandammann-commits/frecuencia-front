import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const hideNavOn = ["/"];

  const showNav = !hideNavOn.includes(location.pathname);

  return (
    <div className="min-h-screen relative">
      {/* Top ambient gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent blur-2xl" />
      {/* Bottom ambient gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-accent/10 to-transparent blur-2xl" />

      <main className="w-full max-w-2xl mx-auto">
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
};

export default Layout;
