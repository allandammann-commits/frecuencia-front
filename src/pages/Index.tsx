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
import { Quiz } from "@/components/Quiz";
import { Analyzing } from "@/components/Analyzing";
import { TransitionMessage } from "@/components/TransitionMessage";
import { StickyCTA } from "@/components/StickyCTA";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [view, setView] = useState<"quiz" | "analyzing" | "sales">("quiz");

  const handleQuizComplete = (answers: Record<string, string>) => {
    console.log("Quiz completed with answers:", answers);
    setView("analyzing");
  };

  const handleAnalysisComplete = () => {
    setView("sales");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-white relative overflow-hidden">
      {/* Background Particles/Glow Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <TopNoticeBar />
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {view === "quiz" && (
            <motion.div
              key="quiz-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Quiz onComplete={handleQuizComplete} />
            </motion.div>
          )}

          {view === "analyzing" && (
            <motion.div
              key="analyzing-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Analyzing onComplete={handleAnalysisComplete} />
            </motion.div>
          )}

          {view === "sales" && (
            <motion.div
              key="sales-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-0"
            >
              <TransitionMessage />
              <HeroSection />
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
              <StickyCTA />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
