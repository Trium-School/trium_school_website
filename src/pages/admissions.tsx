import React, { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { ChevronDown, ChevronUp, CheckCircle2, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { admissions } from 'virtual:content';

function FadeUp({ children, delay = 0, className = '' }: {children: React.ReactNode;delay?: number;className?: string;}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' as const }}
      className={className}>
      
      {children}
    </motion.div>);

}

type FormData = {
  parentName: string;
  childName: string;
  childAge: string;
  grade: string;
  phone: string;
  email: string;
  source: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function AdmissionsPage() {
  const site = 'https://triumschool.in';
  const url = `${site}/admissions`;
  const title = 'Admissions 2026–27 — The Trium School';
  const description = 'Apply for admissions at The Trium School, Nashik. Accepting applications for 2026–27 across Early Years (Nursery–KG) and Primary School (Grades 1–5).';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name: title,
    url,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` },
    mainEntity: {
      '@type': 'EducationalOrganization',
      '@id': `${site}/#organization`,
      name: 'The Trium School',
      url: site,
      description: 'Admissions open for 2026–27 across Early Years (Nursery–KG) and Primary School (Grades 1–5) at The Trium School, Nashik.'
    }
  };

  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    childName: '',
    childAge: '',
    grade: '',
    phone: '',
    email: '',
    source: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Submission failed');
      }
      setStatus('success');
      setFormData({ parentName: '', childName: '', childAge: '', grade: '', phone: '', email: '', source: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  const inputClass =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta
          property="og:image"
          content={`${site}/airo-assets/images/pages/home/admissions-cta`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={`${site}/airo-assets/images/pages/home/admissions-cta`}
        />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative py-28 bg-primary overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="container mx-auto px-6 relative text-center max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-accent font-semibold text-sm uppercase tracking-widest mb-5"
            >
              {admissions.hero.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {admissions.hero.heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-white/75 whitespace-pre-line text-lg leading-relaxed"
            >
              {admissions.hero.subheading}
            </motion.p>
          </div>
        </section>

        {/* ── ENQUIRY FORM + CONTACT ────────────────────────────────────────── */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 max-w-7xl mx-auto">
              {/* Left: contact info */}
              <FadeUp className="lg:col-span-2">
                <div className="sticky top-28">
                  <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
                    Get in Touch
                  </p>
                  <h2
                    className="text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {admissions.form.heading}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {admissions.form.subheading}
                  </p>

                  {/* Quick process steps */}
                  <div className="mb-8 space-y-4">
                    {admissions.process.steps.map((step, i) => {
                      const stepColors = [
                        "#51aafd", // Blue - Step 1
                        "#69bb44", // Green - Step 2
                        "#fe584a", // Red - Step 3
                        "#fec132", // Yellow - Step 4
                      ];

                      return (
                        <div key={step.id} className="flex items-start gap-3">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{
                              backgroundColor:
                                stepColors[i % stepColors.length],
                            }}
                          >
                            <span
                              className="font-bold text-xs"
                              style={{ color: "#1a1a1a" }}
                            >
                              {step.number}
                            </span>
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {step.title}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5 font-medium">
                          Call Us
                        </p>
                        <p className="text-foreground font-semibold text-sm">
                          +91 7588804351
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5 font-medium">
                          Email Us
                        </p>
                        <p className="text-foreground font-semibold text-sm">
                          connect@triumschool.in
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5 font-medium">
                          Visit Us
                        </p>
                        <p className="text-foreground font-semibold text-sm">
                          The Trium School Campus,
                          <br />
                          Sulewadi Road, Makhmalabad, Nashik
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="p-5 bg-primary/5 border border-primary/10 rounded-2xl">
                    <p
                      className="text-sm font-bold text-primary mb-3"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Documents to Keep Ready
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Birth certificate",
                        "Previous school report card",
                        "Passport-size photographs (4)",
                        "Address proof",
                      ].map((doc, i) => {
                        const bulletColors = [
                          "#51aafd", // Blue
                          "#69bb44", // Green
                          "#fe584a", // Red
                          "#fec132", // Yellow
                        ];

                        return (
                          <li
                            key={doc}
                            className="flex items-center gap-2 text-sm text-foreground/75"
                          >
                            <CheckCircle2
                              size={14}
                              className="shrink-0"
                              style={{
                                color: bulletColors[i % bulletColors.length],
                              }}
                            />
                            <span>{doc}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </FadeUp>

              {/* Right: form */}
              <FadeUp delay={0.1} className="lg:col-span-3">
                <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-md">
                  {status === "success" ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle2 size={32} className="text-green-600" />
                      </div>
                      <h3
                        className="text-2xl font-bold text-foreground mb-3"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        Enquiry Received!
                      </h3>
                      <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                        Thank you for your interest in The Trium School. Our
                        admissions team will contact you within 48 hours.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="mt-8 text-sm font-semibold text-primary underline underline-offset-4"
                      >
                        Submit another enquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label
                            className="block text-xs font-semibold text-foreground mb-1.5"
                            htmlFor="parentName"
                          >
                            Parent / Guardian Name{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="parentName"
                            name="parentName"
                            type="text"
                            required
                            placeholder="e.g. Rahul Sharma"
                            value={formData.parentName}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-xs font-semibold text-foreground mb-1.5"
                            htmlFor="childName"
                          >
                            Child's Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="childName"
                            name="childName"
                            type="text"
                            required
                            placeholder="e.g. Aryan Sharma"
                            value={formData.childName}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-xs font-semibold text-foreground mb-1.5"
                            htmlFor="childAge"
                          >
                            Child's Age <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="childAge"
                            name="childAge"
                            type="number"
                            min="2"
                            max="18"
                            required
                            placeholder="e.g. 5"
                            value={formData.childAge}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-xs font-semibold text-foreground mb-1.5"
                            htmlFor="grade"
                          >
                            Applying for Grade{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="grade"
                            name="grade"
                            required
                            value={formData.grade}
                            onChange={handleChange}
                            className={inputClass}
                          >
                            <option value="">Select grade</option>
                            <option value="Nursery">Nursery</option>
                            <option value="LKG">LKG</option>
                            <option value="UKG">UKG</option>
                            <option value="Grade 1">Grade 1</option>
                            <option value="Grade 2">Grade 2</option>
                            <option value="Grade 3">Grade 3</option>
                            <option value="Grade 4">Grade 4</option>
                            <option value="Grade 5">Grade 5</option>
                          </select>
                        </div>
                        <div>
                          <label
                            className="block text-xs font-semibold text-foreground mb-1.5"
                            htmlFor="phone"
                          >
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="e.g. +91 98765 43210"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-xs font-semibold text-foreground mb-1.5"
                            htmlFor="email"
                          >
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="e.g. rahul@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="mb-7">
                        <label
                          className="block text-xs font-semibold text-foreground mb-1.5"
                          htmlFor="source"
                        >
                          How did you discover us?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="source"
                          name="source"
                          required
                          value={formData.source}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Select an option</option>
                          <option value="Online Ads">Online Ads</option>
                          <option value="Social Media">Social Media</option>
                          <option value="Residential Complex">
                            Residential Complex
                          </option>
                          <option value="Event / Workshop">
                            Event / Workshop
                          </option>
                          <option value="Trium Parent - Referral">
                            Trium Parent - Referral
                          </option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      {status === "error" && (
                        <p className="text-red-500 text-sm mb-5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                          {errorMsg}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold text-sm shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === "submitting" ? (
                          "Submitting…"
                        ) : (
                          <>
                            {admissions.form.cta}
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>

                      <p className="text-xs text-muted-foreground text-center mt-4">
                        We respect your privacy. Your details will only be used
                        for admissions purposes.
                      </p>
                    </form>
                  )}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── FAQs ─────────────────────────────────────────────────────────── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <FadeUp className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold text-primary"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {admissions.faqs.heading}
              </h2>
            </FadeUp>

            <div className="space-y-3">
              {admissions.faqs.items.map((faq, i) => (
                <FadeUp key={faq.id} delay={i * 0.07}>
                  <div className="border border-border rounded-2xl overflow-hidden bg-card">
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === faq.id ? null : faq.id)
                      }
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-muted/40 transition-colors"
                      aria-expanded={openFaq === faq.id}
                    >
                      <span className="font-semibold text-foreground text-sm leading-snug">
                        {faq.question}
                      </span>
                      {openFaq === faq.id ? (
                        <ChevronUp
                          size={18}
                          className="text-primary shrink-0"
                        />
                      ) : (
                        <ChevronDown
                          size={18}
                          className="text-muted-foreground shrink-0"
                        />
                      )}
                    </button>
                    {openFaq === faq.id && (
                      <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );

}