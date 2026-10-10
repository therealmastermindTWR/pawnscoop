import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/pages/ServicePageTemplate";
import { JsonLd } from "@/components/ui/JsonLd";
import { locations, serviceHref, services, site } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const find = (slug: string) => services.find((s) => s.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = find((await params).slug);
  if (!service) return {};
  const url = serviceHref(service.slug);
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: url },
    openGraph: { title: `${service.seo.title} | ${site.name}`, description: service.seo.description, url },
    twitter: { title: `${service.seo.title} | ${site.name}`, description: service.seo.description },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = find((await params).slug);
  if (!service) notFound();
  const url = `${site.url}${serviceHref(service.slug)}`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${url}#service`,
            name: service.name,
            serviceType: service.name,
            description: service.seo.description,
            url,
            provider: { "@id": `${site.url}/#business` },
            areaServed: [
              { "@type": "AdministrativeArea", name: "El Paso County, TX" },
              ...locations.map((l) => ({ "@type": "Place", name: `${l.city}, ${l.region}` })),
            ],
            ...(service.pricing && {
              offers: service.pricing.map((p) => ({ "@type": "Offer", name: p.name, description: `${p.price}. ${p.detail}`, priceCurrency: "USD" })),
            }),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
              { "@type": "ListItem", position: 3, name: service.name, item: url },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />
      <ServicePageTemplate service={service} />
    </>
  );
}
