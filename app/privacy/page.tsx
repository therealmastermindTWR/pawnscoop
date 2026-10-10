import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the Paw N Scoop website handles your information.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "October 10, 2026";

/**
 * CONFIRM: Plain-language policy describing how this website currently works.
 * Have it reviewed, and update it if you add analytics, ads, email forms or other tools.
 */
export default function PrivacyPage() {
  return (
    <Section theme="white" aria-labelledby="privacy-title" className="py-16 md:py-24">
      <article className="container-x max-w-3xl text-charcoal [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-ink [&_a]:font-semibold [&_a]:text-ink [&_a]:underline [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1">
        <h1 id="privacy-title" className="text-5xl font-extrabold text-ink md:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm">Last updated: {UPDATED}</p>

        <p>
          This policy explains how {site.name} (&quot;we&quot;, &quot;us&quot;) handles information when you visit {site.url.replace("https://", "")}. If you have
          questions, contact us at <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone}.
        </p>

        <h2>Quote requests and bookings</h2>
        <p>
          When you request a quote or log in to your account, you&apos;re taken to our secure customer portal, which is provided by Jobber. Information you
          enter there (such as your name, contact details, address and service needs) is collected and stored by Jobber on our behalf and is used to
          provide quotes, schedule and deliver services, send reminders and handle billing. Jobber&apos;s handling of that information is described in{" "}
          <a href="https://www.getjobber.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
            Jobber&apos;s privacy policy
          </a>
          .
        </p>

        <h2>When you contact us directly</h2>
        <p>If you call, text or email us, we use the information you share to respond to you and to provide the services you ask about.</p>

        <h2>Information collected by this website</h2>
        <ul>
          <li>This website does not use advertising or analytics tracking cookies.</li>
          <li>
            Your browser may store small preferences on your own device, such as whether you&apos;ve dismissed the announcement bar or already seen the
            loading animation. These never leave your device.
          </li>
          <li>Like most websites, our hosting provider may keep standard server logs (such as IP address and pages requested) for security and reliability.</li>
          <li>Links to Google (reviews, maps) take you to Google&apos;s own websites, which are covered by Google&apos;s privacy policy.</li>
        </ul>

        <h2>Sharing</h2>
        <p>We don&apos;t sell your personal information. We only share it with service providers that help us run our business (such as Jobber), or when required by law.</p>

        <h2>Your choices</h2>
        <p>You can ask us to access, correct or delete the personal information we hold about you by contacting us using the details above.</p>

        <h2>Changes</h2>
        <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>

        <p className="mt-10">
          <Link href="/">← Back to home</Link>
        </p>
      </article>
    </Section>
  );
}
