import React from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { beyondAcademics } from "virtual:content";

const site = "https://triumschool.in";
const url = `${site}/beyond-academics`;

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

export default function BeyondAcademicsPage() {
  const navigate = useNavigate();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: "Beyond Academics — The Trium School",
    url,
    isPartOf: { "@id": `${site}/#website` },
    about: { "@id": `${site}/#organization` },
  };

  return (
    <>
      <Helmet>
        <title>Beyond Academics — The Trium School, Nashik</title>
        <meta name="description" content={beyondAcademics.hero.subtitle} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Beyond Academics — The Trium School" />
        <meta property="og:description" content={beyondAcademics.hero.subtitle} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <main className="bg-background">
        <section className="relative overflow-hidden bg-primary px-6 py-24 md:py-32">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
          <FadeUp className="relative mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">
              {beyondAcademics.hero.eyebrow}
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              {beyondAcademics.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              {beyondAcademics.hero.subtitle}
            </p>
          </FadeUp>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-16">
          {beyondAcademics.experiences.map((experience, index) => (
            <FadeUp key={experience.id} delay={index * 0.05}>
              <article className="relative grid gap-10 border-b border-border py-16 first:pt-6 last:border-b-0 lg:grid-cols-[minmax(260px,0.7fr)_minmax(0,1.3fr)] lg:gap-20 lg:py-24">
                <div className="absolute right-0 top-16 hidden text-7xl font-bold leading-none opacity-10 lg:block" style={{ color: experience.color }}>
                  0{index + 1}
                </div>
                <div>
                  <h2 className="text-4xl font-bold leading-tight md:text-5xl" style={{ color: experience.color }}>
                    {experience.title}
                  </h2>
                  <div className="mt-7 h-2 w-40 rounded-full" style={{ backgroundColor: experience.color }} />
                </div>

                <div className="max-w-3xl">
                  <p className="max-w-2xl text-lg font-medium leading-relaxed text-primary">
                    {experience.intro}
                  </p>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/80">
                    {experience.description}
                  </p>
                  <h3 className="mt-10 text-2xl font-bold text-primary">Skills in Action</h3>
                  <ul className="mt-5 grid max-w-2xl grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
                    {experience.skills.map((skill, skillIndex) => (
                      <li key={skill} className="flex items-center gap-3 font-semibold text-primary">
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: [experience.color, "#69bb44", "#f9a500", "#f04424"][skillIndex % 4] }}
                        >
                          <span className="h-3 w-3 rounded bg-white" />
                        </span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </FadeUp>
          ))}
        </section>

        <section className="bg-primary px-6 py-20 text-white md:py-28">
          <FadeUp className="mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold leading-tight md:text-6xl">
              {beyondAcademics.realWorldEducation.heading}
            </h2>
            <p className="mt-12 max-w-5xl text-lg font-medium leading-relaxed text-white/90 md:text-xl">
              {beyondAcademics.realWorldEducation.description}
            </p>
          </FadeUp>
        </section>

        <section className="bg-background px-5 py-10 md:px-10 md:py-16">
          <div className="mx-auto max-w-7xl">
            {beyondAcademics.realWorldEducation.projects.map((project, index) => (
              <FadeUp key={project.id} delay={index * 0.05}>
                <article className="border-b border-border py-16 last:border-b-0 md:py-24">
                  <div className="grid gap-10 lg:grid-cols-[minmax(250px,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: project.color }}>
                        {project.eyebrow}
                      </p>
                      <h2 className="mt-4 text-4xl font-bold leading-tight text-primary md:text-5xl">
                        {project.title}
                      </h2>
                      <div className="mt-8 grid grid-cols-2 gap-5">
                        <div>
                          <p className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">Problem statement</p>
                          <p className="mt-3 font-semibold leading-relaxed text-primary">{project.problem}</p>
                        </div>
                        <div>
                          <p className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">Duration</p>
                          <p className="mt-3 font-semibold text-primary">{project.duration}</p>
                        </div>
                      </div>
                      <p className="mt-8 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">Description</p>
                      <p className="mt-3 leading-relaxed text-foreground/80">{project.description}</p>
                      <div className="mt-8 grid grid-cols-2 gap-5">
                        <div>
                          <p className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">Age group</p>
                          <p className="mt-3 font-semibold text-primary">{project.ageGroup}</p>
                        </div>
                        <div>
                          <p className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">Key mentor</p>
                          <p className="mt-3 font-semibold text-primary">{project.mentor}</p>
                        </div>
                      </div>
                    </div>

                    <div className="self-end">
                      <div className="rounded-2xl bg-card p-5 shadow-sm">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full px-4 py-2 font-bold text-primary" style={{ backgroundColor: project.color }}>
                            {project.phases[1][0]}
                          </span>
                          <h3 className="text-lg font-bold text-primary">{project.focus}</h3>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.focusDescription}</p>
                      </div>
                      <div className="mt-4 grid gap-5 rounded-2xl bg-card p-5 sm:grid-cols-3">
                        {[
                          ["Field concepts", project.fieldConcepts],
                          ["Academic concepts", project.academicConcepts],
                          ["Real-world connections", project.realWorldConnections],
                        ].map(([heading, items]) => (
                          <div key={heading as string}>
                            <h3 className="mb-3 font-bold" style={{ color: project.color }}>{heading as string}</h3>
                            <ul className="space-y-2 text-sm leading-relaxed text-primary">
                              {(items as readonly string[]).map((item) => <li key={item}>{item}</li>)}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-2xl bg-card p-5 shadow-sm">
                    <h3 className="mb-5 font-bold text-primary">Project phases</h3>
                    <div className="grid min-w-[620px] grid-cols-4 gap-3 overflow-x-auto">
                      {project.phases.map(([week, phase]) => (
                        <div key={week} className="border-t-2 pt-3 text-center" style={{ borderColor: project.color }}>
                          <p className="font-bold text-primary">{week}</p>
                          <p className="mt-2 text-sm text-muted-foreground">{phase}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </section>

        <section className="bg-primary px-6 py-20 text-center">
          <FadeUp className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white md:text-4xl">{beyondAcademics.cta.heading}</h2>
            <p className="mt-4 text-lg text-white/75">{beyondAcademics.cta.body}</p>
            <button
              type="button"
              onClick={() => navigate("/admissions")}
              className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-primary shadow-xl transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--yellow)" }}
            >
              {beyondAcademics.cta.button}
              <ArrowRight size={18} />
            </button>
          </FadeUp>
        </section>
      </main>
    </>
  );
}
