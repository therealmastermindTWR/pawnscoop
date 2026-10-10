/**
 * Quote requests / bookings go straight to Jobber (`site.bookingUrl` in lib/content.ts).
 *
 * The contact + referral forms below are still stubs.
 * TODO(backend): wire these to email or Jobber (e.g. a Next.js Route Handler at
 * /app/api/contact/route.ts that sends via Resend/SendGrid, or a Zapier webhook).
 * Keep API keys server-side, never in client code.
 */
export async function submitForm(kind: "contact" | "referral", data: Record<string, string>): Promise<{ ok: boolean }> {
  await new Promise((r) => setTimeout(r, 800));
  void kind;
  void data;
  return { ok: true };
}
