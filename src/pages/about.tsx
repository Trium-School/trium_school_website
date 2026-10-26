import React, { useEffect, useState } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowRight, X } from "lucide-react";
import { about, home } from "virtual:content";
const site = "https://triumschool.in";
const url = `${site}/about`;
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
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-60px",
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut" as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
const valueIcons = ["💡", "🤝", "⭐", "❤️", "🚀", "🌱"];
// Content adapted from the supplied Dr. Anjali Srivaastava pen profile.
const principalProfile = {
  name: "Dr. Anjali Srivaastava",
  role: "Principal",
  image: "/media/principal.png",
  quote:
    "Education is not merely the transfer of knowledge; it is the transformation of lives. Every child carries limitless potential, every teacher is a catalyst for change, and every institution can become a space where empathy, innovation, and excellence thrive together.",
  paragraphs: [
    "Guided by this belief, Dr. Anjali Srivaastava has dedicated more than two decades to redefining education through empathy, leadership, and strategic innovation. An accomplished academician, educationist, mentor, and institution builder, she brings over 20 years of experience across the educational spectrum—from preschool to postgraduate education.",
    "Dr. Srivaastava holds a Ph.D. in English Literature and conducts multidisciplinary research on the social dimensions of Indian and Western societies. She has successfully guided doctoral scholars and contributed extensively to academic discourse through presentations at numerous national and international conferences on emerging pedagogies, paradigm shifts in education, English language teaching, literacy development, and future-ready learning systems.",
    "Committed to lifelong learning and strategic leadership, she is currently pursuing an Advanced Strategic Management Programme from the Indian Institute of Technology (IIT) Delhi, further strengthening her expertise in educational transformation, organizational leadership, and sustainable growth.",
    "Her distinguished professional journey includes leadership and academic roles in reputed institutions such as Allenhouse Institute of Engineering and Technology, Mangalayatan University, NIMS International School, Archies Education Centre, and Central Academy Schools at Prayagraj, Barabanki, and Udaipur, as well as Founder Principal at Radcliffe School, Pune, Maharashtra. Across these roles, she has served as Assistant Professor, Assistant Training & Placement Officer, Career Development Professional, Vice Principal, Principal, Head Principal, and Educational Leader, shaping institutions through visionary leadership and people-centric practices.",
    "Beyond institutional leadership, Dr. Srivaastava is a Certified Career Counselor, Parent Coach, Adolescent Counselor, Teacher Trainer, and Educational Strategist. She has guided and mentored more than 5,000 students, empowering young minds to discover purpose, build confidence, and make informed career choices. Her teacher training initiatives have impacted educators across diverse settings, focusing on classroom management, emotional intelligence, self-development, leadership, and holistic education.",
    "Dr. Srivaastava is also associated with several professional bodies and social initiatives. As an Advisory Council Member of the Centre of Education Growth and Research, she contributes to policy discussions, educational advocacy, and the advancement of quality learning ecosystems.",
    "As an author, she has penned Empathy in Action and Burnout to Balance, championing compassionate leadership, educator well-being, and human-centered learning. Her articles featured in Quarterly CBSE Magazine and NIY Times reflect her vision of education that nurtures excellence, resilience, and lifelong growth.",
    "An avid reader and admirer of music, dance, art, and nature, Dr. Srivaastava leads with empathy, integrity, continuous learning, and service. Her philosophy is simple: “When education is guided by empathy and strengthened by strategy, it creates empowered individuals, thriving institutions, and a better world.”",
    "Through education, mentoring, and institution-building, she continues to inspire compassionate, future-ready, and globally connected learning.",
  ],
};
export default function AboutPage() {
  const navigate = useNavigate();
  const [principalModalOpen, setPrincipalModalOpen] = useState(false);

  // Close on Escape and prevent the page from scrolling behind the modal.
  useEffect(() => {
    if (!principalModalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPrincipalModalOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [principalModalOpen]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#webpage`,
    name: "About Us — The Trium School",
    url,
    isPartOf: {
      "@id": `${site}/#website`,
    },
    about: {
      "@id": `${site}/#organization`,
    },
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

        {/* ── FOUNDER'S MESSAGE ────────────────────────────────────────────── */}
        <section className="py-28 bg-primary overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto">
              <FadeUp>
                <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-10 text-center">
                  {home.founders_message.eyebrow}
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <blockquote className="relative mb-14">
                  <span
                    className="absolute -top-6 -left-4 text-accent/30 select-none pointer-events-none"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "10rem",
                      lineHeight: 1,
                    }}
                  >
                    "
                  </span>
                  <p
                    className="relative text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug text-center px-8"
                    style={{
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {home.founders_message.pull_quote}
                  </p>
                </blockquote>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="flex items-center gap-4 mb-14">
                  <div className="flex-1 h-px bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-[#51aafd]" />
                  <div className="w-2 h-2 rounded-full bg-[#69bb44]" />
                  <div className="w-2 h-2 rounded-full bg-[#fe584a]" />
                  <div className="w-2 h-2 rounded-full bg-[#fec132]" />
                  <div className="flex-1 h-px bg-white/20" />
                </div>
              </FadeUp>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-7 mb-14">
                {home.founders_message.paragraphs.map((paragraph, i) => (
                  <FadeUp key={paragraph.id} delay={0.2 + i * 0.05}>
                    <p className="text-white/75 text-base leading-relaxed">
                      {paragraph.text}
                    </p>
                  </FadeUp>
                ))}
              </div>

              <FadeUp delay={0.4}>
                <div className="border-l-4 border-accent pl-6">
                  <p
                    className="text-white text-lg font-semibold italic mb-3"
                    style={{
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {home.founders_message.closing}
                  </p>
                  <p className="text-accent text-sm font-semibold uppercase tracking-widest">
                    {home.founders_message.attribution}
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── Principal's Profile ───────────────────────────────────────── */}
        <section
          id="principal-profile"
          className="py-20 md:py-24 bg-background"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <FadeUp>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Left: principal portrait */}
                <div className="relative max-w-lg w-full mx-auto lg:mx-0">
                  <div
                    className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl bg-[#69bb44]/20"
                    aria-hidden="true"
                  />
                  <img
                    src={principalProfile.image}
                    alt={`${principalProfile.name}, Principal of The Trium School`}
                    className="relative w-full aspect-[4/5] object-cover object-top rounded-3xl shadow-xl"
                    loading="lazy"
                    width={600}
                    height={750}
                  />
                </div>

                {/* Right: name and six-line introduction */}
                <div>
                  <p className="text-[#69bb44] text-sm font-semibold uppercase tracking-widest mb-3">
                    Meet Our Principal
                  </p>
                  <h2
                    className="text-3xl md:text-4xl font-bold text-primary mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {principalProfile.name}
                  </h2>
                  {/* <p className="text-muted-foreground font-medium mb-6">
                    {principalProfile.role}
                  </p> */}
                  <p
                    className="text-muted-foreground text-base md:text-lg leading-relaxed"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 6,
                      overflow: "hidden",
                    }}
                  >
                    {principalProfile.paragraphs.join(" ")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPrincipalModalOpen(true)}
                    aria-haspopup="dialog"
                    className="mt-7 inline-flex items-center gap-2 bg-[#69bb44] hover:bg-[#5ba638] text-white font-semibold px-7 py-3 rounded-full shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#69bb44]"
                  >
                    Read More <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Full principal profile in a scrollable modal */}
        {principalModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <button
              type="button"
              aria-label="Close principal profile"
              className="absolute inset-0 w-full h-full bg-black/70 cursor-default"
              onClick={() => setPrincipalModalOpen(false)}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="principal-modal-title"
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-background shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-border shrink-0">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#69bb44]">
                    Principal's Profile
                  </p>
                  <h2
                    id="principal-modal-title"
                    className="text-xl sm:text-2xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {principalProfile.name}
                  </h2>
                </div>
                <button
                  type="button"
                  autoFocus
                  aria-label="Close profile"
                  onClick={() => setPrincipalModalOpen(false)}
                  className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#69bb44]"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-5 text-muted-foreground leading-relaxed">
                <blockquote className="border-l-4 border-[#69bb44] pl-4 text-foreground italic font-medium">
                  “{principalProfile.quote}”
                </blockquote>
                {principalProfile.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="py-20 bg-[#69bb44]">
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
