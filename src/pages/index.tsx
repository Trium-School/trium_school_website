import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useNavigate } from "react-router";
import { ChevronRight, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import { home } from 'virtual:content';

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = ''
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return <motion.div initial={{
    opacity: 0,
    y: 28
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    margin: '-60px'
  }} transition={{
    duration: 0.6,
    delay,
    ease: 'easeOut' as const
  }} className={className}>
      
      {children}
    </motion.div>;
}
export default function HomePage() {
  const navigate = useNavigate();
  const site = 'https://triumschool.in';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'WebSite',
      '@id': `${site}/#website`,
      name: 'The Trium School',
      url: `${site}/`
    }, {
      '@type': ['EducationalOrganization', 'School'],
      '@id': `${site}/#organization`,
      name: 'The Trium School',
      url: `${site}/`,
      logo: `${site}/airo-assets/images/logo/horizontal`,
      description: 'A K–12 school in Makhmalabad, Nashik offering inquiry-based education from Early Years through Grade 12.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nashik',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN'
      },
      areaServed: 'Nashik',
      keywords: 'K-12 school Nashik, best school Nashik, admissions Nashik, CBSE school Nashik, Trium School'
    }, {
      '@type': 'WebPage',
      '@id': `${site}/#webpage`,
      url: `${site}/`,
      name: 'The Trium School — Where Every Child Triumphs',
      isPartOf: {
        '@id': `${site}/#website`
      },
      about: {
        '@id': `${site}/#organization`
      },
      datePublished: '2025-01-01',
      dateModified: '2026-09-29'
    }]
  };
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
        >
          <div className="absolute inset-0">
            <img
              src="media/Collaborative-Robotics-Lesson-in-STEM-Lab.png"
              alt="The Trium School Campus"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
              width={1440}
              height={900}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
          </div>

          <div className="relative container mx-auto px-6 py-24">
            <div className="max-w-2xl">
              <motion.div
                initial={{
                  opacity: 0,
                  y: -16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut" as const,
                }}
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2 mb-8"
              >
                <Award size={14} className="text-accent" />
                <span className="text-white/90 text-xs font-medium">
                  {home.hero.trust_badge}
                </span>
              </motion.div>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 32,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: "easeOut" as const,
                }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                {home.hero.tagline}
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.25,
                  ease: "easeOut" as const,
                }}
                className="text-white/85 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
              >
                {home.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  ease: "easeOut" as const,
                }}
                className="flex flex-wrap gap-4"
              >
                <span
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent font-semibold text-sm shadow-lg cursor-pointer"
                  style={{
                    color: "#1a1a1a",
                  }}
                  onClick={() => navigate("/admissions")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && navigate("/admissions")
                  }
                >
                  {home.hero.cta_primary}
                  <ChevronRight size={16} />
                </span>
              </motion.div>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
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
                        src="/airo-assets/images/pages/home/differentiators-1"
                        alt={home.differentiators.items[0].title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={700}
                        height={525}
                      />
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-5 -left-5 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
                      <span
                        className="text-2xl font-bold text-accent"
                        style={{
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {home.differentiators.items[0].number}
                      </span>
                    </div>
                  </div>
                  <div>
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
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {home.differentiators.items[0].description}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[0].highlights[0]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[0].highlights[1]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[0].highlights[2]}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </FadeUp>

              {/* Diff 2 — image right */}
              <FadeUp delay={0.05}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                  <div className="lg:order-2 relative">
                    <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                      <img
                        src="media\differentiators-2.png"
                        alt={home.differentiators.items[1].title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={700}
                        height={525}
                      />
                    </div>
                    <div className="absolute -top-5 -right-5 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
                      <span
                        className="text-2xl font-bold text-accent"
                        style={{
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {home.differentiators.items[1].number}
                      </span>
                    </div>
                  </div>
                  <div className="lg:order-1">
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
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {home.differentiators.items[1].description}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[1].highlights[0]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[1].highlights[1]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[1].highlights[2]}
                        </span>
                      </li>
                    </ul>
                  </div>
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
                    <div className="absolute -top-5 -left-5 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
                      <span
                        className="text-2xl font-bold text-accent"
                        style={{
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {home.differentiators.items[2].number}
                      </span>
                    </div>
                  </div>
                  <div>
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
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {home.differentiators.items[2].description}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[2].highlights[0]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[2].highlights[1]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[2].highlights[2]}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </FadeUp>

              {/* Diff 4 — image right */}
              <FadeUp delay={0.05}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                  <div className="lg:order-2 relative">
                    <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                      <img
                        src="/airo-assets/images/pages/home/differentiators-4"
                        alt={home.differentiators.items[3].title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={700}
                        height={525}
                      />
                    </div>
                    <div className="absolute -top-5 -right-5 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
                      <span
                        className="text-2xl font-bold text-accent"
                        style={{
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {home.differentiators.items[3].number}
                      </span>
                    </div>
                  </div>
                  <div className="lg:order-1">
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
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {home.differentiators.items[3].description}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[3].highlights[0]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[3].highlights[1]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[3].highlights[2]}
                        </span>
                      </li>
                    </ul>
                  </div>
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
                    <div className="absolute -top-5 -left-5 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
                      <span
                        className="text-2xl font-bold text-accent"
                        style={{
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {home.differentiators.items[4].number}
                      </span>
                    </div>
                  </div>
                  <div>
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
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {home.differentiators.items[4].description}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[4].highlights[0]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[4].highlights[1]}
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-foreground/80 text-sm font-medium">
                        <CheckCircle2
                          size={18}
                          className="text-accent shrink-0"
                        />
                        <span>
                          {home.differentiators.items[4].highlights[2]}
                        </span>
                      </li>
                    </ul>
                  </div>
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
                <div className="w-2 h-2 rounded-full bg-[#fec123]" />

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
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
                            ? "/airo-assets/images/pages/home/programs-early-years"
                            : "/airo-assets/images/pages/home/programs-primary"
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
                className="text-4xl md:text-5xl font-bold text-primary mb-14 leading-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                {home.admissions_process.heading}
              </h2>
            </FadeUp>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-primary/20" />

              <div className="flex flex-col gap-12">
                {home.admissions_process.steps.map(
                  (
                    step: (typeof home.admissions_process.steps)[0],
                    i: number,
                  ) => (
                    <FadeUp key={step.id} delay={i * 0.12}>
                      <div className="flex gap-6">
                        {/* Dot */}
                        <div className="relative shrink-0 mt-1">
                          <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary" />
                        </div>
                        {/* Content */}
                        <div className="pb-2">
                          <h3
                            className="text-xl font-bold text-primary mb-2"
                            style={{
                              fontFamily: "var(--font-heading)",
                            }}
                          >
                            {step.title}
                          </h3>
                          <p className="text-foreground/75 leading-relaxed mb-3">
                            {step.description}
                          </p>
                          {(
                            step as {
                              sub_items?: {
                                id: string;
                                label: string;
                                detail: string;
                              }[];
                            }
                          ).sub_items?.map((sub) => (
                            <p
                              key={sub.id}
                              className="text-sm leading-relaxed mb-1"
                            >
                              <span className="font-semibold text-primary">
                                {sub.label}
                              </span>
                              <span className="text-foreground/70">
                                {" "}
                                — {sub.detail}
                              </span>
                            </p>
                          ))}
                        </div>
                      </div>
                    </FadeUp>
                  ),
                )}
              </div>
            </div>
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
                        className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-xs font-bold shrink-0"
                        style={{
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
                  style={{
                    color: "#1a1a1a",
                  }}
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
    </>
  );
}
