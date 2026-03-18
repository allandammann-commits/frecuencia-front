import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Analyzing = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const steps = [
    "Analizando tus respuestas...",
    "Verificando conexión límbica...",
    "Calculando probabilidad de reencuentro...",
    "Preparando tu diagnóstico personalizado..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(timer);
        // Garante que o onComplete seja chamado
        const finalTimeout = setTimeout(() => {
          onComplete();
        }, 1000);
        return prev;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [onComplete, steps.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
      <div className="relative w-24 h-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-full h-full rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 animate-pulse" />
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl font-medium text-white text-center"
        >
          {steps[step]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
