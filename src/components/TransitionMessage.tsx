import React from "react";

export const TransitionMessage = () => {
  return (
    <div className="text-center py-12 px-4 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight uppercase tracking-tighter">
        Tengo un mensaje personal para ti…
      </h2>
      <p className="text-lg text-muted-foreground">
        Basándome en tus respuestas, detecté algo importante sobre tu conexión límbica con él.
      </p>
      <p className="italic text-primary font-bold animate-pulse uppercase tracking-widest">
        Mira este vídeo antes de que tu ventana de resincronización se cierre.
      </p>
    </div>
  );
};
