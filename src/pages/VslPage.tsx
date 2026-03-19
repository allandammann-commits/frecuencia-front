import { useEffect, useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { OfferSection } from "@/components/OfferSection";
import { CommentsSection } from "@/components/CommentsSection";
import { Footer } from "@/components/Footer";

export const VslPage = ({ offerDelayMs = 278000 }: { offerDelayMs?: number }) => {
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("show") === "true") {
      setShowOffer(true);
      return;
    }

    const t = window.setTimeout(() => setShowOffer(true), offerDelayMs);
    return () => window.clearTimeout(t);
  }, [offerDelayMs]);

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

