/**
 * ============================================================================
 *  PAW N SCOOP: SITE CONTENT
 * ============================================================================
 *  All marketing copy and data lives here so it is easy to edit.
 *
 *  Sources for business facts (keep this file in sync with them):
 *   - Google Business Profile "PawNScoop Lawn Care" (rating, hours, phone, address)
 *   - Jobber request form (services, plan names, prices, what's included)
 *   - pawnscoop.com (guarantees, first-scoop offer, customer portal)
 *
 *  `CONFIRM:` comments mark details the owner should double-check.
 * ============================================================================
 */

export type Theme = "white" | "yellow" | "black";

export const site = {
  name: "Paw N Scoop",
  legalName: "Paw N Scoop", // CONFIRM: registered legal name (e.g. "Paw N Scoop LLC")
  /** Official slogan. */
  tagline: "Pawsome Yards N Splendid Scoops",
  description:
    "Paw N Scoop provides poop scooping, artificial turf cleaning, lawn care, yard cleanups and deodorizing in El Paso, TX and surrounding areas. Get a free quote!",
  /** Short footer / about blurb. */
  blurb:
    "Locally owned outdoor cleaning and yard care in El Paso, TX. Poop scooping, artificial turf cleaning, lawn care, yard cleanups and deodorizing, all from one friendly crew.",
  serviceArea: "El Paso, TX and surrounding areas throughout El Paso County",
  url: "https://www.pawnscoop.com",
  phone: "(915) 666-7272",
  phoneHref: "tel:+19156667272",
  email: "pawnscoopep@gmail.com",
  address: {
    street: "8229 Broadway Drive",
    city: "El Paso",
    region: "TX",
    postalCode: "79915",
    country: "US",
  },
  geo: { lat: 31.8120519, lng: -106.390015 }, // from the Google Business Profile
  // Hours confirmed by the owner: every day 7:30 AM – 6:30 PM. (Update the Google Business Profile to match; it says 6:30 AM.)
  hours: [
    { days: "Every day", time: "7:30am – 6:30pm" },
    { days: "Online quote requests", time: "24/7" },
  ],
  /** Jobber request form. Every "Free Quote" CTA opens this in a new tab. Customers pick one or more services there. */
  bookingUrl: "https://clienthub.getjobber.com/hubs/7636455e-e014-4aed-be1d-7d87f94a72cb/public/requests/4599926/new",
  clientLoginUrl: "https://clienthub.getjobber.com/client_hubs/7636455e-e014-4aed-be1d-7d87f94a72cb/login/new",
  /** Google Business Profile (reviews, directions). */
  googleProfileUrl: "https://share.google/PYkCAC34ZfXHy9eJH",
  /** Opens Google's "write a review" box for Paw N Scoop. */
  googleReviewUrl: "https://g.page/r/CXesWgpcQ8vGEAE/review",
  /** YouTube/Vimeo *embed* URL. The "Watch how it works" button only appears when this is set. */
  videoUrl: "",
  /**
   * Social profiles. Only links listed here are shown. Add real profile URLs, e.g.
   * { label: "Facebook", href: "https://facebook.com/yourpage", icon: "facebook" }
   */
  social: [] as { label: string; href: string; icon: "facebook" | "instagram" | "tiktok" }[],
};

/** Real numbers from the Google Business Profile. Update as reviews come in. */
export const stats = {
  rating: 5.0,
  reviewCount: 24,
  counters: [
    { label: "Five-star Google reviews", value: 24, suffix: "" },
    { label: "Days a week we're open", value: 7, suffix: "" },
    { label: "Satisfaction guaranteed", value: 100, suffix: "%" },
  ],
};

/**
 * What customers mention in their Google reviews (summarized, not quoted).
 * Live review text is pulled from Google automatically when GOOGLE_PLACES_API_KEY is set
 * (see lib/google-reviews.ts).
 */
export const reviewHighlights = [
  { icon: "clock", title: "Always on time", body: "Customers keep calling out how timely and dependable the visits are." },
  { icon: "message", title: "Great communication", body: "Quick replies and clear updates, so you always know when we've been by." },
  { icon: "heart", title: "Kind & professional", body: "A friendly, respectful crew that treats your yard (and pups) right." },
  { icon: "tag", title: "Reasonably priced", body: "Reviewers say the service is an excellent value for what you get." },
  { icon: "calendar", title: "Faithful every other week", body: "Bi-weekly customers say we show up like clockwork, visit after visit." },
  { icon: "trophy", title: "Customers for years", body: "Some of our clients have trusted us with their yards for two years and counting." },
];

