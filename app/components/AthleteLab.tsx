"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, MapPin, Clock, ChevronDown, Menu, X, Mail, Phone,
  Calendar, Users, Zap, Shield, ArrowRight,
  CheckCircle, Smartphone,
} from "lucide-react";

// ── Brand Tokens ──
const brand = {
  bg: "#050505",
  surface: "rgba(20, 20, 20, 0.4)",
  surfaceLight: "rgba(30, 30, 30, 0.6)",
  border: "rgba(255, 255, 255, 0.08)",
  red: "#f93a3a",
  redGlow: "rgba(249, 58, 58, 0.25)",
  redHover: "#ff5252",
  text: "#f4f4f5",
  muted: "#a1a1aa",
  mutedLight: "#d4d4d8",
};

// ── Real Asset URLs ──
const assets = {
  logoIcon: "https://static.wixstatic.com/media/5abe16_beb360a530434852aa61d87a03f46513~mv2.png",
  logoFull: "https://static.wixstatic.com/media/07f490_2252602a95894028947be151ae41b016~mv2.jpg",
  franPhoto: "https://static.wixstatic.com/media/07f490_16536d81421644d68f2fe04e46891490~mv2.jpg",
  chrisPhoto: "https://static.wixstatic.com/media/5abe16_fd56d4ba25a64c5881e662e81a7a59f0~mv2.png",
  qrCode: "https://static.wixstatic.com/media/2feeec_9502e1d7d07e4bdf97f5fe0fa4d9309f~mv2.png",
  appStore: "https://static.wixstatic.com/media/3e41b8_a0bf062897f64090b91f438ce6bf69ba~mv2.png",
  googlePlay: "https://static.wixstatic.com/media/3e41b8_c7dfb607579c44039e9f8c2610f15d3d~mv2.png",
  perfTrainingImg: "https://static.wixstatic.com/media/07f490_7a1ba3c0b1024d12be0c238814999960~mv2.jpg",
  sportsPerformanceImg: "https://static.wixstatic.com/media/22615e_a07020aab7a642e5b628cb53e8a1c8cd~mv2.jpg",
  speedAgilityImg: "https://static.wixstatic.com/media/5abe16_9c3995bfb7a14a5986f85237a853a3ba~mv2.png",
  miniSoccerImg: "https://static.wixstatic.com/media/5abe16_44d989ed93cb4ef1a1c75c3f0545dd61~mv2.png",
  littleAthletesImg: "https://static.wixstatic.com/media/11062b_9b2140362f364b2baf7c5798af3a2fa2~mv2.jpg",
  mainVideo: "https://video.wixstatic.com/video/22615e_afe513b2cb3144d0bac8d201a4e3f41d/1080p/mp4/file.mp4",
  miniSoccerVideo: "https://video.wixstatic.com/video/22615e_2cc99e540e0541458cff2d00356f88ea/720p/mp4/file.mp4",
  speedAgilityVideo: "https://video.wixstatic.com/video/22615e_84be692e98a943f6b0ec31a3adda6d9e/720p/mp4/file.mp4",
  videoPoster: "https://static.wixstatic.com/media/22615e_afe513b2cb3144d0bac8d201a4e3f41df000.jpg",
  facebook: "https://www.facebook.com/profile.php?id=61582999460260",
  tiktok: "https://www.tiktok.com/@theathletelab.llc",
};

// ── Program Data ──
type ScheduleEntry = { day: string; time: string; location: string };
type Program = {
  id: string;
  ageGroup: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  priceSub?: string;
  priceAlt?: string;
  priceNote: string;
  schedule: ScheduleEntry[];
  features: string[];
  image: string;
  video: string | null;
  bookingUrl: string;
  color: string;
  featured: boolean;
};

