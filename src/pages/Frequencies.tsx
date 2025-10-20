import { useRef, useState, useEffect } from "react";
import { Play, Pause, Lock, Volume2, Info, Headphones, Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { frequencies } from "@/data/frequencies";
import { recordProgress } from "@/lib/progress";
import { updateProgressOnEntry } from "@/lib/userProgress";
import { toast } from "sonner";

const Frequencies = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [volume, setVolume] = useState([70]);
  const [selectedFrequency, setSelectedFrequency] = useState<typeof frequencies[0] | null>(null);
  const [playerFrequency, setPlayerFrequency] = useState<typeof frequencies[0] | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const { currentDay, error } = await updateProgressOnEntry();
        if (error) {
          console.warn("[Frequencies] updateProgressOnEntry error:", error);
        }
        setCurrentDay(currentDay || 1);
      } catch (e: any) {
        console.warn("[Frequencies] erro ao obter progresso:", e);
      }
    })();
  }, []);

  const openPlayer = (freq: typeof frequencies[0]) => {
    setPlayerFrequency(freq);
    setPlayingId(freq.id);
  };

  const isUnlocked = (unlockDay: number) => currentDay >= unlockDay;

  const handleAudioEnded = async () => {
    try {
      if (!playerFrequency) return;
      await recordProgress({
        frequencyId: playerFrequency.id,
        status: 'COMPLETED',
        durationSeconds: Math.round(audioRef.current?.duration || 0),
        volume: volume[0]
      });
      await updateProgressOnEntry();
      toast.success("Sessão concluída! Progreso atualizado.");
    } catch (e: any) {
      toast.error(e?.message || "Falha ao registrar conclusão");
    }
  };

  const handleCompleteTask = async () => {
    try {
      if (!playerFrequency) {
        toast.error("Abra uma frequência para confirmar a tarefa");
        return;
      }
      await recordProgress({
        frequencyId: playerFrequency.id,
        status: 'COMPLETED',
        durationSeconds: Math.round(audioRef.current?.currentTime || audioRef.current?.duration || 0),
        volume: volume[0]
      });
      await updateProgressOnEntry();
      toast.success("Tarefa do dia confirmada! Conteúdo do próximo dia será liberado automaticamente.");
      setConfirmOpen(false);
    } catch (e: any) {
      toast.error(e?.message || "Não foi possível confirmar a tarefa");
    }
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold gradient-text mb-2">
          Frecuencias de Audio
        </h1>
        <p className="text-muted-foreground">
          Escucha con audífonos para mejores resultados
        </p>
      </header>

      {/* Frequencies List */}
      <div className="space-y-4">
        {frequencies.map((freq, index) => {
          const unlocked = isUnlocked(freq.unlockDay);
          
          return (
            <div
              key={freq.id}
              className={`glass-card rounded-2xl p-5 transition-all duration-300 ${
                unlocked ? "hover-scale" : "opacity-60"
              } ${playingId === freq.id ? "glow-effect" : ""}`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                borderColor: unlocked ? freq.accentColor : undefined,
              }}
            >
              <div className="flex items-start gap-4">
                {/* Play Button */}
                <button
                  onClick={() => unlocked && openPlayer(freq)}
                  disabled={!unlocked}
                  className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    unlocked
                      ? "hover:scale-110"
                      : "glass-card"
                  }`}
                  style={{
                    background: unlocked 
                      ? `linear-gradient(135deg, ${freq.accentColor}, ${freq.accentColor})`
                      : undefined
                  }}
                >
                  {!unlocked ? (
                    <Lock size={24} className="text-muted-foreground" />
                  ) : playingId === freq.id ? (
                    <Pause size={24} className="text-white" />
                  ) : (
                    <Play size={24} className="text-white ml-1" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-lg mb-1 flex items-center gap-2">
                        {freq.title}
                        <button
                          onClick={() => unlocked && setSelectedFrequency(freq)}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Info size={18} />
                        </button>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {freq.shortDescription}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 ml-2">
                      {!unlocked && (
                        <span className="px-2 py-1 rounded-full glass-card text-xs text-muted-foreground whitespace-nowrap">
                          Día {freq.unlockDay}
                        </span>
                      )}
                      {freq.isPremium && (
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                          style={{
                            backgroundColor: `${freq.accentColor}20`,
                            color: freq.accentColorHex
                          }}
                        >
                          Premium
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${freq.accentColor}20`,
                        color: freq.accentColorHex
                      }}
                    >
                      {freq.specifications}
                    </span>
                    <span className="text-muted-foreground">{freq.duration}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar (when playing) */}
              {playingId === freq.id && (
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full w-1/3 animate-pulse"
                      style={{
                        background: `linear-gradient(90deg, ${freq.accentColor}, ${freq.accentColorHex})`
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>2:34</span>
                    <span>{freq.duration}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="mt-6 glass-card rounded-2xl p-5">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <span className="text-accent">💡</span>
          Consejo
        </h3>
        <p className="text-sm text-muted-foreground">
          Escucha cada frecuencia al menos una vez al día. Para resultados óptimos, 
          encuentra un lugar tranquilo y usa audífonos de calidad.
        </p>
      </div>

      {/* Frequency Details Dialog */}
      <Dialog open={!!selectedFrequency} onOpenChange={() => setSelectedFrequency(null)}>
        <DialogContent className="glass-card border-primary/30 max-w-md">
          {selectedFrequency && (
            <>
              <DialogHeader>
                <DialogTitle 
                  className="font-display text-2xl"
                  style={{ color: selectedFrequency.accentColorHex }}
                >
                  {selectedFrequency.title}
                </DialogTitle>
                <DialogDescription className="text-base text-foreground/90 mt-4">
                  {selectedFrequency.longDescription}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="font-semibold mb-1 text-sm text-muted-foreground">
                    Especificaciones
                  </h4>
                  <p className="text-sm">{selectedFrequency.specifications}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1 text-sm text-muted-foreground">
                    Ideal para
                  </h4>
                  <p className="text-sm">{selectedFrequency.idealFor}</p>
                </div>

                <div 
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: `${selectedFrequency.accentColor}10`,
                    borderLeft: `3px solid ${selectedFrequency.accentColorHex}`
                  }}
                >
                  <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                    <span>✨</span>
                    Consejo de uso
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedFrequency.usageTip}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Player Sheet */}
      <Sheet open={!!playerFrequency} onOpenChange={(open) => { if (!open) { setPlayerFrequency(null); setPlayingId(null); } }}>
        <SheetContent side="bottom" className="glass-card border-primary/30 max-w-[900px] mx-auto">
          {playerFrequency && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display text-xl flex items-center gap-2" style={{ color: playerFrequency.accentColorHex }}>
                  {playerFrequency.title}
                </SheetTitle>
                <SheetDescription className="text-sm">
                  {playerFrequency.shortDescription}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-4 space-y-4">
                {/* Audio Player */}
                <div className="rounded-xl p-4 border" style={{ borderColor: `${playerFrequency.accentColorHex}40` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Headphones size={20} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Usa audífonos para una experiencia óptima</span>
                  </div>
                  <audio
                    ref={audioRef}
                    controls
                    src={playerFrequency.audioSrc || ""}
                    className="w-full"
                    onPlay={() => recordProgress({
                      frequencyId: playerFrequency.id,
                      status: 'STARTED',
                      volume: volume[0]
                    })}
                    onEnded={handleAudioEnded}
                  />
                  {!playerFrequency.audioSrc && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      El audio será cargado para esta frecuencia más adelante.
                    </p>
                  )}

                  {/* Volume */}
                  <div className="flex items-center gap-3 mt-4">
                    <Volume2 size={18} className="text-primary" />
                    <Slider
                      value={volume}
                      onValueChange={(val) => {
                        setVolume(val);
                        if (audioRef.current) {
                          audioRef.current.volume = (val[0] || 0) / 100;
                        }
                      }}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground w-10 text-right">
                      {volume[0]}%
                    </span>
                  </div>
                </div>

                {/* Instructions */}
                <div className="rounded-xl p-4" style={{ backgroundColor: `${playerFrequency.accentColor}10`, borderLeft: `3px solid ${playerFrequency.accentColorHex}` }}>
                  <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                    <Clock size={16} />
                    Cómo escuchar
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Busca un lugar tranquilo y sin interrupciones.</li>
                    <li>Usa audífonos de buena calidad y ajusta el volumen cómodo.</li>
                    <li>Cierra los ojos y respira profundo durante los primeros 30 segundos.</li>
                    <li>Visualiza la intención de esta frecuencia con emociones positivas.</li>
                    <li>Si puedes, escucha al menos una vez al día.</li>
                  </ul>
                  <p className="text-sm mt-3">Consejo: {playerFrequency.usageTip}</p>
                </div>

                {/* Complete Task Action */}
                <div className="rounded-xl p-4 glass-card">
                  <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full">Tarefa completa</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar tarefa do dia</AlertDialogTitle>
                        <AlertDialogDescription>
                          Confirme que você concluiu sua sessão de hoje. Vamos registrar seu progresso e manter o desbloqueio diário.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCompleteTask}>Confirmar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Frequencies;
