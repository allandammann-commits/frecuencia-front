import { useEffect, useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { OfferSection } from "@/components/OfferSection";
import { WhatsappProofSection } from "@/components/WhatsappProofSection";
import { FAQSection } from "@/components/FAQSection";
import { CommentsSection } from "@/components/CommentsSection";
import { Footer } from "@/components/Footer";
import { trackFunnelEvent } from "@/lib/funnelTracking";

/**
 * Tempo até liberar as provas + oferta abaixo do vídeo.
 * Produção: 278000 (4min38s). Mantido em 0 para revisão visual.
 */
export const OFFER_DELAY_MS = 0;

export const VslPage = ({ offerDelayMs = OFFER_DELAY_MS }: { offerDelayMs?: number }) => {
  const [showOffer, setShowOffer] = useState(offerDelayMs <= 0);

  useEffect(() => {
    trackFunnelEvent({ eventType: "vsl_view" });
  }, []);

  useEffect(() => {
    if (offerDelayMs <= 0) {
      setShowOffer(true);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get("show") === "true") {
      setShowOffer(true);
      return;
    }

    const t = window.setTimeout(() => setShowOffer(true), offerDelayMs);
    return () => window.clearTimeout(t);
  }, [offerDelayMs]);

  useEffect(() => {
    if (!showOffer) return;
    trackFunnelEvent({ eventType: "offer_view" });
  }, [showOffer]);

  return (
    <div className="min-h-screen text-foreground bg-[#FDF2F4]">
      <HeroSection />
      {showOffer && (
        <>
          <OfferSection />
          <WhatsappProofSection />
          <FAQSection />
        </>
      )}
      <CommentsSection />
      <Footer />
    </div>
  );
};

export default VslPage;
