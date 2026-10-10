/**
 * Live Google reviews via the Places API (New).
 *
 * Setup (optional, ~5 min):
 *   1. In Google Cloud, enable "Places API (New)" and create an API key
 *      (restrict it to the Places API).
 *   2. Add it to your hosting env vars / .env.local:
 *        GOOGLE_PLACES_API_KEY=your-key
 *        GOOGLE_PLACE_ID=ChIJ...   (optional; looked up automatically if omitted)
 *
 * Results are cached and refreshed once a day. Without a key the Reviews section shows
 * your rating, review count and highlights from lib/content.ts instead.
 * Google returns up to 5 reviews and requires the author attribution shown in the UI.
 */

export type GoogleReview = {
  author: string;
  authorUrl?: string;
  photo?: string;
  rating: number;
  text: string;
  when: string;
};

export type GoogleReviewData = {
  rating: number;
  count: number;
  mapsUrl?: string;
  reviews: GoogleReview[];
};

type RawPlace = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    text?: { text?: string };
    relativePublishTimeDescription?: string;
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }[];
};

const SEARCH_QUERY = "PawNScoop Lawn Care, El Paso, TX";
const FIELDS = ["rating", "userRatingCount", "googleMapsUri", "reviews"];
const DAY = 60 * 60 * 24;

export async function getGoogleReviews(): Promise<GoogleReviewData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;
  const placeId = process.env.GOOGLE_PLACE_ID;

  try {
    let place: RawPlace | undefined;
    if (placeId) {
      const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
        headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": FIELDS.join(",") },
        next: { revalidate: DAY },
      });
      if (!res.ok) return null;
      place = (await res.json()) as RawPlace;
    } else {
      const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": FIELDS.map((f) => `places.${f}`).join(","),
        },
        body: JSON.stringify({ textQuery: SEARCH_QUERY, pageSize: 1 }),
        cache: "force-cache",
        next: { revalidate: DAY },
      });
      if (!res.ok) return null;
      place = ((await res.json()) as { places?: RawPlace[] }).places?.[0];
    }
    if (!place?.rating || !place.userRatingCount) return null;

    return {
      rating: place.rating,
      count: place.userRatingCount,
      mapsUrl: place.googleMapsUri,
      reviews: (place.reviews ?? [])
        .filter((r) => r.text?.text)
        .map((r) => ({
          author: r.authorAttribution?.displayName ?? "Google user",
          authorUrl: r.authorAttribution?.uri,
          photo: r.authorAttribution?.photoUri,
          rating: r.rating ?? 5,
          text: r.text!.text!,
          when: r.relativePublishTimeDescription ?? "",
        })),
    };
  } catch {
    return null;
  }
}
