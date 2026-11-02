import React, { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { careers } from 'virtual:content';
import { Users, BookOpen, Lightbulb, Building2, ChevronDown, ChevronUp, Send, CheckCircle2 } from 'lucide-react';

const site = 'https://triumschool.in';

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const whyIcons = [Users, BookOpen, Building2, Lightbulb];

export default function CareersPage() {
  const [openPosition, setOpenPosition] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site}/careers#webpage`,
    name: 'Careers — The Trium School',
    url: `${site}/careers`,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Open Positions at The Trium School',
      itemListElement: careers.openings.positions.map((pos, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'JobPosting',
          title: pos.title,
          description: pos.description,
          employmentType: 'FULL_TIME',
          hiringOrganization: {
            '@type': 'EducationalOrganization',
            name: 'The Trium School',
            sameAs: site
          },
          jobLocation: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Nashik',
              addressRegion: 'Maharashtra',
              addressCountry: 'IN'
            }
          },
          datePosted: '2026-09-01'
        }
      }))
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Your application could not be submitted. Please try again.');
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Your application could not be submitted. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Careers — The Trium School | Join Our Team in Nashik</title>
        <meta
          name="description"
          content="Explore teaching and staff opportunities at The Trium School, Nashik. Join a passionate team dedicated to transformative K–12 education."
        />
        <link rel="canonical" href={`${site}/careers`} />
        <meta property="og:title" content="Careers — The Trium School" />
        <meta
          property="og:description"
          content="Join our team of passionate educators at The Trium School, Nashik."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/careers`} />
        <meta
          property="og:image"
          content={`${site}/airo-assets/images/pages/careers/hero`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={`${site}/airo-assets/images/pages/careers/hero`}
        />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="media/Collegial Conversation in a Modern School Corridor.png"
              alt="Trium School educators collaborating"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
              width={1440}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/88 via-primary/65 to-primary/30" />
          </div>
          <div className="relative container mx-auto px-6 py-24 items-center flex flex-col justify-center h-full">
            <div className="max-w-2xl text-center">
              <motion.p
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" as const }}
                className="text-sm font-medium tracking-wide text-accent mb-4"
              >
                {careers.hero.eyebrow}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: "easeOut" as const,
                }}
                className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
              >
                {careers.hero.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: "easeOut" as const,
                }}
                className="text-lg text-white/80 leading-relaxed"
              >
                {careers.hero.subtitle}
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── WHY TRIUM ────────────────────────────────────────────────────── */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <FadeUp className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {careers.why.heading}
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {careers.why.items.map((item, i) => {
                const Icon = whyIcons[i % whyIcons.length];
                return (
                  <FadeUp key={item.id} delay={i * 0.1}>
                    <div className="bg-card rounded-2xl p-7 border border-border hover:shadow-lg transition-shadow duration-300 h-full">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                        <Icon size={22} className="text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── OPEN POSITIONS ───────────────────────────────────────────────── */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-6">
            <FadeUp className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {careers.openings.heading}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {careers.openings.subheading}
              </p>
            </FadeUp>
            <div className="max-w-3xl mx-auto flex flex-col gap-4">
              {careers.openings.positions.map((pos, i) => (
                <FadeUp key={pos.id} delay={i * 0.08}>
                  <div className="bg-card rounded-2xl border border-border overflow-hidden">
                    <button
                      onClick={() =>
                        setOpenPosition(openPosition === pos.id ? null : pos.id)
                      }
                      className="w-full flex items-center justify-between px-7 py-5 text-left hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-primary">
                          {pos.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {pos.department}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span className="text-xs font-medium text-accent">
                            {pos.type}
                          </span>
                        </div>
                      </div>
                      {openPosition === pos.id ? (
                        <ChevronUp
                          size={18}
                          className="text-muted-foreground shrink-0 ml-4"
                        />
                      ) : (
                        <ChevronDown
                          size={18}
                          className="text-muted-foreground shrink-0 ml-4"
                        />
                      )}
                    </button>
                    {openPosition === pos.id && (
                      <div className="px-7 pb-6 border-t border-border">
                        <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                          {pos.description}
                        </p>
                        <a
                          href="#apply"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              position: pos.title,
                            }))
                          }
                          className="inline-block mt-4 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-secondary transition-colors"
                        >
                          Apply for this role
                        </a>
                      </div>
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── APPLICATION FORM ─────────────────────────────────────────────── */}
        <section id="apply" className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <FadeUp className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {careers.apply.heading}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {careers.apply.subheading}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {careers.apply.note}
              </p>
            </FadeUp>

            <div className="max-w-2xl mx-auto">
              {submitted ? (
                <FadeUp>
                  <div className="bg-card rounded-2xl border border-border p-12 text-center">
                    <CheckCircle2
                      size={48}
                      className="text-accent mx-auto mb-5"
                    />
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      Application received!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for your interest in joining The Trium School.
                      We will review your application and get back to you within
                      5 working days.
                    </p>
                  </div>
                </FadeUp>
              ) : (
                <FadeUp>
                  <form
                    onSubmit={handleSubmit}
                    className="bg-card rounded-2xl border border-border p-8 md:p-10 flex flex-col gap-5"
                  >
                    {submitError && <p role="alert" className="text-sm text-destructive">{submitError}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-foreground"
                        >
                          Full name <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-foreground"
                        >
                          Email address{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium text-foreground"
                        >
                          Phone number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="experience"
                          className="text-sm font-medium text-foreground"
                        >
                          Years of experience
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          value={form.experience}
                          onChange={handleChange}
                          className="px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                        >
                          <option value="">Select experience</option>
                          <option value="0-1">Fresher (0–1 year)</option>
                          <option value="2-5">2–5 years</option>
                          <option value="6-10">6–10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="position"
                        className="text-sm font-medium text-foreground"
                      >
                        Position applying for{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="position"
                        name="position"
                        required
                        value={form.position}
                        onChange={handleChange}
                        className="px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                      >
                        <option value="">Select a position</option>
                        {careers.openings.positions.map((pos) => (
                          <option key={pos.id} value={pos.title}>
                            {pos.title}
                          </option>
                        ))}
                        <option value="Other">
                          Other / General application
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-foreground"
                      >
                        Cover note <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about yourself, your teaching philosophy, and why you would like to join The Trium School..."
                        className="px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-secondary transition-colors disabled:opacity-60 self-start"
                    >
                      <Send size={15} />
                      {submitting ? "Submitting..." : "Submit application"}
                    </button>
                  </form>
                </FadeUp>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
