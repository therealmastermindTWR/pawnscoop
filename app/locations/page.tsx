import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { LocationsDirectory } from "@/components/pages/LocationsDirectory";
import { PageHero } from "@/components/pages/PageHero";

export const metadata: Metadata = {
  title: "Service Areas in El Paso County, TX",
  description:
    "Serving El Paso, TX and El Paso County: East, West and Northeast El Paso, Horizon City, Socorro, Canutillo, San Elizario, Clint and Fabens.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Service areas"
        title={["Yard care across", "El Paso County."]}
        sub="Paw N Scoop is a local crew serving El Paso, TX and surrounding communities throughout El Paso County with poop scooping, artificial turf cleaning, lawn care, yard cleanups and deodorizing."
        pose="sniffing"
        breadcrumb="Service Areas"
      />
      <LocationsDirectory />
      <FinalCta title="Your yard could be next." />
    </>
  );
}
