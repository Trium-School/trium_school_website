import React, { useEffect } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Cpu, Music, Palette, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { beyondAcademics } from "virtual:content";

const site = "https://triumschool.in";
const url = `${site}/beyond-academics`;

const experienceIcons: Record<string, LucideIcon> = {
  "trium-innovators": Cpu,
  "arts-music-dance": Music,
  "visual-arts": Palette,
  sports: Trophy,
};

/* Works with hex, rgb(), hsl() and CSS variables */
const tint = (color: string, percent: number) =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;

/* ---------- Motion helper ---------- */

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Decorative SVGs (aria-hidden, pointer-events-none) ---------- */

type DecorProps = { className?: string; color: string };

function Sparkle({ className = "", color }: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`ba-twinkle pointer-events-none ${className}`}
      fill={color}
    >
      <path d="M12 0c1 8 4 11 12 12-8 1-11 4-12 12-1-8-4-11-12-12 8-1 11-4 12-12z" />
    </svg>
  );
}

function Sprout({ className = "", color }: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className={`ba-sway pointer-events-none ${className}`}
      fill={color}
    >
      <path d="M23 44V22h2v22z" />
      <path d="M24 30C12 30 8 20 10 14c10 0 16 6 14 16z" />
      <path d="M24 24c10 0 16-8 14-16-10 0-16 6-14 16z" />
    </svg>
  );
}

function DottedRing({ className = "", color }: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={`ba-spin pointer-events-none ${className}`}
      fill="none"
      stroke={color}
      strokeLinecap="round"
    >
      <circle cx="50" cy="50" r="44" strokeWidth="2.5" strokeDasharray="1 8" />
      <circle cx="50" cy="50" r="30" strokeWidth="2" strokeDasharray="1 7" />
    </svg>
  );
}

/* Overlapping paint blobs (visual arts) */
function Blob({ className = "", color }: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 80"
      className={`ba-float pointer-events-none ${className}`}
      fill={color}
    >
      <circle cx="28" cy="30" r="22" fillOpacity="0.9" />
      <circle cx="53" cy="35" r="18" fillOpacity="0.65" />
      <circle cx="39" cy="55" r="16" fillOpacity="0.8" />
    </svg>
  );
}

/* Simple ball outline (sports) */
function Ball({ className = "", color }: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 80"
      className={`ba-float pointer-events-none ${className}`}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    >
      <circle cx="40" cy="40" r="30" />
      <path d="M40 10v60M10 40h60" />
      <path d="M18 18c14 12 14 32 0 44M62 18c-14 12-14 32 0 44" />
    </svg>
  );
}

/* One motif per experience: ring (tech), sparkles (arts), blobs (visual), ball (sports) */
function ExperienceDecor({ index, color, className = "" }: DecorProps & { index: number }) {
  switch (index % 4) {
    case 0:
      return <DottedRing color={color} className={className} />;
    case 1:
      return (
        <span className={`relative block ${className}`} aria-hidden="true">
          <Sparkle color={color} className="absolute left-0 top-2 h-[70%] w-[70%]" />
          <Sparkle color={color} className="absolute bottom-0 right-0 h-[38%] w-[38%] [animation-delay:1.4s]" />
        </span>
      );
    case 2:
      return <Blob color={color} className={className} />;
    default:
      return <Ball color={color} className={className} />;
  }
}

/* ---------- Page ---------- */

