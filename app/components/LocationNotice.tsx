"use client";

import { useSyncExternalStore } from "react";

// Midnight after October 11 in Pembroke (America/New_York).
const expiresAt = Date.parse("2026-10-12T00:00:00-04:00");

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
}

function isActive() {
  return Date.now() < expiresAt;
}

export default function LocationNotice({ homepage = false }: { homepage?: boolean }) {
  const active = useSyncExternalStore(subscribe, isActive, () => true);
  if (!active) return null;

  return (
    <aside
      className={`location-notice${homepage ? " location-notice-home" : ""}`}
      aria-labelledby="location-notice-title"
    >
      <div className="location-notice-content">
        <h2 id="location-notice-title">October 5–11, 2026 · Temporary location change</h2>
        <p className="location-notice-move">
          <strong>Mini Soccer &amp; Intro to Speed &amp; Agility</strong> move to{" "}
          <strong>Riverside Sports Complex</strong>.
        </p>
        <p>38 Riverside Drive, Pembroke · Same class days and times, including drop-ins.</p>
        <p className="location-notice-reason">Due to a consignment sale at City Arena. This change applies only to October 5–11.</p>
        <p className="location-notice-staying">
          <strong>All Youth Sports Performance classes remain at City Arena in the gym.</strong>
        </p>
      </div>
    </aside>
  );
}