/** First-scoop offer, as stated on pawnscoop.com. Applies to recurring poop-scooping plans only. */
export const promo = {
  short: "Free first scoop with a weekly, bi-weekly or monthly plan",
  headline: "Your first scoop is on us.",
  eligibility:
    "Free first scoop applies to new weekly, bi-weekly and monthly poop-scooping plans. One-time cleanups, turf cleaning, lawn care, yard cleanups and deodorizing are quoted separately.", // CONFIRM: "new" customers only?
};

export const hero = {
  headlineLines: ["Cleaner Yards.", "Happier Homes."],
  subtitle: "Complete Outdoor Cleaning & Yard Care in El Paso, TX",
  description:
    "Paw N Scoop keeps outdoor spaces clean, fresh, and ready to enjoy. From professional pet waste removal and artificial turf cleaning to lawn care, yard cleanups, and deodorizing, we've got your yard covered. Proudly serving El Paso, TX and surrounding areas throughout El Paso County.",
};

export const marqueeWords = ["Poop Scooping", "Turf Cleaning", "Lawn Care", "Yard Cleanups", "Deodorizing", "Pawsome Yards", "Splendid Scoops"];

/* ---------------------------------------------------------------------------
 * SERVICES
 * ------------------------------------------------------------------------- */

export type ServiceSlug = "poop-scooping" | "artificial-turf-cleaning" | "lawn-care" | "yard-cleanup" | "disinfecting-deodorizing";
export type ServiceIcon = "shovel" | "sprout" | "scissors" | "leaf" | "spray";

export type Service = {
  slug: ServiceSlug;
  name: string;
  /** One-line summary for cards and menus. */
  summary: string;
  icon: ServiceIcon;
  /** Real Paw N Scoop photo for the service card. Leave undefined until you have one (an illustrated panel shows instead). */
  image?: { src: string; alt: string };
  seo: { title: string; description: string };
  h1: string;
  intro: string;
  overview: string[];
  includes: string[];
  benefits: { title: string; body: string }[];
  process: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  /** Prices exactly as listed on the Jobber request form. */
  pricing?: { name: string; price: string; detail: string }[];
  /** Matches `transformations[].category` to show before & after photos on the page. */
  galleryCategory?: TransformationCategory;
  mascot: "waving" | "sniffing" | "scooper" | "celebrating";
};

