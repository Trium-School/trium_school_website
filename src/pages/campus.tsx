import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { useNavigate } from "react-router";
import { ArrowRight } from 'lucide-react';
import { campus } from 'virtual:content';
const site = 'https://triumschool.in';
const url = `${site}/campus`;
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
    y: 24
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
export default function CampusPage() {
  const navigate = useNavigate();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name: 'Campus & Facilities — The Trium School',
    url,
    isPartOf: {
      '@id': `${site}/#website`
    },
    about: {
      '@id': `${site}/#organization`
    }
  };
  return (
    <>
      <Helmet>
        <title>Campus & Facilities — The Trium School, Nashik</title>
        <meta
          name="description"
          content="Explore The Trium School campus in Makhmalabad, Nashik — smart classrooms, science labs, STEM studio, library, sports grounds, and performing arts centre."
        />
        <link rel="canonical" href={url} />
        <meta
          property="og:title"
          content="Campus & Facilities — The Trium School"
        />
        <meta
          property="og:description"
          content="A campus built for curiosity. Explore our classrooms, labs, sports grounds, and arts spaces in Nashik."
        />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${site}/airo-assets/images/pages/home/campus-classrooms`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={`${site}/airo-assets/images/pages/home/campus-classrooms`}
        />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative h-[360px] md:h-[460px] overflow-hidden">
          <img
            src="media\Creative School Activities Showcase.png"
            alt="The Trium School campus"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1440}
            height={460}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/75 via-primary/55 to-primary/30 pointer-events-none" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <FadeUp>
              <p className="text-sm font-semibold text-accent mb-3 tracking-wide uppercase">
                {campus.hero.eyebrow}
              </p>
              <h1
                className="text-3xl md:text-5xl font-bold text-white max-w-2xl leading-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                {campus.hero.title}
              </h1>
              <p className="mt-4 text-white/80 text-base md:text-lg max-w-xl mx-auto">
                {campus.hero.subtitle}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── Intro ────────────────────────────────────────────────────── */}
        <section className="py-16 bg-background">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <FadeUp>
              <h2
                className="text-2xl md:text-3xl font-bold text-primary mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                {campus.intro.heading}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {campus.intro.body}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── Facilities Grid ──────────────────────────────────────────── */}
        <section className="pb-24 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campus.facilities.map((facility, i) => (
                <FadeUp key={facility.id} delay={i * 0.08}>
                  <div className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={facility.image_slot}
                        alt={facility.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width={600}
                        height={208}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                      <span
                        className="absolute top-3 left-3 bg-accent text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          color: "#1a1a1a",
                        }}
                      >
                        {facility.tag}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="p-6">
                      <h3
                        className="text-lg font-bold text-primary mb-2"
                        style={{
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {facility.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {facility.description}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="py-20 bg-primary">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <FadeUp>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                {campus.cta.heading}
              </h2>
              <p className="text-white/75 whitespace-pre-line text-lg mb-10">{campus.cta.body}</p>
              <button
                onClick={() => navigate("/admissions")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent font-bold text-sm shadow-xl hover:bg-accent/90 transition-colors"
                style={{
                  color: "#1a1a1a",
                }}
              >
                {campus.cta.button}
                <ArrowRight size={16} />
              </button>
            </FadeUp>
          </div>
        </section>
      </main>
    </>
  );
}
