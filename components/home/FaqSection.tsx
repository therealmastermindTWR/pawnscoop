import { ArrowRight } from "lucide-react";
import { Mascot } from "@/components/mascot/Mascot";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/content";

export function FaqSection() {
  return (
    <Section theme="white" aria-labelledby="faq-title" className="py-24 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" eyebrow="FAQ" title={["Questions?", "We've got", "the scoop."]} sub="Everything you've wondered about pet waste removal but were too polite to ask." />
          <Reveal className="flex flex-wrap items-center gap-4">
            <Button href="/faq" variant="dark" size="lg" icon={<ArrowRight className="size-5" aria-hidden />}>
              View More Questions
            </Button>
          </Reveal>
          <Mascot pose="sniffing" className="hidden h-56 w-auto self-start lg:block" />
        </div>
        <Reveal>
          <Accordion items={faqs.slice(0, 8)} />
        </Reveal>
      </div>
    </Section>
  );
}