export const services: Service[] = [
  {
    slug: "poop-scooping",
    name: "Dog Poop Scooping",
    summary: "Weekly, bi-weekly, monthly and one-time pet waste removal for El Paso homes.",
    icon: "shovel",
    image: { src: "/images/after.jpg", alt: "Gravel backyard in El Paso after a Paw N Scoop pet waste cleanup" },
    seo: {
      title: "Poop Scooping & Dog Poop Removal in El Paso, TX",
      description:
        "Weekly, bi-weekly, monthly and one-time dog poop removal in El Paso, TX. Gate checked every visit and your first scoop free on recurring plans. Free quote.",
    },
    h1: "Dog Poop Scooping in El Paso, TX",
    intro:
      "Paw N Scoop is El Paso's locally owned pet waste removal crew. We pick up the dog poop in your yard on a schedule that fits your life, so your family and pets can enjoy the yard again.",
    overview: [
      "Choose a recurring plan and we'll come by every week, every two weeks or once a month to remove all the pet waste in your yard. Every visit includes a quick yard inspection and a secure gate check before we leave.",
      "Yard got out of hand? Our one-time Platinum Rescue cleanup resets an overwhelmed yard in a single visit. It's perfect before a party, after a busy stretch, or for a move-in or move-out.",
    ],
    includes: [
      "Complete pet waste removal",
      "Yard inspection every visit",
      "Secure gate check + photo confirmation",
      "Weekly, bi-weekly or monthly plans",
      "One-time cleanups for overwhelmed yards",
      "Pet-friendly crew",
    ],
    benefits: [
      { title: "Get your weekends back", body: "No more poop patrol. We handle the dirtiest yard chore so you don't have to." },
      { title: "A yard you can actually use", body: "Kids can play, pets can run and guests can walk across the yard without watching their step." },
      { title: "Peace of mind at the gate", body: "Our Gate Security Guarantee: we double-check every gate and send a photo after each visit." },
      { title: "Satisfaction guaranteed", body: "Not happy with a visit? Tell us within 24 hours and we'll come back and make it right at no extra cost." },
    ],
    process: [
      { title: "Pick your plan", body: "Request a free quote online and choose weekly, bi-weekly, monthly or a one-time cleanup." },
      { title: "We confirm & schedule", body: "We confirm your quote and set your service day. You'll get automatic reminders before visits." },
      { title: "We scoop the whole yard", body: "We remove all the pet waste, inspect the yard and double-check your gate." },
      { title: "Photo confirmation", body: "You get a photo of your closed gate, and your yard is ready to enjoy." },
    ],
    pricing: [
      { name: "Weekly Deluxe", price: "$25/week", detail: "Our signature weekly visit for busy pet homes." },
      { name: "Bi-Weekly Elite", price: "$42/visit", detail: "Dependable visits every two weeks." },
      { name: "Monthly Prestige", price: "$75/visit", detail: "A professional monthly cleanup for lighter needs." },
      { name: "Platinum Rescue", price: "From $55", detail: "One-time cleanup for overwhelmed yards, events and move-ins/move-outs." },
    ],
    faqs: [
      { q: "How often should I schedule poop scooping?", a: "Weekly service is the most popular for busy pet homes. Bi-weekly works well for many households, and monthly is a good fit for homes with lighter needs. Not sure? Request a quote and we'll help you pick." },
      { q: "Do you offer one-time dog poop cleanups?", a: "Yes. Our Platinum Rescue is a one-time cleanup starting at $55, great for overwhelmed yards, events and move-ins or move-outs." },
      { q: "Is my first scoop really free?", a: "Yes, when you sign up for a weekly, bi-weekly or monthly poop-scooping plan, your first scoop is on us." },
      { q: "Will you close my gate when you leave?", a: "Always. Our Gate Security Guarantee means we double-check every gate before we leave and send you a photo confirmation after each visit." },
    ],
    galleryCategory: "Pet Waste Removal",
    mascot: "scooper",
  },
  {
    slug: "artificial-turf-cleaning",
    name: "Artificial Turf Cleaning",
    summary: "Deep brushing, pet residue removal, sanitizing and deodorizing for artificial grass.",
    icon: "sprout",
    seo: {
      title: "Artificial Turf & Grass Cleaning in El Paso, TX",
      description:
        "Artificial grass cleaning in El Paso, TX: deep turf brushing, pet waste residue removal, sanitizing and deodorizing with pet and family safe products.",
    },
    h1: "Artificial Turf Cleaning in El Paso, TX",
    intro:
      "Artificial grass is low-maintenance, not no-maintenance. Between pets, play and El Paso's heat, residue and odors build up in turf over time. Our professional turf cleaning brings it back to fresh.",
    overview: [
      "We use commercial cleaning equipment to deep-brush your turf, lift matted fibers and remove pet waste residue that gets trapped between the blades.",
      "Then we apply a professional sanitizing and deodorizing treatment using turf-safe, pet and family safe products to knock out odors and bacteria. If weeds have crept in around the edges, we treat those too.",
    ],
    includes: [
      "Deep turf brushing",
      "Pet waste residue removal",
      "Professional sanitizing treatment",
      "Turf deodorizing",
      "Weed treatment (if needed)",
      "Artificial grass refresh",
      "Pet & family safe products",
    ],
    benefits: [
      { title: "Fresher-smelling turf", body: "Deodorizing goes after the source of pet odors instead of masking them." },
      { title: "A cleaner play area", body: "Sanitizing treatment helps eliminate bacteria where your kids and pets spend time." },
      { title: "Turf that looks newer", body: "Deep brushing lifts flattened fibers so your artificial grass looks fuller again." },
      { title: "Safe for the whole family", body: "We use turf-safe, pet and family safe products." },
    ],
    process: [
      { title: "Clear the surface", body: "We remove pet waste and loose debris so the cleaning can reach the turf itself." },
      { title: "Deep brush", body: "Commercial equipment brushes the turf to lift fibers and loosen trapped residue." },
      { title: "Sanitize & deodorize", body: "We apply a professional sanitizing and deodorizing treatment with turf-safe products." },
      { title: "Weed treatment & refresh", body: "Weeds are treated if needed and your turf gets a final refresh." },
    ],
    faqs: [
      { q: "How often should artificial turf be cleaned?", a: "It depends on how many pets use your turf and how much sun and traffic it gets. Request a quote and we'll recommend a schedule for your yard." },
      { q: "Are your turf cleaning products safe for pets?", a: "Yes. We use turf-safe products that are pet and family safe." },
      { q: "Can you get rid of pet urine smell in artificial grass?", a: "Our sanitizing and deodorizing treatment is designed to eliminate pet odors at the source, not just cover them up." },
      { q: "Do you also pick up dog poop on artificial turf?", a: "Yes. Pet waste residue removal is part of every turf cleaning, and you can add a recurring poop-scooping plan to keep it clean between deep cleans." },
    ],
    galleryCategory: "Artificial Turf Cleaning",
    mascot: "sniffing",
  },
  {
    slug: "lawn-care",
    name: "Lawn Care",
    summary: "Lawn mowing, grass edging and trimming to keep your lawn neat and healthy-looking.",
    icon: "scissors",
    seo: {
      title: "Lawn Care & Lawn Mowing in El Paso, TX",
      description:
        "Lawn mowing, grass edging and trimming in El Paso, TX from a local, pet-friendly crew. Keep your lawn neat and tidy. Request a free lawn care quote.",
    },
    h1: "Lawn Care in El Paso, TX",
    intro:
      "A neat lawn makes the whole home look cared for. Paw N Scoop mows, edges and trims your grass so your yard looks sharp and stays ready to enjoy.",
    overview: [
      "We mow your lawn, edge along walkways, driveways and beds, and trim the grass we can't reach with the mower for a clean, finished look.",
      "When we're done, we blow clippings off your walkways and driveway so nothing gets tracked inside. And because we're a pet-friendly crew, your dogs are in good hands.",
    ],
    includes: [
      "Lawn mowing",
      "Grass edging",
      "Grass trimming",
      "Walkway & driveway blow-off",
      "General lawn maintenance",
      "Pet-friendly service",
    ],
    benefits: [
      { title: "Instant curb appeal", body: "Freshly mowed grass and crisp edges make your home look its best." },
      { title: "More free time", body: "Skip the mowing, edging and cleanup. We'll take care of it." },
      { title: "One crew for the whole yard", body: "Pair lawn care with poop scooping or a yard cleanup in the same quote request." },
      { title: "Pet-friendly from start to finish", body: "We work around your pets with care and leave the yard tidy behind us." },
    ],
    process: [
      { title: "Tell us about your lawn", body: "Request a free quote and select lawn care. Add any details about your yard." },
      { title: "We confirm your quote", body: "We confirm pricing and schedule a time that works for you." },
      { title: "Mow, edge & trim", body: "We mow, edge along hard surfaces and trim for a clean, even finish." },
      { title: "Clean finish", body: "Clippings are blown off walkways and driveways before we leave." },
    ],
    faqs: [
      { q: "Can I combine lawn care with poop scooping?", a: "Yes. You can select both services in the same quote request, and one local crew takes care of your whole yard." },
      { q: "Do you offer recurring lawn care?", a: "Let us know whether you'd like a one-time service or a recurring schedule when you request your quote, and we'll confirm what's available for your yard." }, // CONFIRM: recurring lawn care availability
      { q: "Do you trim shrubs and bushes too?", a: "Bush and shrub trimming is part of our yard cleanup service. Just add it to your request." },
    ],
    galleryCategory: "Lawn Care",
    mascot: "waving",
  },
  {
    slug: "yard-cleanup",
    name: "Yard Cleanups",
    summary: "Backyard cleanups: leaves, debris, weeds, shrub trimming and light branch removal.",
    icon: "leaf",
    seo: {
      title: "Yard & Backyard Cleanup Services in El Paso, TX",
      description:
        "Backyard cleanup in El Paso, TX: leaf and debris cleanup, weed removal, bush and shrub trimming and light branch removal. Request a free quote.",
    },
    h1: "Yard Cleanups in El Paso, TX",
    intro:
      "Whether your yard got away from you or you're getting ready for guests, a move or a new season, Paw N Scoop clears it out so your outdoor space is usable again.",
    overview: [
      "A yard cleanup tackles the build-up: leaves and debris, weeds, overgrown bushes and shrubs, and light branches that have come down.",
      "We finish by blowing off your walkways and driveway, so the whole property looks clean, not just the backyard.",
    ],
    includes: [
      "Leaf & debris cleanup",
      "Weed removal (if needed)",
      "Bush & shrub trimming",
      "Light branch removal",
      "Walkway & driveway blow-off",
      "General outdoor property cleanup",
    ],
    benefits: [
      { title: "Your space, back", body: "Turn an overgrown, cluttered yard into a place you want to spend time again." },
      { title: "Ready for anything", body: "Get guest-ready for a party, list-ready for a sale or move-in ready for a new home." },
      { title: "Safer footing", body: "Clearing debris and branches makes the yard nicer for kids and pets to run around." },
      { title: "Done in one visit", body: "One crew handles the leaves, weeds, trimming and cleanup together." },
    ],
    process: [
      { title: "Show us the yard", body: "Request a free quote and tell us what needs attention." },
      { title: "We confirm the plan", body: "We confirm your quote and schedule your cleanup." },
      { title: "Clear & trim", body: "We clean up leaves and debris, remove weeds and trim bushes and shrubs." },
      { title: "Final blow-off", body: "Walkways and driveways are blown clean so the whole property looks finished." },
    ],
    faqs: [
      { q: "When should I book a yard cleanup?", a: "Anytime your yard needs a reset: before a party or event, before listing or after buying a home, or when the seasons change." },
      { q: "Do you remove weeds?", a: "Yes, weed removal is included when needed." },
      { q: "My yard also has a lot of dog poop. Can you handle both?", a: "Absolutely. Add our one-time Platinum Rescue pet waste cleanup or a recurring poop-scooping plan to your request." },
    ],
    galleryCategory: "Yard Cleanups",
    mascot: "celebrating",
  },
  {
    slug: "disinfecting-deodorizing",
    name: "Disinfecting & Deodorizing",
    summary: "Sanitizing and odor treatments for pet areas, yards and artificial turf.",
    icon: "spray",
    seo: {
      title: "Yard Deodorizing & Pet Odor Removal in El Paso, TX",
      description:
        "Pet odor removal and yard deodorizing in El Paso, TX. Sanitizing and deodorizing treatments for pet areas and artificial turf. Pet and family safe.",
    },
    h1: "Disinfecting & Deodorizing in El Paso, TX",
    intro:
      "Even after the poop is picked up, pet odors can linger, especially in El Paso's summer heat. Our sanitizing and deodorizing treatments go after the source of the smell so your yard stays fresh.",
    overview: [
      "We treat the spots your pets use most with a professional sanitizing and deodorizing treatment. It's a targeted odor treatment, separate from a full turf deep clean.",
      "Add it to a recurring poop-scooping plan or an artificial turf cleaning to keep odors from coming back.",
    ],
    includes: [
      "Outdoor odor control",
      "Pet-related odor treatment",
      "Artificial turf deodorizing",
      "Sanitizing treatment for pet areas",
      "Pet & family safe products",
    ],
    benefits: [
      { title: "Enjoy your yard again", body: "Spend time outside without the lingering pet smell." },
      { title: "Targets the source", body: "Treatments are designed to eliminate odors, not just cover them up." },
      { title: "Cleaner pet areas", body: "Sanitizing helps knock out bacteria in the spots your pets use most." },
      { title: "Pairs with any plan", body: "Add it to poop scooping or turf cleaning for a fresher yard all year." },
    ],
    process: [
      { title: "Pick up first", body: "We remove pet waste so the treatment can work where it matters." },
      { title: "Find the problem spots", body: "We focus on the areas your pets use most and where odors build up." },
      { title: "Treat", body: "A sanitizing and deodorizing treatment is applied using pet and family safe products." },
      { title: "Keep it fresh", body: "Pair with recurring scooping or turf cleaning to stop odors from coming back." },
    ],
    faqs: [
      { q: "How is deodorizing different from artificial turf cleaning?", a: "Turf cleaning is a full deep clean: brushing, residue removal and treatment. Disinfecting & deodorizing is a targeted odor treatment you can add on its own or alongside other services." },
      { q: "Is the treatment safe for my pets and kids?", a: "Yes, we use pet and family safe products." }, // CONFIRM: same products as turf cleaning; list surfaces treated (gravel, grass, patios?)
      { q: "Can I add deodorizing to my poop-scooping plan?", a: "Yes. Select both services in your quote request and we'll put together a plan." },
    ],
    galleryCategory: "Outdoor Deodorizing",
    mascot: "sniffing",
  },
];

