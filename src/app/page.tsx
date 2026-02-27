import BenefitsSection from "@/components/feature/landing/benefits";
import CTASection from "@/components/feature/landing/cta";
import FeaturesSection from "@/components/feature/landing/features";
import Footer from "@/components/feature/landing/footer";
import Header from "@/components/feature/landing/header";
import HeroSection from "@/components/feature/landing/hero";
import HowItWorksSection from "@/components/feature/landing/howItWorks";

const Page = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Page;
