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
export type ScheduleEntry = { day: string; time: string; location: string };
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
  bookingUrlAlt?: string;
  bookingUrlAltLabel?: string;
  color: string;
  featured: boolean;
};

export const programs: Program[] = [
  {
    id: "little-athletes",
    ageGroup: "Ages 2–3",
    name: "Little Athletes",
    tagline: "First steps to athletic confidence",
    description:
      "A 30-minute high-energy introduction to movement for toddlers. Through games, obstacle courses, and guided activities, kids build balance, coordination, body control, and confidence. Parent participation encouraged.",
    price: "$25",
    priceSub: "per session",
    priceNote: "Interested in a multi-session package? Contact us for details.",
    schedule: [
      { day: "Monday", time: "9:45–10:15 AM", location: "Riverside Sports Complex, Pembroke" },
      { day: "Wednesday", time: "9:45–10:15 AM", location: "Riverside Sports Complex, Pembroke" },
    ],
    features: ["Obstacle courses & games", "Balance & coordination", "Parent participation", "Supportive environment"],
    image: assets.littleAthletesImg,
    video: null,
    bookingUrl: "https://bookings.theathletelab.net/booking-calendar/little-athletes-drop-in",
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
    bookingUrl: "https://bookings.theathletelab.net/book-now",
    bookingUrlAlt: "https://bookings.theathletelab.net/booking-calendar/mini-soccer-drop-in",
    bookingUrlAltLabel: "Book a Drop-In ($25)",
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
    price: "$100",
    priceSub: "5-session pack",
    priceAlt: "$25 per session drop-in",
    priceNote: "5-session pack or $25 per session",
    schedule: [
      { day: "Monday", time: "4:00–5:00 PM", location: "City Arena Field 4, Pembroke" },
      { day: "Wednesday", time: "4:00–5:00 PM", location: "Starland Sportsplex, Hanover" },
      { day: "Thursday", time: "4:00–5:00 PM", location: "Starland Sportsplex, Hanover" },
      { day: "Friday", time: "4:00–5:00 PM", location: "Riverside Sports Complex, Pembroke" },
    ],
    features: ["First-step quickness", "Change of direction", "Footwork & coordination", "Sport-transferable skills"],
    image: assets.speedAgilityImg,
    video: assets.speedAgilityVideo,
    bookingUrl: "https://bookings.theathletelab.net/book-now",
    bookingUrlAlt: "https://bookings.theathletelab.net/booking-calendar/intro-to-speed-agility",
    bookingUrlAltLabel: "Book a Drop-In ($25)",
    color: "#3b82f6",
    featured: false,
  },
  {
    id: "performance",
    ageGroup: "Ages 9+",
    name: "Performance Training",
    tagline: "Train like a serious athlete",
    description:
      "Purpose-driven strength and conditioning for competitive youth athletes. Every session is structured around speed, strength, and conditioning pillars to develop explosiveness, durability, and mental toughness.",
    price: "$200",
    priceSub: "per month, unlimited",
    priceAlt: "$100 5-session pack · $25 drop-in",
    priceNote: "Monthly unlimited $200 · 5-session pack $100 · Drop-in $25",
    schedule: [
      { day: "Monday", time: "7:00–9:00 PM", location: "City Arena Field 4, Pembroke" },
      { day: "Tuesday", time: "4:00–6:00 PM", location: "Arena Field 4, Pembroke" },
      { day: "Thursday", time: "7:00–9:00 PM", location: "Arena Field 4, Pembroke" },
      { day: "Friday", time: "5:00–8:00 PM", location: "Riverside Sports Complex, Pembroke" },
    ],
    features: ["Strength & power development", "Speed & agility training", "Injury prevention", "Mental toughness"],
    image: assets.perfTrainingImg,
    video: assets.mainVideo,
    bookingUrl: "https://bookings.theathletelab.net/booking-calendar/performance-training-monthly-membership",
    bookingUrlAlt: "https://bookings.theathletelab.net/booking-calendar/sports-performance-training-drop-in",
    bookingUrlAltLabel: "Book a Drop-In ($25) or 5-Session Pack ($100)",
    color: "#dc2626",
    featured: false,
  },
];

// ── Coaches Data ──
export const coaches = [
  {
    name: "Francis Mulkern",
    title: "Founder & Head Coach",
    photo: assets.franPhoto,
    bio: "Former collegiate soccer player at Merrimack College with a background in Sports Medicine and Pre-Physical Therapy. Spent 10 years coaching with the Boston Bolts, most recently leading a team where 19 of 23 players went on to play college soccer. Created The Athlete Lab to provide structured, intentional youth athletic training on the South Shore.",
  },
  {
    name: "Chris Nelson",
    title: "Performance Coach",
    photo: assets.chrisPhoto,
    bio: "Former collegiate tennis player at Quinnipiac University, competing at the NCAA level. Standout athlete at Scituate High School earning All-Scholastic honors and serving as team captain. Brings a disciplined, detail-oriented approach to training, helping athletes improve agility, coordination, and confidence.",
  },
];
