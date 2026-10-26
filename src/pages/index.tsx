import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { useNavigate } from "react-router";
import {
  ChevronRight,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronLeft,
  FileText,
  CalendarCheck,
  GraduationCap,
  X,
} from "lucide-react";
import { home } from "virtual:content";

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 28,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-60px",
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut" as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Brand colours used for decorative accents ────────────────────────────────
const BRAND = {
  blue: "#51aafd",
  green: "#69bb44",
  red: "#fe584a",
  yellow: "#fec132",
};
// one colour per differentiator block (cycles if you add more)
const DIFF_COLORS = [
  BRAND.blue,
  BRAND.green,
  BRAND.red,
  BRAND.yellow,
  BRAND.blue,
];

const REAL_WORLD_PROJECTS = [
  {
    id: "kitchen-garden",
    eyebrow: "Grade 4 · Science field project",
    title: "The Kitchen Garden Investigators",
    color: BRAND.blue,
    problem: "Where does our food come from, and can we grow some ourselves?",
    duration: "6 weeks",
    description:
      "Students design and grow a kitchen garden, tracking how seeds become food. They observe what plants need to thrive, care for crops daily, and harvest ingredients for a class meal — connecting science observations to what lands on their own plate.",
    ageGroup: "Grade 4",
    mentor: "Urban Farming Educators",
    focus: "Growing & Observing",
    focusDescription:
      "Daily care and observation of the garden, watching how plants respond to sun, water, and soil.",
    fieldConcepts: ["Plant care routines", "Observation journaling", "Solving pests & wilting"],
    academicConcepts: ["Science: parts of a plant", "EVS: recording & measuring", "Science: what plants need"],
    realWorldConnections: ["Visit from a school gardener", "Comparing plots with classmates", "Talking to a local nursery owner"],
    phases: [
      ["Week 1–2", "Seeds & Soil"],
      ["Week 3–4", "Growing & Observing"],
      ["Week 5", "Harvest & Cook"],
      ["Week 6", "Reflection & Showcase"],
    ],
  },
  {
    id: "map-neighbourhood",
    eyebrow: "Grade 5 · Social studies field project",
    title: "Map My Neighbourhood",
    color: BRAND.green,
    problem: "How does our own neighbourhood work, and who keeps it running?",
    duration: "8 weeks",
    description:
      "Students survey their neighbourhood, mapping homes, shops, parks, and public services, then interview a local representative to understand how community resources and local government decisions shape the place they live.",
    ageGroup: "Grade 5",
    mentor: "Ward Councillors, Civil servants",
    focus: "Meet Local Government",
    focusDescription:
      "Students interview a ward councillor to learn how local services and decisions are made.",
    fieldConcepts: ["Interviewing skills", "Civic responsibility", "Resource mapping"],
    academicConcepts: ["Social Studies: local government", "Social Studies: rights & duties", "Geography: reading simple maps"],
    realWorldConnections: ["Q&A with a ward councillor", "Visiting a municipal ward office", "Comparing map to real location"],
    phases: [
      ["Week 1–2", "Survey & Sketch"],
      ["Week 3–4", "Mapping Resources"],
      ["Week 5–6", "Meet Local Government"],
      ["Week 7–8", "Present & Propose"],
    ],
  },
] as const;

type RealWorldProject = (typeof REAL_WORLD_PROJECTS)[number];

// ─── Admissions process card styles (blue / green / red) ─────────────────────
const ADMISSION_CARDS = [
  {
    Icon: FileText,
    bar: "bg-[#51aafd]",
    text: "text-[#51aafd]",
    soft: "bg-[#51aafd]/15 group-hover:bg-[#51aafd]",
    dot: "bg-[#51aafd]",
    ring: "hover:shadow-[0_20px_40px_-12px_rgba(81,170,253,0.45)]",
  },
  {
    Icon: CalendarCheck,
    bar: "bg-[#69bb44]",
    text: "text-[#69bb44]",
    soft: "bg-[#69bb44]/15 group-hover:bg-[#69bb44]",
    dot: "bg-[#69bb44]",
    ring: "hover:shadow-[0_20px_40px_-12px_rgba(105,187,68,0.45)]",
  },
  {
    Icon: GraduationCap,
    bar: "bg-[#fe584a]",
    text: "text-[#fe584a]",
    soft: "bg-[#fe584a]/15 group-hover:bg-[#fe584a]",
    dot: "bg-[#fe584a]",
    ring: "hover:shadow-[0_20px_40px_-12px_rgba(254,88,74,0.45)]",
  },
];

