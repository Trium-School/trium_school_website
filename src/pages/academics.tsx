import React, { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { useNavigate } from "react-router";
import { CheckCircle2, ArrowRight, BookOpen, Users, Lightbulb, BarChart2 } from 'lucide-react';
import { academics } from 'virtual:content';
const site = 'https://triumschool.in';
const url = `${site}/academics`;
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
const pillarIcons = [BookOpen, Users, Lightbulb, BarChart2];
const programmeColors = [{
  bg: 'bg-primary',
  text: 'text-white',
  badge: 'bg-accent text-white'
}, {
  bg: 'bg-accent',
  text: 'text-white',
  badge: 'bg-primary text-white'
}];
export default function AcademicsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name: 'Academics — The Trium School',
    url,
    isPartOf: {
      '@id': `${site}/#website`
    },
    about: {
      '@id': `${site}/#organization`
    }
  };
  return <>
      <Helmet>
        <title>Academics — The Trium School, Nashik</title>
        <meta name="description" content="Explore The Trium School's K-12 curriculum, teaching philosophy, co-curricular activities, and faculty. Inquiry-based learning for Early Years through Primary School." />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Academics — The Trium School" />
        <meta property="og:description" content="Inquiry-based K-12 curriculum, co-curricular activities, and expert faculty at The Trium School, Nashik." />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${site}/airo-assets/images/pages/academics/hero`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${site}/airo-assets/images/pages/academics/hero`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative h-[420px] md:h-[520px] overflow-hidden">
          <img src="/airo-assets/images/pages/academics/hero" alt="Students engaged in classroom learning at The Trium School" className="absolute inset-0 w-full h-full object-cover" loading="eager" fetchPriority="high" width={1440} height={520} />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/40 pointer-events-none" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <FadeUp>
              <p className="text-sm font-semibold text-accent mb-3 tracking-wide uppercase">{academics.hero.eyebrow}</p>
              <h1 className="text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight" style={{
              fontFamily: 'var(--font-heading)'
            }}>
                {academics.hero.title}
              </h1>
              <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                {academics.hero.subtitle}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── Teaching Philosophy ──────────────────────────────────────── */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <FadeUp className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4" style={{
              fontFamily: 'var(--font-heading)'
            }}>
                {academics.philosophy.heading}
              </h2>
              {academics.philosophy.body.map(para => <p key={para.id} className="text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-3">
                  {para.text}
                </p>)}
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {academics.philosophy.pillars.map((pillar, i) => {
                const Icon = pillarIcons[i];

                const cardColors = [
                  "#51aafd", // Blue
                  "#69bb44", // Green
                  "#fe584a", // Red
                  "#fec132", // Yellow
                ];

                return (
                  <FadeUp key={pillar.id} delay={i * 0.08}>
                    <div
                      className="rounded-2xl p-6 border border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
                      style={{
                        backgroundColor: cardColors[i % cardColors.length],
                      }}
                    >
                      <div className="w-11 h-11 rounded-xl bg-white/25 flex items-center justify-center mb-4">
                        <Icon size={20} className="text-white" />
                      </div>

                      <h3
                        className="font-bold text-white mb-2"
                        style={{
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {pillar.title}
                      </h3>

                      <p className="text-white text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Programmes ───────────────────────────────────────────────── */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4">
            <FadeUp className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary" style={{
              fontFamily: 'var(--font-heading)'
            }}>
                Our programmes
              </h2>
            </FadeUp>

            {/* Tab buttons */}
            <div className="flex justify-center gap-3 mb-10 flex-wrap">
              {academics.programmes.map((prog, i) => <button key={prog.id} onClick={() => setActiveTab(i)} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === i ? 'bg-primary text-white shadow-md' : 'bg-background border border-border text-foreground hover:border-primary/40'}`}>
                  {prog.name}
                </button>)}
            </div>

            {/* Active programme card */}
            {academics.programmes.map((prog, i) => <div key={prog.id} className={activeTab === i ? 'block' : 'hidden'}>
                <FadeUp>
                  <div className="bg-background rounded-3xl overflow-hidden border border-border shadow-sm">
                    <div className={`${programmeColors[i].bg} px-8 py-6 flex flex-wrap items-center justify-between gap-4`}>
                      <div>
                        <h3 className={`text-2xl font-bold ${programmeColors[i].text}`} style={{
                      fontFamily: 'var(--font-heading)'
                    }}>
                          {prog.name}
                        </h3>
                        <p className={`${programmeColors[i].text} opacity-80 text-sm mt-1`}>{prog.grades} · {prog.age_range}</p>
                      </div>
                      <span className={`${programmeColors[i].badge} text-xs font-bold px-4 py-1.5 rounded-full`}>
                        {prog.grades}
                      </span>
                    </div>
                    <div className="p-8">
                      <p className="text-muted-foreground leading-relaxed mb-6">{prog.description}</p>
                      <h4 className="font-bold text-foreground mb-4">What students learn:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {prog.highlights.map(h => <li key={h.id} className="flex items-start gap-2.5">
                            <CheckCircle2 size={17} className="text-accent mt-0.5 shrink-0" />
                            <span className="text-sm text-foreground">{h.text}</span>
                          </li>)}
                      </ul>
                    </div>
                  </div>
                </FadeUp>
              </div>)}
          </div>
        </section>

        {/* ── Co-curricular ────────────────────────────────────────────── */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <FadeUp className="text-center mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary" style={{
              fontFamily: 'var(--font-heading)'
            }}>
                {academics.cocurricular.heading}
              </h2>
            </FadeUp>
            <FadeUp delay={0.1} className="text-center mb-14">
              <p className="text-muted-foreground max-w-2xl mx-auto">{academics.cocurricular.subheading}</p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {academics.cocurricular.areas.map((area, i) => {
                const cardColors = [
                  "#51aafd", // Blue
                  "#69bb44", // Green
                  "#fe584a", // Red
                  "#fec132", // Yellow
                ];

                return (
                  <FadeUp key={area.id} delay={i * 0.07}>
                    <div
                      className="group rounded-2xl p-6 border border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
                      style={{
                        backgroundColor: cardColors[i % cardColors.length],
                      }}
                    >
                      <div className="w-2 h-8 bg-white rounded-full mb-4 group-hover:h-10 transition-all duration-300" />

                      <h3
                        className="font-bold text-white mb-2"
                        style={{
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {area.title}
                      </h3>

                      <p className="text-white text-sm leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </FadeUp>
                );
              })}
            </div>

            {/* Sports image accent */}
            <FadeUp delay={0.2} className="mt-12">
              <div className="rounded-3xl overflow-hidden h-56 md:h-72 relative">
                <img src="/airo-assets/images/pages/academics/cocurricular-sports" alt="Students playing sports at The Trium School" className="w-full h-full object-cover" loading="lazy" width={1200} height={400} />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent pointer-events-none" />
                <div className="absolute inset-0 flex items-center px-8 md:px-14 pointer-events-none">
                  <p className="text-white text-2xl md:text-3xl font-bold max-w-sm leading-snug" style={{
                  fontFamily: 'var(--font-heading)'
                }}>
                    Sport builds character as much as it builds fitness.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="py-20 bg-primary">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{
              fontFamily: 'var(--font-heading)'
            }}>
                {academics.cta.heading}
              </h2>
              <p className="text-white/75 text-sm md:text-base lg:text-lg mb-8 max-w-none mx-auto text-center lg:whitespace-nowrap">
  {academics.cta.subheading}</p>
              <button onClick={() => navigate('/admissions')} className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-8 py-4 rounded-full hover:bg-accent/90 transition-colors text-base">
                {academics.cta.button}
                <ArrowRight size={18} />
              </button>
            </FadeUp>
          </div>
        </section>
      </main>
    </>;
}
