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
  return <Website>
      <Helmet>
        <title>The Trium School — K–12 School in Nashik</title>
        <meta name="description" content="The Trium School is a K–12 institution in Makhmalabad, Nashik, dedicated to nurturing curious minds and compassionate hearts through inquiry-based education." />
        <meta property="og:image" content="https://triumschool.in/airo-assets/images/pages/home/hero" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://triumschool.in/airo-assets/images/pages/home/hero" />
      </Helmet>
      <HomepageSameAsJsonLd />
      <ScrollRestoration />
      <Header />
      {children}
      <Footer />
    </Website>;
}
