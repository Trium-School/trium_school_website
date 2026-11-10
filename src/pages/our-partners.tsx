import React, { useState } from "react";
import { Link } from "react-router";
import { Helmet } from "@dr.pogodin/react-helmet";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Heart,
  Lightbulb,
  MessageCircle,
  Puzzle,
  Sprout,
  // Play,
  UserRound,
  Globe2,
  BookOpen,
  Sparkles,
} from "lucide-react";

const SITE = "https://triumschool.in";
const PAGE_URL = `${SITE}/our-partners`;
const DREAMTIME_URL = "https://www.dreamtimelearning.com/";

// Put your approved images in public/media/partners/.
// The page shows designed fallbacks until those images are present.
const MEDIA = {
  dreamtimeLogo: "/media/Dreamtime-Learning-Logo.avif",
  linaAshar: "/media/Lina-Asher.png",
};

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

const pillars = [
  {
    title: "Brain-Based Learning",
    description:
      "Learning experiences designed around how children understand, remember and explore.",
    Icon: Brain,
    color: "#51AAFD",
    background: "#ECF6FF",
  },
  {
    title: "Creative & Critical Thinking",
    description:
      "Encouraging children to ask questions, imagine possibilities and solve problems.",
    Icon: Lightbulb,
    color: "#F2AC13",
    background: "#FFFAE8",
  },
  {
    title: "Confidence & Communication",
    description:
      "Helping children express their ideas, emotions and thoughts with confidence.",
    Icon: MessageCircle,
    color: "#FE584A",
    background: "#FFF1EF",
  },
  {
    title: "Social & Emotional Growth",
    description:
      "Building empathy, self-awareness, positive habits and meaningful relationships.",
    Icon: Heart,
    color: "#FE584A",
    background: "#FFF0F0",
  },
  {
    title: "Learning Through Discovery",
    description:
      "Making learning active, engaging and connected to everyday experiences.",
    Icon: Puzzle,
    color: "#69BB44",
    background: "#F0F9EB",
  },
  {
    title: "Future-Ready Foundations",
    description:
      "Nurturing curiosity, adaptability and independent thinking from an early age.",
    Icon: Sprout,
    color: "#51AAFD",
    background: "#ECF6FF",
  },
];

// Add a permitted, verified video link only after approval.
// The names below are proposed features, not endorsements of the school.
// const proposedVideos: {
//   name: string;
//   description: string;
//   videoUrl: string | null;
// }[] = [
//   {
//     name: "Jackie Shroff",
//     description:
//       "A conversation on children, learning and building a better tomorrow.",
//     videoUrl: null,
//   },
//   {
//     name: "Rhea Chakraborty",
//     description:
//       "A conversation on conscious education and the power of early learning.",
//     videoUrl: null,
//   },
// ];

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#2785D2]">
      <span className="h-2 w-2 rounded-full bg-[#69BB44]" />
      {children}
    </span>
  );
}

function PartnerLogo() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex h-56 w-full items-center justify-center rounded-[24px] border border-[#E0E8F3] bg-gradient-to-br from-[#F3F7FD] to-[#E6EDF7] p-8 shadow-sm sm:h-64">
      {!failed ? (
        <img
          src={MEDIA.dreamtimeLogo}
          alt="Dreamtime Learning logo"
          loading="lazy"
          className="max-h-full max-w-full object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="text-center text-[#182957]">
          <BookOpen
            className="mx-auto mb-4 h-10 w-10 text-[#51AAFD]"
            aria-hidden="true"
          />
          <div className="text-2xl font-extrabold leading-tight">
            Dreamtime
            <br />
            Learning
          </div>
          <span className="mt-2 block text-xs font-semibold uppercase tracking-widest text-[#64748B]">
            Curriculum Partner
          </span>
        </div>
      )}
    </div>
  );
}

