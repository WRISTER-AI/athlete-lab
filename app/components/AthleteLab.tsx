"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Play, MapPin, Clock, ChevronDown, Menu, X, Mail, Phone,
  Calendar, ArrowRight,
  CheckCircle, Smartphone,
} from "lucide-react";
import { brand, assets, promo, programs, coaches } from "../lib/data";
import type { Program } from "../lib/data";

// Data imported from ../lib/data

// Assets, programs, coaches imported from ../lib/data

// Types imported from ../lib/data


// ── Reusable Components ──

function GlowEffect({
  color = brand.red,
  top = "0%",
  left = "50%",
  size = "600px",
  opacity = 0.12,
}: {
  color?: string;
  top?: string;
  left?: string;
  size?: string;
  opacity?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      style={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        opacity,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        filter: "blur(60px)",
        mixBlendMode: "screen",
      }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </span>
  );
}

function SectionHeadline({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <h2
      style={{
        fontSize: "clamp(32px, 5vw, 52px)",
        fontWeight: 800,
        letterSpacing: "-0.03em",
        lineHeight: 1.1,
        color: brand.text,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function Button({
  children,
  variant = "primary",
  href = "#",
  onClick,
  style = {},
  icon,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
  icon?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isPrimary = variant === "primary";
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 52,
        padding: "0 32px",
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        textDecoration: "none",
        borderRadius: 4,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.65, 0, 0.076, 1)",
        ...(isPrimary
          ? {
              background: hovered ? brand.redHover : brand.red,
              color: "#fff",
              border: "none",
              transform: hovered ? "translateY(-1px)" : "none",
              boxShadow: hovered ? `0 8px 30px ${brand.redGlow}` : "none",
            }
          : {
              background: hovered ? "rgba(255,255,255,0.08)" : "rgba(20,20,20,0.5)",
              backdropFilter: "blur(12px)",
              color: brand.text,
              border: `1px solid ${hovered ? brand.mutedLight : "rgba(255,255,255,0.15)"}`,
              boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
            }),
        ...style,
      }}
    >
      {children}
      {icon && <ArrowRight size={16} />}
    </a>
  );
}

function VideoPlayer({
  src,
  label,
}: {
  src: string;
  label?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.load();
  }, [src]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${brand.border}`,
        cursor: "pointer",
        background: "#000",
      }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        preload="auto"
        style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }}
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.28)",
            }}
          />
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "rgba(220,38,38,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(220,38,38,0.4)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Play size={28} fill="#fff" color="#fff" style={{ marginLeft: 3 }} />
          </div>
          {label && (
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(255,255,255,0.7)",
                zIndex: 1,
              }}
            >
              ▶ {label}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ImageCard({ src, label }: { src: string; label?: string }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${brand.border}`,
        background: "#000",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label || ""}
        style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }}
      />
      {label && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "24px 16px 16px",
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

// ── Navigation ──
function PromoBanner({
  visible,
  onNavigate,
}: {
  visible: boolean;
  onNavigate: (id: string) => void;
}) {
  if (!visible) return null;

  return (
    <div
      className="promo-banner"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 120,
        minHeight: 46,
        background: "linear-gradient(90deg, #dc2626, #f97316)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "9px clamp(16px, 4vw, 48px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.28)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <span className="promo-title-desktop" style={{ fontSize: 13, fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          {promo.title}
        </span>
        <span
          className="promo-title-mobile"
          style={{
            display: "none",
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Friend free this week
        </span>
        <span
          className="promo-banner-copy"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.86)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {promo.body}
        </span>
      </div>
      <a
        href={`#${promo.ctaTarget}`}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(promo.ctaTarget);
        }}
        style={{
          flex: "0 0 auto",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          height: 28,
          padding: "0 12px",
          borderRadius: 6,
          background: "#fff",
          color: brand.red,
          fontSize: 11,
          fontWeight: 900,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          textDecoration: "none",
        }}
      >
        <span className="promo-cta-full">{promo.ctaLabel}</span>
        <span className="promo-cta-short" style={{ display: "none" }}>Book</span>
        <ArrowRight size={13} />
      </a>
      <style>{`
        @media (max-width: 720px) {
          .promo-banner { justify-content: space-between !important; gap: 10px !important; }
          .promo-title-desktop { display: none !important; }
          .promo-title-mobile { display: inline !important; }
          .promo-banner-copy { display: none !important; }
          .promo-cta-full { display: none !important; }
          .promo-cta-short { display: inline !important; }
        }
      `}</style>
    </div>
  );
}

function Nav({ onNavigate, promoVisible }: { onNavigate: (id: string) => void; promoVisible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const links = [
    { label: "Programs", id: "programs" },
    { label: "Schedule", id: "schedule", href: "/schedule" },
    { label: "Coach", id: "coaches" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <motion.nav
        className="main-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: promoVisible ? 46 : 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 110,
          background: scrolled ? "rgba(5, 5, 5, 0.7)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(150%)" : "none",
          borderBottom: scrolled ? `1px solid rgba(255, 255, 255, 0.05)` : "1px solid transparent",
          transition: "background 0.3s ease, backdrop-filter 0.3s ease, border-bottom 0.3s ease",
          display: "flex",
          alignItems: "center",
          padding: "0 clamp(20px, 4vw, 48px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginRight: "auto" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/AthleteLab Logo Main.png"
            alt="The Athlete Lab"
            style={{ height: 84, width: "auto", objectFit: "contain" }}
          />
        </div>

        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map((link) =>
            link.href ? (
              <Link
                key={link.id}
                href={link.href}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: brand.muted,
                  transition: "color 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = brand.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = brand.muted)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.id);
                }}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: brand.muted,
                  transition: "color 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = brand.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = brand.muted)}
              >
                {link.label}
              </a>
            )
          )}
          <Button
            href="#programs"
            variant="primary"
            style={{ height: 42, padding: "0 24px", fontSize: 12 }}
            onClick={(e) => {
              e.preventDefault();
              onNavigate("programs");
            }}
          >
            Book a Session
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-menu-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: brand.text,
            cursor: "pointer",
            padding: 8,
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(30px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              background: "rgba(5, 5, 5, 0.85)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            {links.map((link, i) =>
              link.href ? (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{ fontSize: 24, fontWeight: 700, color: brand.text, textDecoration: "none" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.id);
                    setMobileOpen(false);
                  }}
                  style={{ fontSize: 24, fontWeight: 700, color: brand.text, textDecoration: "none" }}
                >
                  {link.label}
                </motion.a>
              )
            )}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Button
                href="#programs"
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("programs");
                  setMobileOpen(false);
                }}
              >
                Book a Session
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .main-nav {
            background: rgba(5, 5, 5, 0.95) !important;
            backdrop-filter: blur(24px) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          }
        }
      `}</style>
    </>
  );
}

// ── Hero ──
function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: brand.bg,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 80% 20%, ${brand.redGlow} 0%, transparent 40%), radial-gradient(ellipse at 20% 80%, rgba(20,20,20,0.8) 0%, transparent 50%)`,
          filter: "blur(80px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        className="hero-split-grid"
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          alignItems: "center",
        }}
      >
        {/* Left Content Side */}
        <div
          className="hero-content-left"
          style={{
            padding: "160px clamp(20px, 4vw, 64px) 100px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
            style={{ maxWidth: 640, marginLeft: "auto", marginRight: "clamp(0px, 2vw, 40px)" }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${brand.border}`,
                borderRadius: 100,
                padding: "8px 16px",
                marginBottom: 32,
                fontSize: 13,
                color: brand.muted,
                fontWeight: 500,
                backdropFilter: "blur(8px)",
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e" }} />
              Now enrolling for Fall 2026
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{
                fontFamily: "var(--font-syncopate), sans-serif",
                fontSize: "clamp(48px, 6vw, 84px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: brand.text,
                textTransform: "uppercase",
                margin: "0 0 28px 0",
              }}
            >
              BUILD
              <br />
              <span style={{ color: brand.red }}>ELITE</span>
              <br />
              ATHLETES.
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                fontSize: 18,
                lineHeight: 1.65,
                color: brand.muted,
                maxWidth: 440,
                margin: "0 0 40px 0",
              }}
            >
              Youth speed, strength, and conditioning training on the South Shore. Pembroke and Hanover, MA.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <Button
                href="#programs"
                variant="primary"
                icon
                onClick={(e) => { e.preventDefault(); onNavigate("programs"); }}
              >
                Book a Session
              </Button>
              <Button
                href="#programs"
                variant="ghost"
                onClick={(e) => { e.preventDefault(); onNavigate("programs"); }}
              >
                View Programs
              </Button>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                display: "flex",
                gap: 40,
                marginTop: 64,
                paddingTop: 32,
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
              className="trust-row"
            >
              {[
                { num: "14+", label: "Weekly sessions" },
                { num: "2–17", label: "Ages served" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: brand.text, letterSpacing: "-0.02em", fontFamily: "Georgia, serif" }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: 12, color: brand.muted, fontWeight: 500, marginTop: 3 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Media Side */}
        <div
          className="hero-media-side"
          style={{
            height: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px clamp(20px, 3vw, 40px) 40px 0",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{
              width: "100%",
              height: "calc(100vh - 160px)",
              maxHeight: 800,
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              border: `1px solid rgba(255,255,255,0.1)`,
              boxShadow: "0 20px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(45deg, ${brand.red} 0%, transparent 100%)`,
                opacity: 0.2,
                mixBlendMode: "overlay",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              src={assets.mainVideo}
              poster={assets.videoPoster}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Decorative Glows */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "-10%",
          width: "40vw",
          height: "40vw",
          background: brand.red,
          opacity: 0.05,
          filter: "blur(120px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "10%",
          width: "50vw",
          height: "50vw",
          background: brand.red,
          opacity: 0.03,
          filter: "blur(100px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <style>{`
        @media (max-width: 1024px) {
          .hero-split-grid {
            grid-template-columns: 1fr !important;
            height: auto !important;
            min-height: 0 !important;
          }
          .hero-media-side {
            padding: 130px clamp(20px, 4vw, 64px) 0 !important;
            height: 65vw !important;
            max-height: 520px !important;
            min-height: 280px !important;
            order: -1;
          }
          .hero-content-left {
            padding: 32px clamp(20px, 4vw, 64px) 80px !important;
          }
        }
        @media (max-width: 768px) {
          .trust-row { gap: 20px !important; flex-wrap: wrap !important; justify-content: center !important; text-align: center !important; }
          .hero-media-side { height: 56vw !important; }
          .hero-content-left { padding-bottom: 60px !important; }
        }
        @media (max-width: 480px) {
          .schedule-row { grid-template-columns: 1fr !important; gap: 4px !important; }
          .schedule-row span { justify-content: flex-start !important; }
          .program-features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ── Program Card ──
function ProgramCard({ program, isActive }: { program: Program; isActive: boolean }) {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  if (!isActive) return null;

  return (
    <div
      className="program-card-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 40,
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24,
        padding: "clamp(20px, 4vw, 40px)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      }}
    >
      <div>
        {program.video ? (
          <VideoPlayer
            src={program.video}
            label={`${program.name} in action`}
          />
        ) : (
          <ImageCard src={program.image} label={program.name} />
        )}
      </div>

      <div>
        {program.featured && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 100,
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.3)",
              fontSize: 11,
              fontWeight: 800,
              color: brand.red,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            ★ FEATURED PROGRAM
          </div>
        )}

        <div
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: 100,
            background: `${program.color}15`,
            border: `1px solid ${program.color}30`,
            fontSize: 12,
            fontWeight: 700,
            color: program.color,
            letterSpacing: "0.04em",
            marginBottom: 16,
          }}
        >
          {program.ageGroup}
        </div>

        <h3
          style={{
            fontSize: program.featured ? 42 : 36,
            fontWeight: 900,
            color: brand.text,
            letterSpacing: "-0.02em",
            margin: "0 0 8px 0",
          }}
        >
          {program.name}
        </h3>

        <p style={{ fontSize: 14, color: brand.muted, fontStyle: "italic", margin: "0 0 20px 0" }}>
          {program.tagline}
        </p>

        <p style={{ fontSize: 15, lineHeight: 1.7, color: brand.mutedLight, margin: "0 0 24px 0" }}>
          {program.description}
        </p>

        <div
          className="program-features-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px 16px",
            marginBottom: 24,
          }}
        >
          {program.features.map((f) => (
            <div
              key={f}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: brand.mutedLight,
              }}
            >
              <CheckCircle size={14} color={program.color} /> {f}
            </div>
          ))}
        </div>

        <div
          style={{
            background: brand.surface,
            border: `1px solid ${brand.border}`,
            borderRadius: 10,
            padding: "20px 24px",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: brand.text,
                fontFamily: "Georgia, serif",
              }}
            >
              {program.price}
            </span>
            {program.priceSub && (
              <span style={{ fontSize: 14, color: brand.muted, fontWeight: 500 }}>
                {program.priceSub}
              </span>
            )}
          </div>
          {program.priceAlt && (
            <div style={{ fontSize: 14, color: brand.mutedLight, marginTop: 6, fontWeight: 500 }}>
              or {program.priceAlt}
            </div>
          )}
          {program.priceNote && !program.priceAlt && (
            <div style={{ fontSize: 13, color: brand.muted, marginTop: 8, fontStyle: "italic" }}>
              {program.priceNote}
            </div>
          )}
        </div>

        <button
          onClick={() => setScheduleOpen(!scheduleOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            background: brand.surface,
            border: `1px solid ${brand.border}`,
            borderRadius: 10,
            padding: "14px 20px",
            cursor: "pointer",
            color: brand.text,
            fontSize: 14,
            fontWeight: 600,
            marginBottom: scheduleOpen ? 0 : 20,
            borderBottomLeftRadius: scheduleOpen ? 0 : 10,
            borderBottomRightRadius: scheduleOpen ? 0 : 10,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Calendar size={16} /> Schedule &amp; Locations
          </span>
          <ChevronDown
            size={18}
            style={{
              transition: "transform 0.2s ease",
              transform: scheduleOpen ? "rotate(180deg)" : "none",
            }}
          />
        </button>

        {scheduleOpen && (
          <div
            style={{
              background: brand.surface,
              border: `1px solid ${brand.border}`,
              borderTop: "none",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: "4px 20px 16px",
              marginBottom: 20,
            }}
          >
            {program.schedule.map((s) => (
              <div
                key={`${s.label || program.name}-${s.day}-${s.time}`}
                className="schedule-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr 1fr",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: `1px solid ${brand.border}`,
                  fontSize: 14,
                }}
              >
                <span style={{ color: brand.text }}>
                  <span style={{ display: "block", fontWeight: 700 }}>{s.day}</span>
                  {s.label && (
                    <span style={{ display: "block", color: program.color, fontSize: 11, fontWeight: 700, marginTop: 3 }}>
                      {s.label}
                    </span>
                  )}
                </span>
                <span
                  style={{
                    color: brand.mutedLight,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Clock size={13} /> {s.time}
                </span>
                <span
                  style={{
                    color: brand.muted,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <MapPin size={13} /> {s.location}
                </span>
              </div>
            ))}
          </div>
        )}

        <Button
          href={program.primaryCtaUrl || program.bookingUrl}
          variant="primary"
          icon
          style={{ width: "100%", justifyContent: "center" }}
        >
          {program.primaryCtaLabel || `Book ${program.name}`}
        </Button>

        {(program.secondaryLinks || (program.bookingUrlAlt ? [{ label: program.bookingUrlAltLabel || "View Package Options", href: program.bookingUrlAlt }] : [])).map((link) => (
          <a
            key={`${program.id}-${link.href}-${link.label}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              fontSize: 13,
              fontWeight: 600,
              color: program.color,
              textDecoration: "none",
              marginTop: 10,
              padding: "10px 12px",
              border: `1px solid ${program.color}55`,
              borderRadius: 8,
              background: `${program.color}10`,
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {link.label}
          </a>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @media (max-width: 900px) { .program-card-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) {
          .schedule-row { grid-template-columns: 1fr !important; gap: 4px !important; padding: 10px 0 !important; }
          .program-features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ── Programs Section ──
function Programs() {
  const [activeProgram, setActiveProgram] = useState("mini-soccer");

  return (
    <section
      id="programs"
      style={{
        position: "relative",
        padding: "120px clamp(20px, 4vw, 48px)",
        background: brand.bg,
      }}
    >
      <GlowEffect color={brand.red} top="0%" left="50%" size="1000px" opacity={0.04} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionLabel>Programs</SectionLabel>
          <SectionHeadline>Find the right program for your athlete</SectionHeadline>
          <p
            style={{
              fontSize: 16,
              color: brand.muted,
              marginTop: 12,
              maxWidth: 500,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Structured, coached programs built around long-term youth athlete development on the South Shore.
          </p>
        </div>

        <div
          className="program-tab-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: 8,
            marginBottom: 48,
          }}
        >
          {programs.map((p) => {
            const isActive = activeProgram === p.id;
            return (
              <motion.button
                key={p.id}
                onClick={() => setActiveProgram(p.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  width: "100%",
                  minHeight: 68,
                  minWidth: 0,
                  padding: "12px 14px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  border: isActive ? `2px solid ${p.color}` : `1px solid ${brand.border}`,
                  background: isActive ? `${p.color}10` : brand.surface,
                  color: isActive ? p.color : brand.muted,
                  transition: "all 0.2s ease",
                }}
              >
                {p.ageGroup}
                <span
                  style={{
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 100,
                    background: isActive ? `${p.color}20` : brand.surfaceLight,
                    color: isActive ? p.color : brand.muted,
                    lineHeight: 1.25,
                    textAlign: "center",
                  }}
                >
                  {p.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        {programs.map((p) => (
          <ProgramCard key={p.id} program={p} isActive={activeProgram === p.id} />
        ))}

        <style>{`
          @media (max-width: 520px) { .program-tab-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

// ── Schedule Preview ──
function SchedulePreview() {
  const preview = programs.flatMap((p) =>
    p.schedule.map((s) => ({
      program: s.label || p.name,
      color: p.color,
      ageGroup: s.ageGroup || p.ageGroup,
      day: s.day,
      time: s.time,
      location: s.location,
      bookingUrl: s.bookingUrl || p.bookingUrl,
    }))
  );

  return (
    <section
      id="schedule"
      style={{
        position: "relative",
        padding: "80px clamp(20px, 4vw, 48px)",
        background: brand.surface,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <SectionLabel>Schedule</SectionLabel>
          <SectionHeadline>This week at The Athlete Lab</SectionHeadline>
        </div>

        <div
          className="schedule-preview-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {preview.map((s) => (
            <a
              key={`${s.program}-${s.day}-${s.time}`}
              href={s.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textDecoration: "none",
                background: brand.bg,
                border: `1px solid ${brand.border}`,
                borderRadius: 12,
                padding: "20px",
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = s.color)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = brand.border)}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: s.color, marginBottom: 8 }}>
                {s.program}
              </div>
              <div style={{ fontSize: 11, color: brand.muted, marginBottom: 12, padding: "2px 8px", display: "inline-block", borderRadius: 100, background: `${s.color}15` }}>
                {s.ageGroup}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: brand.mutedLight, marginBottom: 6 }}>
                <Clock size={12} /> {s.day} {s.time}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: brand.muted }}>
                <MapPin size={12} /> {s.location}
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            href="/schedule"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 700,
              color: brand.red,
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            View Full Weekly Schedule <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .schedule-preview-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .schedule-preview-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ── Coaches ──
function Coaches() {
  const coach = coaches[0];

  if (!coach) return null;

  return (
    <section
      id="coaches"
      style={{
        position: "relative",
        padding: "120px clamp(20px, 4vw, 48px)",
        background: brand.bg,
        overflow: "hidden",
      }}
    >
      <GlowEffect color={brand.red} top="50%" left="80%" size="600px" opacity={0.05} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionLabel>The Coach</SectionLabel>
          <SectionHeadline>Led by Francis Mulkern</SectionHeadline>
          <p
            style={{
              maxWidth: 720,
              margin: "18px auto 0",
              color: brand.mutedLight,
              fontSize: "clamp(16px, 2vw, 19px)",
              lineHeight: 1.7,
            }}
          >
            Former Merrimack player and Boston Bolts coach bringing college-level standards to youth athlete development.
          </p>
        </div>

        <div
          className="coaches-grid"
          style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.18fr) minmax(320px, 0.82fr)", gap: 36, maxWidth: 1160, margin: "0 auto" }}
        >
          <motion.div
            className="coach-photo-panel"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "relative",
              minHeight: 560,
            }}
          >
            <div
              className="coach-photo-mosaic"
              style={{
                display: "grid",
                gridTemplateColumns: "1.25fr 0.75fr",
                gridTemplateRows: "1fr 1fr",
                gap: 14,
                height: "100%",
                minHeight: 560,
              }}
            >
              {coach.photos.map((photo, index) => (
                <div
                  key={photo.src}
                  className={index === 0 ? "coach-photo-tile coach-photo-primary" : "coach-photo-tile"}
                  style={{
                    position: "relative",
                    gridRow: index === 0 ? "1 / span 2" : "auto",
                    borderRadius: index === 0 ? 18 : 14,
                    overflow: "hidden",
                    minHeight: index === 0 ? 560 : 0,
                    background: brand.surfaceLight,
                    border: `1px solid ${brand.border}`,
                    boxShadow: index === 0 ? "0 26px 70px rgba(0,0,0,0.45)" : "0 16px 40px rgba(0,0,0,0.28)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: index === 0 ? 560 : 0,
                      objectFit: "cover",
                      objectPosition: photo.objectPosition,
                      display: "block",
                      filter: "saturate(1.04) contrast(1.03)",
                    }}
                  />
                  {index === 0 && (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.08) 58%)",
                        }}
                      />
                      <div style={{ position: "absolute", left: 26, right: 26, bottom: 24 }}>
                        <div
                          style={{
                            fontSize: "clamp(26px, 3vw, 38px)",
                            fontWeight: 900,
                            color: "#fff",
                            letterSpacing: "-0.03em",
                            lineHeight: 1.02,
                          }}
                        >
                          {coach.name}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: "#fff",
                            fontWeight: 800,
                            marginTop: 8,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          {coach.title}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
          <div
            className="coach-copy-panel"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${brand.border}`,
              borderRadius: 16,
              padding: "clamp(28px, 4vw, 48px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: 420,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                width: "fit-content",
                padding: "6px 12px",
                borderRadius: 100,
                background: `${brand.red}14`,
                border: `1px solid ${brand.red}33`,
                color: brand.red,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 22,
              }}
            >
              Founder-led training
            </div>
            <h3
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: brand.text,
                margin: "0 0 20px",
              }}
            >
              A training environment built around standards, confidence, and long-term athletic growth.
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: brand.mutedLight, margin: 0 }}>
              {coach.bio}
            </p>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .coaches-grid { grid-template-columns: 1fr !important; }
          .coach-photo-panel { min-height: 0 !important; }
          .coach-photo-mosaic {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto auto !important;
            min-height: 0 !important;
          }
          .coach-photo-primary {
            grid-column: 1 / -1 !important;
            grid-row: auto !important;
            min-height: 430px !important;
          }
          .coach-photo-primary > img { min-height: 430px !important; }
          .coach-photo-tile:not(.coach-photo-primary) {
            aspect-ratio: 1 / 1 !important;
          }
          .coach-copy-panel { min-height: 0 !important; }
          .why-section { flex-direction: column !important; }
          .session-steps { width: 100% !important; }
        }
        @media (max-width: 560px) {
          .coach-photo-mosaic { grid-template-columns: 1fr !important; }
          .coach-photo-primary { min-height: 390px !important; }
          .coach-photo-primary > img { min-height: 390px !important; }
          .coach-photo-tile:not(.coach-photo-primary) { aspect-ratio: 4 / 3 !important; }
        }
      `}</style>
    </section>
  );
}

// ── The Athlete Lab Difference ──
function AthleteDifference() {
  const pillars = [
    {
      label: "Speed & Agility",
      headline: "Faster feet. Sharper cuts. Better control.",
      body: "Athletes train acceleration, footwork, balance, and reaction so they can move with more confidence when the game speeds up.",
    },
    {
      label: "Strength & Control",
      headline: "Strength that actually shows up in games.",
      body: "We build age-appropriate strength through the legs, hips, and core so athletes can handle contact, stop, cut, recover, and keep playing hard.",
    },
    {
      label: "Conditioning",
      headline: "Still running full speed late.",
      body: "The Athlete Lab difference shows up when your kid still has another sprint, another recovery run, and another burst when everyone else is slowing down.",
    },
  ];

  return (
    <section
      id="difference"
      style={{
        position: "relative",
        padding: "120px clamp(20px, 4vw, 48px)",
        background: brand.bg,
        overflow: "hidden",
      }}
    >
      <GlowEffect color={brand.red} top="50%" left="50%" size="1200px" opacity={0.05} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <SectionLabel>How We Train</SectionLabel>
          <SectionHeadline>
            Train for the moments
            <br />
            <span style={{ color: brand.red }}>that decide games.</span>
          </SectionHeadline>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: brand.muted, maxWidth: 580, margin: "20px auto 0" }}>
            When your kid is still running full speed and everyone else is slowing down,
            that is the difference. We train the speed, strength, agility, and conditioning
            it takes to compete there.
          </p>
        </div>

        {/* Three Pillars */}
        <div
          className="difference-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 64 }}
        >
          {pillars.map((p, i) => (
            <div
              key={p.label}
              style={{
                background: brand.surface,
                border: `1px solid ${brand.border}`,
                borderRadius: 16,
                padding: 32,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: brand.red,
                  opacity: 0.6 + i * 0.15,
                }}
              />
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: brand.red,
                  marginBottom: 16,
                }}
              >
                {p.label}
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: brand.text,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                  marginBottom: 16,
                }}
              >
                {p.headline}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: brand.mutedLight, margin: 0 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .difference-grid { grid-template-columns: 1fr !important; }
          .moments-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ── CTA Banner ──
function CTABanner({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section
      style={{
        position: "relative",
        padding: "80px clamp(20px, 4vw, 48px)",
        background: brand.red,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.02em",
            margin: "0 0 16px 0",
          }}
        >
          Ready to build a stronger athlete?
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 32 }}>
          Every session is coached, structured, and purpose-driven. Spots are limited.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button
            variant="primary"
            href="#programs"
            icon
            onClick={(e) => {
              e.preventDefault();
              onNavigate("programs");
            }}
            style={{ background: "#fff", color: brand.red, fontWeight: 800 }}
          >
            Book a Session
          </Button>
          <Button
            variant="ghost"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("contact");
            }}
            style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  return (
    <footer
      id="contact"
      style={{
        padding: "80px clamp(20px, 4vw, 48px) 40px",
        background: brand.surface,
        borderTop: `1px solid ${brand.border}`,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.2fr",
            gap: 48,
            marginBottom: 48,
          }}
        >
          <div>
            <div style={{ marginBottom: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/AthleteLab Logo Main.png"
                alt="The Athlete Lab"
                style={{ height: 140, maxWidth: "100%", width: "auto", objectFit: "contain" }}
              />
            </div>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: brand.muted,
                maxWidth: 320,
                marginBottom: 20,
              }}
            >
              Youth athletic training and sports performance on the South Shore. Pembroke and Hanover, MA.
            </p>
            <a
              href={assets.facebook}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: brand.bg,
                border: `1px solid ${brand.border}`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: brand.muted,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = brand.red;
                e.currentTarget.style.color = brand.red;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = brand.border;
                e.currentTarget.style.color = brand.muted;
              }}
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href={assets.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: brand.bg,
                border: `1px solid ${brand.border}`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: brand.muted,
                textDecoration: "none",
                transition: "all 0.2s ease",
                marginLeft: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = brand.red;
                e.currentTarget.style.color = brand.red;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = brand.border;
                e.currentTarget.style.color = brand.muted;
              }}
            >
              {/* TikTok icon */}
              <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
              </svg>
            </a>
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: brand.muted,
                letterSpacing: "0.08em",
                marginBottom: 16,
              }}
            >
              PROGRAMS
            </div>
            {programs.map((p) => (
              <a
                key={p.id}
                href={p.bookingUrl}
                style={{
                  display: "block",
                  fontSize: 14,
                  color: brand.mutedLight,
                  textDecoration: "none",
                  marginBottom: 10,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = brand.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = brand.mutedLight)}
              >
                {p.name}{" "}
                <span style={{ color: brand.muted, fontSize: 12 }}>({p.ageGroup})</span>
              </a>
            ))}
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: brand.muted,
                letterSpacing: "0.08em",
                marginBottom: 16,
              }}
            >
              CONTACT
            </div>
            <a
              href="mailto:theathletelab@yahoo.com"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                color: brand.mutedLight,
                textDecoration: "none",
                marginBottom: 10,
              }}
            >
              <Mail size={14} /> theathletelab@yahoo.com
            </a>
            <a
              href="tel:6178889854"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                color: brand.mutedLight,
                textDecoration: "none",
                marginBottom: 20,
              }}
            >
              <Phone size={14} /> (617) 888-9854
            </a>

            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: brand.muted,
                letterSpacing: "0.08em",
                marginBottom: 12,
              }}
            >
              HOURS
            </div>
            <div style={{ fontSize: 13, color: brand.muted, lineHeight: 1.8 }}>
              Mon-Thu: 4-7pm
              <br />
              Intro Speed &amp; Agility: 4-5pm
              <br />
              Youth Sports Performance: 5-7pm
              <br />
              Wed Mini Soccer: 10:30-11:15am
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: brand.muted,
                letterSpacing: "0.08em",
                marginBottom: 16,
              }}
            >
              <Smartphone size={14} style={{ verticalAlign: "middle", marginRight: 6 }} />
              DOWNLOAD OUR APP
            </div>
            <div
              style={{
                background: brand.bg,
                border: `1px solid ${brand.border}`,
                borderRadius: 12,
                padding: 20,
                textAlign: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assets.qrCode}
                alt="Scan QR code to join the app"
                style={{ width: 120, height: 120, borderRadius: 8, marginBottom: 12 }}
              />
              <div style={{ fontSize: 12, color: brand.muted, marginBottom: 8 }}>
                Scan to download or use code:
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: brand.red,
                  letterSpacing: "0.1em",
                  fontFamily: "monospace",
                  marginBottom: 12,
                }}
              >
                1L6EYB
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={assets.appStore} alt="Download on App Store" style={{ height: 32, cursor: "pointer" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={assets.googlePlay} alt="Get it on Google Play" style={{ height: 32, cursor: "pointer" }} />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            padding: "24px 0",
            marginBottom: 24,
            borderTop: `1px solid ${brand.border}`,
            borderBottom: `1px solid ${brand.border}`,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: brand.muted,
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <MapPin size={13} /> LOCATIONS:
          </div>
          {[
            "City Arena Field 4, Pembroke",
            "Riverside Sports Complex, Pembroke",
          ].map((loc) => (
            <span key={loc} style={{ fontSize: 13, color: brand.mutedLight }}>
              {loc}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 12, color: brand.muted }}>
            © 2026 The Athlete Lab. All rights reserved.
          </div>
          <div style={{ fontSize: 12, color: brand.muted }}>Pembroke &amp; Hanover, Massachusetts</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}

// ── Sticky Mobile CTA ──
function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <>
      <div
        className="sticky-mobile-cta"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          padding: "12px 20px",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          background: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: `1px solid ${brand.border}`,
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease",
          display: "none",
        }}
      >
        <a
          href="#programs"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            height: 48,
            borderRadius: 8,
            background: brand.red,
            color: "#fff",
            fontSize: 14,
            fontWeight: 800,
            textDecoration: "none",
            letterSpacing: "0.04em",
          }}
        >
          Book a Session <ArrowRight size={16} />
        </a>
      </div>
      <style>{`@media (max-width: 768px) { .sticky-mobile-cta { display: block !important; } }`}</style>
    </>
  );
}

// ── Main App ──
export default function AthleteLab() {
  const promoEndsAt = Date.parse(promo.endsAt);
  const [promoClock, setPromoClock] = useState(() => Date.now());
  const promoVisible = promo.active && promoClock <= promoEndsAt;

  useEffect(() => {
    if (!promo.active) return;

    const msUntilPromoEnds = promoEndsAt - Date.now() + 1000;
    if (msUntilPromoEnds <= 0) return;

    const timer = window.setTimeout(() => setPromoClock(Date.now()), msUntilPromoEnds);
    return () => window.clearTimeout(timer);
  }, [promoEndsAt]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = promoVisible ? 136 : 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div style={{ background: brand.bg, minHeight: "100vh" }}>
      <PromoBanner visible={promoVisible} onNavigate={scrollToSection} />
      <Nav onNavigate={scrollToSection} promoVisible={promoVisible} />
      <Hero onNavigate={scrollToSection} />
      <Coaches />
      <Programs />
      <AthleteDifference />
      <SchedulePreview />
      <CTABanner onNavigate={scrollToSection} />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
