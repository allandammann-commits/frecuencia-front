import { useEffect, useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { OfferSection } from "@/components/OfferSection";
import { CommentsSection } from "@/components/CommentsSection";
import { Footer } from "@/components/Footer";
import { trackFunnelEvent } from "@/lib/funnelTracking";

export const VslPage = ({ offerDelayMs = 278000 }: { offerDelayMs?: number }) => {
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    trackFunnelEvent({ eventType: "vsl_view" });
  }, []);

  useEffect(() => {
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
      {showOffer && <OfferSection />}
      <CommentsSection />
      <Footer />
    </div>
  );
};

export default VslPage;

