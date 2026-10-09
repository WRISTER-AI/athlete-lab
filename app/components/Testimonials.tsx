import { ArrowUpRight, Mail, MessageSquareQuote, Quote } from "lucide-react";
import { approvedTestimonials, reviewEmail, reviewEmailUrl } from "../lib/testimonials";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const testimonials = approvedTestimonials.filter((review) => review.approvedForPublication === true);

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Reviews &amp; testimonials</p>
            <h2 id="reviews-heading" className={styles.heading}>
              Your athlete.<br />
              <span>Your experience.</span>
            </h2>
            <p className={styles.description}>
              The small wins. The growing confidence. The excitement to come back.
              We&apos;d love to hear what training at The Athlete Lab has meant for your family.
            </p>
            <div className={styles.note}>
              <MessageSquareQuote size={20} aria-hidden="true" />
              <p>Parent and athlete experiences, shared with permission.</p>
            </div>
          </div>

          <div className={styles.invitation}>
            <span className={styles.icon}><Mail size={24} aria-hidden="true" /></span>
            <h3>Share your experience</h3>
            <p>
              Tell Coach Francis which program you joined and what stood out.
              A few honest sentences are all you need.
            </p>
            <a className={styles.button} href={reviewEmailUrl}>
              Email a review <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <p className={styles.emailHelp}>
              Opens your email app with a draft. Review it and send when you&apos;re ready.
              You can also email <a href={`mailto:${reviewEmail}`}>{reviewEmail}</a> directly.
            </p>
            <p className={styles.privacy}>
              Reviews go privately to Coach Francis first. With your permission, selected
              testimonials may appear here after his approval. Your email address stays private.
            </p>
          </div>
        </div>

        {testimonials.length > 0 && (
          <div className={styles.testimonials}>
            <h3 className={styles.testimonialsHeading}>From our Athlete Lab families</h3>
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
          </div>
        )}
      </div>
    </section>
  );
}
