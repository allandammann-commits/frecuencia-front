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
    <div className="min-h-screen">
      <main className="w-full max-w-2xl mx-auto">
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
};

export default Layout;
