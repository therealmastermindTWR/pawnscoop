import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/pages/ServicePageTemplate";
import { services } from "@/lib/content";

const service = services.find((s) => s.slug === "commercial")!;

export const metadata: Metadata = {
  title: "Commercial Pet Waste Removal",
  description: service.intro,
  alternates: { canonical: "/commercial" },
};

export default function Page() {
  return <ServicePageTemplate service={service} />;
}
