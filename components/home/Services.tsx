import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesGrid } from "./ServicesGrid";

/** Homepage "Our Five Services" section. */
export function Services() {
  return (
    <Section theme="white" id="services" aria-labelledby="services-title" className="py-24 md:py-32">
      <div className="container-x">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Our services"
            title={["Five ways we", "make yards better."]}
            sub="Outdoor cleaning and yard care for El Paso homes, all from one local, pet-friendly crew."
          />
        </div>
        <ServicesGrid />
        <Reveal className="mt-12 flex flex-wrap items-center gap-4">
          <QuoteButton size="lg" magnetic>
            Get My Free Quote
          </QuoteButton>
          <Button href="/services" variant="light" size="lg" icon={<ArrowRight className="size-5" aria-hidden />}>
            Compare All Services
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
