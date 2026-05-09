import Hero from "@/components/Hero";
import WhatIsAPergola from "@/components/WhatIsAPergola";
import ImmersiveExperience from "@/components/ImmersiveExperience";
import UseCases from "@/components/UseCases";
import Features from "@/components/Features";
import BeforeAfter from "@/components/BeforeAfter";
import TerritoryMap from "@/components/TerritoryMap";
import Testimonials from "@/components/Testimonials";
import QuoteForm from "@/components/QuoteForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIsAPergola />
      <ImmersiveExperience />
      <UseCases />
      <Features />
      <BeforeAfter />
      <TerritoryMap />
      <Testimonials />
      <QuoteForm />
    </>
  );
}
