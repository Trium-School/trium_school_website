import { Link } from "react-router";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <img
                src="/assets/The-Trium-School-Final-Logo-01.png"
                alt="The Trium School"
                className="h-14 w-auto object-contain shrink-0 brightness-0 invert"
              />
            </Link>
            <p className="text-primary-foreground/75 text-sm leading-relaxed mb-6">
              Nurturing curious minds and compassionate hearts since our
              founding. A K–12 school where every child is empowered to triumph.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent hover:text-foreground flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <SlSocialFacebook size={15} />
              </a>
              <a
                href="https://www.instagram.com/thetriumschool?vrfl=MWZ5ZXlwb3c3eTNwMQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent hover:text-foreground flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <FaInstagram size={15} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent hover:text-foreground flex items-center justify-center transition-all duration-200"
                aria-label="YouTube"
              >
                <CiYoutube size={15} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent hover:text-foreground flex items-center justify-center transition-all duration-200"
                aria-label="Twitter"
              >
                <FaXTwitter size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-5 text-accent">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                {
                  href: "/",
                  label: "Home",
                },
                {
                  href: "/about",
                  label: "About Us",
                },
                {
                  href: "/our-differentiators",
                  label: "Our Differentiators",
                },
                {
                  href: "/academics",
                  label: "Academics",
                },
                {
                  href: "/beyond-academics",
                  label: "Beyond Academics",
                },
                {
                  href: "/admissions",
                  label: "Admissions",
                },
                {
                  href: "/campus",
                  label: "Campus & Facilities",
                },
                {
                  href: "/contact",
                  label: "Contact Us",
                },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-5 text-accent">
              Our Programs
            </h4>
            <ul className="space-y-3">
              {[
                "Early Years (Pre-K)",
                "Primary School (Gr. 1–5)",
                "Secondary School (Gr. 6–10)",
                "Co-Curricular Activities",
                "Sports & Athletics",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-primary-foreground/70 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent/50" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-5 text-accent">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-sm text-primary-foreground/70 leading-relaxed">
                  The Trium School Campus,
                  <br />
                  Sulewadi Road, Makhmalabad, Nashik
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="shrink-0 text-accent" />
                <a
                  href="tel:18008898407"
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  1800-889-8407
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="shrink-0 text-accent" />
                <a
                  href="mailto:admissions@triumschool.in"
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  admissions@triumschool.in
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                to="/admissions"
                className="inline-block px-5 py-2.5 rounded-full bg-accent text-sm font-semibold hover:bg-accent/90 transition-all duration-200"
                style={{ backgroundColor: "var(--yellow)", color: "#1a1a1a" }}
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-primary-foreground/50">
            © {currentYear} The Trium School. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors"
            >
              Terms of Use
            </Link>
            <a
              href="https://triumschool.in"
              className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors"
            >
              triumschool.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
