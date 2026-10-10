import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/pages/ServicePageTemplate";
import { services } from "@/lib/content";

const service = services.find((s) => s.slug === "turf-cleaning")!;

export const metadata: Metadata = {
  title: "Artificial Turf Cleaning in El Paso",
  description: service.intro,
  alternates: { canonical: "/turf-cleaning" },
};

export default function Page() {
  return <ServicePageTemplate service={service} />;
}
