import type { Metadata } from "next";
import Link from "next/link";
import { reviewToken, reviewsConfigured } from "../lib/review-store";
import ReviewForm from "./ReviewForm";
import styles from "./ReviewForm.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Write a review | The Athlete Lab", description: "Share your experience at The Athlete Lab." };

export default function WriteReview() {
  const configured = reviewsConfigured();
  return <main className={styles.page}>
    <div className={styles.container}>
      <Link href="/#reviews" className={styles.back}>← The Athlete Lab</Link>
      <p className={styles.eyebrow}>YOUR EXPERIENCE</p>
      <h1>Write a review</h1>
      <p className={styles.intro}>Tell us about your time at The Athlete Lab.</p>
      <ReviewForm token={configured ? reviewToken() : ""} available={configured} />
    </div>
  </main>;
}