export const serviceHref = (slug: ServiceSlug) => `/services/${slug}`;

/** Commercial properties (owner confirmed Paw N Scoop serves them). All five services are available. */
export const commercial = {
  seo: {
    title: "Commercial Yard Care & Pet Waste Removal in El Paso, TX",
    description:
      "Pet waste removal, artificial turf cleaning, lawn care, yard cleanups and deodorizing for apartments, HOAs and businesses in El Paso, TX. Free quote.",
  },
  h1: "Commercial Yard Care in El Paso, TX",
  intro:
    "Paw N Scoop keeps shared outdoor spaces clean for apartment communities, HOAs and businesses across El Paso County, with the same five services our residential customers love.",
  audiences: [
    { title: "Apartment communities", body: "Dog areas, pet relief spots and shared green spaces your residents actually want to use." },
    { title: "HOAs", body: "Common areas and community turf kept clean, fresh and ready for neighbors and their pets." },
    { title: "Businesses", body: "Pet-friendly businesses and outdoor spaces that make a great first impression on customers." },
  ],
  process: [
    { title: "Tell us about the property", body: "Request a free quote and share the property type, the areas that need attention and the services you want." },
    { title: "We confirm scope & quote", body: "Commercial work is quoted per property. We confirm the plan, pricing and schedule with you." },
    { title: "We get to work", body: "Our crew handles poop scooping, turf cleaning, lawn care, cleanups or deodorizing on the schedule we agree on." },
    { title: "Satisfaction guaranteed", body: "If something isn't right, tell us within 24 hours and we'll come back and make it right at no extra cost." },
  ],
  faqs: [
    { q: "Which services are available for commercial properties?", a: "All five: dog poop scooping, artificial turf cleaning, lawn care, yard cleanups, and disinfecting & deodorizing. Pick one or combine several." },
    { q: "How is commercial service priced?", a: "Commercial work is quoted per property, based on the size of the space and the services you need. Request a free quote to get started." },
    { q: "Can you service our property on a recurring schedule?", a: "Tell us what schedule your property needs when you request a quote, and we'll confirm availability and pricing." }, // CONFIRM: recurring commercial schedules
  ],
};

