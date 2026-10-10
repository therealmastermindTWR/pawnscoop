import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { TrustBar } from "@/components/home/TrustBar";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqs, site } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Paw N Scoop | Yard Cleaning, Turf Care & Poop Scooping El Paso" },
  description: site.description,
  alternates: { canonical: "/" },
};

// Below-the-fold sections are code-split into their own chunks (still server-rendered for SEO).
const Services = dynamic(() => import("@/components/home/Services").then((m) => m.Services));
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs").then((m) => m.WhyChooseUs));
const BeforeAfter = dynamic(() => import("@/components/home/BeforeAfter").then((m) => m.BeforeAfter));
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks").then((m) => m.HowItWorks));
const ResidentialCommercial = dynamic(() => import("@/components/home/ResidentialCommercial").then((m) => m.ResidentialCommercial));
const Locations = dynamic(() => import("@/components/home/Locations").then((m) => m.Locations));
const FaqSection = dynamic(() => import("@/components/home/FaqSection").then((m) => m.FaqSection));
const FinalCta = dynamic(() => import("@/components/home/FinalCta").then((m) => m.FinalCta));

const homeFaqs = faqs.slice(0, 8);

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <Hero />
      <Marquee />
      <TrustBar />
      <Services />
      <WhyChooseUs />
      <BeforeAfter />
      <HowItWorks />
      <ResidentialCommercial />
      <ReviewsSection />
      <Locations />
      <FaqSection items={homeFaqs} />
      <FinalCta />
    </>
  );
}
