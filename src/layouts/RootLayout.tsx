import { Helmet } from "@dr.pogodin/react-helmet";
import { type ReactElement } from "react";
import { ScrollRestoration } from "react-router";
import Footer from "@/layouts/parts/Footer";
import Header from "@/layouts/parts/Header";
import HomepageSameAsJsonLd from "@/components/HomepageSameAsJsonLd";
import Website from "@/layouts/Website";

/**
 * Root layout component that wraps all pages with consistent header and footer.
 *
 * To customize the header or footer, directly edit the Header.tsx and Footer.tsx
 * files in the layouts/parts directory.
 *
 * Site-wide <title> and <meta> live in the <Helmet> below. Individual pages can
 * override them by rendering their own <Helmet> — last-mounted wins.
 */
interface RootLayoutProps {
  children: ReactElement;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Website>
      <Helmet>
        <title>The Trium School — K–12 School in Nashik</title>
        <meta
          name="description"
          content="The Trium School is a K–12 institution in Makhmalabad, Nashik, dedicated to nurturing curious minds and compassionate hearts through inquiry-based education."
        />
        <meta
          property="og:image"
          content="https://triumschool.in/airo-assets/images/pages/home/hero"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://triumschool.in/airo-assets/images/pages/home/hero"
        />
      </Helmet>
      <HomepageSameAsJsonLd />
      <ScrollRestoration />
      <Header />
      {children}
      <section
        aria-label="The Trium School location"
        className="relative w-full"
      >
        <iframe
          title="The Trium School location on Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3747.9904624215037!2d73.76508607519796!3d20.05084222064706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdde924dd2f3ba5%3A0xe69acf61a288460c!2sThe%20Trium%20School!5e0!3m2!1sen!2sin!4v1794297475989!5m2!1sen!2sin"
          className="block h-[550px] w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* <div className="absolute right-12 top-6 max-w-sm rounded-xl bg-white/95 p-5 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-primary">
            The Trium School
          </h2>
          <address className="mt-3 not-italic text-sm leading-relaxed text-foreground/75">
            The Trium School Campus,
            <br />
            Sulewadi Road, Makhmalabad, Nashik
          </address>
          <a
            href="tel:18008898407"
            className="mt-3 block text-sm font-medium text-primary hover:text-accent"
          >
            1800-889-8407
          </a>
          <a
            href="mailto:admissions@triumschool.in"
            className="mt-1 block text-sm font-medium text-primary hover:text-accent"
          >
            admissions@triumschool.in
          </a>
        </div> */}
      </section>
      <Footer />
      <a
        href="/media/Brochure%20Digital%20Version.pdf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View brochure"
        className="fixed right-0 top-1/3 z-50 -translate-y-1/2 rounded-full px-3 py-10 text-sm font-semibold shadow-lg transition-transform hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        style={{ backgroundColor: "var(--yellow)", writingMode: "vertical-rl" }}
      >
        View Brochure
      </a>
    </Website>
  );
}
