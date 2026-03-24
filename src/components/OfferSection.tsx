import { useEffect, useState } from "react";
import { Check, CreditCard, Gift, Lock, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

type BenefitKind = "check" | "bonus" | "star";
type Benefit = { kind: BenefitKind; title: string; description: string };

const PREMIUM_BENEFITS: Benefit[] = [
  { kind: "check", title: "Frecuencia Límbica", description: "Audio principal para reactivar su conexión emocional contigo" },
  { kind: "check", title: "Frecuencia de la Reconciliación", description: "Para sanar heridas y resentimientos del pasado" },
  { kind: "check", title: "Guía Rápida de Activación", description: "Instrucciones paso a paso para potenciar la frecuencia" },
  { kind: "check", title: "Frecuencia de la Pasión Ardiente", description: "Para intensificar su deseo por ti" },
  { kind: "check", title: "Frecuencia Anti-Rival", description: "Para eliminar cualquier competencia emocional" },
  { kind: "check", title: "Frecuencia del Encantamiento", description: "Para que solo tenga ojos para ti" },
  { kind: "check", title: "Frecuencia de la Protección Amorosa", description: "Para blindar la relación contra futuras crisis" },
  { kind: "bonus", title: "BONUS 1", description: 'Guía "Cómo Hacer que Él Te Note en Instagram Sin Escribirle"' },
  { kind: "bonus", title: "BONUS 2", description: 'Guía "7 Frases que Hacen que Cualquier Hombre Suplique por Ti"' },
  { kind: "star", title: "Acceso DE POR VIDA", description: "al acceso exclusivo con soporte VIP" },
];

const ESSENTIAL_BENEFITS: Benefit[] = [
  { kind: "check", title: "Frecuencia Límbica", description: "Audio principal para reactivar su conexión emocional contigo" },
];

const BenefitItem = ({ benefit }: { benefit: Benefit }) => {
  const icon =
    benefit.kind === "bonus" ? (
      <Gift className="h-4 w-4 text-rose-500" />
    ) : benefit.kind === "star" ? (
      <Star className="h-4 w-4 text-violet-600" fill="currentColor" />
    ) : (
      <Check className="h-4 w-4 text-emerald-600" />
    );
  const bg =
    benefit.kind === "bonus" ? "bg-rose-50 border-rose-100" : benefit.kind === "star" ? "bg-violet-50 border-violet-100" : "bg-white/0 border-transparent";

  return (
    <li className={`flex gap-3 rounded-xl border px-3 py-2 ${bg}`}>
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <p className="min-w-0 text-[13px] text-[#2D1B4E] leading-snug">
        <span className="font-semibold">{benefit.title}</span>
        <span className="text-gray-600"> — {benefit.description}</span>
      </p>
    </li>
  );
};

const PriceBlock = ({ oldPrice, price, highlight, showOld }: { oldPrice?: string; price: string; highlight: boolean; showOld?: boolean }) => (
  <div className="text-center">
    <p className="text-xs text-gray-600">Todo esto por solo</p>
    {showOld && oldPrice ? <p className="mt-1 text-sm text-gray-500 line-through">{oldPrice}</p> : null}
    <p
      className={
        highlight
          ? "mt-1 text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent drop-shadow"
          : "mt-1 text-3xl sm:text-4xl font-bold text-gray-800"
      }
    >
      {price}
    </p>
    <p className="mt-2 text-xs text-gray-500">Este valor será convertido a tu moneda local.</p>
    <p className={highlight ? "mt-1 text-xs font-semibold text-pink-600" : "mt-1 text-xs text-gray-600"}>
      Un solo pago. Sin mensualidades. Acceso de por vida.
    </p>
  </div>
);

const PremiumCard = ({ mockupSrc, premiumHref }: { mockupSrc: string; premiumHref: string }) => (
  <div className="relative">
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
      <div className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs font-bold shadow-md">
        ⭐ EL MÁS ELEGIDO
      </div>
    </div>
    <div className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 shadow-[0_12px_40px_-18px_rgba(139,92,246,0.55)]">
      <div className="rounded-2xl bg-white p-6 sm:p-7">
        <div className="mx-auto max-w-[460px]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[24px] bg-violet-200/40 blur-2xl" />
            <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-2xl bg-transparent">
              <img
                src={mockupSrc}
                alt="Mockup Frecuencia Límbica"
                className="block h-full w-full object-contain scale-[1.07]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <h3 className="mt-6 text-2xl sm:text-3xl font-bold text-[#2D1B4E] text-center">Plan Premium</h3>
        <ul className="mt-5 space-y-2">{PREMIUM_BENEFITS.map((b, i) => <BenefitItem key={i} benefit={b} />)}</ul>
        <div className="mt-6">
          <PriceBlock price="$9,90" highlight={true} />
        </div>
        <div className="mt-6">
          <a href={premiumHref} target="_blank" rel="noopener noreferrer" className="block">
            <Button
              variant="hero"
              className="w-full py-6 text-sm font-bold bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 shadow-[0_16px_40px_-18px_rgba(139,92,246,0.8)] animate-pulse"
            >
              QUIERO EL PLAN PREMIUM ✨
            </Button>
          </a>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center gap-2 text-[12px] text-gray-600">
              <Lock className="h-4 w-4 text-gray-500" />
              <span>Pago 100% seguro</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <CreditCard className="h-4 w-4" />
              <span>Visa</span>
              <span>•</span>
              <span>Mastercard</span>
              <span>•</span>
              <span>Amex</span>
              <span>•</span>
              <span>PayPal</span>
            </div>
          </div>
          <div className="mt-6">
            <GuaranteeBlock />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const EssentialCard = ({ essentialHref }: { essentialHref: string }) => (
  <div className="rounded-2xl bg-[#F9F9F9] border border-gray-200 p-6 sm:p-7">
    <h3 className="text-xl font-bold text-gray-700 text-center">Plan Basico</h3>
    <ul className="mt-5 space-y-2">{ESSENTIAL_BENEFITS.map((b, i) => <BenefitItem key={i} benefit={b} />)}</ul>
    <div className="mt-6">
      <PriceBlock price="$6,90" highlight={false} />
    </div>
    <div className="mt-6">
      <a href={essentialHref} target="_blank" rel="noopener noreferrer" className="block">
        <Button variant="secondary" className="w-full py-6 text-sm font-bold bg-gray-600 hover:bg-gray-700 text-white">
          QUIERO EL PLAN BASICO
        </Button>
      </a>
      <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-gray-600">
        <Lock className="h-4 w-4 text-gray-500" />
        <span>Pago 100% seguro</span>
      </div>
    </div>
  </div>
);

const GuaranteeBlock = () => (
  <div className="w-full rounded-2xl border border-violet-200 bg-gradient-to-b from-white to-violet-50/50 p-5 sm:p-6">
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 mt-1">
        <ShieldCheck className="h-7 w-7 text-violet-500" />
      </div>
      <div className="min-w-0">
        <h3 className="text-lg font-bold text-[#2D1B4E]">🛡️ Garantía Total de 30 Días</h3>
        <p className="mt-1 font-semibold text-[#2D1B4E]">Tu reencuentro o tu dinero de vuelta.</p>
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          Si en 30 días no ves resultados, si no sientes cambios, o si por cualquier motivo no quedas satisfecha, te devuelvo el 100% de tu dinero. Sin preguntas. Sin burocracia. El riesgo es todo mío.
        </p>
        <p className="mt-3 text-xs italic text-gray-500">Escríbenos y procesamos tu reembolso en menos de 24 horas.</p>
      </div>
    </div>
  </div>
);

export const OfferSection = () => {
  const enabled = import.meta.env.VITE_OFFER_DELAY_ENABLED === "true";
  const delayMs = Number(import.meta.env.VITE_OFFER_DELAY_MS ?? "0");
  const [visible, setVisible] = useState(!enabled || !Number.isFinite(delayMs) || delayMs <= 0);

  useEffect(() => {
    if (!enabled) return;
    if (!Number.isFinite(delayMs) || delayMs <= 0) {
      setVisible(true);
      return;
    }
    const t = window.setTimeout(() => setVisible(true), delayMs);
    return () => window.clearTimeout(t);
  }, [delayMs, enabled]);

  const mockupSrc = "https://i.imgur.com/bx0STew.png";

  const premiumHref = "https://pay.hotmart.com/W99845697O?off=epltkvrf&checkoutMode=10";
  const essentialHref = "https://pay.hotmart.com/W99845697O?off=vr76jf4s&checkoutMode=10";

  if (!visible) return null;

  return (
    <section id="oferta" className="w-full px-4 py-10 sm:py-14 bg-gradient-to-b from-[#FDFAFF] to-[#F3EEFF] animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto animate-slide-up">
          <h2 className="mx-auto max-w-[40ch] text-lg sm:text-xl md:text-2xl font-bold text-[#2D1B4E] leading-tight">
            Ahora que entiendes por qué él se alejó… esto necesitas para traerlo de vuelta.
          </h2>
          <div className="mt-4 flex items-center justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-pink-400 to-violet-400" />
          </div>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-6 lg:gap-8 lg:grid-cols-[1.15fr_1fr] items-start">
          <div className="order-1">
            <PremiumCard mockupSrc={mockupSrc} premiumHref={premiumHref} />
          </div>
          <div className="order-2 lg:mt-4">
            <EssentialCard essentialHref={essentialHref} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