const programs: Program[] = [
  {
    id: "little-athletes",
    ageGroup: "Ages 2–3",
    name: "Little Athletes",
    tagline: "First steps to athletic confidence",
    description:
      "A 30-minute high-energy introduction to movement for toddlers. Through games, obstacle courses, and guided activities, kids build balance, coordination, body control, and confidence. Parent participation encouraged.",
    price: "$100",
    priceSub: "5-session pack",
    priceAlt: "$25 drop-in",
    priceNote: "5-session pack or $25 drop-in",
    schedule: [
      { day: "Monday", time: "9:45–10:15 AM", location: "Riverside Sports Complex, Pembroke" },
      { day: "Wednesday", time: "9:45–10:15 AM", location: "Riverside Sports Complex, Pembroke" },
    ],
    features: ["Obstacle courses & games", "Balance & coordination", "Parent participation", "Supportive environment"],
    image: assets.littleAthletesImg,
    video: null,
    bookingUrl: "https://www.theathletelab.net/booking-calendar/little-athletes?referral=service_list_widget",
    color: "#f59e0b",
    featured: false,
  },
  {
    id: "mini-soccer",
    ageGroup: "Ages 3–5",
    name: "Mini Soccer",
    tagline: "Where young athletes learn to move",
    description:
      "Introduces the basics of soccer while developing balance, coordination, running mechanics, and body control. Athletes work on dribbling, stopping, and ball skills through stations and interactive games.",
    price: "$140",
    priceSub: "8-week session",
    priceAlt: "$25 drop-in",
    priceNote: "8-week sessions or single drop-in available",
    schedule: [
      { day: "Monday", time: "10:30–11:15 AM", location: "Riverside Sports Complex, Pembroke" },
      { day: "Wednesday", time: "10:30–11:15 AM", location: "Riverside Sports Complex, Pembroke" },
      { day: "Saturday", time: "9:30–10:15 AM", location: "Riverside Sports Complex, Pembroke" },
      { day: "Sunday", time: "9:30–10:15 AM", location: "Riverside Sports Complex, Pembroke" },
    ],
    features: ["Ball skills & dribbling", "Running mechanics", "Confidence building", "Game-based learning"],
    image: assets.miniSoccerImg,
    video: assets.miniSoccerVideo,
    bookingUrl: "https://www.theathletelab.net/booking-calendar/mini-soccer-drop-in",
    color: "#22c55e",
    featured: true,
  },
  {
    id: "speed-agility",
    ageGroup: "Ages 5–8",
    name: "Intro to Speed & Agility",
    tagline: "Build the athletic foundation",
    description:
      "Designed for developing athletes ready to learn how to move fast, change direction, and build coordination. Sessions focus on acceleration, footwork, reaction drills, and body control that translate to every sport.",
    price: "$25",
    priceSub: "drop-in",
    priceAlt: "5-session pack $100",
    priceNote: "Drop-in or 5-session package ($100)",
    schedule: [
      { day: "Monday", time: "4:00–5:00 PM", location: "City Arena Field 4, Pembroke" },
      { day: "Wednesday", time: "4:00–5:00 PM", location: "Starland Sportsplex, Hanover" },
      { day: "Thursday", time: "4:00–5:00 PM", location: "Starland Sportsplex, Hanover" },
      { day: "Friday", time: "4:00–5:00 PM", location: "Riverside Sports Complex, Pembroke" },
    ],
    features: ["First-step quickness", "Change of direction", "Footwork & coordination", "Sport-transferable skills"],
    image: assets.speedAgilityImg,
    video: assets.speedAgilityVideo,
    bookingUrl: "https://www.theathletelab.net/booking-calendar/intro-to-speed-and-agility",
    color: "#3b82f6",
    featured: false,
  },
  {
    id: "performance",
    ageGroup: "Ages 9+",
    name: "Performance Training",
    tagline: "Train like a serious athlete",
    description:
      "Purpose-driven strength and conditioning for competitive athletes. Every session is structured around speed, strength, and conditioning pillars — developing explosiveness, durability, and mental toughness.",
    price: "$100",
    priceSub: "5-session pack",
    priceAlt: "$200/mo unlimited · $25 drop-in",
    priceNote: "Best value: 5-session pack $100 · Monthly unlimited $200 · Drop-in $25",
    schedule: [
      { day: "Monday", time: "7:00–9:00 PM", location: "City Arena Field 4, Pembroke" },
      { day: "Tuesday", time: "4:00–6:00 PM", location: "Arena Field 4, Pembroke" },
      { day: "Thursday", time: "7:00–9:00 PM", location: "Arena Field 4, Pembroke" },
      { day: "Friday", time: "5:00–8:00 PM", location: "Riverside Sports Complex, Pembroke" },
    ],
    features: ["Strength & power development", "Speed & agility training", "Injury prevention", "Mental toughness"],
    image: assets.perfTrainingImg,
    video: assets.mainVideo,
    bookingUrl: "https://www.theathletelab.net/booking-calendar/performance-training-monthly-membership",
    color: "#dc2626",
    featured: false,
  },
];