export const nav = {
  services: services.map((s) => ({ label: s.name, href: serviceHref(s.slug), blurb: s.summary })),
  commercial: { label: "Commercial", href: "/commercial", blurb: "Yard care for apartments, HOAs & businesses" },
  main: [
    { label: "FAQ", href: "/faq" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Refer a Friend", href: "/refer-a-friend" },
  ],
};

/** Homepage "How it works" (service pages use each service's own `process`). */
export const steps = [
  { title: "Request a Free Quote", body: "Tap any Free Quote button and pick one or more services in our quick online request form." },
  { title: "We Confirm & Schedule", body: "We confirm your quote and set a service day that works for you, one-time or recurring." },
  { title: "We Get to Work", body: "Our pet-friendly crew cleans, scoops, mows or treats your yard and double-checks your gate." },
  { title: "Enjoy Your Yard", body: "Bare feet, backyard BBQs, zoomies. Your yard is officially back in business." },
];

export const features = [
  { icon: "users", title: "Locally Owned", body: "Proudly serving El Paso and surrounding communities." },
  { icon: "calendar", title: "Flexible Scheduling", body: "Convenient one-time and recurring service options." },
  { icon: "paw", title: "Complete Yard Care", body: "Five outdoor cleaning and maintenance services from one local company." },
  { icon: "file", title: "Easy Free Quotes", body: "Request a personalized estimate for your property in minutes." },
  { icon: "badge", title: "Satisfaction Guarantee", body: "Not happy? Tell us within 24 hours and we'll make it right at no extra cost." },
  { icon: "camera", title: "Gate Security", body: "Every gate double-checked, with a photo confirmation after each visit." },
];

/* ---------------------------------------------------------------------------
 * BEFORE & AFTER
 * ------------------------------------------------------------------------- */

export type TransformationCategory = "Pet Waste Removal" | "Artificial Turf Cleaning" | "Lawn Care" | "Yard Cleanups" | "Outdoor Deodorizing";

export type Transformation = {
  category: TransformationCategory;
  title: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

/**
 * Genuine Paw N Scoop work photos only. Categories with no photos are hidden automatically.
 * To add more: put the photos in /public/images and add an entry below.
 */
export const transformations: Transformation[] = [
  {
    category: "Pet Waste Removal",
    title: "Gravel backyard pet waste cleanup",
    before: { src: "/images/before.jpg", alt: "Before: El Paso gravel backyard covered in dog waste" },
    after: { src: "/images/after.jpg", alt: "After: the same gravel backyard, completely cleaned up by Paw N Scoop" },
  },
  // { category: "Artificial Turf Cleaning", title: "...", before: {...}, after: {...} },
  // { category: "Lawn Care", ... }, { category: "Yard Cleanups", ... }, { category: "Outdoor Deodorizing", ... }
];

/* ---------------------------------------------------------------------------
 * SERVICE AREAS
 * ------------------------------------------------------------------------- */

export type Location = {
  slug: string;
  city: string;
  region: string;
  /** position on the decorative map, 0–100 */
  pin: { x: number; y: number };
};

// CONFIRM: only list communities Paw N Scoop actually serves.
export const locations: Location[] = [
  { slug: "west-el-paso", city: "West El Paso", region: "TX", pin: { x: 30, y: 40 } },
  { slug: "northeast-el-paso", city: "Northeast El Paso", region: "TX", pin: { x: 50, y: 22 } },
  { slug: "east-el-paso", city: "East El Paso", region: "TX", pin: { x: 62, y: 46 } },
  { slug: "horizon-city", city: "Horizon City", region: "TX", pin: { x: 80, y: 54 } },
  { slug: "socorro", city: "Socorro", region: "TX", pin: { x: 64, y: 66 } },
  { slug: "canutillo", city: "Canutillo", region: "TX", pin: { x: 18, y: 18 } },
  { slug: "san-elizario", city: "San Elizario", region: "TX", pin: { x: 72, y: 76 } },
  { slug: "clint", city: "Clint", region: "TX", pin: { x: 84, y: 70 } },
  { slug: "fabens", city: "Fabens", region: "TX", pin: { x: 90, y: 82 } },
];

/* ---------------------------------------------------------------------------
 * FAQ (general; each service also has its own FAQs above)
 * ------------------------------------------------------------------------- */

export type Faq = { q: string; a: string; category: "Pricing" | "Service" | "Safety" | "Account" };

export const faqs: Faq[] = [
  { category: "Service", q: "What services does Paw N Scoop offer?", a: "We offer five outdoor services in El Paso County: dog poop scooping, artificial turf cleaning, lawn care, yard cleanups, and disinfecting & deodorizing. You can request one or several in the same quote, for homes and for commercial properties like apartments, HOAs and businesses." },
  { category: "Pricing", q: "How much does dog poop scooping cost?", a: "Our recurring plans are Weekly Deluxe ($25/week), Bi-Weekly Elite ($42/visit) and Monthly Prestige ($75/visit). One-time Platinum Rescue cleanups start at $55. Turf cleaning, lawn care, yard cleanups and deodorizing are quoted for your property." },
  { category: "Pricing", q: "Is the first scoop really free?", a: "Yes! When you sign up for a weekly, bi-weekly or monthly poop-scooping plan, your first scoop is on us. Other services are quoted separately." },
  { category: "Service", q: "How often can you come?", a: "Poop scooping is available weekly, bi-weekly or monthly, plus one-time cleanups. For other services, tell us in your request whether you'd like one-time or recurring service." },
  { category: "Safety", q: "Will you leave my gate open?", a: "Never on purpose. Our Gate Security Guarantee means we double-check every gate before we leave and send you a photo confirmation after each visit." },
  { category: "Service", q: "What if I'm not happy with a visit?", a: "Our 100% Satisfaction Guarantee has you covered. Let us know within 24 hours and we'll come back and make it right at no extra cost." },
  { category: "Safety", q: "What should I do with my dogs during a visit?", a: "Let us know about your pets when you request your quote, including anything we should know about their temperament, and we'll plan the visit around them." },
  { category: "Service", q: "Do I need to be home during the visit?", a: "Usually not, as long as we can get into the yard. You'll get automatic reminders before visits and a photo of your closed gate when we're done." },
  { category: "Service", q: "Which areas do you serve?", a: "We serve El Paso, TX and surrounding areas throughout El Paso County, including East, West and Northeast El Paso, Horizon City, Socorro, Canutillo, San Elizario, Clint and Fabens. Request a quote and we'll confirm we can reach you." },
  { category: "Account", q: "Do you have a referral program?", a: "Yes! Refer 1 friend and get $25 off, with bigger rewards at 3, 5, 7, 10 and 25 referrals, all the way up to free scoops for life. See our Refer a Friend page for the full details and rules." },
  { category: "Account", q: "How do I book and pay?", a: "Request a quote online in a couple of minutes. Once you're set up, our secure customer portal lets you manage appointments, pay invoices and get automatic reminders." },
];

/** Referral program (provided by the owner). */
export const referral = {
  headline: "Refer friends. Earn rewards.",
  intro:
    "Love your clean yard? Share Paw N Scoop with friends, family and neighbors. The more people you refer, the bigger your rewards get, all the way up to free scoops for life.",
  tiers: [
    { count: 1, reward: "$25 off" },
    { count: 3, reward: "1 free month of service" },
    { count: 5, reward: "5% off poop scooping for life" },
    { count: 7, reward: "$50 off" },
    { count: 10, reward: "An additional 5% off for life" },
    { count: 25, reward: "Free scoops for life!" },
  ],
  between: "For every referral in between the reward levels above, you get a $25 Visa gift card.",
  rules: [
    "Your referred friend must stay a paying customer for at least 60 days for you to receive credit.",
    "Referrals must be new, first-time Paw N Scoop customers.",
    "Self-referrals (for example, signing up under a different name or address) aren't eligible.",
    "Your friend must mention your name when they sign up, or you can let us know about the referral in advance.",
  ],
  steps: [
    { title: "Share", body: "Tell friends, family and neighbors about Paw N Scoop, or send them our website." },
    { title: "They sign up", body: "Your friend requests a quote and mentions your name, or you let us know about them ahead of time." },
    { title: "You earn rewards", body: "Once they've been a paying customer for 60 days, the referral counts toward your rewards." },
  ],
};

/** Our promise (About page). Guarantees as stated on pawnscoop.com. */
export const promises = [
  {
    icon: "calendar",
    title: "Reliable Service",
    body: "Timely, consistent visits on your schedule, with automatic reminders so you always know when we're coming.",
  },
  {
    icon: "badge",
    title: "100% Satisfaction Guarantee",
    body: "Not happy with a visit? Let us know within 24 hours and we'll come back and make it right at no extra cost.",
  },
  {
    icon: "shield",
    title: "Gate Security Guarantee",
    body: "We double-check every gate before we leave and send you a photo confirmation after each visit.",
  },
];

export const finalCta = {
  title: "Don't wait, sign up today!",
  body: "Request your free quote online for poop scooping, turf cleaning, lawn care, yard cleanups or deodorizing.",
};

export const about = {
  intro:
    "Paw N Scoop is a locally owned El Paso company built around one simple job: keeping your yard clean, fresh and ready for the people and pups who use it.",
  body: [
    "What started with scooping dog poop has grown into complete outdoor cleaning and yard care: pet waste removal, artificial turf cleaning, lawn care, yard cleanups and disinfecting & deodorizing, all from one friendly crew.",
    "We show up on time, communicate clearly and treat every yard like our own. It's why El Paso pet parents give us five stars and stick with us for years.",
  ],
  values: [
    { title: "Show up on time", body: "Reliability is the whole job. Timely visits and automatic reminders, every time." },
    { title: "Communicate clearly", body: "Quick replies, visit confirmations and gate photos, so you're never left wondering." },
    { title: "Leave it better", body: "Every gate double-checked, every corner covered, and a 100% satisfaction guarantee." },
    { title: "Treat pets like family", body: "Pet-safe products and a crew that genuinely loves dogs." },
  ],
};
