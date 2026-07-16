import { useParams, useSearchParams } from "react-router-dom";
import { DEFAULT_CHECKOUT_PRODUCT_ID } from "@/config/checkout";
import { EmbeddedCheckout } from "@/components/EmbeddedCheckout";

export const CheckoutPage = () => {
  const { productId: routeProductId } = useParams();
  const [searchParams] = useSearchParams();
  const productId = routeProductId || searchParams.get("productId") || DEFAULT_CHECKOUT_PRODUCT_ID;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8FB] via-[#FAF7FC] to-[#F3EDFA] text-[#2D1B4E]">
      <div className="mx-auto max-w-lg px-4 py-8 sm:py-12">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B6BB8]">
            Checkout seguro
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold leading-tight">Completa tu compra</h1>
        </div>

        <div className="rounded-3xl border border-[#E8DFF5] bg-white/95 p-5 sm:p-7 shadow-[0_18px_50px_-28px_rgba(139,92,184,0.45)]">
          <EmbeddedCheckout productId={productId} plan="premium" variant="premium" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
