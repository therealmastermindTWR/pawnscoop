/**
 * ============================================================================
 *  PAW N SCOOP: SITE CONTENT
 * ============================================================================
 *  All marketing copy and data lives here so it is easy to edit.
 *  Business facts come from the Paw N Scoop Google Business Profile
 *  ("PawNScoop Lawn Care") and pawnscoop.com. Anything marked `PLACEHOLDER`
 *  still needs real info (see README.md for the checklist).
 * ============================================================================
 */

export type Theme = "white" | "yellow" | "black";

export const site = {
  name: "Paw N Scoop",
  legalName: "Paw N Scoop", // PLACEHOLDER: registered legal name (e.g. "Paw N Scoop LLC")
  /** Official slogan. */
  tagline: "Pawsome Yards N Splendid Scoops",
  description:
    "Paw N Scoop is a locally owned El Paso pet waste removal company. Weekly, bi-weekly, monthly and one-time poop scooping, lawn care and yard work, and professional artificial turf cleaning across El Paso County. Your first scoop is free.",
  serviceArea: "El Paso County, TX",
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
  // Google Business Profile hours: open every day 6:30 AM – 6:30 PM.
  hours: [
    { days: "Every day", time: "6:30am – 6:30pm" },
    { days: "Online booking", time: "24/7" },
  ],
  /** Jobber request form. Every "Free Quote" / booking CTA on the site opens this in a new tab. */
  bookingUrl: "https://clienthub.getjobber.com/hubs/7636455e-e014-4aed-be1d-7d87f94a72cb/public/requests/4599926/new",
  clientLoginUrl: "https://clienthub.getjobber.com/client_hubs/7636455e-e014-4aed-be1d-7d87f94a72cb/login/new", // Jobber Client Hub login
  /** Google Business Profile (reviews, directions). */
  googleProfileUrl: "https://share.google/PYkCAC34ZfXHy9eJH",
  videoUrl: "", // PLACEHOLDER: YouTube/Vimeo *embed* URL for "Watch how it works"
  priceFrom: "$20", // starting price per visit
  social: [
    { label: "Facebook", href: "https://facebook.com/", icon: "facebook" }, // PLACEHOLDER
    { label: "Instagram", href: "https://instagram.com/", icon: "instagram" }, // PLACEHOLDER
    { label: "TikTok", href: "https://tiktok.com/", icon: "tiktok" }, // PLACEHOLDER
  ] as const,
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

export const promo = {
  code: "FIRSTSCOOP", // PLACEHOLDER: confirm or change the code customers should mention
  headline: "Your first scoop is on us.",
  body: "Sign up for weekly, bi-weekly or monthly service and your first scoop is free. No catch, no contract, just a clean yard.",
  referralCredit: "$25", // PLACEHOLDER: confirm your referral reward
};

export const nav = {
  services: [
    { label: "Residential", href: "/residential", blurb: "Recurring & one-time poop scooping" },
    { label: "Commercial", href: "/commercial", blurb: "Pet areas for HOAs & apartments" },
    { label: "Lawn Care", href: "/lawn-care", blurb: "Mowing, trimming & yard work" },
    { label: "Turf Cleaning", href: "/turf-cleaning", blurb: "Deodorize & disinfect artificial turf" },
  ],
  main: [
    { label: "Refer a Friend", href: "/refer-a-friend" },
    { label: "FAQ", href: "/faq" },
    { label: "About", href: "/about" },
  ],
};

export const hero = {
  headlineLines: ["Less poop.", "More play."],
  sub: "El Paso's locally owned pet waste removal crew. We scoop your yard weekly, bi-weekly or monthly, double-check your gate and send a photo, so your yard stays clean, safe and barefoot-ready.",
};

export const marqueeWords = ["Pawsome Yards", "Splendid Scoops", "Scoop", "Sanitize", "Smile", "Happy Paws"];

/** Real customer yard (El Paso) before and after a Paw N Scoop cleanup. */
export const beforeAfter = {
  caption: "A real El Paso backyard, before and after a Paw N Scoop cleanup. Drag the slider to see the difference.",
  before: { src: "/images/before.jpg", alt: "Before: gravel backyard covered in dog waste" },
  after: { src: "/images/after.jpg", alt: "After: the same gravel backyard, completely cleaned up by Paw N Scoop" },
};

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

export const story = {
  eyebrow: "About Paw N Scoop",
  title: "Locally owned. El Paso proud.",
  body: [
    "Paw N Scoop is a locally owned El Paso company built around one simple job: keeping your yard clean, safe and ready for the people and pups who use it.",
    "From recurring poop scooping to deep artificial turf cleaning and yard work, we show up on time, communicate clearly and treat every yard like our own. It's why our customers give us five stars and stick with us for years.",
  ],
  image: { src: "/images/story.svg", alt: "Placeholder: Paw N Scoop team member with a happy dog in a clean backyard" }, // PLACEHOLDER photo
};

export type Service = {
  slug: "residential" | "lawn-care" | "turf-cleaning" | "commercial";
  name: string;
  short: string;
  headline: string;
  intro: string;
  bullets: string[];
  features: { title: string; body: string }[];
  priceNote: string;
  mascot: "scooper" | "laptop" | "sniffing";
  theme: Theme;
};

export const services: Service[] = [
  {
    slug: "residential",
    name: "Residential",
    short: "Recurring & one-time poop scooping",
    headline: "A spotless yard, on repeat.",
    intro: "Weekly, bi-weekly or monthly visits (or a one-time cleanup) that keep your yard clean, your shoes safe and your dog's favorite zoomie zone ready to go.",
    bullets: [
      "Weekly, bi-weekly or monthly plans",
      "One-time cleanups available",
      "Gate double-checked + photo after every visit",
      "Bundle with lawn care & yard work",
    ],
    features: [
      { title: "Every corner covered", body: "We walk your whole yard so nothing gets missed, from the patio to behind the shed." },
      { title: "First scoop free", body: "Sign up for weekly, bi-weekly or monthly service and your first scoop is on us." },
      { title: "Easy online portal", body: "Book, manage appointments, pay invoices and get automatic reminders through our secure customer portal." },
      { title: "Gate-safe promise", body: "We double-check every latch and send a photo of your closed gate before we leave." },
    ],
    priceNote: "Plans from $20/visit",
    mascot: "scooper",
    theme: "yellow",
  },
  {
    slug: "lawn-care",
    name: "Lawn Care",
    short: "Mowing, trimming & yard work",
    headline: "A lawn that looks as good as it smells.",
    intro: "Lawn care, lawn maintenance and yard work across El Paso County. We'll mow, edge, trim and tidy so your whole yard is pawsome, not just poop-free.",
    bullets: [
      "Mowing, edging & trimming",
      "Weeding & general yard cleanup",
      "Junk & debris removal",
      "Bundle with poop scooping for one easy visit",
    ],
    features: [
      { title: "Clean, crisp edges", body: "Mowing, edging and trimming that keep your lawn looking sharp all season." },
      { title: "Full yard cleanup", body: "Weeds, leaves and clutter cleared out so your outdoor space is ready to enjoy." },
      { title: "Junk removal", body: "Got old debris or junk piling up? We'll haul it away so your yard has room to breathe." },
      { title: "One crew, one visit", body: "Pair lawn care with pet waste removal and get the whole yard handled at once." },
    ],
    priceNote: "Custom quote for your yard", // PLACEHOLDER: add a starting price if you have one
    mascot: "scooper",
    theme: "black",
  },
  {
    slug: "commercial",
    name: "Commercial",
    short: "Pet areas for HOAs, apartments & businesses",
    headline: "Cleaner common areas. Happier residents.",
    intro: "Dog runs, pet areas and shared green spaces kept clean for apartment communities, HOAs and dog-friendly businesses across El Paso County.",
    bullets: [
      "Common-area & dog run waste removal",
      "Artificial turf cleaning for pet areas",
      "Recurring schedules that fit your property",
      "Photo confirmation after every visit",
    ],
    features: [
      { title: "Property-wide coverage", body: "Walkways, landscaping, dog runs and pet areas, serviced on a schedule that fits your community." },
      { title: "Turf that stays fresh", body: "Commercial-grade turf cleaning keeps high-traffic pet areas from smelling." },
      { title: "Clear communication", body: "Visit confirmations and photos, so managers always know the job is done." },
      { title: "Satisfaction guaranteed", body: "If something's missed, tell us within 24 hours and we'll make it right." },
    ],
    priceNote: "Custom quotes for every property",
    mascot: "laptop",
    theme: "yellow",
  },
  {
    slug: "turf-cleaning",
    name: "Turf Cleaning",
    short: "Deodorize & disinfect artificial turf",
    headline: "Fresh turf, not 'eau de dog'.",
    intro: "Professional artificial turf cleaning with commercial equipment, deodorizer, disinfectant and turf-safe products that eliminate odors and bacteria.",
    bullets: [
      "Commercial cleaning equipment",
      "Deodorizer + disinfectant treatment",
      "Turf-safe, pet-friendly products",
      "Add to any plan or book on its own",
    ],
    features: [
      { title: "Eliminates odors", body: "Our deodorizing treatment targets the source of pet odors instead of masking them." },
      { title: "Kills bacteria", body: "Disinfectant treatment knocks out bacteria where your pets and kids play." },
      { title: "Safe for your turf", body: "We only use turf-safe products, so your lawn stays looking great." },
      { title: "Perfect for El Paso heat", body: "Summer heat makes turf odors worse. Regular cleanings keep it fresh all year." },
    ],
    priceNote: "Custom quote for your turf", // PLACEHOLDER: add a starting price if you have one
    mascot: "sniffing",
    theme: "white",
  },
];

export const features = [
  { icon: "users", title: "Locally Owned", body: "An El Paso company serving our neighbors across El Paso County." },
  { icon: "paw", title: "Pet Safety", body: "Pet-safe, turf-safe products and gentle crews. Your pup's health comes first." },
  { icon: "laptop", title: "Customer Portal", body: "Book, manage appointments and pay invoices online, any time." },
  { icon: "file", title: "No Contracts", body: "Weekly, bi-weekly, monthly or one-time. Stay because you love us." },
  { icon: "camera", title: "Gate Photos", body: "Every gate double-checked, with a photo confirmation after each visit." },
  { icon: "message", title: "Automatic Reminders", body: "Automatic reminders before visits, plus quick, friendly communication." },
];

export const steps = [
  { title: "Request a Quote", body: "Tap any Free Quote button and fill out our quick online request form. Takes about a minute." },
  { title: "Schedule", body: "We'll confirm your quote and pick a weekly, bi-weekly or monthly service day. Your first scoop is free." },
  { title: "We Scoop", body: "We clean every corner, double-check your gate and send a photo confirmation." },
  { title: "Enjoy Your Yard", body: "Bare feet, backyard BBQs, cartwheels. Your yard is officially back in business." },
];

export type Location = {
  slug: string;
  city: string;
  region: string;
  neighborhoods: string[];
  /** position on the decorative map, 0–100 */
  pin: { x: number; y: number };
};

// El Paso County service areas.
// Pins are rough positions on the stylized county map (0–100).
export const locations: Location[] = [
  { slug: "west-el-paso", city: "West El Paso", region: "TX", neighborhoods: ["Upper Valley", "Coronado", "Kern Place"], pin: { x: 30, y: 40 } },
  { slug: "northeast-el-paso", city: "Northeast El Paso", region: "TX", neighborhoods: ["Northgate", "Castner Heights", "Sun Valley"], pin: { x: 50, y: 22 } },
  { slug: "east-el-paso", city: "East El Paso", region: "TX", neighborhoods: ["Eastridge", "Pebble Hills", "Tierra Del Este"], pin: { x: 62, y: 46 } },
  { slug: "horizon-city", city: "Horizon City", region: "TX", neighborhoods: ["Horizon Heights", "Paseo del Este"], pin: { x: 80, y: 56 } },
  { slug: "socorro", city: "Socorro & Lower Valley", region: "TX", neighborhoods: ["Socorro", "Ysleta", "San Elizario", "Clint"], pin: { x: 66, y: 70 } },
  { slug: "upper-valley", city: "Canutillo & Westway", region: "TX", neighborhoods: ["Canutillo", "Westway", "Vinton", "Anthony"], pin: { x: 18, y: 18 } },
];

export type Faq = { q: string; a: string; category: "Pricing" | "Service" | "Safety" | "Account" };

export const faqs: Faq[] = [
  { category: "Pricing", q: "How much does pet waste removal cost?", a: "Pricing depends on the number of dogs, yard size and how often you'd like service. Most recurring residential plans start around $20 per visit. Request a free quote and we'll give you an exact price, no surprises." },
  { category: "Safety", q: "Is it safe for my dogs to be in the yard while you clean?", a: "Totally fine for friendly pups! If your dog is anxious, protective or a known escape artist, just let us know and we'll ask that they stay inside during the visit." },
  { category: "Account", q: "Do I have to sign a contract?", a: "Nope. Choose weekly, bi-weekly, monthly or one-time service. You can change or pause your plan any time." },
  { category: "Service", q: "How often can you come?", a: "We offer weekly, bi-weekly and monthly recurring service, plus one-time cleanups for parties, move-outs or catch-up visits." },
  { category: "Safety", q: "Will you leave my gate open?", a: "Never on purpose. Our Gate Security Guarantee means we double-check every gate before we leave and send you a photo confirmation after each visit." },
  { category: "Service", q: "What if I'm not happy with a visit?", a: "Our 100% Satisfaction Guarantee has you covered. Let us know within 24 hours and we'll come back and make it right at no extra cost." },
  { category: "Service", q: "Do I need to be home during the visit?", a: "Not at all. Just make sure we can access the yard. You'll get automatic reminders and a photo of your closed gate when we're done." },
  { category: "Pricing", q: "Is the first scoop really free?", a: "Yes! When you sign up for weekly, bi-weekly or monthly service, your first scoop is on us." },
  { category: "Service", q: "Which areas do you serve?", a: "We serve El Paso and communities across El Paso County, including Horizon City, Socorro, Canutillo and the Upper and Lower Valley. Request a quote and we'll confirm we can reach you." },
  { category: "Account", q: "How do I book and pay?", a: "Everything happens through our secure customer portal: book online, manage appointments, pay invoices and receive automatic reminders." },
  { category: "Service", q: "Do you clean artificial turf?", a: "Yes. Our professional turf cleaning uses commercial equipment, deodorizer, disinfectant and turf-safe products to eliminate odors and bacteria." },
  { category: "Service", q: "Do you offer lawn care too?", a: "We do! Our lawn care service covers mowing, edging, trimming, weeding, yard cleanup and junk removal. Bundle it with poop scooping and we'll handle the whole yard in one visit." },
];

export const finalCta = {
  title: "Don't wait, sign up today!",
  body: "Request your free quote online and claim your first scoop on the house.",
};

export const about = {
  values: [
    { title: "Show up on time", body: "Reliability is the whole job. Timely visits and automatic reminders, every time." },
    { title: "Communicate clearly", body: "Quick replies, visit confirmations and gate photos, so you're never left wondering." },
    { title: "Leave it better", body: "Every gate double-checked, every corner covered, and a 100% satisfaction guarantee." },
    { title: "Treat pets like family", body: "Pet-safe, turf-safe products and a crew that genuinely loves dogs." },
  ],
  // PLACEHOLDER team members
  team: [
    { name: "Your Name", role: "Owner", dog: "Add your pup's name" },
    { name: "Team Member", role: "Lead Scooper", dog: "Add their pup's name" },
    { name: "Team Member", role: "Turf Specialist", dog: "Add their pup's name" },
  ],
};

export const referral = {
  title: `Give ${promo.referralCredit}, get ${promo.referralCredit}.`,
  body: `Love a clean yard? Spread the word. When a friend signs up with your name, you both get ${promo.referralCredit} off your next bill. No limit on referrals.`,
  steps: [
    { title: "Share", body: "Tell friends, neighbors and that one coworker who won't stop talking about their dog." },
    { title: "They sign up", body: "Your friend mentions your name when they request a quote." },
    { title: "You both save", body: `After their first paid visit, you each get ${promo.referralCredit} credited. Repeat forever.` },
  ],
};
