export type ApprovedTestimonial = {
  id: string;
  quote: string;
  displayName: string;
  program: string;
  approvedForPublication: true;
};

// Public content only. Add an authentic quote after Francis approves its exact
// wording and display name, and the author gives permission to publish it.
// Keep pending submissions and approval records in the private Wix collection,
// never in this file: everything here is included in the public website.
export const approvedTestimonials: ApprovedTestimonial[] = [];

export const reviewFormUrl = "/write-review";
export const reviewPrograms = ["Mini Soccer", "Intro to Speed & Agility", "Youth Sports Performance"] as const;

export type ReviewSubmission = { displayName: string; program: string; quote: string; permissionToPublish: true };

export function validateReview(value: unknown): ReviewSubmission | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  if (typeof raw.displayName !== "string" || typeof raw.program !== "string" || typeof raw.quote !== "string" || raw.permissionToPublish !== true) return null;
  const displayName = raw.displayName.trim();
  const quote = raw.quote.trim();
  if (displayName.length < 2 || displayName.length > 60 || quote.length < 20 || quote.length > 2000 || !reviewPrograms.some((program) => program === raw.program)) return null;
  // Explicit allowlist: visitors can never set approval, IDs or CMS metadata.
  return { displayName, program: raw.program, quote, permissionToPublish: true };
}

export function publicTestimonial(item: { id?: string; data?: Record<string, unknown> }): ApprovedTestimonial | null {
  const data = item.data;
  if (!data || data.approved !== true || data.permissionToPublish !== true || typeof item.id !== "string") return null;
  const review = validateReview(data);
  if (!review) return null;
  return { id: item.id, displayName: review.displayName, quote: review.quote, program: review.program, approvedForPublication: true };
}
