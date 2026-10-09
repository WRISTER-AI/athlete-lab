"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { reviewPrograms } from "../lib/testimonials";
import styles from "./ReviewForm.module.css";

export default function ReviewForm({ token, available }: { token: string; available: boolean }) {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !available) return;
    const form = new FormData(event.currentTarget);
    setPending(true); setError("");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: form.get("displayName"), program: form.get("program"), quote: form.get("quote"), permissionToPublish: form.get("permission") === "on", website: form.get("website"), token }),
      });
      const result = await response.json();
      if (response.ok && result.success === true) setSent(true);
      else setError(result.error || "We couldn't save your review. Please try again.");
    } catch { setError("Connection interrupted. Please try again when you're back online."); }
    finally { setPending(false); }
  }

  if (sent) return <div className={styles.success} role="status"><h2>Thank you!</h2><p>Your review has been received. We appreciate you sharing your experience.</p><Link href="/#reviews">Back to The Athlete Lab →</Link></div>;

  return <form className={styles.form} onSubmit={submit}>
    <label htmlFor="review-name">Display name</label>
    <input id="review-name" name="displayName" placeholder="First name and last initial" autoComplete="nickname" minLength={2} maxLength={60} required aria-describedby="name-help" />
    <p id="name-help" className={styles.help}>Use your name, rather than your child’s full name.</p>
    <label htmlFor="review-program">Program</label>
    <select id="review-program" name="program" defaultValue="" required><option value="" disabled>Choose a program</option>{reviewPrograms.map((program) => <option key={program}>{program}</option>)}</select>
    <label htmlFor="review-quote">Your review</label>
    <textarea id="review-quote" name="quote" rows={6} minLength={20} maxLength={2000} placeholder="What has your experience been like?" required />
    <div className={styles.honeypot} aria-hidden="true"><label htmlFor="review-website">Website</label><input id="review-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <label className={styles.consent}><input type="checkbox" name="permission" required /><span>I’m a parent, guardian, or adult participant, and I give permission to share this review and display name on The Athlete Lab website.</span></label>
    {!available && <p className={styles.error} role="status">The review form is being connected. Please check back shortly.</p>}
    {error && <p className={styles.error} role="alert">{error}</p>}
    <button className={styles.submit} disabled={pending || !available} type="submit">{pending ? "Submitting…" : "Submit review"}</button>
  </form>;
}
