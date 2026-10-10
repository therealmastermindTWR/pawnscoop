import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Mascot } from "@/components/mascot/Mascot";
import { Button } from "@/components/ui/Button";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section theme="yellow" aria-labelledby="nf-title" className="overflow-hidden py-20 md:py-28">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col items-start gap-6">
          <p className="font-display text-[clamp(6rem,22vw,16rem)] leading-[0.8] font-extrabold tracking-tighter">404</p>
          <h1 id="nf-title" className="text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold">
            Looks like this page got buried.
          </h1>
          <p className="max-w-lg text-lg md:text-xl">Our best sniffer searched the whole yard and came up empty. Let&apos;s get you back on the trail.</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/" variant="dark" size="lg" icon={<ArrowLeft className="size-5" aria-hidden />}>
              Back home
            </Button>
            <QuoteButton variant="light" size="lg">
              Get Free Quote
            </QuoteButton>
          </div>
        </div>
        <Mascot pose="sniffing" className="mx-auto h-auto w-full max-w-sm" />
      </div>
    </Section>
  );
}
