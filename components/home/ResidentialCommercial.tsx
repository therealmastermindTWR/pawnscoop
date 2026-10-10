import { ArrowRight, Building2, House } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const cards = [
  {
    icon: House,
    title: "Residential",
    body: "Recurring or one-time poop scooping, turf cleaning, lawn care, yard cleanups and deodorizing for El Paso homes.",
    href: "/services",
    cta: "Explore home services",
    className: "bg-sun text-ink",
  },
  {
    icon: Building2,
    title: "Commercial",
    body: "Clean, fresh shared outdoor spaces for apartment communities, HOAs and businesses across El Paso County.",
    href: "/commercial",
    cta: "Explore commercial services",
    className: "bg-ink text-white",
  },
];

/** Homepage "Residential & Commercial" section. */
export function ResidentialCommercial() {
  return (
    <Section theme="white" aria-labelledby="res-com-title" className="pb-24 md:pb-32">
      <div className="container-x">
        <SectionHeading id="res-com-title" eyebrow="Who we serve" title={["Homes and", "commercial properties."]} className="mb-12" />
        <ul className="grid gap-5 md:grid-cols-2">
          {cards.map(({ icon: Icon, title, body, href, cta, className }, i) => (
            <Reveal as="li" key={title} delay={i * 0.1}>
              <Link href={href} className={`border-hard group flex h-full flex-col gap-5 rounded-[2rem] p-8 shadow-hard transition-transform hover:-translate-y-1.5 md:p-10 ${className}`}>
                <span className="border-hard grid size-16 place-items-center rounded-2xl bg-white text-ink">
                  <Icon className="size-8" strokeWidth={2.2} aria-hidden />
                </span>
                <h3 className="text-4xl font-extrabold md:text-5xl">{title}</h3>
                <p className="max-w-md text-lg opacity-85">{body}</p>
                <span className="mt-auto inline-flex items-center gap-2 font-display text-lg font-bold">
                  {cta} <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
