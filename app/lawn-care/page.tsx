import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/pages/ServicePageTemplate";
import { services } from "@/lib/content";

const service = services.find((s) => s.slug === "lawn-care")!;

export const metadata: Metadata = {
  title: "Lawn Care & Yard Work in El Paso",
  description: service.intro,
  alternates: { canonical: "/lawn-care" },
};

export default function Page() {
  return <ServicePageTemplate service={service} />;
}
