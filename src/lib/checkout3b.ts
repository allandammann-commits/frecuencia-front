import { CHECKOUT_API_KEY, CHECKOUT_BASE_URL } from "@/config/checkout";

export type CheckoutProduct = {
  id: string;
  name: string;
  description?: string | null;
  priceCents: number;
  currency: string;
  imageUrl?: string | null;
  requiresShipping?: boolean;
};

export type CheckoutConfig = {
  store: { name: string };
  product: CheckoutProduct;
  publishableKey: string;
};

export type CreatePaymentIntentResponse = {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
};

export type UpsellProduct = {
  id: string;
  name: string;
  description?: string | null;
  priceCents: number;
  currency: string;
  imageUrl?: string | null;
};

export type OrderStatusResponse = {
  status: string;
  orderId?: string;
  deliveryUrl?: string | null;
  productName?: string;
  canUpsell?: boolean;
  upsellProduct?: UpsellProduct | null;
};

const assertConfigured = () => {
  if (!CHECKOUT_API_KEY) {
    throw new Error("Configure VITE_3B_API_KEY no .env.local");
  }
};

const parseError = async (res: Response) => {
  try {
    const data = (await res.json()) as { error?: string; message?: string };
    return data.error || data.message || `Erro HTTP ${res.status}`;
  } catch {
    return `Erro HTTP ${res.status}`;
  }
};

export const getCheckoutConfig = async (productId: string): Promise<CheckoutConfig> => {
  assertConfigured();
  const url = new URL(`${CHECKOUT_BASE_URL}/get-checkout-config`);
  url.searchParams.set("apiKey", CHECKOUT_API_KEY);
  url.searchParams.set("productId", productId);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(await parseError(res));
  return (await res.json()) as CheckoutConfig;
};

export const createPaymentIntent = async (params: {
  productId: string;
  buyerEmail: string;
  quantity?: number;
}): Promise<CreatePaymentIntentResponse> => {
  assertConfigured();
  const res = await fetch(`${CHECKOUT_BASE_URL}/create-payment-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: CHECKOUT_API_KEY,
      productId: params.productId,
      quantity: params.quantity ?? 1,
      buyerEmail: params.buyerEmail,
    }),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return (await res.json()) as CreatePaymentIntentResponse;
};

export const getOrderStatus = async (sessionId: string): Promise<OrderStatusResponse> => {
  assertConfigured();
  const url = new URL(`${CHECKOUT_BASE_URL}/get-order-status`);
  url.searchParams.set("session_id", sessionId);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(await parseError(res));
  return (await res.json()) as OrderStatusResponse;
};

export const formatMoney = (cents: number, currency: string, locale = "es-ES") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
