"use client";

import { useSyncExternalStore } from "react";

// Midnight after October 18 in Pembroke (America/New_York).
const expiresAt = Date.parse("2026-10-19T00:00:00-04:00");

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
        <h2 id="location-notice-title">October 12–18, 2026 · All programs</h2>
        <p className="location-notice-move">
          <strong>Bring a friend to class for free</strong>
        </p>
        <p>Mini Soccer · Intro to Speed &amp; Agility · Youth Sports Performance</p>
      </div>
    </aside>
  );
}
