"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, MapPin, ArrowLeft } from "lucide-react";
import { brand, programs } from "../lib/data";
import type { ScheduleEntry } from "../lib/data";

export default function FullSchedulePage() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const getClassesForDay = (day: string) => {
    const classes: Array<ScheduleEntry & { program: string; color: string; ageGroup: string; bookingUrl: string }> = [];
    programs.forEach((p) => {
      p.schedule.forEach((s) => {
        if (s.day === day) {
          classes.push({ ...s, program: p.name, color: p.color, ageGroup: p.ageGroup, bookingUrl: p.bookingUrl });
        }
      });
    });
    return classes.sort((a, b) => {
      const parseTime = (t: string) => {
        const match = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        if (!match) return 0;
        let h = parseInt(match[1]);
        const m = parseInt(match[2]);
        const ampm = match[3].toUpperCase();
        if (ampm === "PM" && h !== 12) h += 12;
        if (ampm === "AM" && h === 12) h = 0;
        return h * 60 + m;
      };
      return parseTime(a.time) - parseTime(b.time);
    });
  };

  return (
    <div style={{ background: brand.bg, minHeight: "100vh", color: brand.text }}>
      {/* Simple top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(5,5,5,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${brand.border}`,
          padding: "16px clamp(20px, 4vw, 48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 600,
            color: brand.muted,
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/AthleteLab Logo Main.png"
          alt="The Athlete Lab"
          style={{ height: 40, width: "auto", objectFit: "contain" }}
        />
      </div>

      <div style={{ padding: "60px clamp(20px, 4vw, 48px) 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: brand.red,
              marginBottom: 16,
            }}
          >
            Weekly Schedule
          </span>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: brand.text,
              margin: 0,
            }}
          >
            Every session, every location
          </h1>
          <p style={{ fontSize: 16, color: brand.muted, marginTop: 12 }}>
            Tap any class to book directly.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {days.map((day) => {
            const classes = getClassesForDay(day);
            if (classes.length === 0) return null;
            return (
              <div
                key={day}
                style={{
                  background: "rgba(20, 20, 20, 0.4)",
                  border: `1px solid ${brand.border}`,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    borderBottom: `1px solid ${brand.border}`,
                    fontSize: 15,
                    fontWeight: 800,
                    color: brand.text,
                    letterSpacing: "0.02em",
                  }}
                >
                  {day}
                </div>
                <div style={{ padding: 12 }}>
                  {classes.map((cls, i) => (
                    <a
                      key={i}
                      href={cls.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        textDecoration: "none",
                        padding: "12px 14px",
                        borderRadius: 8,
                        marginBottom: i < classes.length - 1 ? 8 : 0,
                        background: brand.bg,
                        border: `1px solid ${brand.border}`,
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = cls.color;
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = brand.border;
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 6,
                        }}
                      >
                        <span style={{ fontSize: 13, fontWeight: 700, color: cls.color }}>
                          {cls.program}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            padding: "2px 8px",
                            borderRadius: 100,
                            background: `${cls.color}15`,
                            color: cls.color,
                            fontWeight: 600,
                          }}
                        >
                          {cls.ageGroup}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: brand.mutedLight,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Clock size={12} /> {cls.time}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: brand.muted,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginTop: 4,
                        }}
                      >
                        <MapPin size={12} /> {cls.location}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
