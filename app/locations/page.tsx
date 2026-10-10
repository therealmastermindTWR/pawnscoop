import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { LocationsDirectory } from "@/components/pages/LocationsDirectory";
import { PageHero } from "@/components/pages/PageHero";

export const metadata: Metadata = {
  title: "Service Areas",
  description: "Paw N Scoop provides pet waste removal, artificial turf cleaning and yard work across El Paso County, TX.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title={["Now scooping", "near you."]}
        sub="We're a local crew serving the communities below, and we're growing fast. Don't see your town? Request a quote and we'll let you know if we can reach you."
        pose="sniffing"
        breadcrumb="Locations"
      />
      <LocationsDirectory />
      <FinalCta title="Your yard could be next." />
    </>
  );
}
