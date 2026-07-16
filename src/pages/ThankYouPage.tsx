import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { isCheckoutConfigured } from "@/config/checkout";
import { formatMoney, getOrderStatus, type OrderStatusResponse } from "@/lib/checkout3b";

export const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const paymentIntent =
    searchParams.get("payment_intent") ||
    searchParams.get("session_id") ||
    searchParams.get("payment_intent_id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderStatusResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const load = async (attempt = 0) => {
      if (!paymentIntent) {
        setError("No encontramos el ID del pago en la URL.");
        setLoading(false);
        return;
      }
      if (!isCheckoutConfigured) {
        setError("Checkout no configurado (VITE_3B_API_KEY).");
        setLoading(false);
        return;
      }

      try {
        const data = await getOrderStatus(paymentIntent);
        if (cancelled) return;
        setOrder(data);

        if (data.status !== "paid" && attempt < 8) {
          timer = window.setTimeout(() => void load(attempt + 1), 1500);
          return;
        }
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        if (attempt < 6) {
          timer = window.setTimeout(() => void load(attempt + 1), 1500);
          return;
        }
        setError(err instanceof Error ? err.message : "No se pudo consultar el pedido.");
        setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [paymentIntent]);

  const paid = order?.status === "paid";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8FB] via-[#FAF7FC] to-[#F3EDFA] text-[#2D1B4E]">
      <div className="mx-auto max-w-lg px-4 py-12 sm:py-16">
        <div className="rounded-3xl border border-[#E8DFF5] bg-white/95 p-6 sm:p-8 shadow-[0_18px_50px_-28px_rgba(139,92,184,0.45)] text-center">
          {loading && (
            <div className="py-10 flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#8B5CB8]" />
              <p className="text-sm text-[#6B6B8A]">Confirmando tu pago…</p>
            </div>
          )}

          {!loading && error && (
            <>
              <p className="text-sm text-red-600">{error}</p>
              <Link to="/" className="mt-6 inline-block text-sm font-semibold text-[#8B5CB8]">
                Volver al inicio
              </Link>
            </>
          )}

          {!loading && !error && order && (
            <>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-violet-100">
                <CheckCircle2 className={`h-8 w-8 ${paid ? "text-emerald-500" : "text-[#8B5CB8]"}`} />
              </div>
              <h1 className="mt-4 text-2xl font-bold">
                {paid ? "¡Pago confirmado!" : `Estado: ${order.status}`}
              </h1>
              {order.productName && (
                <p className="mt-2 text-sm text-[#6B6B8A]">{order.productName}</p>
              )}
              {order.orderId && (
                <p className="mt-1 text-xs text-[#9B8FAE]">Pedido: {order.orderId}</p>
              )}

              {paid && order.deliveryUrl && (
                <a
                  href={order.deliveryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold py-3.5"
                >
                  Acceder a tu producto
                </a>
              )}

              {paid && order.canUpsell && order.upsellProduct && (
                <div className="mt-8 rounded-2xl border border-[#E8DFF5] bg-[#FDFAFF] p-4 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#9B6BB8]">
                    Oferta especial
                  </p>
                  <h2 className="mt-1 font-bold text-lg">{order.upsellProduct.name}</h2>
                  {order.upsellProduct.description && (
                    <p className="mt-1 text-sm text-[#6B6B8A]">{order.upsellProduct.description}</p>
                  )}
                  <p className="mt-2 font-extrabold text-[#8B5CB8]">
                    {formatMoney(order.upsellProduct.priceCents, order.upsellProduct.currency)}
                  </p>
                  <Link
                    to={`/checkout/${order.upsellProduct.id}`}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-[#D9C8F0] bg-white py-3 text-sm font-bold text-[#2D1B4E] hover:bg-[#F8F4FC]"
                  >
                    Quiero esta oferta
                  </Link>
                </div>
              )}

              <Link to="/" className="mt-6 inline-block text-sm font-semibold text-[#8B5CB8]">
                Volver al inicio
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
