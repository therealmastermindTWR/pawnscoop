import { getGoogleReviews } from "@/lib/google-reviews";
import { site, stats } from "@/lib/content";
import { Reviews } from "./Reviews";

/** Server wrapper: fetches live Google reviews (if configured) and hands them to the client carousel. */
export async function ReviewsSection() {
  const data = await getGoogleReviews();
  return (
    <Reviews
      live={data?.reviews ?? []}
      rating={data?.rating ?? stats.rating}
      count={data?.count ?? stats.reviewCount}
      googleUrl={data?.mapsUrl ?? site.googleProfileUrl}
    />
  );
}
