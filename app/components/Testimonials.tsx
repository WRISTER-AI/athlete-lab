import { ArrowUpRight, Quote } from "lucide-react";
import { approvedTestimonials, reviewEmailUrl } from "../lib/testimonials";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const testimonials = approvedTestimonials.filter((review) => review.approvedForPublication === true);

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="reviews-heading" className={styles.heading}>Testimonials</h2>
          <a className={styles.writeLink} href={reviewEmailUrl}>
            Write a review <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>

        {testimonials.length > 0 && (
          <div className={styles.grid}>
            {testimonials.map((review) => (
              <figure key={review.id} className={styles.card}>
                <Quote size={26} className={styles.quoteIcon} aria-hidden="true" />
                <blockquote>{review.quote}</blockquote>
                <figcaption>
                  <span className={styles.name}>{review.displayName}</span>
                  <span className={styles.program}>{review.program}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