// ─── Text column with brush-stroke / colour-touch decoration ─────────────────
function DiffText({
  color,
  className = "",
  children,
}: {
  color: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative isolate py-6 ${className}`}>
      {/* Slowly rotating dashed ring, top right */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="pointer-events-none absolute -z-10 top-0 right-0 w-16 h-16 opacity-70"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray="4 9"
          strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="6" fill={color} />
      </motion.svg>

      {/* Dot grid, bottom right */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="pointer-events-none absolute -z-10 bottom-0 right-0 w-24 h-24 opacity-50"
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <circle
            key={i}
            cx={10 + (i % 5) * 20}
            cy={10 + Math.floor(i / 5) * 20}
            r={3}
            fill={color}
          />
        ))}
      </svg>

      {children}
    </div>
  );
}

// ─── Hand-painted underline that draws itself under the title ────────────────
function BrushUnderline({ color }: { color: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 16"
      className="-mt-3 mb-6 h-4 w-44 -rotate-1"
      fill="none"
    >
      <motion.path
        d="M4,10 C50,3 110,14 170,7 S262,5 296,9"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" as const }}
      />
    </svg>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const site = "https://triumschool.in";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        name: "The Trium School",
        url: `${site}/`,
      },
      {
        "@type": ["EducationalOrganization", "School"],
        "@id": `${site}/#organization`,
        name: "The Trium School",
        url: `${site}/`,
        logo: `${site}/airo-assets/images/logo/horizontal`,
        description:
          "A K–12 school in Makhmalabad, Nashik offering inquiry-based education from Early Years through Grade 12.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nashik",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        areaServed: "Nashik",
        keywords:
          "K-12 school Nashik, best school Nashik, admissions Nashik, CBSE school Nashik, Trium School",
      },
      {
        "@type": "WebPage",
        "@id": `${site}/#webpage`,
        url: `${site}/`,
        name: "The Trium School — Where Every Child Triumphs",
        isPartOf: {
          "@id": `${site}/#website`,
        },
        about: {
          "@id": `${site}/#organization`,
        },
        datePublished: "2025-01-01",
        dateModified: "2026-09-29",
      },
    ],
  };

  const slides = [
    {
      image: "media/hero-banner1.png",
      alt: "Collaborative robotics lesson in the STEM lab",
      badge: home.hero.trust_badge,
      tagline: home.hero.tagline,
      subtitle: home.hero.subtitle,
      cta: home.hero.cta_primary,
      link: "/admissions",
    },
    {
      image: "media/banner_2.png",
      alt: "Collaborative robotics lesson in the STEM lab",
      badge: home.hero.trust_badge,
      tagline: home.hero.tagline,
      subtitle: home.hero.subtitle,
      cta: home.hero.cta_primary,
      link: "/admissions",
    },
    {
      image: "media/banner_3.png",
      alt: "Collaborative robotics lesson in the STEM lab",
      badge: home.hero.trust_badge,
      tagline: home.hero.tagline,
      subtitle: home.hero.subtitle,
      cta: home.hero.cta_primary,
      link: "/admissions",
    },
    // add more...
  ];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeProject, setActiveProject] = useState<RealWorldProject | null>(
    null,
  );

  const next = useCallback(
    () => setCurrent((i) => (i + 1) % slides.length),
    [slides.length],
  );
  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, 6000);
    return () => window.clearInterval(id);
  }, [paused, next, current]); // `current` resets the timer after manual navigation

  useEffect(() => {
    if (!activeProject) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject]);

  const slide = slides[current];

  return (
    <>
      <Helmet>
        <title>
          The Trium School — Where Every Child Triumphs | K–12 School
        </title>
        <meta
          name="description"
          content="The Trium School is a K–12 institution dedicated to nurturing curious minds and compassionate hearts. Admissions open for 2025–26. Visit triumschool.in."
        />
        <link rel="canonical" href={`${site}/`} />
        <meta
          property="og:title"
          content="The Trium School — Where Every Child Triumphs"
        />
        <meta
          property="og:description"
          content="A K–12 school where every child is empowered to triumph. Admissions open for 2025–26."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/`} />
        <meta
          property="og:image"
          content={`${site}/airo-assets/images/pages/home/hero`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={`${site}/airo-assets/images/pages/home/hero`}
        />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative min-h-[92vh] flex items-center overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Background images (crossfade) */}
          <div className="absolute inset-0">
            <AnimatePresence initial={false}>
              <motion.img
                key={current}
                src={slide.image}
                alt={slide.alt}
                className="absolute inset-0 w-full h-full object-cover object-center"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                loading={current === 0 ? "eager" : "lazy"}
                width={1440}
                height={900}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative container mx-auto px-6 min-[992px]:pl-24 py-24">
            <AnimatePresence mode="wait">
              {current === 0 && (
                <motion.div
                  key="hero-content"
                  className="max-w-2xl"
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2 mb-8"
                  >
                    <Award size={14} className="text-accent" />
                    <span className="text-white/90 text-xs font-medium">
                      {slide.badge}
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {slide.tagline}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                    className="text-white/85 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-wrap gap-4"
                  >
                    <span
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent font-semibold text-sm shadow-lg cursor-pointer"
                      style={{
                        backgroundColor: "var(--yellow)",
                        color: "#1a1a1a",
                      }}
                      onClick={() => navigate(slide.link)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" && navigate(slide.link)
                      }
                    >
                      {slide.cta}
                      <ChevronRight size={16} />
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white hover:bg-white/30 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white hover:bg-white/30 transition"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-accent"
                    : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Wave divider (unchanged) */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg
              viewBox="0 0 1440 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
                fill="#FAFAF7"
              />
            </svg>
          </div>
        </section>

        {/* ── TRIUM DIFFERENTIATORS ────────────────────────────────────────── */}
        <section id="academics" className="py-28 bg-background">
          <div className="container mx-auto px-6">
            <FadeUp className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold text-primary mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                {home.differentiators.heading}
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                {home.differentiators.subheading}
              </p>
            </FadeUp>

            <div className="space-y-28">
              {/* Diff 1 — image left */}
              <FadeUp delay={0.05}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                  <div className="relative">
                    <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                      <img
                        src="media/academics.png"
                        alt={home.differentiators.items[0].title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={700}
                        height={525}
                      />
                    </div>
                  </div>
                  <DiffText color={DIFF_COLORS[0]}>
                    <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
                      {home.differentiators.items[0].subtitle}
                    </p>
                    <h3
                      className="text-3xl md:text-4xl font-bold text-primary mb-5 leading-tight"
                      style={{
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {home.differentiators.items[0].title}
                    </h3>
                    <BrushUnderline color={DIFF_COLORS[0]} />
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {home.differentiators.items[0].description}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[0]}
                        />
                        <span>
                          {home.differentiators.items[0].highlights[0]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[0]}
                        />
                        <span>
                          {home.differentiators.items[0].highlights[1]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[0]}
                        />
                        <span>
                          {home.differentiators.items[0].highlights[2]}
                        </span>
                      </li>
                    </ul>
                  </DiffText>
                </div>
              </FadeUp>

              {/* Diff 2 — image right */}
              <FadeUp delay={0.05}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                  <div className="lg:order-2 relative">
                    <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                      <img
                        src="media\worldclass_teachers.png"
                        alt={home.differentiators.items[1].title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={700}
                        height={525}
                      />
                    </div>
                  </div>
                  <DiffText color={DIFF_COLORS[1]} className="lg:order-1">
                    <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
                      {home.differentiators.items[1].subtitle}
                    </p>
                    <h3
                      className="text-3xl md:text-4xl font-bold text-primary mb-5 leading-tight"
                      style={{
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {home.differentiators.items[1].title}
                    </h3>
                    <BrushUnderline color={DIFF_COLORS[1]} />
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {home.differentiators.items[1].description}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[1]}
                        />
                        <span>
                          {home.differentiators.items[1].highlights[0]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[1]}
                        />
                        <span>
                          {home.differentiators.items[1].highlights[1]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[1]}
                        />
                        <span>
                          {home.differentiators.items[1].highlights[2]}
                        </span>
                      </li>
                    </ul>
                  </DiffText>
                </div>
              </FadeUp>

              {/* Diff 3 — image left */}
              <FadeUp delay={0.05}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                  <div className="relative">
                    <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                      <img
                        src="/airo-assets/images/pages/home/differentiators-3"
                        alt={home.differentiators.items[2].title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={700}
                        height={525}
                      />
                    </div>
                  </div>
                  <DiffText color={DIFF_COLORS[2]}>
                    <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
                      {home.differentiators.items[2].subtitle}
                    </p>
                    <h3
                      className="text-3xl md:text-4xl font-bold text-primary mb-5 leading-tight"
                      style={{
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {home.differentiators.items[2].title}
                    </h3>
                    <BrushUnderline color={DIFF_COLORS[2]} />
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {home.differentiators.items[2].description}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[2]}
                        />
                        <span>
                          {home.differentiators.items[2].highlights[0]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[2]}
                        />
                        <span>
                          {home.differentiators.items[2].highlights[1]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[2]}
                        />
                        <span>
                          {home.differentiators.items[2].highlights[2]}
                        </span>
                      </li>
                    </ul>
                  </DiffText>
                </div>
              </FadeUp>

              {/* Diff 4 — image right */}
              <FadeUp delay={0.05}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                  <div className="lg:order-2 relative">
                    <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                      <img
                        src="media/trium_innovator.png"
                        alt={home.differentiators.items[3].title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={700}
                        height={525}
                      />
                    </div>
                  </div>
                  <DiffText color={DIFF_COLORS[3]} className="lg:order-1">
                    <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
                      {home.differentiators.items[3].subtitle}
                    </p>
                    <h3
                      className="text-3xl md:text-4xl font-bold text-primary mb-5 leading-tight"
                      style={{
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {home.differentiators.items[3].title}
                    </h3>
                    <BrushUnderline color={DIFF_COLORS[3]} />
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {home.differentiators.items[3].description}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[3]}
                        />
                        <span>
                          {home.differentiators.items[3].highlights[0]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[3]}
                        />
                        <span>
                          {home.differentiators.items[3].highlights[1]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[3]}
                        />
                        <span>
                          {home.differentiators.items[3].highlights[2]}
                        </span>
                      </li>
                    </ul>
                  </DiffText>
                </div>
              </FadeUp>

              {/* Diff 5 — image left */}
              <FadeUp delay={0.05}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                  <div className="relative">
                    <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                      <img
                        src="media\differentiators-5.png"
                        alt={home.differentiators.items[4].title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={700}
                        height={525}
                      />
                    </div>
                  </div>
                  <DiffText color={DIFF_COLORS[4]}>
                    <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
                      {home.differentiators.items[4].subtitle}
                    </p>
                    <h3
                      className="text-3xl md:text-4xl font-bold text-primary mb-5 leading-tight"
                      style={{
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {home.differentiators.items[4].title}
                    </h3>
                    <BrushUnderline color={DIFF_COLORS[4]} />
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {home.differentiators.items[4].description}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[4]}
                        />
                        <span>
                          {home.differentiators.items[4].highlights[0]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[4]}
                        />
                        <span>
                          {home.differentiators.items[4].highlights[1]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="shrink-0"
                          color={DIFF_COLORS[4]}
                        />
                        <span>
                          {home.differentiators.items[4].highlights[2]}
                        </span>
                      </li>
                    </ul>
                    <div className="mt-7 flex flex-col gap-3 sm:max-w-xs">
                      {REAL_WORLD_PROJECTS.map((project) => (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() => setActiveProject(project)}
                          className="flex items-center justify-between rounded-lg border-2 bg-white/70 px-4 py-3 text-left text-sm font-semibold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                          style={{ borderColor: project.color }}
                        >
                          <span>{project.title}</span>
                          <ArrowRight size={16} className="shrink-0" />
                        </button>
                      ))}
                    </div>
                  </DiffText>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── FOUNDER'S MESSAGE ────────────────────────────────────────────── */}
        <section
          id="about"
          className="py-28 bg-primary overflow-hidden relative"
        >
          {/* Subtle background texture */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto">
              <FadeUp>
                <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-10 text-center">
                  {home.founders_message.eyebrow}
                </p>
              </FadeUp>

              {/* Pull quote */}
              <FadeUp delay={0.1}>
                <blockquote className="relative mb-14">
                  {/* Opening quote mark */}
                  <span
                    className="absolute -top-6 -left-4 text-accent/30 select-none pointer-events-none"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "10rem",
                      lineHeight: 1,
                    }}
                  >
                    "
                  </span>
                  <p
                    className="relative text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug text-center px-8"
                    style={{
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {home.founders_message.pull_quote}
                  </p>
                </blockquote>
              </FadeUp>

              {/* Divider */}

              <FadeUp delay={0.15}>
                <div className="flex items-center gap-4 mb-14">
                  <div className="flex-1 h-px bg-white/20" />

                  <div className="w-2 h-2 rounded-full bg-[#51aafd]" />
                  <div className="w-2 h-2 rounded-full bg-[#69bb44]" />
                  <div className="w-2 h-2 rounded-full bg-[#fe584a]" />
                  <div className="w-2 h-2 rounded-full bg-[#fec132]" />

                  <div className="flex-1 h-px bg-white/20" />
                </div>
              </FadeUp>

              {/* Body paragraphs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-7 mb-14">
                <FadeUp delay={0.2}>
                  <p className="text-white/75 text-base leading-relaxed">
                    {home.founders_message.paragraphs[0].text}
                  </p>
                </FadeUp>
                <FadeUp delay={0.25}>
                  <p className="text-white/75 text-base leading-relaxed">
                    {home.founders_message.paragraphs[1].text}
                  </p>
                </FadeUp>
                <FadeUp delay={0.3}>
                  <p className="text-white/75 text-base leading-relaxed">
                    {home.founders_message.paragraphs[2].text}
                  </p>
                </FadeUp>
                <FadeUp delay={0.35}>
                  <p className="text-white/75 text-base leading-relaxed">
                    {home.founders_message.paragraphs[3].text}
                  </p>
                </FadeUp>
              </div>

              {/* Closing statement + attribution */}
              <FadeUp delay={0.4}>
                <div className="border-l-4 border-accent pl-6">
                  <p
                    className="text-white text-lg font-semibold italic mb-3"
                    style={{
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {home.founders_message.closing}
                  </p>
                  <p className="text-accent text-sm font-semibold uppercase tracking-widest">
                    {home.founders_message.attribution}
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── PROGRAMS BENTO ───────────────────────────────────────────────── */}
        <section id="programs" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <FadeUp className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold text-primary mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                {home.programs.subheading}
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto">
              {home.programs.items.map((prog, i) => (
                <FadeUp key={prog.id} delay={i * 0.1}>
                  <motion.div
                    whileHover={{
                      y: -6,
                      scale: 1.01,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut" as const,
                    }}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer bg-card border border-border shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    style={{
                      minHeight: i === 0 || i === 3 ? "380px" : "340px",
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
  src={
    i === 0
      ? "media/Joyful Toddler Reading in a Sunny Classroom.png"
      : i === 1
        ? "media/Trium kids.png"
        : "media/Secondary.png"
  }
  alt={prog.name}
  className="w-full h-full object-cover"
  loading="lazy"
  width={600}
  height={192}
/>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span
                        className="absolute top-4 left-4 bg-accent text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: "var(--yellow)",
                          color: "#1a1a1a",
                        }}
                      >
                        {prog.highlight}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3
                        className="text-xl font-bold text-primary mb-1"
                        style={{
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {prog.name}
                      </h3>
                      <p className="text-xs text-primary font-medium mb-3">
                        {prog.grades}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                        {prog.description}
                      </p>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── ADMISSIONS PROCESS ───────────────────────────────────────────── */}
        <section id="admissions" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <FadeUp className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold text-primary leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {home.admissions_process.heading}
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {home.admissions_process.steps.map(
                (
                  step: (typeof home.admissions_process.steps)[0],
                  i: number,
                ) => {
                  const c = ADMISSION_CARDS[i % ADMISSION_CARDS.length];
                  const subItems = (
                    step as {
                      sub_items?: {
                        id: string;
                        label: string;
                        detail: string;
                      }[];
                    }
                  ).sub_items;

                  return (
                    <FadeUp key={step.id} delay={i * 0.15} className="h-full">
                      <motion.div
                        whileHover={{ y: -8 }}
                        transition={{
                          duration: 0.25,
                          ease: "easeOut" as const,
                        }}
                        className={`group relative h-full overflow-hidden rounded-2xl bg-card border border-border shadow-sm transition-shadow duration-300 p-8 flex flex-col ${c.ring}`}
                      >
                        {/* Top colour bar (grows on hover) */}
                        <div
                          className={`absolute top-0 left-0 h-1.5 w-1/3 group-hover:w-full transition-all duration-500 ${c.bar}`}
                        />

                        {/* Big step number watermark */}
                        <span
                          className={`absolute top-4 right-6 text-7xl font-bold opacity-10 select-none transition-all duration-300 group-hover:opacity-20 group-hover:scale-110 ${c.text}`}
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 group-hover:text-white ${c.text} ${c.soft}`}
                        >
                          <c.Icon size={26} />
                        </motion.div>

                        <h3
                          className="text-xl font-bold text-primary mb-3"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {step.title}
                        </h3>

                        <p className="text-foreground/75 leading-relaxed mb-4">
                          {step.description}
                        </p>

                        {subItems && subItems.length > 0 && (
                          <ul className="mt-auto space-y-2 pt-4 border-t border-border">
                            {subItems.map((sub) => (
                              <li
                                key={sub.id}
                                className="flex items-start gap-2 text-sm leading-relaxed"
                              >
                                <span
                                  className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${c.dot}`}
                                />
                                <span>
                                  <span className="font-semibold text-primary">
                                    {sub.label}
                                  </span>
                                  <span className="text-foreground/70">
                                    {" "}
                                    — {sub.detail}
                                  </span>
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    </FadeUp>
                  );
                },
              )}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex flex-wrap gap-4 mt-12 items-center justify-center rounded-full"
            >
              <span
                className="inline-flex items-center gap-2 px-16 py-4 rounded-full bg-accent font-semibold text-lg shadow-lg cursor-pointer"
                style={{
                  backgroundColor: "var(--yellow)",
                  color: "#1a1a1a",
                }}
                onClick={() => navigate(slide.link)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(slide.link)}
              >
                {slide.cta}
              </span>
            </motion.div>

          </div>
        </section>

        {/* ── ADMISSIONS CTA ───────────────────────────────────────────────── */}
        <section id="contact" className="relative py-28 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/airo-assets/images/pages/home/admissions-cta"
              alt="Admissions at The Trium School"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1440}
              height={700}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/50" />
          </div>

          <div className="relative container mx-auto px-6">
            <div className="max-w-3xl">
              <FadeUp>
                <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
                  Enrol Today
                </p>
                <h2
                  className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
                  style={{
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {home.admissions.heading}
                </h2>
                <p className="text-white/80 text-lg mb-10 max-w-xl leading-relaxed">
                  {home.admissions.subheading}
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                  {home.admissions.steps.map((step, i) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{
                          backgroundColor: [
                            "#51aafd", // Blue - Step 1
                            "#69bb44", // Green - Step 2
                            "#fe584a", // Red - Step 3
                            "#fec132", // Yellow - Step 4
                          ][(Number(step.number) - 1) % 4],
                          color: "#1a1a1a",
                        }}
                      >
                        {step.number}
                      </div>
                      <span className="text-white/90 text-sm font-medium">
                        {step.label}
                      </span>
                      {i < home.admissions.steps.length - 1 && (
                        <ChevronRight
                          size={14}
                          className="text-white/40 hidden sm:block"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <span
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent font-bold text-sm shadow-xl cursor-pointer"
                  style={{ backgroundColor: "var(--yellow)", color: "#1a1a1a" }}
                  onClick={() => navigate("/admissions")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && navigate("/admissions")
                  }
                >
                  {home.admissions.cta}
                  <ArrowRight size={16} />
                </span>
              </FadeUp>
            </div>
          </div>
        </section>
      </main>
      {activeProject && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-primary/70 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveProject(null);
          }}
        >
          
<section
  role="dialog"
  aria-modal="true"
  aria-labelledby="project-modal-title"
  className="flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-background shadow-2xl sm:max-h-[90dvh] sm:rounded-2xl"
>
  <style>{`
    @keyframes pm-sway { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }
    @keyframes pm-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
    @keyframes pm-spin { to { transform: rotate(360deg); } }
    @keyframes pm-twinkle { 0%,100% { opacity: .2; transform: scale(.75); } 50% { opacity: .75; transform: scale(1); } }
    .pm-sway { transform-origin: 50% 100%; animation: pm-sway 4.5s ease-in-out infinite; }
    .pm-float { animation: pm-float 5s ease-in-out infinite; }
    .pm-spin { animation: pm-spin 40s linear infinite; }
    .pm-twinkle { animation: pm-twinkle 3.2s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) {
      .pm-sway, .pm-float, .pm-spin, .pm-twinkle { animation: none; }
    }
  `}</style>

  {/* Header (stays visible while the body scrolls) */}
  <header className="relative shrink-0 overflow-hidden border-b border-border">
    <div className="h-1.5 w-full" style={{ backgroundColor: activeProject.color }} />

    {/* decorative: sprout + sparkles */}
    <div aria-hidden="true" className="pointer-events-none absolute right-16 top-4 sm:right-20">
      <svg
        viewBox="0 0 48 48"
        className="pm-sway h-12 w-12 opacity-40 sm:h-14 sm:w-14"
        fill={activeProject.color}
      >
        <path d="M23 44V22h2v22z" />
        <path d="M24 30C12 30 8 20 10 14c10 0 16 6 14 16z" />
        <path d="M24 24c10 0 16-8 14-16-10 0-16 6-14 16z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="pm-twinkle absolute -left-5 top-1 h-3.5 w-3.5"
        fill={activeProject.color}
      >
        <path d="M12 0c1 8 4 11 12 12-8 1-11 4-12 12-1-8-4-11-12-12 8-1 11-4 12-12z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="pm-twinkle absolute -right-3 top-8 h-2.5 w-2.5 [animation-delay:1.4s]"
        fill={activeProject.color}
      >
        <path d="M12 0c1 8 4 11 12 12-8 1-11 4-12 12-1-8-4-11-12-12 8-1 11-4 12-12z" />
      </svg>
    </div>

    <div className="relative flex items-start justify-between gap-4 px-5 pb-5 pt-5 sm:gap-6 sm:px-8 sm:pt-6">
      <div className="min-w-0 pr-6">
        <p
          className="mb-1.5 flex items-center gap-2 text-base font-semibold"
          style={{ color: activeProject.color }}
        >
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: activeProject.color }}
          />
          <span className="truncate">{activeProject.eyebrow}</span>
        </p>
        <h2
          id="project-modal-title"
          className="text-balance text-2xl font-semibold leading-tight text-primary sm:text-3xl"
        >
          {activeProject.title}
        </h2>
      </div>
      <button
        type="button"
        onClick={() => setActiveProject(null)}
        aria-label="Close project details"
        className="absolute right-4 top-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-6 sm:top-5"
      >
        <X size={22} />
      </button>
    </div>
  </header>

  {/* Scrollable body: one column */}
  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
    <div className="space-y-8 px-5 py-6 sm:px-8 sm:py-8">
      {/* Overview */}
      <div className="space-y-7">
        <div>
          <h3 className="mb-2 text-base font-bold text-muted-foreground">Problem statement</h3>
          <p className="text-balance text-xl font-semibold leading-snug text-primary sm:text-2xl">
            {activeProject.problem}
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-base font-bold text-muted-foreground">Description</h3>
          <p className="max-w-prose text-base leading-relaxed text-muted-foreground sm:text-lg">
            {activeProject.description}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-border pt-6 sm:grid-cols-3">
          <div>
            <dt className="mb-1 text-base font-bold text-muted-foreground">Duration</dt>
            <dd className="text-lg font-semibold text-primary">{activeProject.duration}</dd>
          </div>
          <div>
            <dt className="mb-1 text-base font-bold text-muted-foreground">Age group</dt>
            <dd className="text-lg font-semibold text-primary">{activeProject.ageGroup}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="mb-1 text-base font-bold text-muted-foreground">Key mentor</dt>
            <dd className="text-lg font-semibold text-primary">{activeProject.mentor}</dd>
          </div>
        </dl>
      </div>

      {/* Focus + concepts: single column */}
      <div className="space-y-4">
        <div
          className="relative overflow-hidden rounded-xl border p-5 sm:p-6"
          style={{
            backgroundColor: `color-mix(in srgb, ${activeProject.color} 10%, transparent)`,
            borderColor: `color-mix(in srgb, ${activeProject.color} 35%, transparent)`,
          }}
        >
          {/* decorative: slow-turning dotted ring */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="pm-spin pointer-events-none absolute -right-8 -top-8 h-28 w-28 opacity-40"
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke={activeProject.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1 8"
            />
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke={activeProject.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1 7"
            />
          </svg>

          <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2 pr-12">
            <span
              className="rounded-full px-3.5 py-1 text-base font-bold text-white"
              style={{ backgroundColor: activeProject.color }}
            >
              {activeProject.id === "kitchen-garden" ? "Week 3–4" : "Week 5–6"}
            </span>
            <h3 className="min-w-0 text-lg font-bold text-primary sm:text-xl">
              {activeProject.focus}
            </h3>
          </div>
          <p className="relative mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {activeProject.focusDescription}
          </p>
        </div>

        <div className="divide-y divide-border rounded-xl bg-card px-2">
          {[
            { title: "Field concepts", items: activeProject.fieldConcepts },
            { title: "Academic concepts", items: activeProject.academicConcepts },
            { title: "Real-world connections", items: activeProject.realWorldConnections },
          ].map((group) => (
            <div key={group.title} className="py-5">
              <h3 className="mb-3 text-2xl font-normal" style={{ color: activeProject.color }}>
                {group.title}
              </h3>
              <ul className="space-y-2.5 text-base text-primary sm:text-lg">
                {group.items.map((item: string) => (
                  <li key={item} className="flex gap-3 leading-snug">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: activeProject.color }}
                    />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Project phases: vertical timeline */}
      <div className="relative overflow-hidden rounded-xl bg-card py-5 sm:py-6">
        {/* decorative: floating leaf */}
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="pm-float pointer-events-none absolute bottom-4 right-5 h-14 w-14 opacity-25 sm:h-16 sm:w-16"
          fill={activeProject.color}
        >
          <path d="M8 40C6 20 20 6 42 6c0 22-14 36-34 34z" />
          <path d="M10 38C18 28 26 20 36 12" stroke="currentColor" strokeWidth="2" fill="none" className="text-card" />
        </svg>

        <h3 className="relative mb-6 text-lg font-bold text-primary">Project phases</h3>

        <ol className="relative ml-2 sm:ml-3">
          {activeProject.phases.map(([week, phase]: [string, string], index: number) => {
            const isLast = index === activeProject.phases.length - 1;
            return (
              <li key={week} className="relative pb-7 pl-8 last:pb-0 sm:pl-10">
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[13px] left-0 top-[13px] w-0.5 -translate-x-1/2"
                    style={{ backgroundColor: activeProject.color }}
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-[3px] border-card"
                  style={{
                    backgroundColor: activeProject.color,
                    boxShadow: `0 0 0 2px ${activeProject.color}`,
                  }}
                />
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                  <p className="text-base font-bold text-primary sm:w-28 sm:shrink-0 sm:text-lg">
                    {week}
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {phase}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  </div>
</section>

        </div>
      )}
    </>
  );
}
