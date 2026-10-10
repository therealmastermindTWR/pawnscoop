import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/pages/ServicePageTemplate";
import { services } from "@/lib/content";

const service = services.find((s) => s.slug === "residential")!;

export const metadata: Metadata = {
  title: "Residential Pet Waste Removal",
  description: service.intro,
  alternates: { canonical: "/residential" },
};

export default function Page() {
  return <ServicePageTemplate service={service} />;
}
