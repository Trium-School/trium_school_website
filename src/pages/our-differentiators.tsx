import React, { useState } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Compass,
  GraduationCap,
  Lightbulb,
  Mic,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { ourDifferentiator } from "virtual:content";

const site = "https://triumschool.in";
const url = `${site}/our-differentiators`;
const accents = ["#51aafd", "#fec132", "#fe584a", "#69bb44", "#51aafd"];

const differentiatorIcons: Record<string, LucideIcon> = {
  "academic-excellence": BookOpen,
  "world-class-teachers": GraduationCap,
  "trium-orator": Mic,
  "trium-innovator": Lightbulb,
  "real-world-education": Compass,
};

/* Dot / accent colours for the daily rhythm timeline (keys come from the JSON) */
const dailyColors: Record<string, string> = {
  green: "#367c6c",
  coral: "#fe6848",
  yellow: "#fecb2f",
  purple: "#7560b2",
  navy: "#1d1a43",
  lavender: "#b9aee6",
  neutral: "#c9bfa5",
};

/* Works with hex, rgb(), hsl() and CSS variables */
const tint = (color: string, percent: number) =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;

const isProjectCell = (cell: string) => /real world/i.test(cell);

/* ---------- Motion helpers ---------- */

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
      className={`pd-twinkle pointer-events-none ${className}`}
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
      className={`pd-sway pointer-events-none ${className}`}
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
      className={`pd-spin pointer-events-none ${className}`}
      fill="none"
      stroke={color}
      strokeLinecap="round"
    >
      <circle cx="50" cy="50" r="44" strokeWidth="2.5" strokeDasharray="1 8" />
      <circle cx="50" cy="50" r="30" strokeWidth="2" strokeDasharray="1 7" />
    </svg>
  );
}

function Sun({ className = "", color }: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className={`pd-spin pointer-events-none ${className}`}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    >
      <circle cx="32" cy="32" r="10" fill={color} stroke="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line key={angle} x1="32" y1="6" x2="32" y2="14" transform={`rotate(${angle} 32 32)`} />
      ))}
    </svg>
  );
}

const stageDecor = [Sun, Sprout, DottedRing];

/* ---------- Weekly schedule (table on desktop, day tabs on mobile) ---------- */

