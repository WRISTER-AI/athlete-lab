import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { publicTestimonial, type ReviewSubmission } from "./testimonials";

const siteId = "9cc93184-95fb-492d-9187-1d4ce30db037";
const collectionId = "WebsiteReviews";
export function reviewsConfigured() { return Boolean(process.env.WIX_REVIEWS_API_KEY); }
function key() {
  const value = process.env.WIX_REVIEWS_API_KEY;
  if (!value) throw new Error("Reviews connection is not configured");
  return value;
}

export class ReviewStoreError extends Error {
  constructor(public status: number) { super("Review storage request failed"); }
}

async function wixRequest(path: string, body: object) {
  const response = await fetch(`https://www.wixapis.com/wix-data/v2/${path}`, {
    method: "POST",
    headers: { Authorization: key(), "wix-site-id": siteId, "Content-Type": "application/json" },
    body: JSON.stringify(body), cache: "no-store", signal: AbortSignal.timeout(12000),
  });
  // Never expose Wix response bodies, private records or credentials to visitors/logs.
  if (!response.ok) throw new ReviewStoreError(response.status);
  return response.json();
}

export async function getPublicReviews() {
  if (!reviewsConfigured()) return [];
  const result = await wixRequest("items/query", {
    dataCollectionId: collectionId,
    consistentRead: true,
    query: {
      filter: { approved: true, permissionToPublish: true },
      sort: [{ fieldName: "submittedAt", order: "DESC" }],
      paging: { limit: 100 },
      fields: ["displayName", "program", "quote", "approved", "permissionToPublish"],
    },
  });
  if (!Array.isArray(result.dataItems)) throw new Error("Invalid review response");
  // Check approval again and return public fields only, even if upstream filtering changes.
  return result.dataItems.map(publicTestimonial).filter(Boolean);
}

export function reviewToken(now = Date.now()) {
  const time = String(now);
  return `${time}.${createHmac("sha256", key()).update(`review-form:${time}`).digest("hex")}`;
}

export function validReviewToken(token: unknown, now = Date.now()) {
  if (typeof token !== "string" || !/^\d{13}\.[a-f0-9]{64}$/.test(token)) return false;
  const timestamp = Number(token.split(".")[0]);
  if (now - timestamp < 2000 || now - timestamp > 24 * 60 * 60 * 1000) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(reviewToken(timestamp)));
}

export async function saveReview(review: ReviewSubmission, clientIp: string) {
  // Atomic per-network hourly limit: Wix's create-only insert rejects duplicate IDs.
  // Store only a keyed hash, never the visitor's IP address.
  const digest = createHmac("sha256", key()).update(`review-limit:${clientIp}:${Math.floor(Date.now() / 3600000)}`).digest("hex");
  const id = `${digest.slice(0,8)}-${digest.slice(8,12)}-${digest.slice(12,16)}-${digest.slice(16,20)}-${digest.slice(20,32)}`;
  const result = await wixRequest("items", {
    dataCollectionId: collectionId,
    dataItem: { id, data: {
      displayName: review.displayName, program: review.program, quote: review.quote,
      permissionToPublish: true, approved: false, submittedAt: new Date().toISOString(),
    } },
  });
  if (result.dataItem?.id !== id) throw new Error("Review was not confirmed saved");
}
