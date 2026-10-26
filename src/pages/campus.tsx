import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { campus } from "virtual:content";
const site = "https://triumschool.in";
const url = `${site}/campus`;
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

type GalleryImage = {
  src: string;
  alt?: string;
};

function GallerySlider({ images }: { images: GalleryImage[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Update arrow availability when scrolling or resizing
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const updateArrows = () => {
      setCanPrev(slider.scrollLeft > 2);

      setCanNext(
        slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 2,
      );
    };

    updateArrows();

    slider.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    return () => {
      slider.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [images.length]);

  // Slide by exactly one image
  const moveSlider = (direction: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const firstImage = slider.firstElementChild as HTMLElement | null;

    if (!firstImage) return;

    const imageWidth = firstImage.getBoundingClientRect().width;

    const gap = parseFloat(window.getComputedStyle(slider).columnGap) || 0;

    slider.scrollBy({
      left: direction * (imageWidth + gap),
      behavior: "smooth",
    });
  };

  // Fullscreen gallery navigation with wrap-around
  const moveLightbox = (direction: number) => {
    setActiveIndex((current) => {
      if (current === null || images.length === 0) {
        return null;
      }

      return (current + direction + images.length) % images.length;
    });
  };

  // Keyboard controls and scroll locking
  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveLightbox(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveLightbox(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length]);

  if (images.length === 0) return null;

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      {/* Gallery controls */}
      <div className="flex justify-end gap-3 mb-6">
        <button
          type="button"
          onClick={() => moveSlider(-1)}
          disabled={!canPrev}
          aria-label="Previous images"
          className="w-11 h-11 rounded-full border border-border
                     flex items-center justify-center
                     bg-card text-primary
                     hover:bg-primary hover:text-white
                     disabled:opacity-30
                     disabled:cursor-not-allowed
                     transition-all"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={() => moveSlider(1)}
          disabled={!canNext}
          aria-label="Next images"
          className="w-11 h-11 rounded-full border border-border
                     flex items-center justify-center
                     bg-card text-primary
                     hover:bg-primary hover:text-white
                     disabled:opacity-30
                     disabled:cursor-not-allowed
                     transition-all"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Responsive image slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto
                   snap-x snap-mandatory
                   scroll-smooth pb-3
                   [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Enlarge image ${index + 1}`}
            className="group relative block shrink-0
                       snap-start overflow-hidden
                       rounded-2xl bg-muted
                       w-full
                       md:w-[calc((100%-1.5rem)/2)]
                       lg:w-[calc((100%-3rem)/3)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              
<img
  src={`${import.meta.env.BASE_URL}${image.src.replace(/^\/+/, "")}`}
  alt={image.alt || `Campus image ${index + 1}`}
  loading="lazy"
  decoding="async"
  className="w-full h-full object-cover
             transition-transform duration-500
             group-hover:scale-110"
  onError={(e) => {
    console.error(
      "Gallery image failed to load:",
      e.currentTarget.src
    );
  }}
/>


              {/* Hover overlay */}
              <div
                className="absolute inset-0
                           bg-black/0
                           group-hover:bg-black/30
                           transition-all duration-300
                           flex items-center justify-center"
              >
                <span
                  className="w-12 h-12 rounded-full
                             bg-white/90 text-primary
                             flex items-center justify-center
                             opacity-0 scale-75
                             group-hover:opacity-100
                             group-hover:scale-100
                             transition-all duration-300"
                >
                  <ZoomIn size={22} />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Fullscreen image viewer */}
      {activeImage && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Campus image viewer"
          className="fixed inset-0 z-[9999]
                     bg-black/95
                     flex items-center justify-center
                     px-3 py-16"
          onClick={() => setActiveIndex(null)}
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close image viewer"
            className="absolute top-5 right-5 z-20
                       w-11 h-11 rounded-full
                       bg-white/15 text-white
                       hover:bg-white/30
                       flex items-center justify-center
                       transition-colors"
          >
            <X size={24} />
          </button>

          {/* Previous */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              moveLightbox(-1);
            }}
            aria-label="Previous enlarged image"
            className="absolute left-2 md:left-6
                       top-1/2 -translate-y-1/2 z-20
                       w-11 h-11 rounded-full
                       bg-white/15 text-white
                       hover:bg-white/30
                       flex items-center justify-center
                       transition-colors"
          >
            <ChevronLeft size={26} />
          </button>

          {/* Enlarged image */}
          <figure
            className="flex flex-col items-center
                       justify-center
                       w-full max-w-6xl
                       px-12 md:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt || "Campus gallery image"}
              className="max-w-full max-h-[78vh]
                         w-auto h-auto
                         object-contain rounded-lg"
            />

            <figcaption className="text-white/80 text-sm mt-5 text-center">
              {activeImage.alt || "Campus Gallery"}
              <span className="mx-2">•</span>
              {activeIndex + 1} / {images.length}
            </figcaption>
          </figure>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              moveLightbox(1);
            }}
            aria-label="Next enlarged image"
            className="absolute right-2 md:right-6
                       top-1/2 -translate-y-1/2 z-20
                       w-11 h-11 rounded-full
                       bg-white/15 text-white
                       hover:bg-white/30
                       flex items-center justify-center
                       transition-colors"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </>
  );
}

export default function CampusPage() {
  const navigate = useNavigate();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: "Campus & Facilities — The Trium School",
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
                          backgroundColor: "#fcd34d",
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

        {/* ── Campus Image Gallery ─────────────────────────────── */}
        <section className="py-16 md:py-20 bg-muted/20">
          <div className="max-w-6xl mx-auto px-4">
            <FadeUp>
              <div className="text-center mb-10">
                <h2
                  className="text-2xl md:text-3xl font-bold text-primary mb-4"
                  style={{
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {campus.gallery.heading}
                </h2>

                <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                  {campus.gallery.subtitle}
                </p>
              </div>
            </FadeUp>

            <GallerySlider images={campus.gallery.images} />
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
              <p className="text-white/75 whitespace-pre-line text-lg mb-10">
                {campus.cta.body}
              </p>
              <button
                onClick={() => navigate("/admissions")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent font-bold text-sm shadow-xl hover:bg-accent/90 transition-colors"
                style={{
                  backgroundColor: "var(--yellow)",
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
