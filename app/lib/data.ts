// ── Brand Tokens ──
export const brand = {
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
export const assets = {
  logoIcon: "https://static.wixstatic.com/media/5abe16_beb360a530434852aa61d87a03f46513~mv2.png",
  logoFull: "https://static.wixstatic.com/media/07f490_2252602a95894028947be151ae41b016~mv2.jpg",
  franPhoto: "/coach/francis-class-instruction.png",
  franClassSpeedDrills: "/coach/francis-class-speed-drills.jpg",
  franClassStrength: "/coach/francis-class-strength.png",
  franActionOne: "/coach/francis-action-1.jpg",
  franActionTwo: "/coach/francis-action-2.jpg",
  franTeamImpact: "/coach/francis-team-impact.jpg",
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
export type ScheduleEntry = {
  day: string;
  time: string;
  location: string;
  days?: string[];
  label?: string;
  ageGroup?: string;
  bookingUrl?: string;
  dateRange?: string;
};
export type ProgramLink = { label: string; href: string };
export type Promo = {
  active: boolean;
  title: string;
  body: string;
  ctaLabel: string;
  ctaTarget: string;
  endsAt: string;
};
export type Program = {
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
  primaryCtaUrl?: string;
  primaryCtaLabel?: string;
  secondaryLinks?: ProgramLink[];
  bookingUrlAlt?: string;
  bookingUrlAltLabel?: string;
  color: string;
  featured: boolean;
};

export const promo: Promo = {
  active: false,
  title: "Bring a friend free this week",
  body: "Book a summer training session and bring one friend free through July 5.",
  ctaLabel: "Book Summer Training",
  ctaTarget: "programs",
  endsAt: "2026-07-05T23:59:59-04:00",
};

export const programs: Program[] = [
  {
    id: "mini-soccer",
    ageGroup: "Ages 3-5",
    name: "Mini Soccer",
    tagline: "Where young athletes learn to move",
    description:
      "Introduces the basics of soccer while developing balance, coordination, running mechanics, and body control. Athletes work on dribbling, stopping, and ball skills through stations and interactive games.",
    price: "$140",
    priceSub: "8-week session",
    priceAlt: "$25 drop-in",
    priceNote: "Choose a Monday or Wednesday 8-week fall session, or book a drop-in",
    schedule: [
      {
        day: "Monday",
        time: "10:30-11:15 AM",
        location: "City Arena, Pembroke",
        dateRange: "September 21–November 9, 2026",
        bookingUrl: "https://bookings.theathletelab.net/service-page/mini-soccer-monday-ages-3-5",
      },
      {
        day: "Wednesday",
        time: "10:30-11:15 AM",
        location: "City Arena, Pembroke",
        dateRange: "September 23–November 11, 2026",
        bookingUrl: "https://bookings.theathletelab.net/service-page/mini-soccer-wednesday-ages-3-5",
      },
    ],
    features: ["Ball skills & dribbling", "Running mechanics", "Confidence building", "Game-based learning"],
    image: assets.miniSoccerImg,
    video: assets.miniSoccerVideo,
    bookingUrl: "https://bookings.theathletelab.net/booking-calendar/mini-soccer-drop-in",
    primaryCtaUrl: "https://bookings.theathletelab.net/service-page/mini-soccer-monday-ages-3-5",
    primaryCtaLabel: "Book Mondays ($140)",
    secondaryLinks: [
      { label: "Book Wednesdays ($140)", href: "https://bookings.theathletelab.net/service-page/mini-soccer-wednesday-ages-3-5" },
      { label: "Book a Drop-In ($25)", href: "https://bookings.theathletelab.net/booking-calendar/mini-soccer-drop-in" },
    ],
    color: "#22c55e",
    featured: true,
  },
  {
    id: "speed-agility",
    ageGroup: "Ages 5-8",
    name: "Intro to Speed & Agility",
    tagline: "Build the athletic foundation",
    description:
      "Designed for developing athletes ready to learn how to move fast, change direction, and build coordination. Sessions focus on acceleration, footwork, reaction drills, and body control that translate to every sport.",
    price: "$100",
    priceSub: "5-session pack",
    priceAlt: "$25 per session drop-in",
    priceNote: "Shared 5-session pack or $25 per session",
    schedule: [
      {
        day: "Monday-Thursday",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        time: "4:00-5:00 PM",
        location: "City Arena Field 4, Pembroke",
      },
    ],
    features: ["First-step quickness", "Change of direction", "Footwork & coordination", "Sport-transferable skills"],
    image: assets.speedAgilityImg,
    video: assets.speedAgilityVideo,
    bookingUrl: "https://bookings.theathletelab.net/booking-calendar/intro-to-speed-agility",
    primaryCtaLabel: "Book a Drop-In ($25)",
    secondaryLinks: [
      { label: "Book Using the Shared 5-Pack", href: "https://bookings.theathletelab.net/booking-calendar/intro-to-speed-agility" },
    ],
    color: "#3b82f6",
    featured: true,
  },
  {
    id: "performance",
    ageGroup: "Ages 9-18",
    name: "Youth Sports Performance",
    tagline: "Build strength, speed, and game-ready conditioning",
    description:
      "Purpose-driven strength and conditioning for competitive youth athletes. Sessions are structured around speed, strength, and conditioning pillars to develop explosiveness, durability, and mental toughness.",
    price: "$100",
    priceSub: "5-session pack",
    priceAlt: "$25 drop-in",
    priceNote: "Shared 5-session pack $100 / Drop-in $25",
    schedule: [
      {
        day: "Monday-Thursday",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        time: "5:00-7:00 PM",
        location: "City Arena Field 4, Pembroke",
      },
    ],
    features: ["Strength & power development", "Speed & agility training", "Injury prevention", "Mental toughness"],
    image: assets.perfTrainingImg,
    video: assets.mainVideo,
    bookingUrl: "https://bookings.theathletelab.net/booking-calendar/sports-performance-training-drop-in",
    primaryCtaLabel: "Book Youth Sports Performance",
    secondaryLinks: [
      {
        label: "Book Using the Shared 5-Pack",
        href: "https://bookings.theathletelab.net/booking-calendar/sports-performance-training-drop-in",
      },
    ],
    color: "#f97316",
    featured: false,
  },
];

// ── Coaches Data ──
export const coaches = [
  {
    name: "Francis Mulkern",
    title: "Founder & Head Coach",
    photo: assets.franPhoto,
    photos: [
      {
        src: assets.franPhoto,
        alt: "Francis Mulkern leading group instruction during an Athlete Lab class",
        objectPosition: "50% 50%",
      },
      {
        src: assets.franClassSpeedDrills,
        alt: "Francis Mulkern coaching athletes through resisted sprint drills",
        objectPosition: "45% 50%",
      },
      {
        src: assets.franClassStrength,
        alt: "Francis Mulkern supervising strength exercises on the indoor turf",
        objectPosition: "40% 50%",
      },
    ],
    bio: "Former collegiate soccer player at Merrimack College with a background in Sports Medicine and Pre-Physical Therapy. Spent 10 years coaching with the Boston Bolts, most recently leading a team where 19 of 23 players went on to play college soccer. Created The Athlete Lab to provide structured, intentional youth athletic training on the South Shore.",
  },
];
