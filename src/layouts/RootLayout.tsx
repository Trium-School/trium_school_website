import { Helmet } from '@dr.pogodin/react-helmet';
import { type ReactElement } from 'react';
import { ScrollRestoration } from "react-router";
import Footer from '@/layouts/parts/Footer';
import Header from '@/layouts/parts/Header';
import HomepageSameAsJsonLd from '@/components/HomepageSameAsJsonLd';
import Website from '@/layouts/Website';

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
export default function RootLayout({
  children
}: RootLayoutProps) {
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
          src="https://www.google.com/maps?q=20.050451,73.767564&z=15&output=embed"
          className="block h-[550px] w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute left-6 top-6 max-w-sm rounded-xl bg-white/95 p-5 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-primary">
            The Trium School
          </h2>
          <address className="mt-3 not-italic text-sm leading-relaxed text-foreground/75">
            The Trium School Campus,
            <br />
            Sulewadi Road, Makhmalabad, Nashik
          </address>
          <a
            href="tel:+917588804351"
            className="mt-3 block text-sm font-medium text-primary hover:text-accent"
          >
            +91 7588804351
          </a>
          <a
            href="mailto:admissions@triumschool.in"
            className="mt-1 block text-sm font-medium text-primary hover:text-accent"
          >
            connect@triumschool.in
          </a>
        </div>
      </section>
      <Footer />
      <a
        href="/media/Trium%20Print%20Brochure%20_20261021_172237_0000.pdf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View brochure"
        className="fixed right-0 top-1/2 z-50 -translate-y-1/2 rounded-full px-3 py-10 text-sm font-semibold text-foreground shadow-lg transition-transform hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        style={{ backgroundColor: "var(--yellow)", writingMode: "vertical-rl" }}
      >
        View Brochure
      </a>
    </Website>
  );
}
