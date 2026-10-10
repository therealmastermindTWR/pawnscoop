import type { MetadataRoute } from "next";
import { serviceHref, services, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/services", 0.9),
    ...services.map((s) => page(serviceHref(s.slug), 0.9)),
    page("/commercial", 0.8),
    page("/locations", 0.8),
    page("/about", 0.7),
    page("/faq", 0.7),
    page("/contact", 0.7),
    page("/refer-a-friend", 0.6),
    page("/privacy", 0.2, "yearly"),
  ];
}
