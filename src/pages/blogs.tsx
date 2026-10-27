import { Helmet } from "@dr.pogodin/react-helmet";
import { Link } from "react-router";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

const upcomingTopics = [
  {
    title: "Learning & Growth",
    description: "Fresh perspectives on curiosity, creativity, and education.",
    icon: GraduationCap,
    color: "#51aafd",
  },
  {
    title: "Life at Trium",
    description: "Moments, milestones, and memories from our school community.",
    icon: HeartHandshake,
    color: "#69bb44",
  },
  {
    title: "Ideas & Inspiration",
    description: "Thoughtful stories for students, parents, and educators.",
    icon: Sparkles,
    color: "#fe584a",
  },
];

export default function BlogsPage() {
  return (
    <>
      <Helmet>
        <title>Blogs — Coming Soon | The Trium School</title>
        <meta
          name="description"
          content="The Trium School blog is coming soon. Look forward to stories about learning, student life, and our school community."
        />
        {/* Remove noindex when actual blogs are published */}
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://triumschool.in/blogs" />
      </Helmet>

      <main className="relative isolate overflow-hidden bg-[#f9fbff]">
        {/* Background decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-36 top-10 h-80 w-80 rounded-full bg-[#51aafd]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 top-28 h-80 w-80 rounded-full bg-[#fec123]/20 blur-3xl"
        />

        <section className="container relative mx-auto px-6 pb-20 pt-20 text-center md:pb-28 md:pt-28">
          <div className="mx-auto max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#51aafd]/30 bg-white px-5 py-2 text-sm font-semibold text-primary shadow-sm">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              THE TRIUM SCHOOL BLOG
            </div>

            <h1 className="text-4xl font-bold leading-tight text-primary sm:text-5xl md:text-6xl">
              Our Stories Are
              <span className="mt-2 block text-[#fe584a]">Coming Soon!</span>
            </h1>

            {/* Four brand color dots */}
            <div
              className="mx-auto my-7 flex items-center justify-center gap-2"
              aria-hidden="true"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#51aafd]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#69bb44]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#fe584a]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#fec123]" />
            </div>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
              Something inspiring is taking shape! We are preparing a space for
              school updates, learning insights, and meaningful stories from the
              Trium community. Check back soon.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Back to Home
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-white px-7 py-3.5 text-sm font-semibold text-primary transition hover:border-primary/50 hover:bg-[#f0f5ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Upcoming blog categories */}
          <div className="mx-auto mt-20 max-w-5xl">
            <h2 className="mb-7 text-xl font-bold text-primary md:text-2xl">
              A little of what’s ahead
            </h2>

            <div className="grid gap-5 md:grid-cols-3">
              {upcomingTopics.map(
                ({ title, description, icon: Icon, color }) => (
                  <article
                    key={title}
                    className="rounded-2xl border border-primary/10 bg-white p-7 text-left shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div
                      className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${color}20`,
                        color,
                      }}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-primary">
                      {title}
                    </h3>

                    <p className="text-sm leading-relaxed text-foreground/65">
                      {description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
