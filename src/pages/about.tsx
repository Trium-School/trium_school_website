import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { useNavigate } from "react-router";
import { ArrowRight } from 'lucide-react';
import { about } from 'virtual:content';
const site = 'https://triumschool.in';
const url = `${site}/about`;
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
const valueIcons = ['💡', '🤝', '⭐', '❤️', '🚀', '🌱'];
export default function AboutPage() {
  const navigate = useNavigate();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${url}#webpage`,
    name: 'About Us — The Trium School',
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
        <title>About Us — The Trium School, Nashik</title>
        <meta
          name="description"
          content="Learn about The Trium School's story, vision, mission, values, and leadership team. A K-12 school in Makhmalabad, Nashik built for the future."
        />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="About Us — The Trium School" />
        <meta
          property="og:description"
          content="Our story, vision, mission, and the team behind Nashik's newest K-12 school."
        />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${site}/airo-assets/images/pages/about/hero`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={`${site}/airo-assets/images/pages/about/hero`}
        />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative h-[420px] md:h-[520px] overflow-hidden">
          <img
            src="media/Cheerful School Corridor Walk.png"
            alt="The Trium School campus"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1440}
            height={520}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/40 pointer-events-none" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <FadeUp>
              <p className="text-sm font-semibold text-accent mb-3 tracking-wide uppercase">
                {about.hero.eyebrow}
              </p>
              <h1
                className="text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                {about.hero.title}
              </h1>
              <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                {about.hero.subtitle}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── Stats bar ────────────────────────────────────────────────── */}
        <section className="bg-primary py-8">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {about.stats.map((stat, i) => {
              const statColors = [
                "#51aafd", // Blue
                "#69bb44", // Green
                "#fe584a", // Red
                "#fec132", // Yellow
              ];

              return (
                <FadeUp key={stat.id} delay={i * 0.08}>
                  <p
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: statColors[i % statColors.length],
                    }}
                  >
                    {stat.value}
                  </p>

                  <p className="text-white/70 text-sm mt-1">{stat.label}</p>
                </FadeUp>
              );
            })}
          </div>
        </section>

        {/* ── Vision & Mission ─────────────────────────────────────────── */}
        <section className="py-20 bg-background">
          <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10">
            <FadeUp>
              <div className="bg-[var(--blue)] rounded-2xl p-8 h-full">
                <p className="text-white text-xs font-semibold uppercase tracking-widest mb-3">
                  {about.vision_mission.vision_label}
                </p>
                <p
                  className="text-white text-xl md:text-2xl font-semibold leading-relaxed"
                  style={{
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  "{about.vision_mission.vision}"
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="bg-[var(--green)] rounded-2xl p-8 h-full">
                <p className="text-white text-xs font-semibold uppercase tracking-widest mb-3">
                  {about.vision_mission.mission_label}
                </p>
                <p
                  className="text-white text-xl md:text-2xl font-semibold leading-relaxed"
                  style={{
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  "{about.vision_mission.mission}"
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────────────────────── */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4">
            <FadeUp className="text-center mb-14">
              <h2
                className="text-3xl md:text-4xl font-bold text-primary"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                {about.values.heading}
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {about.values.items.map((val, i) => (
                <FadeUp key={val.id} delay={i * 0.07}>
                  <div className="bg-background rounded-2xl p-7 border border-border hover:border-accent/40 hover:shadow-md transition-all duration-300 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <h3
                        className="text-lg font-bold text-primary"
                        style={{
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {val.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {val.description}
                    </p>
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
                {about.cta.heading}
              </h2>
              <p className="text-white/75 text-lg mb-8">
                {about.cta.subheading}
              </p>
              <button
                onClick={() => navigate("/admissions")}
                className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-8 py-4 rounded-full hover:bg-accent/90 transition-colors text-base"
              >
                {about.cta.button}
                <ArrowRight size={18} />
              </button>
            </FadeUp>
          </div>
        </section>
      </main>
    </>
  );
}
