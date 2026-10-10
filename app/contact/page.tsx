import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaqSection } from "@/components/home/FaqSection";
import { PageHero } from "@/components/pages/PageHero";
import { SimpleForm } from "@/components/pages/SimpleForm";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Questions about pet waste removal? Call, email or message the Paw N Scoop team.",
  alternates: { canonical: "/contact" },
};

const info = [
  { icon: Phone, label: "Call or text", value: site.phone, href: site.phoneHref },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    icon: MapPin,
    label: "Find us on Google",
    value: `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
    href: site.googleProfileUrl,
  },
  { icon: Clock, label: "Hours", value: site.hours.map((h) => `${h.days}: ${h.time}`).join(" · ") },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={["Let's talk", "(dog) business."]}
        sub="Questions, custom commercial quotes, or just want to show us a picture of your dog? We're all ears (floppy ones)."
        pose="laptop"
        breadcrumb="Contact"
      />
      <Section theme="white" aria-label="Contact details and form" className="py-20 md:py-28">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
          <ul className="flex flex-col gap-4">
            {info.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="border-hard flex items-start gap-4 rounded-[1.5rem] bg-sun-100 p-5 text-ink">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-sun">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-charcoal">{label}</span>
                  {href ? (
                    <a href={href} className="font-display text-xl font-bold hover:underline">
                      {value}
                    </a>
                  ) : (
                    <span className="font-display text-lg font-bold">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <SimpleForm
            kind="contact"
            submitLabel="Send message"
            success="Message sent! We'll be in touch soon."
            fields={[
              { name: "name", label: "Name", required: true, autoComplete: "name", half: true },
              { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
              { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
              { name: "zip", label: "ZIP code", autoComplete: "postal-code", half: true },
              { name: "message", label: "How can we help?", type: "textarea", required: true },
            ]}
          />
        </div>
      </Section>
      <FaqSection />
    </>
  );
}
