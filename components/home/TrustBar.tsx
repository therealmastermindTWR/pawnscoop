import { BadgeCheck, Camera, MapPin, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { site, stats } from "@/lib/content";

/** Compact trust indicators under the hero. Every item is a verified fact. */
export function TrustBar() {
  const items = [
    { icon: Star, title: `${stats.rating.toFixed(1)} on Google`, body: `${stats.reviewCount} five-star reviews`, href: site.googleProfileUrl },
    { icon: MapPin, title: "Locally owned", body: "Serving El Paso County" },
    { icon: BadgeCheck, title: "100% satisfaction", body: "We'll make it right within 24 hours" },
    { icon: Camera, title: "Gate security", body: "Photo after every visit" },
  ];
  return (
    <Section theme="white" aria-label="Why El Paso trusts Paw N Scoop" className="pt-14 pb-4 md:pt-20">
      <ul className="container-x grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {items.map(({ icon: Icon, title, body, href }, i) => {
          const inner = (
            <>
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sun text-ink">
                <Icon className="size-5" strokeWidth={2.2} aria-hidden />
              </span>
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="font-display text-base font-extrabold md:text-lg">{title}</span>
                <span className="text-sm text-charcoal">{body}</span>
              </span>
            </>
          );
          const cls = "border-hard flex h-full items-center gap-3 rounded-[1.25rem] bg-white p-3 text-ink md:p-4";
          return (
            <Reveal as="li" key={title} delay={i * 0.06} y={16}>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} transition-shadow hover:shadow-hard-sm`}>
                  {inner}
                  <span className="sr-only"> (opens Google reviews in a new tab)</span>
                </a>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