export default function BeyondAcademicsPage() {
  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {
  if (!location.hash) return;

  const targetId = decodeURIComponent(
    location.hash.substring(1)
  );

  const frame = requestAnimationFrame(() => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  return () => cancelAnimationFrame(frame);
}, [location.pathname, location.hash]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: "Beyond Academics — The Trium School",
    url,
    isPartOf: { "@id": `${site}/#website` },
    about: { "@id": `${site}/#organization` },
  };

  const { hero, experiences, realWorldEducation, cta } = beyondAcademics;
  const experienceColors = experiences.map((experience) => experience.color);
  const heroColor = (i: number) => experienceColors[i % experienceColors.length] ?? "#ffffff";

  return (
    <>
      <Helmet>
        <title>Beyond Academics — The Trium School, Nashik</title>
        <meta name="description" content={hero.subtitle} />
        <link rel="canonical" href={url} />
        <meta
          property="og:title"
          content="Beyond Academics — The Trium School"
        />
        <meta property="og:description" content={hero.subtitle} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <style>{`
        @keyframes ba-sway { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }
        @keyframes ba-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes ba-spin { to { transform: rotate(360deg); } }
        @keyframes ba-twinkle { 0%,100% { opacity: .2; transform: scale(.75); } 50% { opacity: .8; transform: scale(1); } }
        .ba-sway { transform-origin: 50% 100%; animation: ba-sway 4.5s ease-in-out infinite; }
        .ba-float { animation: ba-float 5s ease-in-out infinite; }
        .ba-spin { animation: ba-spin 45s linear infinite; }
        .ba-twinkle { animation: ba-twinkle 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ba-sway, .ba-float, .ba-spin, .ba-twinkle { animation: none; }
        }
      `}</style>

      <main className="bg-background">
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden bg-primary px-6 py-24 text-center md:py-36">
          {/* the four experience motifs, scattered */}
          <DottedRing
            color={heroColor(0)}
            className="absolute -left-16 -top-16 h-56 w-56 opacity-40 md:h-72 md:w-72"
          />
          <Blob
            color={heroColor(2)}
            className="absolute right-[7%] top-14 hidden h-20 w-20 opacity-50 sm:block"
          />
          <Ball
            color={heroColor(3)}
            className="absolute bottom-12 left-[9%] hidden h-16 w-16 opacity-50 [animation-delay:1s] sm:block"
          />
          <Sparkle
            color={heroColor(1)}
            className="absolute right-[18%] bottom-20 h-6 w-6"
          />
          <Sparkle
            color="#ffffff"
            className="absolute left-[22%] top-20 h-4 w-4 [animation-delay:1.5s]"
          />
          <DottedRing
            color="#ffffff"
            className="absolute -bottom-20 -right-20 h-72 w-72 opacity-10"
          />

          <FadeUp className="relative mx-auto max-w-4xl">
            <p className="mb-5 inline-flex items-center gap-2 text-base font-semibold text-accent">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              {hero.eyebrow}
            </p>
            <h1 className="text-balance text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              {hero.subtitle}
            </p>
          </FadeUp>
        </section>

        {/* ---------- Experiences ---------- */}
        <section className="mx-auto max-w-7xl space-y-16 px-5 py-14 md:space-y-24 md:px-10 md:py-20">
          {experiences.map((experience, index) => {
            const Icon = experienceIcons[experience.id] ?? Cpu;
            const imageOnLeft = index % 2 === 0;

            return (
              <FadeUp key={experience.id} delay={0.05}>
                <article
                  id={experience.id}
                  className="grid scroll-mt-24 overflow-hidden rounded-3xl border bg-background shadow-sm lg:min-h-[480px] lg:grid-cols-2"
                  style={{
                    borderColor: tint(experience.color, 30),
                  }}
                >
                  {/* Image */}
                  <div
                    className={`relative min-h-[280px] overflow-hidden sm:min-h-[380px] lg:min-h-full ${
                      imageOnLeft ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <img
                      src={experience.image}
                      alt={experience.title}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />

                    {/* Image overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, transparent 55%, ${experience.color}B3 100%)`,
                      }}
                    />

                    {/* Experience label */}
                    <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: experience.color }}
                        />
                        {experience.eyebrow}
                      </span>
                    </div>
                  </div>

                  {/* Article */}
                  <div
                    className={`relative flex flex-col justify-center p-6 sm:p-10 lg:p-12 xl:p-14 ${
                      imageOnLeft ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {/* Decorative accent */}
                    <div
                      className="absolute right-8 top-8 h-24 w-24 rounded-full opacity-10 blur-2xl"
                      style={{ backgroundColor: experience.color }}
                      aria-hidden="true"
                    />

                    {/* Icon */}
                    <div
                      className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{
                        color: experience.color,
                        backgroundColor: tint(experience.color, 12),
                        border: `1px solid ${tint(experience.color, 30)}`,
                      }}
                    >
                      <Icon size={27} aria-hidden="true" />
                    </div>

                    {/* Title */}
                    <h2 className="relative text-balance text-3xl font-bold leading-tight text-primary sm:text-4xl xl:text-5xl">
                      {experience.title}
                    </h2>

                    {/* Accent line */}
                    <div
                      className="mb-7 mt-5 h-1 w-16 rounded-full"
                      style={{ backgroundColor: experience.color }}
                    />

                    {/* Introduction */}
                    <p className="text-lg font-medium leading-relaxed text-primary sm:text-xl">
                      {experience.intro}
                    </p>

                    {/* Description */}
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {experience.description}
                    </p>

                    {/* Skills */}
                    <div className="mt-8">
                      <h3 className="text-base font-bold text-primary sm:text-lg">
                        Skills in action
                      </h3>

                      <ul className="mt-4 flex flex-wrap gap-2.5">
                        {experience.skills.map((skill) => (
                          <li
                            key={skill}
                            className="inline-flex items-center gap-2 rounded-full border bg-background px-3.5 py-2 text-sm font-medium text-primary sm:text-base"
                            style={{
                              borderColor: tint(experience.color, 35),
                            }}
                          >
                            <span
                              className="h-2 w-2 shrink-0 rounded-full"
                              style={{ backgroundColor: experience.color }}
                              aria-hidden="true"
                            />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </section>

        {/* ---------- Real World Education intro ---------- */}
        <section className="relative overflow-hidden bg-primary px-6 py-20 text-white md:py-28">
          <Sprout
            color="#69bb44"
            className="absolute bottom-6 right-[8%] hidden h-20 w-20 opacity-50 sm:block"
          />
          <DottedRing
            color="#ffffff"
            className="absolute -left-24 -top-24 h-72 w-72 opacity-10"
          />
          <Sparkle
            color="var(--yellow)"
            className="absolute right-[24%] top-12 h-5 w-5"
          />
          <Sparkle
            color="#ffffff"
            className="absolute bottom-14 left-[10%] h-4 w-4 [animation-delay:1.6s]"
          />

          <FadeUp className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
            <h2 className="text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {realWorldEducation.heading}
            </h2>
            <p
              className="border-l-4 pl-6 text-lg font-medium leading-relaxed text-white/90 md:text-xl"
              style={{ borderColor: "var(--yellow)" }}
            >
              {realWorldEducation.description}
            </p>
          </FadeUp>
        </section>

        {/* ---------- Real-world projects ---------- */}
        <section className="bg-muted/30 px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl space-y-10 md:space-y-14">
            {realWorldEducation.projects.map((project, index) => {
              const focusWeek = project.phases[1]?.[0] ?? project.phases[0][0];
              const conceptGroups = [
                { title: "Field concepts", items: project.fieldConcepts },
                { title: "Academic concepts", items: project.academicConcepts },
                {
                  title: "Real-world connections",
                  items: project.realWorldConnections,
                },
              ];

              return (
                <FadeUp key={project.id} delay={index * 0.05}>
                  <article className="overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
                    {/* Header */}
                    <header className="relative overflow-hidden border-b border-border">
                      <div
                        className="h-1.5 w-full"
                        style={{ backgroundColor: project.color }}
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute right-6 top-6 sm:right-10"
                      >
                        <Sprout
                          color={project.color}
                          className="h-12 w-12 opacity-40 sm:h-14 sm:w-14"
                        />
                        <Sparkle
                          color={project.color}
                          className="absolute -left-5 top-1 h-3.5 w-3.5"
                        />
                        <Sparkle
                          color={project.color}
                          className="absolute -right-3 top-8 h-2.5 w-2.5 [animation-delay:1.4s]"
                        />
                      </div>

                      <div className="relative px-6 pb-7 pt-6 sm:px-10 sm:pt-8">
                        <p className="mb-2 flex items-center gap-2 text-base font-semibold text-primary">
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: project.color }}
                          />
                          {project.eyebrow}
                        </p>
                        <h2 className="max-w-3xl text-balance pr-16 text-3xl font-bold leading-tight text-primary sm:pr-24 md:text-4xl lg:text-5xl">
                          {project.title}
                        </h2>
                      </div>
                    </header>

                    {/* Body */}
                    <div className="grid items-start gap-10 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-2 lg:gap-14">
                      {/* Left: overview + phases */}
                      <div className="min-w-0 space-y-7">
                        <div>
                          <h3 className="mb-2 text-base font-bold text-muted-foreground">
                            Problem statement
                          </h3>
                          <p className="text-balance text-xl font-semibold leading-snug text-primary sm:text-2xl">
                            {project.problem}
                          </p>
                        </div>

                        <div>
                          <h3 className="mb-2 text-base font-bold text-muted-foreground">
                            Description
                          </h3>
                          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                            {project.description}
                          </p>
                        </div>

                        <dl className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-border pt-6">
                          <div>
                            <dt className="mb-1 text-base font-bold text-muted-foreground">
                              Duration
                            </dt>
                            <dd className="text-lg font-semibold text-primary">
                              {project.duration}
                            </dd>
                          </div>
                          <div>
                            <dt className="mb-1 text-base font-bold text-muted-foreground">
                              Age group
                            </dt>
                            <dd className="text-lg font-semibold text-primary">
                              {project.ageGroup}
                            </dd>
                          </div>
                          <div className="col-span-2">
                            <dt className="mb-1 text-base font-bold text-muted-foreground">
                              Key mentor
                            </dt>
                            <dd className="text-lg font-semibold text-primary">
                              {project.mentor}
                            </dd>
                          </div>
                        </dl>

                        {/* Phases timeline */}
                        <div className="rounded-xl bg-card p-5 sm:p-6">
                          <h3 className="mb-6 text-lg font-bold text-primary">
                            Project phases
                          </h3>
                          <ol className="ml-2 sm:ml-3">
                            {project.phases.map(([week, phase], phaseIndex) => {
                              const isLast =
                                phaseIndex === project.phases.length - 1;
                              return (
                                <li
                                  key={week}
                                  className="relative pb-7 pl-8 last:pb-0 sm:pl-10"
                                >
                                  {!isLast && (
                                    <span
                                      aria-hidden="true"
                                      className="absolute -bottom-[13px] left-0 top-[13px] w-0.5 -translate-x-1/2"
                                      style={{ backgroundColor: project.color }}
                                    />
                                  )}
                                  <span
                                    aria-hidden="true"
                                    className="absolute left-0 top-1.5 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-[3px] border-card"
                                    style={{
                                      backgroundColor: project.color,
                                      boxShadow: `0 0 0 2px ${project.color}`,
                                    }}
                                  />
                                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                                    <p className="text-base font-bold text-primary sm:w-24 sm:shrink-0 sm:text-lg">
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

                      {/* Right: focus + concepts */}
                      <div className="min-w-0 space-y-4">
                        <div
                          className="relative overflow-hidden rounded-xl border p-5 sm:p-6"
                          style={{
                            backgroundColor: tint(project.color, 10),
                            borderColor: tint(project.color, 35),
                          }}
                        >
                          <DottedRing
                            color={project.color}
                            className="absolute -right-8 -top-8 h-28 w-28 opacity-40"
                          />
                          <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2 pr-12">
                            <span
                              className="rounded-full px-3.5 py-1 text-base font-bold text-white"
                              style={{ backgroundColor: project.color }}
                            >
                              {focusWeek}
                            </span>
                            <h3 className="min-w-0 text-lg font-bold text-primary sm:text-xl">
                              {project.focus}
                            </h3>
                          </div>
                          <p className="relative mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                            {project.focusDescription}
                          </p>
                        </div>

                        <div className="divide-y divide-border rounded-xl bg-card px-5 sm:px-6">
                          {conceptGroups.map((group) => (
                            <div key={group.title} className="py-5">
                              <h3
                                className="text-xl font-bold text-primary mb-3"
                                style={{ borderColor: project.color }}
                              >
                                {group.title}
                              </h3>
                              <ul className="space-y-2.5 text-base text-primary sm:text-lg">
                                {group.items.map((item: string) => (
                                  <li
                                    key={item}
                                    className="flex gap-3 leading-snug"
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="mt-2 h-2 w-2 shrink-0 rounded-full"
                                      style={{ backgroundColor: project.color }}
                                    />
                                    <span className="min-w-0 break-words">
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </FadeUp>
              );
            })}
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="relative overflow-hidden bg-primary px-6 py-20 text-center md:py-28">
          <Sprout
            color="#69bb44"
            className="absolute bottom-6 left-[6%] hidden h-20 w-20 opacity-50 sm:block"
          />
          <Ball
            color={heroColor(3)}
            className="absolute bottom-10 right-[8%] hidden h-14 w-14 opacity-50 sm:block"
          />
          <Sparkle
            color="var(--yellow)"
            className="absolute left-[16%] top-14 h-5 w-5"
          />
          <Sparkle
            color="#ffffff"
            className="absolute right-[20%] top-16 h-4 w-4 [animation-delay:1.6s]"
          />

          <FadeUp className="relative mx-auto max-w-3xl">
            <h2 className="text-balance text-4xl font-bold text-white md:text-5xl">
              {cta.heading}
            </h2>
            <p className="mt-5 text-lg text-white/75 md:text-xl">{cta.body}</p>
            <button
              type="button"
              onClick={() => navigate("/admissions")}
              className="mt-10 inline-flex items-center gap-2 rounded-full px-9 py-4 text-base font-bold text-primary shadow-xl transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              style={{ backgroundColor: "var(--yellow)" }}
            >
              {cta.button}
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </FadeUp>
        </section>
      </main>
    </>
  );
}