// ── Coaches Data ──
const coaches = [
  {
    name: "Francis Mulkern",
    title: "Founder & Head Coach",
    photo: assets.franPhoto,
    bio: "Former collegiate soccer player at Merrimack College with a background in Sports Medicine and Pre-Physical Therapy. Spent 10 years coaching with the Boston Bolts — most recently coached a team where 19 of 23 players went on to play college soccer. Created The Athlete Lab to provide structured, intentional training that builds strong, fast, confident athletes.",
  },
  {
    name: "Chris Nelson",
    title: "Performance Coach",
    photo: assets.chrisPhoto,
    bio: "Former collegiate tennis player at Quinnipiac University, competing at the NCAA level. Standout athlete at Scituate High School earning All-Scholastic honors and serving as team captain. Brings a disciplined, detail-oriented approach to training, helping athletes improve agility, coordination, and confidence.",
  },
];

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
              background: hovered ? "rgba(255,255,255,0.05)" : "transparent",
              color: brand.text,
              border: `1px solid ${hovered ? brand.mutedLight : brand.border}`,
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
  poster,
  label,
}: {
  src: string;
  poster?: string;
  label?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
        poster={poster}
        style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }}
        playsInline
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
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "rgba(220,38,38,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(220,38,38,0.4)",
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

function EmailSignup({ programName }: { programName: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <div
      style={{
        background: brand.surface,
        border: `1px solid ${brand.border}`,
        borderRadius: 10,
        padding: "20px 24px",
        marginTop: 16,
      }}
    >
      {submitted ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#22c55e",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <CheckCircle size={18} /> You&apos;re on the {programName} list!
        </div>
      ) : (
        <>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: brand.muted,
              marginBottom: 10,
              letterSpacing: "0.02em",
            }}
          >
            <Mail size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />{" "}
            Get {programName} updates &amp; schedule changes
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="parent@email.com"
              style={{
                flex: 1,
                minWidth: 0,
                height: 40,
                padding: "0 14px",
                background: brand.bg,
                border: `1px solid ${brand.border}`,
                borderRadius: 6,
                color: brand.text,
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              onClick={() => {
                if (email.includes("@")) setSubmitted(true);
              }}
              style={{
                height: 40,
                padding: "0 18px",
                background: brand.red,
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Join
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ── Navigation ──
function Nav({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const links = [
    { label: "Programs", id: "programs" },
    { label: "Schedule", id: "schedule" },
    { label: "Coaches", id: "coaches" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 72,
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
            src="/AthleteLab Logo Main.jpg"
            alt="The Athlete Lab"
            style={{ height: 56, width: "auto", objectFit: "contain", mixBlendMode: "screen", filter: "brightness(5) contrast(100)" }}
          />
        </div>

        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map((link) => (
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
          ))}
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
            {links.map((link, i) => (
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
            ))}
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
              Now enrolling — Spring 2026
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{
                fontSize: "clamp(48px, 6vw, 84px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: brand.text,
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
              Purpose-driven speed, strength, and conditioning for youth athletes. Pembroke &amp; Hanover, MA.
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
            padding: 88px clamp(20px, 4vw, 64px) 0 !important;
            height: 56vw !important;
            max-height: 520px !important;
            min-height: 240px !important;
            order: -1;
          }
          .hero-content-left {
            padding: 32px clamp(20px, 4vw, 64px) 80px !important;
          }
        }
        @media (max-width: 768px) {
          .trust-row { gap: 20px !important; flex-wrap: wrap !important; }
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
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}
    >
      <div>
        {program.video ? (
          <VideoPlayer
            src={program.video}
            poster={program.image}
            label={`${program.name} in action`}
          />
        ) : (
          <ImageCard src={program.image} label={program.name} />
        )}
        <EmailSignup programName={program.name} />
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
                key={s.day + s.time}
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
                <span style={{ fontWeight: 700, color: brand.text }}>{s.day}</span>
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
          href={program.bookingUrl}
          variant="primary"
          icon
          style={{ width: "100%", justifyContent: "center" }}
        >
          Book {program.name}
        </Button>
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
            Every program is structured, coached, and built around long-term athlete development.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 48,
            flexWrap: "wrap",
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
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  flex: "1 1 auto",
                  minWidth: "150px",
                  padding: "12px 24px",
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
      </div>
    </section>
  );
}

// ── Full Schedule ──
function FullSchedule() {
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
    <section
      id="schedule"
      style={{
        position: "relative",
        padding: "120px clamp(20px, 4vw, 48px)",
        background: brand.surface,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionLabel>Weekly Schedule</SectionLabel>
          <SectionHeadline>Every session, every location</SectionHeadline>
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
                  background: brand.bg,
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
                      style={{
                        display: "block",
                        textDecoration: "none",
                        padding: "12px 14px",
                        borderRadius: 8,
                        marginBottom: i < classes.length - 1 ? 8 : 0,
                        background: brand.surface,
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
    </section>
  );
}

// ── Coaches ──
function Coaches() {
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
          <SectionLabel>Our Coaches</SectionLabel>
          <SectionHeadline>Led by athletes who&apos;ve been there</SectionHeadline>
        </div>

        <div
          className="coaches-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
        >
          {coaches.map((coach) => (
            <motion.div
              key={coach.name}
              whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0,0,0,0.5)" }}
              transition={{ duration: 0.3 }}
              style={{
                background: brand.surface,
                border: `1px solid ${brand.border}`,
                borderRadius: 16,
                padding: 32,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `3px solid ${brand.red}`,
                    flexShrink: 0,
                    background: brand.surfaceLight,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coach.photo}
                    alt={coach.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: brand.text,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {coach.name}
                  </div>
                  <div style={{ fontSize: 13, color: brand.red, fontWeight: 600, marginTop: 2 }}>
                    {coach.title}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: brand.mutedLight, margin: 0 }}>
                {coach.bio}
              </p>
            </motion.div>
          ))}
        </div>

        <div
          className="why-section"
          style={{
            marginTop: 56,
            background: brand.surface,
            border: `1px solid ${brand.border}`,
            borderRadius: 16,
            padding: 40,
            display: "flex",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <SectionLabel>Why The Athlete Lab</SectionLabel>
            <h3
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: brand.text,
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}
            >
              A gym doesn&apos;t build athletes. We do.
            </h3>
            <div
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: brand.mutedLight,
                borderLeft: `3px solid ${brand.red}`,
                paddingLeft: 24,
              }}
            >
              &ldquo;A gym membership gives you access to equipment — but it doesn&apos;t build better
              athletes. I hit the gym hard in college, gained muscle, but lost my agility and first
              step. Athletic performance requires structured training — building strength while
              improving speed, agility, and movement quality. That&apos;s what The Athlete Lab is built
              on.&rdquo;
            </div>
            <div style={{ marginTop: 16, fontSize: 14, fontWeight: 700, color: brand.text }}>
              — Francis Mulkern, Founder
            </div>
          </div>

          <div className="session-steps" style={{ flex: "0 0 auto" }}>
            <div
              style={{
                background: brand.bg,
                border: `1px solid ${brand.border}`,
                borderRadius: 12,
                padding: 24,
                minWidth: 280,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: brand.red,
                  letterSpacing: "0.06em",
                  marginBottom: 20,
                }}
              >
                EVERY SESSION
              </div>
              {[
                { num: "01", title: "Dynamic Warm-Up", desc: "Mobility, activation, movement prep" },
                { num: "02", title: "Speed & Agility", desc: "Acceleration, footwork, reaction drills" },
                { num: "03", title: "Strength & Conditioning", desc: "Functional strength, core stability" },
              ].map((step, i) => (
                <div
                  key={step.num}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "14px 0",
                    borderTop: i > 0 ? `1px solid ${brand.border}` : "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: brand.red,
                      fontFamily: "Georgia, serif",
                      opacity: 0.5,
                      minWidth: 30,
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: brand.text,
                        marginBottom: 3,
                      }}
                    >
                      {step.title}
                    </div>
                    <div style={{ fontSize: 12, color: brand.muted }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .coaches-grid { grid-template-columns: 1fr !important; }
          .why-section { flex-direction: column !important; }
          .session-steps { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}

// ── The Athlete Lab Difference ──
function AthleteDifference() {
  const pillars = [
    {
      label: "The Second Gear",
      headline: "When everyone else slows down, they speed up.",
      body: "Athlete Lab athletes still accelerate late in games. They still change direction with control. They still compete at full speed — because they've trained for that exact moment.",
    },
    {
      label: "The Mental Edge",
      headline: "Most athletes think: \"I'm tired.\"",
      body: "Athlete Lab athletes are wired to think: \"This is where I separate.\" That's trained — pushing through fatigue in circuits, competing when legs are heavy, learning to execute under pressure.",
    },
    {
      label: "What You're Building",
      headline: "Not just speed. Not just strength.",
      body: "You're building resilience, conditioned confidence, and the ability to perform under fatigue. Talent might show early. But late in games? The athlete who can still move, think, and compete — that's the athlete who wins.",
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
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <SectionLabel>The Athlete Lab Difference</SectionLabel>
          <SectionHeadline>
            Talent is obvious early.
            <br />
            <span style={{ color: brand.red }}>Late in games</span>{" "}is where it&apos;s decided.
          </SectionHeadline>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: brand.muted, maxWidth: 580, margin: "20px auto 0" }}>
            Early in games, talent is obvious. But late in games — when fatigue hits — that&apos;s where
            separation actually happens. Conditioning and mentality take over.
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

        {/* The Moments That Matter */}
        <div
          style={{
            background: brand.surface,
            border: `1px solid ${brand.border}`,
            borderRadius: 16,
            padding: "48px 48px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
          className="moments-grid"
        >
          <div>
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
              End of Game. Who Wins?
            </div>
            <h3
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: brand.text,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              They win the moments
              <br />
              <span style={{ color: brand.red }}>that matter most.</span>
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: brand.mutedLight }}>
              Loose balls. Final sprints. Defensive recoveries. Last attacking runs.
              That&apos;s where games are decided — and that&apos;s where Athlete Lab athletes
              stand out most.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Still accelerating" },
              { label: "Sharp decisions" },
              { label: "Full-speed cuts" },
              { label: "Pressure mindset" },
              { label: "Extra-effort plays" },
              { label: "Clutch moments" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: brand.bg,
                  border: `1px solid ${brand.border}`,
                  borderRadius: 10,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: brand.red, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: brand.text }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
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

// ── Testimonials ──
function Testimonials() {
  // Placeholder — swap in real testimonials when available
  const placeholders = [
    {
      quote: "Testimonial coming soon.",
      author: "Parent of Athlete",
      program: "Performance Training",
    },
    {
      quote: "Testimonial coming soon.",
      author: "Parent of Athlete",
      program: "Mini Soccer",
    },
    {
      quote: "Testimonial coming soon.",
      author: "Parent of Athlete",
      program: "Speed & Agility",
    },
  ];

  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        padding: "120px clamp(20px, 4vw, 48px)",
        background: brand.surface,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionLabel>What Parents Say</SectionLabel>
          <SectionHeadline>Results speak for themselves</SectionHeadline>
        </div>

        <div
          className="testimonials-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}
        >
          {placeholders.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              style={{
                background: brand.surface,
                border: `1px solid rgba(255, 255, 255, 0.03)`,
                borderRadius: 16,
                padding: 32,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ display: "flex", gap: 4, opacity: 0.3 }}>
                {[...Array(5)].map((_, s) => (
                  <span key={s} style={{ color: brand.red, fontSize: 16 }}>★</span>
                ))}
              </div>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: brand.muted,
                  fontStyle: "italic",
                  flex: 1,
                  filter: "blur(4px)",
                  userSelect: "none",
                  opacity: 0.4,
                }}
              >
                &ldquo;This is a placeholder for a real testimonial. It will go here once collected.&rdquo;
              </p>
              <div style={{ opacity: 0.5 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: brand.text, filter: "blur(2px)" }}>Parent Name</div>
                <div style={{ fontSize: 12, color: brand.red, marginTop: 2, filter: "blur(2px)" }}>Program Enrolled</div>
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 600,
                  color: brand.text,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "rgba(0,0,0,0.4)",
                  backdropFilter: "blur(2px)",
                }}
              >
                Collecting Feedback...
              </div>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            textAlign: "center",
            padding: "32px",
            background: brand.bg,
            border: `1px solid ${brand.border}`,
            borderRadius: 12,
          }}
        >
          <p style={{ fontSize: 14, color: brand.muted }}>
            Testimonials coming soon — follow along on{" "}
            <a href={assets.facebook} target="_blank" rel="noopener noreferrer" style={{ color: brand.red }}>
              Facebook
            </a>{" "}
            and{" "}
            <a href={assets.tiktok} target="_blank" rel="noopener noreferrer" style={{ color: brand.red }}>
              TikTok
            </a>{" "}
            to see athletes in action.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .testimonials-grid { grid-template-columns: 1fr !important; } }
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
                src="/AthleteLab Logo Main.jpg"
                alt="The Athlete Lab"
                style={{ height: 88, width: "auto", objectFit: "contain", mixBlendMode: "screen", filter: "brightness(5) contrast(100)" }}
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
              Purpose-driven strength and conditioning for youth athletes and adults. Pembroke &amp; Hanover, MA.
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
              Mon: 4–5pm &amp; 7–9pm
              <br />
              Tue: 4–6pm
              <br />
              Wed: Closed
              <br />
              Thu: 7–9pm
              <br />
              Fri: 4–8pm
              <br />
              Sat–Sun: By Appointment
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
            "City Arena, Pembroke",
            "Arena Field 4, Pembroke",
            "Riverside Sports Complex, Pembroke",
            "Starland Sportsplex, Hanover",
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
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div style={{ background: brand.bg, minHeight: "100vh" }}>
      <Nav onNavigate={scrollToSection} />
      <Hero onNavigate={scrollToSection} />
      <Programs />
      <FullSchedule />
      <AthleteDifference />
      <Coaches />
      <Testimonials />
      <CTABanner onNavigate={scrollToSection} />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
