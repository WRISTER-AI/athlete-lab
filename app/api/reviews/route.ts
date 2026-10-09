import { getPublicReviews, reviewsConfigured, ReviewStoreError, saveReview, validReviewToken } from "../../lib/review-store";
import { validateReview } from "../../lib/testimonials";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const reply = (body: object, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function GET() {
  try { return reply({ reviews: await getPublicReviews() }); }
  catch { return reply({ reviews: [] }, 503); }
}

export async function POST(request: Request) {
  if (!reviewsConfigured()) return reply({ error: "Reviews are temporarily unavailable. Please try again shortly." }, 503);
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return reply({ error: "Please submit your review from our website." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "Invalid submission." }, 415);
  // Bound the actual streamed body, not just the caller-supplied Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return reply({ error: "Missing review." }, 400);
  let bytes = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      bytes += part.value.length;
      if (bytes > 12000) { await reader.cancel(); return reply({ error: "Your review is too long." }, 413); }
      chunks.push(part.value);
    }
    const raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    const review = validateReview(raw);
    if (!review || raw.website || !validReviewToken(raw.token)) return reply({ error: "Please check the fields. If this page has been open for a while, refresh and try again." }, 400);
    // Vercel overwrites this header. Never accept a client-supplied IP from the JSON body.
    const ip = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for") : "local-preview";
    if (!ip) return reply({ error: "Please try again shortly." }, 503);
    await saveReview(review, ip);
    return reply({ success: true });
  } catch (error) {
    if (error instanceof SyntaxError) return reply({ error: "Invalid submission." }, 400);
    if (error instanceof ReviewStoreError && error.status === 409) return reply({ error: "A review was already received from your network recently. Please try again in an hour if you need to submit another." }, 429);
    return reply({ error: "We couldn't confirm your review was saved. Please try again shortly." }, 503);
  }
}
