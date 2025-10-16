import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";

// CTA fixo que aparece após ~3min20s para levar aos planos
export const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 200 * 1000); // ~3min20s

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] sm:w-auto">
      <div className="glassmorphism shadow-card border border-primary/20 rounded-full px-3 py-3 sm:px-4 sm:py-3 flex items-center gap-3 sm:gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <span className="text-xs sm:text-sm text-foreground font-semibold px-2 hidden sm:inline">
          ¿List@ para elegir tu plan?
        </span>
        <Button
          variant="hero"
          className="text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3"
          onClick={scrollToPricing}
        >
          ELIGE TU PLAN
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
        <button
          aria-label="Cerrar"
          className="ml-1 sm:ml-2 p-2 rounded-full hover:bg-muted/20"
          onClick={() => setVisible(false)}
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default StickyCTA;