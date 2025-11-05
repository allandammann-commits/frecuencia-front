import { HeroSection } from "@/components/HeroSection";
import { VibrationalSection } from "@/components/VibrationalSection";
import { ProblemsSection } from "@/components/ProblemsSection";
import { StorySection } from "@/components/StorySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PricingSection } from "@/components/PricingSection";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { WarningSection } from "@/components/WarningSection";
import { FAQSection } from "@/components/FAQSection";
import { UrgencySection } from "@/components/UrgencySection";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import { TopNoticeBar } from "@/components/TopNoticeBar";

const Index = () => {
  const [showRest] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground pt-12">
      <TopNoticeBar />
      {/* Conteúdo inicial com VSL e imagem acima do bloco seguinte */}
      <HeroSection />

      {/* Após 3 minutos, o restante da página carrega */}
      {showRest && (
        <>
          <VibrationalSection />
          <ProblemsSection />
          <StorySection />
          <TestimonialsSection />
          <HowItWorksSection />
          <PricingSection />
          <GuaranteeSection />
          <WarningSection />
          <FAQSection />
          <UrgencySection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
