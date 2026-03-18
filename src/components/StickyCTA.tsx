import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";

// CTA fixo que aparece após ~3min20s para levar aos planos
export const StickyCTA = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] sm:w-auto">
      <div className="bg-card/90 backdrop-blur-xl shadow-glow border border-primary/30 rounded-full px-4 py-3 flex items-center gap-4">
        <span className="text-xs sm:text-sm text-white font-black uppercase tracking-tighter hidden sm:inline italic">
          ¿Lista para reconquistarlo?
        </span>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm px-8 py-6 font-black uppercase tracking-widest rounded-full shadow-lg transition-all italic"
          onClick={scrollToPricing}
        >
          ELIGE TU PLAN
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
        <button
          aria-label="Cerrar"
          className="ml-1 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          onClick={() => setVisible(false)}
        >
          <X className="w-4 h-4 text-white/50" />
        </button>
      </div>
    </div>
  );
};

export default StickyCTA;