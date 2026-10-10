import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { ReviewsSection } from "@/components/home/ReviewsSection";

// Below-the-fold sections are code-split into their own chunks (still server-rendered for SEO).
const CustomerPromise = dynamic(() => import("@/components/home/Promise").then((m) => m.CustomerPromise));
const Story = dynamic(() => import("@/components/home/Story").then((m) => m.Story));
const Services = dynamic(() => import("@/components/home/Services").then((m) => m.Services));
const Promo = dynamic(() => import("@/components/home/Promo").then((m) => m.Promo));
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs").then((m) => m.WhyChooseUs));
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks").then((m) => m.HowItWorks));
const Locations = dynamic(() => import("@/components/home/Locations").then((m) => m.Locations));
const BeforeAfter = dynamic(() => import("@/components/home/BeforeAfter").then((m) => m.BeforeAfter));
const Referral = dynamic(() => import("@/components/home/Referral").then((m) => m.Referral));
const Stats = dynamic(() => import("@/components/home/Stats").then((m) => m.Stats));
const FaqSection = dynamic(() => import("@/components/home/FaqSection").then((m) => m.FaqSection));
const FinalCta = dynamic(() => import("@/components/home/FinalCta").then((m) => m.FinalCta));

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <CustomerPromise />
      <Story />
      <Services />
      <BeforeAfter />
      <Promo />
      <WhyChooseUs />
      <HowItWorks />
      <Locations />
      <ReviewsSection />
      <Referral />
      <Stats />
      <FaqSection />
      <FinalCta />
    </>
  );
}
