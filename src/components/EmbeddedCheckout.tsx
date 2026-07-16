import { FormEvent, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { loadStripe, type Stripe, type StripeElements } from "@stripe/stripe-js";
import { Lock, ShieldCheck } from "lucide-react";
import { CHECKOUT_API_KEY, isCheckoutConfigured } from "@/config/checkout";
import {
  createPaymentIntent,
  formatMoney,
  getCheckoutConfig,
  type CheckoutConfig,
} from "@/lib/checkout3b";
import { trackFunnelEvent } from "@/lib/funnelTracking";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type EmbeddedCheckoutProps = {
  productId: string;
  plan?: "premium" | "basic";
  enabled?: boolean;
  payButtonLabel?: string;
  variant?: "premium" | "basic";
  className?: string;
};

export const EmbeddedCheckout = ({
  productId,
  plan = "premium",
  enabled = true,
  payButtonLabel,
  variant = "premium",
  className = "",
}: EmbeddedCheckoutProps) => {
  const reactId = useId().replace(/:/g, "");
  const expressId = `express-checkout-${reactId}`;
  const paymentId = `payment-element-${reactId}`;
  const emailInputId = `buyer-email-${reactId}`;

  const [config, setConfig] = useState<CheckoutConfig | null>(null);
  const [email, setEmail] = useState("");
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [elementsReady, setElementsReady] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stripeRef = useRef<Stripe | null>(null);
  const elementsRef = useRef<StripeElements | null>(null);
  const emailRef = useRef("");
  const configRef = useRef<CheckoutConfig | null>(null);
  const payingRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    emailRef.current = email;
  }, [email]);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const priceLabel = useMemo(() => {
    if (!config) return "";
    return formatMoney(config.product.priceCents, config.product.currency);
  }, [config]);

  const handlePay = useCallback(async (e?: FormEvent) => {
    e?.preventDefault();
    if (payingRef.current) return;

    const stripe = stripeRef.current;
    const elements = elementsRef.current;
    const currentConfig = configRef.current;

    if (!stripe || !elements || !currentConfig) {
      setError("Checkout aún está cargando. Espera unos segundos.");
      return;
    }

    const buyerEmail = emailRef.current.trim().toLowerCase();
    if (!EMAIL_RE.test(buyerEmail)) {
      setError("Ingresa un email válido para continuar.");
      return;
    }

    payingRef.current = true;
    setPaying(true);
    setError(null);
    trackFunnelEvent({ eventType: "checkout_click", metadata: { plan } });

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message || "Revisa los datos de pago.");
      }

      const intent = await createPaymentIntent({
        productId: currentConfig.product.id,
        buyerEmail,
        quantity: 1,
      });

      const returnUrl = `${window.location.origin}/obrigado?payment_intent=${encodeURIComponent(intent.paymentIntentId)}`;

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret: intent.clientSecret,
        confirmParams: {
          return_url: returnUrl,
          payment_method_data: {
            billing_details: { email: buyerEmail },
          },
        },
      });

      if (confirmError) {
        throw new Error(confirmError.message || "No se pudo confirmar el pago.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar el pago.");
      payingRef.current = false;
      setPaying(false);
    }
  }, [plan]);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    mountedRef.current = false;
    setElementsReady(false);
    setConfig(null);
    setLoadingConfig(true);
    setError(null);
    elementsRef.current = null;
    stripeRef.current = null;

    const boot = async () => {
      try {
        if (!isCheckoutConfigured) {
          throw new Error("Checkout no configurado (VITE_3B_API_KEY).");
        }

        const cfg = await getCheckoutConfig(productId);
        if (cancelled) return;

        const stripe = await loadStripe(cfg.publishableKey);
        if (!stripe) throw new Error("No se pudo cargar Stripe.");
        if (cancelled) return;

        const elements = stripe.elements({
          mode: "payment",
          amount: cfg.product.priceCents,
          currency: cfg.product.currency.toLowerCase(),
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#9B59B6",
              colorBackground: "#ffffff",
              colorText: "#2D1B4E",
              borderRadius: "12px",
              fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
            },
          },
        });

        stripeRef.current = stripe;
        elementsRef.current = elements;
        configRef.current = cfg;
        setConfig(cfg);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Fallo al cargar el checkout.");
        }
      } finally {
        if (!cancelled) setLoadingConfig(false);
      }
    };

    void boot();
    return () => {
      cancelled = true;
    };
  }, [productId, enabled]);

  useEffect(() => {
    if (!enabled || loadingConfig || !config || !elementsRef.current || mountedRef.current) return;

    const elements = elementsRef.current;
    try {
      try {
        const express = elements.create("expressCheckout");
        express.mount(`#${expressId}`);
        express.on("confirm", () => {
          void handlePay();
        });
      } catch {
        // Wallets podem não estar disponíveis no localhost.
      }

      const payment = elements.create("payment", {
        terms: { card: "never" },
        fields: { billingDetails: { email: "never" } },
      });
      payment.mount(`#${paymentId}`);
      mountedRef.current = true;
      setElementsReady(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo montar el formulario de pago.");
    }
  }, [enabled, loadingConfig, config, handlePay, expressId, paymentId]);

  const submitLabel =
    payButtonLabel || (priceLabel ? `Pagar ${priceLabel}` : "Pagar ahora");

  const buttonClass =
    variant === "premium"
      ? "w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 disabled:opacity-60 text-white font-bold py-3.5 shadow-[0_16px_40px_-18px_rgba(139,92,246,0.7)] transition"
      : "w-full rounded-2xl bg-gray-600 hover:bg-gray-700 disabled:opacity-60 text-white font-bold py-3.5 transition";

  if (!enabled) return null;

  return (
    <div className={className}>
      {!CHECKOUT_API_KEY && (
        <div className="mb-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Falta <code>VITE_3B_API_KEY</code> en el entorno.
        </div>
      )}

      {loadingConfig && (
        <div className="py-8 text-center text-sm text-[#6B6B8A]">Cargando checkout seguro…</div>
      )}

      {!loadingConfig && config && (
        <form className="space-y-3" onSubmit={(e) => void handlePay(e)}>
          <div>
            <label htmlFor={emailInputId} className="block text-sm font-semibold mb-1.5">
              Tu email
            </label>
            <input
              id={emailInputId}
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="tunombre@email.com"
              className="w-full rounded-xl border border-[#E0D4F0] bg-white px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#C9A0DC]/60"
            />
          </div>

          <div id={expressId} className="min-h-[1px]" />

          <div>
            <p className="text-sm font-semibold mb-2">Pago con tarjeta</p>
            <div
              id={paymentId}
              className="rounded-xl border border-[#E0D4F0] bg-white px-3 py-3 min-h-[48px]"
            />
            {!elementsReady && (
              <p className="mt-2 text-xs text-[#9B8FAE]">Preparando formulario seguro…</p>
            )}
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={paying || loadingConfig || !elementsReady}
            className={buttonClass}
          >
            {paying ? "Procesando…" : submitLabel}
          </button>

          <div className="flex items-center justify-center gap-4 text-[11px] text-[#7A6F90]">
            <span className="inline-flex items-center gap-1">
              <Lock className="h-3.5 w-3.5" /> Pago cifrado
            </span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Stripe + 3B
            </span>
          </div>
        </form>
      )}

      {!loadingConfig && !config && error && (
        <p className="text-sm text-red-600 text-center py-4">{error}</p>
      )}
    </div>
  );
};

export default EmbeddedCheckout;
