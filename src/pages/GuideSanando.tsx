import { useNavigate } from "react-router-dom";

const GuideSanando = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pb-24 px-4 pt-6 flex flex-col">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold gradient-text mb-1">Sanando Heridas del Pasado</h1>
          <p className="text-muted-foreground">Descarga directa del eBook</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white transition-colors"
        >
          Volver
        </button>
      </header>

      <div className="glass-card rounded-2xl p-6 overflow-hidden">
        <p className="text-muted-foreground mb-4">
          Haz clic en el botón para descargar el eBook "Sanando Heridas del Pasado".
        </p>
        <a
          href="https://drive.google.com/file/d/1n1lKt4G-YGDo8K1gwQkrqh_4sW0Q1sBe/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-full text-white font-semibold hover-scale"
        >
          Descargar eBook
        </a>
      </div>
    </div>
  );
};

export default GuideSanando;