function WeeklySchedule() {
  const { days, rows } = ourDifferentiator.weekly_rhythm;
  const [activeDay, setActiveDay] = useState(0);
  const projectColor = accents[2];

  /* A row where every day has the same entry is a shared break (circle time, lunch, ...) */
  const isSharedRow = (row: string[]) => row.slice(1).every((cell) => cell === row[1]);

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-xl md:block">
        <table className="w-full table-fixed border-collapse text-base text-primary">
          <thead>
            <tr>
              <th scope="col" className="w-32 bg-muted p-4 text-left font-bold">
                Time
              </th>
              {days.map((day) => (
                <th key={day} scope="col" className="bg-primary p-4 font-bold text-white">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t border-border">
                <th
                  scope="row"
                  className="whitespace-nowrap bg-muted p-3 text-left text-sm font-bold lg:text-base"
                >
                  {row[0]}
                </th>
                {isSharedRow(row) ? (
                  <td
                    colSpan={days.length}
                    className="bg-muted/60 p-3 text-center font-semibold text-muted-foreground"
                  >
                    {row[1]}
                  </td>
                ) : (
                  row.slice(1).map((cell, index) => (
                    <td
                      key={`${row[0]}-${index}`}
                      className="p-3 text-center align-middle leading-snug"
                      style={
                        isProjectCell(cell)
                          ? { backgroundColor: tint(projectColor, 16), fontWeight: 700 }
                          : undefined
                      }
                    >
                      {cell}
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: one day at a time */}
      <div className="md:hidden">
        <div
          role="tablist"
          aria-label="Choose a day"
          className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-2"
        >
          {days.map((day, index) => {
            const active = index === activeDay;
            return (
              <button
                key={day}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveDay(index)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  active ? "text-primary" : "bg-white/10 text-white hover:bg-white/20"
                }`}
                style={active ? { backgroundColor: "var(--yellow)" } : undefined}
              >
                {day}
              </button>
            );
          })}
        </div>

        <ul role="tabpanel" className="divide-y divide-border overflow-hidden rounded-2xl bg-white shadow-xl">
          {rows.map((row) => {
            const subject = row[activeDay + 1];
            const shared = isSharedRow(row);
            const project = isProjectCell(subject);
            return (
              <li
                key={row[0]}
                className={`flex items-baseline gap-4 px-4 py-3.5 ${shared ? "bg-muted/60" : ""}`}
                style={project ? { backgroundColor: tint(projectColor, 16) } : undefined}
              >
                <span className="w-24 shrink-0 text-sm font-bold tabular-nums text-primary">
                  {row[0]}
                </span>
                <span
                  className={`min-w-0 text-base leading-snug ${
                    shared ? "font-semibold text-muted-foreground" : "text-primary"
                  } ${project ? "font-bold" : ""}`}
                >
                  {subject}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

/* ---------- Page ---------- */

export default function OurDifferentiatorsPage() {
  const navigate = useNavigate();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: "Our Differentiators — The Trium School",
    url,
    isPartOf: { "@id": `${site}/#website` },
    about: { "@id": `${site}/#organization` },
  };

  const { hero, differentiators, stages, daily_rhythm, weekly_rhythm, cta } = ourDifferentiator;
  const projectSteps = weekly_rhythm.project.slice(1);

  return (
    <>
      <Helmet>
        <title>Our Differentiators — The Trium School, Nashik</title>
        <meta name="description" content={hero.subtitle} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Our Differentiators — The Trium School" />
        <meta property="og:description" content={hero.subtitle} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <style>{`
        @keyframes pd-sway { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }
        @keyframes pd-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes pd-spin { to { transform: rotate(360deg); } }
        @keyframes pd-twinkle { 0%,100% { opacity: .2; transform: scale(.75); } 50% { opacity: .8; transform: scale(1); } }
        .pd-sway { transform-origin: 50% 100%; animation: pd-sway 4.5s ease-in-out infinite; }
        .pd-float { animation: pd-float 5s ease-in-out infinite; }
        .pd-spin { animation: pd-spin 45s linear infinite; }
        .pd-twinkle { animation: pd-twinkle 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .pd-sway, .pd-float, .pd-spin, .pd-twinkle { animation: none; }
        }
      `}</style>

      <main className="bg-background">
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden bg-primary px-6 py-24 text-center md:py-36">
          <DottedRing color="#ffffff" className="absolute -bottom-16 -right-16 h-64 w-64 opacity-20 md:h-80 md:w-80" />
          <DottedRing color="#ffffff" className="absolute -left-20 -top-20 hidden h-56 w-56 opacity-10 md:block" />
          <Sprout color={accents[3]} className="absolute right-[8%] top-16 hidden h-16 w-16 opacity-60 sm:block" />
          <Sparkle color={accents[1]} className="absolute left-[10%] top-20 h-5 w-5" />
          <Sparkle color={accents[0]} className="absolute bottom-24 left-[18%] hidden h-4 w-4 [animation-delay:1.2s] sm:block" />
          <Sparkle color={accents[2]} className="absolute right-[20%] bottom-20 h-4 w-4 [animation-delay:2s]" />

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

        {/* ---------- Differentiators ---------- */}
        <section className="mx-auto max-w-6xl px-6 py-10 md:px-12 md:py-16">
          {differentiators.map((item, index) => {
            const accent = accents[index % accents.length];
            const Icon = differentiatorIcons[item.id] ?? BookOpen;
            const flip = index % 2 === 1;

            return (
              <FadeUp key={item.id} delay={index * 0.05}>
                <article className="grid items-center gap-8 border-b border-border py-14 last:border-b-0 lg:grid-cols-2 lg:gap-20 lg:py-24">
                  <div className={flip ? "lg:order-2" : ""}>
                    <span
                      className="pd-float mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-primary"
                      style={{
                        backgroundColor: tint(accent, 25),
                        border: `2px solid ${tint(accent, 60)}`,
                      }}
                    >
                      <Icon size={26} aria-hidden="true" />
                    </span>
                    <h2 className="max-w-xl text-balance text-3xl font-bold leading-tight text-primary md:text-4xl lg:text-5xl">
                      {item.title}
                    </h2>
                    <span
                      aria-hidden="true"
                      className="mt-6 block h-1.5 w-16 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                  </div>

                  <div className={flip ? "lg:order-1" : ""}>
                    {item.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mb-5 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
                      >
                        {paragraph}
                      </p>
                    ))}
                    <ul className="mt-6 flex flex-wrap gap-3">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="inline-flex items-center gap-2.5 rounded-full py-2 pl-2 pr-5 text-base font-bold text-primary"
                          style={{
                            backgroundColor: tint(accent, 14),
                            border: `1.5px solid ${tint(accent, 50)}`,
                          }}
                        >
                          <span
                            className="flex h-6 w-6 items-center justify-center rounded-full text-primary"
                            style={{ backgroundColor: accent }}
                          >
                            <Check size={14} strokeWidth={3} aria-hidden="true" />
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </section>

        {/* ---------- Learning stages ---------- */}
        <section className="bg-muted/30 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl space-y-20 md:space-y-28">
            {stages.map((stage, index) => {
              const accent = accents[index % accents.length];
              const Decor = stageDecor[index % stageDecor.length];
              const subjectCount = stage.subjects?.length ?? 0;

              return (
                <FadeUp key={stage.id} delay={index * 0.05}>
                  <article className="relative">
                    <Decor
                      color={accent}
                      className="absolute right-0 top-0 hidden h-24 w-24 opacity-50 md:block lg:h-28 lg:w-28"
                    />

                    <header className="mb-10 max-w-3xl">
                      <p className="mb-3 flex items-center gap-2 text-base font-semibold text-primary">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                        {stage.eyebrow}
                      </p>
                      <h2 className="text-balance text-4xl font-bold leading-tight text-primary md:text-5xl">
                        {stage.title}
                      </h2>
                      {stage.grades && (
                        <p className="mt-4 text-lg font-bold text-primary">[{stage.grades}]</p>
                      )}
                      {stage.intro && (
                        <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
                          {stage.intro}
                        </p>
                      )}
                    </header>

                    {stage.subjects && (
                      <>
                        <h3 className="mb-5 text-xl font-bold text-primary md:text-2xl">
                          What we teach
                        </h3>
                        <div
                          className={`grid gap-4 sm:grid-cols-2 ${
                            subjectCount % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"
                          }`}
                        >
                          {stage.subjects.map(([subject, description], subjectIndex) => {
                            const dot = accents[subjectIndex % accents.length];
                            return (
                              <div
                                key={subject}
                                className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
                              >
                                <h4 className="mb-3 flex items-center gap-2.5 text-[22px] font-bold leading-snug text-primary">
                                  <span
                                    aria-hidden="true"
                                    className="h-3 w-3 shrink-0 rounded-full"
                                    style={{ backgroundColor: dot }}
                                  />
                                  {subject}
                                </h4>
                                <p className="text-base leading-relaxed text-muted-foreground">
                                  {description}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {stage.body?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/85 md:text-xl"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </article>
                </FadeUp>
              );
            })}
          </div>
        </section>

        {/* ---------- Daily rhythm: timeline ---------- */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <FadeUp className="relative lg:sticky lg:top-28 lg:self-start">
              <p className="mb-3 flex items-center gap-2 text-base font-semibold text-primary">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accents[1] }} />
                {daily_rhythm.eyebrow}
              </p>
              <h2 className="text-balance text-4xl font-bold leading-tight text-primary md:text-5xl">
                {daily_rhythm.title}
              </h2>
              <Sun
                color={accents[1]}
                className="mt-8 hidden h-20 w-20 opacity-60 lg:block"
              />
            </FadeUp>

            <FadeUp>
              <ol>
                {daily_rhythm.items.map(([title, detail, color], index) => {
                  const dot = dailyColors[color] ?? dailyColors.neutral;
                  const isLast = index === daily_rhythm.items.length - 1;
                  return (
                    <li key={title} className="relative pb-4 pl-10 last:pb-0">
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-[26px] left-[7px] top-[26px] w-0.5"
                          style={{ backgroundColor: tint(dot, 55) }}
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[18px] z-10 h-4 w-4 rounded-full border-[3px] border-background"
                        style={{ backgroundColor: dot, boxShadow: `0 0 0 2px ${dot}` }}
                      />
                      <div
                        className="flex flex-col gap-0.5 rounded-xl px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                        style={{
                          backgroundColor: tint(dot, 14),
                          borderLeft: `4px solid ${dot}`,
                        }}
                      >
                        <p className="text-lg font-bold leading-snug text-primary">{title}</p>
                        {detail && (
                          <p className="text-base text-muted-foreground sm:text-right">{detail}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </FadeUp>
          </div>
        </section>

        {/* ---------- Weekly rhythm ---------- */}
        <section className="relative overflow-hidden bg-primary px-6 py-16 md:py-24">
          <DottedRing color="#ffffff" className="absolute -right-24 -top-24 h-72 w-72 opacity-10" />
          <FadeUp className="relative mx-auto max-w-6xl">
            <h2 className="mb-10 text-balance text-4xl font-bold text-white md:text-5xl">
              {weekly_rhythm.title}
            </h2>

            <WeeklySchedule />

            <div className="relative mt-6 overflow-hidden rounded-2xl bg-[#f04424] p-6 text-white md:p-8">
              <Sparkle color="#ffffff" className="absolute right-6 top-6 h-5 w-5" />
              <Sparkle color="#ffffff" className="absolute bottom-8 right-16 hidden h-3.5 w-3.5 [animation-delay:1.5s] sm:block" />
              <p className="max-w-2xl pr-8 text-lg leading-relaxed md:text-xl">
                {weekly_rhythm.project[0]}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {projectSteps.map((step, index) => (
                  <React.Fragment key={step}>
                    <span className="rounded-full bg-white/20 px-5 py-2 text-base font-bold">
                      {step}
                    </span>
                    {index < projectSteps.length - 1 && (
                      <ArrowRight size={18} aria-hidden="true" className="opacity-80" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="relative overflow-hidden px-6 py-20 text-center md:py-28">
          <Sprout color={accents[3]} className="absolute bottom-6 left-[6%] hidden h-20 w-20 opacity-40 sm:block" />
          <Sprout color={accents[0]} className="absolute bottom-6 right-[7%] hidden h-16 w-16 opacity-40 [animation-delay:1s] sm:block" />
          <Sparkle color={accents[1]} className="absolute left-[16%] top-14 h-5 w-5" />
          <Sparkle color={accents[2]} className="absolute right-[18%] top-20 h-4 w-4 [animation-delay:1.6s]" />

          <FadeUp className="relative mx-auto max-w-3xl">
            <h2 className="text-balance text-4xl font-bold text-primary md:text-5xl">{cta.heading}</h2>
            <p className="mt-5 text-lg text-muted-foreground md:text-xl">{cta.body}</p>
            <button
              type="button"
              onClick={() => navigate("/admissions")}
              className="mt-10 inline-flex items-center gap-2 rounded-full px-9 py-4 text-base font-bold text-primary shadow-xl transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
