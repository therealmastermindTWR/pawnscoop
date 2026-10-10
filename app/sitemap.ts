import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

const routes = ["", "/residential", "/lawn-care", "/turf-cleaning", "/commercial", "/about", "/faq", "/locations", "/contact", "/refer-a-friend"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r.match(/residential|lawn-care|turf-cleaning|commercial/) ? 0.9 : 0.7,
  }));
}