function LinaPortrait() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative mx-auto aspect-[4/4.4] w-full max-w-[330px] overflow-hidden rounded-[24px] bg-gradient-to-br from-[#E2EAF5] to-[#C9D8EC] shadow-xl shadow-slate-300/30">
      {!failed ? (
        <img
          src={MEDIA.linaAshar}
          alt="Lina Ashar, founder of Dreamtime Learning"
          loading="lazy"
          className="h-full w-full object-cover object-top"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center text-[#667D9A]">
          <UserRound size={112} strokeWidth={1} aria-hidden="true" />
          <span className="max-w-[230px] px-4 text-xs font-medium">
            Add an approved portrait of Lina Ashar
          </span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#51AAFD] via-[#69BB44] to-[#FEC123]" />
    </div>
  );
}

export default function OurPartnersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: "Our Partners — Dreamtime Learning | The Trium School",
    description:
      "Discover The Trium School's pre-primary curriculum partnership with Dreamtime Learning and its approach to early childhood education.",
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": `${SITE}/#organization` },
  };

  return (
    <>
      <Helmet>
        <title>
          Our Partners | Dreamtime Learning — The Trium School, Nashik
        </title>
        <meta
          name="description"
          content="Explore The Trium School's partnership with Dreamtime Learning for pre-primary education, brain-based learning, creativity and future-ready foundations in Nashik."
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Our Partners | The Trium School" />
        <meta
          property="og:description"
          content="Building strong foundations with global expertise through our pre-primary curriculum partnership with Dreamtime Learning."
        />
        <meta property="og:url" content={PAGE_URL} />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <main className="overflow-hidden bg-white text-[#17254A]">
        {/* HERO */}
        <section className="relative h-[420px] md:h-[520px] overflow-hidden">
          <img
            src="media/Our Partners.png"
            alt="Students engaged in classroom learning at The Trium School"
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
                Global Learning Partnerships
              </p>
              <h1
                className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                Our Partners
              </h1>
              <p className="mt-4 text-white/80 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                At The Trium School, we believe great education begins with the
                right foundation. By bringing together progressive teaching
                practices and experienced educational partners, we create
                learning experiences that help every child discover, explore and
                grow.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* DREAMTIME PARTNERSHIP */}
        <section className="py-16 sm:py-20" aria-labelledby="dreamtime-title">
          <div className="mx-auto grid max-w-6xl items-center gap-9 px-5 sm:px-7 md:grid-cols-[0.8fr_1.2fr] md:gap-14 lg:px-8">
            <motion.div
              initial={false}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <PartnerLogo />
            </motion.div>
            <div>
              <SectionTag>Our Curriculum Partner</SectionTag>
              <h2
                id="dreamtime-title"
                className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Powered by{" "}
                <span className="text-[#2785D2]">Dreamtime Learning</span>
              </h2>
              <p className="mt-2 text-lg font-semibold text-[#34527C]">
                Our Pre-Primary Curriculum Partner
              </p>
              <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#526078] sm:text-base">
                <p>
                  The Trium School's pre-primary curriculum is powered by
                  Dreamtime Learning, a global education ecosystem focused on
                  preparing children for a rapidly changing world.
                </p>
                <p>
                  Drawing on research in brain science, behavioural science and
                  child development, Dreamtime Learning goes beyond traditional
                  memorisation to encourage curiosity, creativity, independent
                  thinking and emotional growth.
                </p>
                <p>
                  Through this partnership, we aim to make the early years of
                  education more engaging, meaningful and relevant to each
                  child's development.
                </p>
              </div>
              <a
                href={DREAMTIME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#172A5D] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#172A5D]/15 transition hover:-translate-y-0.5 hover:bg-[#25417F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51AAFD] focus-visible:ring-offset-2"
              >
                Explore Dreamtime Learning{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* LINA ASHAR */}
        <section
          className="border-y border-[#E6EDF5] bg-[#F3F7FC] py-16 sm:py-20"
          aria-labelledby="founder-title"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-7 md:grid-cols-[0.76fr_1.24fr] md:gap-16 lg:px-8">
            <LinaPortrait />
            <div>
              <SectionTag>Educational Leadership</SectionTag>
              <h2
                id="founder-title"
                className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Meet Lina Ashar
              </h2>
              <p className="mt-2 text-lg font-semibold text-[#34527C]">
                Founder, Dreamtime Learning
              </p>
              <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#526078] sm:text-base">
                <p>
                  A pioneering educator and entrepreneur, Lina Ashar has spent
                  decades reimagining how children learn.
                </p>
                <p>
                  Her educational philosophy places the child at the centre,
                  combining an understanding of how the brain learns with a
                  strong focus on creativity, confidence, emotional intelligence
                  and independent thinking.
                </p>
                <p>
                  Through Dreamtime Learning, she continues to champion an
                  approach to education that prepares children not just for
                  examinations, but for life.
                </p>
              </div>
              <a
                href={DREAMTIME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-xl border-2 border-[#172A5D] px-6 py-3.5 text-sm font-semibold text-[#172A5D] transition hover:bg-[#172A5D] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51AAFD] focus-visible:ring-offset-2"
              >
                Discover the Dreamtime Learning Journey{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* LEARNING PILLARS */}
        <section className="py-16 sm:py-20" aria-labelledby="learning-title">
          <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-8">
            <div className="max-w-3xl">
              <SectionTag>A Different Way to Learn</SectionTag>
              <h2
                id="learning-title"
                className="mt-3 text-3xl font-extrabold sm:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Learning That Goes{" "}
                <span className="text-[#2785D2]">Beyond Books</span>
              </h2>
              <p className="mt-4 text-base leading-8 text-[#526078]">
                The early years shape how children think, learn and understand
                the world. Our Dreamtime-powered approach focuses on developing
                essential abilities through engaging, age-appropriate learning
                experiences.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map(
                ({ title, description, Icon, color, background }) => (
                  <motion.article
                    key={title}
                    initial={false}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.22 }}
                    className="group rounded-[20px] border border-[#E7EDF5] bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div
                      className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl p-3"
                      style={{ backgroundColor: background, color }}
                    >
                      <Icon size={25} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-extrabold leading-snug text-[#172A5D]">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#65738A]">
                      {description}
                    </p>
                    <span
                      className="mt-6 block h-1 w-12 rounded-full transition-all duration-300 group-hover:w-20"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                  </motion.article>
                ),
              )}
            </div>
          </div>
        </section>

        {/* VIDEO FEATURES — intentionally not clickable until approved */}
        <section
          className="border-y border-[#E6EDF5] bg-[#F3F7FC] py-16 sm:py-20"
          aria-labelledby="voices-title"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-7 lg:px-8">
            <SectionTag>Stories & Perspectives</SectionTag>
            <h2
              id="voices-title"
              className="mt-3 text-3xl font-extrabold sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Voices of <span className="text-[#2785D2]">Inspiration</span>
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#526078]">
              Discover perspectives from inspiring personalities, educators and
              thought leaders who are part of the wider conversation around
              learning, growth and human potential.
            </p>
            {/* <div className="mt-9 grid gap-5 md:grid-cols-2">
              {proposedVideos.map((video) => (
                <article
                  key={video.name}
                  className="overflow-hidden rounded-[22px] border border-[#E0E8F3] bg-white shadow-sm"
                >
                  {video.videoUrl ? (
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch approved video featuring ${video.name}`}
                      className="group flex min-h-[205px] items-center justify-center bg-gradient-to-br from-[#DCE6F2] to-[#BACDE0] transition hover:brightness-95"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#172A5D] text-white shadow-lg transition group-hover:scale-110">
                        <Play
                          size={25}
                          fill="currentColor"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  ) : (
                    <div
                      className="relative flex min-h-[205px] items-center justify-center bg-gradient-to-br from-[#E0E8F2] via-[#D5E0EC] to-[#C6D4E4]"
                      aria-label="Video feature awaiting approval"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/70 text-[#72839B]">
                        <Play
                          size={23}
                          fill="currentColor"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#526078]">
                        Video pending approval
                      </span>
                    </div>
                  )}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg font-extrabold text-[#172A5D]">
                      {video.name}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#65738A]">
                      {video.description}
                    </p>
                    {!video.videoUrl && (
                      <p className="mt-3 text-xs text-[#78869A]">
                        Proposed feature — content and permission to be
                        confirmed.
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#7B879B]">
              These proposed video features do not represent an endorsement of
              The Trium School. Publish videos only after confirming the
              original content and obtaining the required permissions.
            </p> */}

            {/* add a cta */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://www.dreamtimelearning.com/foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#172A5D] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#25417F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51AAFD] focus-visible:ring-offset-2"
              >
                Know more <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section
          className="relative overflow-hidden bg-white py-20 text-center sm:py-24"
          aria-labelledby="closing-title"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-36 w-[650px] -translate-x-1/2 rounded-full bg-[#51AAFD]/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-3xl px-5 sm:px-7">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDF7FF] text-[#2785D2]">
              <Sparkles size={27} aria-hidden="true" />
            </div>
            <h2
              id="closing-title"
              className="text-3xl font-extrabold leading-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              A Strong Foundation for a Brighter Tomorrow
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#526078]">
              At The Trium School, our partnership with Dreamtime Learning
              reflects our commitment to giving children an education that
              nurtures curiosity, builds confidence and prepares them for the
              possibilities ahead.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={DREAMTIME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#172A5D] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#25417F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51AAFD] focus-visible:ring-offset-2"
              >
                Visit Dreamtime Learning{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 rounded-xl border border-[#CCD8E8] bg-white px-6 py-3.5 text-sm font-semibold text-[#172A5D] transition hover:bg-[#F3F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51AAFD] focus-visible:ring-offset-2"
              >
                Explore Admissions <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center gap-2 text-xs font-semibold text-[#73839B]">
              <Globe2 size={16} aria-hidden="true" /> Growing together through
              meaningful partnerships
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
