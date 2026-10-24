import React from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { ourDifferentiator } from "virtual:content";

const site = "https://triumschool.in";
const url = `${site}/our-differentiators`;
const accents = ["#51aafd", "#fec132", "#fe584a", "#69bb44", "#51aafd"];

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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

  return (
    <>
      <Helmet>
        <title>Our Differentiators — The Trium School, Nashik</title>
        <meta name="description" content={ourDifferentiator.hero.subtitle} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Our Differentiators — The Trium School" />
        <meta property="og:description" content={ourDifferentiator.hero.subtitle} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <main className="bg-background">
        <section className="bg-primary px-6 py-24 text-center md:py-32">
          <FadeUp className="mx-auto max-w-4xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">
              {ourDifferentiator.hero.eyebrow}
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              {ourDifferentiator.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              {ourDifferentiator.hero.subtitle}
            </p>
          </FadeUp>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20">
          {ourDifferentiator.differentiators.map((item, index) => (
            <FadeUp key={item.id} delay={index * 0.05}>
              <article className="grid min-h-[430px] items-center gap-12 border-b border-border py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
                <h2
                  className="max-w-xl text-4xl font-bold leading-tight text-primary md:text-5xl"
                  style={{ order: index % 2 === 0 ? 1 : 2 }}
                >
                  {item.title}
                </h2>
                <div style={{ order: index % 2 === 0 ? 2 : 1 }}>
                  {item.body.map((paragraph) => (
                    <p key={paragraph} className="mb-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {item.highlights.map((highlight, highlightIndex) => (
                      <div
                        key={highlight}
                        className="rounded-2xl px-5 py-5 text-base font-bold text-primary"
                        style={{
                          backgroundColor: highlightIndex === 0 ? "#e6f0ff" : "#fff3d9",
                          borderLeft: `5px solid ${accents[index]}`,
                        }}
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </section>

        <section className="bg-muted/30 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            {ourDifferentiator.stages.map((stage, index) => (
              <FadeUp key={stage.id} delay={index * 0.05}>
                <article className="grid gap-10 border-b border-border py-16 first:pt-0 last:border-b-0 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                  <div>
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-primary">{stage.eyebrow}</p>
                    <h2 className="text-4xl font-bold leading-tight text-primary md:text-5xl">{stage.title}</h2>
                    {stage.grades && <p className="mt-5 font-bold text-primary">[{stage.grades}]</p>}
                    {stage.intro && <p className="mt-10 text-lg leading-relaxed text-primary">{stage.intro}</p>}
                  </div>
                  <div>
                    {stage.subjects && (
                      <>
                        <h3 className="mb-5 text-3xl font-bold text-primary">What we teach</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {stage.subjects.map(([subject, description], subjectIndex) => (
                            <div key={subject} className="rounded-2xl bg-card p-6 shadow-sm">
                              <h4 className="mb-4 text-lg font-bold text-primary">
                                <span className="mr-2" style={{ color: accents[subjectIndex % accents.length] }}>●</span>
                                {subject}
                              </h4>
                              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {stage.body?.map((paragraph) => (
                      <p key={paragraph} className="mt-5 text-lg leading-relaxed text-foreground/85">{paragraph}</p>
                    ))}
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:px-12">
          <FadeUp>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">{ourDifferentiator.daily_rhythm.eyebrow}</p>
            <h2 className="mb-10 text-4xl font-bold text-primary md:text-5xl">{ourDifferentiator.daily_rhythm.title}</h2>
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              {ourDifferentiator.daily_rhythm.items.map(([title, detail, color]) => (
                <div
                  key={title}
                  className="flex min-h-14 items-center justify-between gap-5 px-5 py-3 text-center font-bold text-primary"
                  style={{
                    backgroundColor: {
                      green: "#367c6c",
                      coral: "#fe6848",
                      yellow: "#fecb2f",
                      purple: "#7560b2",
                      navy: "#1d1a43",
                      lavender: "#e6e1f7",
                      neutral: "#f5f1e9",
                    }[color],
                    color: ["green", "coral", "purple", "navy"].includes(color) ? "white" : undefined,
                  }}
                >
                  <span>{title}</span>
                  <span className="text-sm font-medium opacity-80">{detail}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </section>

        <section className="bg-primary px-6 py-20">
          <FadeUp className="mx-auto max-w-5xl">
            <h2 className="mb-10 text-4xl font-bold text-white md:text-5xl">{ourDifferentiator.weekly_rhythm.title}</h2>
            <div className="overflow-x-auto rounded-2xl bg-white shadow-xl">
              <table className="w-full min-w-[820px] border-collapse text-sm text-primary">
                <thead>
                  <tr>
                    <th className="bg-muted p-4 text-left">Time</th>
                    {ourDifferentiator.weekly_rhythm.days.map((day) => (
                      <th key={day} className="bg-primary p-4 text-white">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ourDifferentiator.weekly_rhythm.rows.map((row) => (
                    <tr key={row[0]} className="border-t border-border">
                      {row.map((cell, index) => (
                        <td key={`${row[0]}-${index}`} className={`p-3 text-center ${index === 0 ? "bg-muted text-left font-bold" : ""}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 rounded-2xl bg-[#f04424] p-6 text-white">
              <p className="max-w-2xl text-lg">{ourDifferentiator.weekly_rhythm.project[0]}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {ourDifferentiator.weekly_rhythm.project.slice(1).map((step) => (
                  <span key={step} className="rounded-full bg-white/20 px-4 py-2 font-bold">{step}</span>
                ))}
              </div>
            </div>
          </FadeUp>
        </section>

        <section className="px-6 py-20 text-center">
          <FadeUp className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-primary md:text-4xl">{ourDifferentiator.cta.heading}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{ourDifferentiator.cta.body}</p>
            <button
              type="button"
              onClick={() => navigate("/admissions")}
              className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-primary shadow-xl"
              style={{ backgroundColor: "var(--yellow)" }}
            >
              {ourDifferentiator.cta.button}
              <ArrowRight size={18} />
            </button>
          </FadeUp>
        </section>
      </main>
    </>
  );
}
