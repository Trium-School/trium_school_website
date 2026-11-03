import React, { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send } from 'lucide-react';
import { contact } from 'virtual:content';

const site = 'https://triumschool.in';
const url = `${site}/contact`;

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await globalThis.fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send your message.');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#webpage`,
    name: 'Contact — The Trium School',
    url,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` },
  };

  const detailItems = [
    { icon: MapPin, label: contact.details.address_label, value: contact.details.address },
    { icon: Phone, label: contact.details.phone_label, value: contact.details.phone },
    { icon: Mail, label: contact.details.email_label, value: contact.details.email },
    { icon: Clock, label: contact.details.hours_label, value: contact.details.hours },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us — The Trium School, Nashik</title>
        <meta name="description" content="Get in touch with The Trium School in Makhmalabad, Nashik. Call, email, or send us a message about admissions, campus visits, or any enquiry." />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Contact Us — The Trium School" />
        <meta property="og:description" content="Reach The Trium School in Nashik. We're happy to answer your questions about admissions and campus visits." />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${site}/airo-assets/images/pages/contact/hero`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${site}/airo-assets/images/pages/contact/hero`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative h-[340px] md:h-[420px] overflow-hidden">
          <img
            src="media/Trium Contact Us.png"
            alt="The Trium School entrance"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1440}
            height={420}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/40 pointer-events-none" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <FadeUp>
              <p className="text-sm font-semibold text-accent mb-3 tracking-wide uppercase">{contact.hero.eyebrow}</p>
              <h1
                className="text-3xl md:text-5xl font-bold text-white max-w-2xl leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {contact.hero.title}
              </h1>
              <p className="mt-4 text-white/80 text-base md:text-lg max-w-xl mx-auto">
                {contact.hero.subtitle}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── Main content ─────────────────────────────────────────────── */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-5 gap-12">

            {/* Contact details sidebar */}
            <div className="lg:col-span-2">
              <FadeUp>
                <h2
                  className="text-2xl font-bold text-primary mb-8"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Find us
                </h2>
                <div className="space-y-6">
                  {detailItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{item.label}</p>
                        <p className="text-foreground text-sm leading-relaxed">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map note */}
                <div className="mt-10 rounded-2xl overflow-hidden bg-muted/40 border border-border p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{contact.map_note}</p>
                  <a
                    href="https://maps.google.com/?q=Makhmalabad+Nashik+Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold mt-3 hover:text-accent transition-colors"
                  >
                    <MapPin size={14} />
                    View on Google Maps
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <FadeUp delay={0.1}>
                <h2
                  className="text-2xl font-bold text-primary mb-8"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {contact.form.heading}
                </h2>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                    <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                    <h3
                      className="text-xl font-bold text-green-800 mb-2"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {contact.form.success_heading}
                    </h3>
                    <p className="text-green-700 text-sm">{contact.form.success_body}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-foreground mb-1.5">
                          {contact.form.name_label} <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          minLength={2}
                          maxLength={100}
                          value={form.name}
                          onChange={handleChange}
                          placeholder={contact.form.name_placeholder}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-foreground mb-1.5">
                          {contact.form.email_label} <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          maxLength={254}
                          value={form.email}
                          onChange={handleChange}
                          placeholder={contact.form.email_placeholder}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-foreground mb-1.5">
                          {contact.form.phone_label}
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          maxLength={20}
                          pattern="(?=(?:[^0-9]*[0-9]){7})[+]?[0-9 .()-]{7,20}"
                          title="Enter a phone number with 7–15 digits."
                          value={form.phone}
                          onChange={handleChange}
                          placeholder={contact.form.phone_placeholder}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-xs font-semibold text-foreground mb-1.5">
                          {contact.form.subject_label}
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          maxLength={150}
                          value={form.subject}
                          onChange={handleChange}
                          placeholder={contact.form.subject_placeholder}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-foreground mb-1.5">
                        {contact.form.message_label} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        minLength={10}
                        maxLength={5000}
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder={contact.form.message_placeholder}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    {error && <p role="alert" className="text-red-500 text-sm">{error}</p>}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60 text-sm"
                    >
                      {submitting ? 'Sending…' : contact.form.submit_button}
                      {!submitting && <Send size={15} />}
                    </button>
                  </form>
                )}
              </FadeUp>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
