import { Link, useNavigate, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!isHome) return;
      const sections = [
        "hero",
        "academics",
        "about",
        "programs",
        "campus",
        "admissions",
        "contact",
      ];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);
  const scrollTo = (id: string) => {
    if (isHome) {
      const el = document.getElementById(id);
      if (el)
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    } else {
      navigate(`/#${id}`);
    }
    setIsMobileMenuOpen(false);
  };
  const goToAdmissions = () => {
    navigate("/admissions");
    setIsMobileMenuOpen(false);
  };
  const goToPage = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };
  const navItems = [
    {
      id: "hero",
      label: "Home",
      action: () => scrollTo("hero"),
    },
    {
      id: "about",
      label: "About",
      action: () => goToPage("/about"),
    },
    {
      id: "academics",
      label: "Academics",
      action: () => goToPage("/academics"),
    },
    {
      id: "admissions",
      label: "Admissions",
      action: goToAdmissions,
    },
    {
      id: "campus",
      label: "Campus",
      action: () => goToPage("/campus"),
    },
    {
      id: "contact",
      label: "Contact",
      action: () => goToPage("/contact"),
    },
  ];
  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-primary text-primary-foreground text-xs py-2">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <span className="opacity-90">
            Admissions Open for 2027–28 — Enquire Today
          </span>
          <div className="flex items-center gap-4 opacity-90">
            <a
              href="tel:+919999999999"
              className="flex items-center gap-1 hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +91 7588804351
            </a>
            <span>|</span>
            <a
              href="mailto:admissions@triumschool.in"
              className="hover:opacity-100 transition-opacity"
            >
              connect@triumschool.in
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border" : "bg-white border-b border-border/50"}`}
      >
        <div className="container mx-auto px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src="/airo-assets/images/layouts/header/the-trium-school"
                alt="The Trium School"
                className="h-14 w-auto object-contain shrink-0"
              />
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navItems.map((item) => {
                const isActive = isHome
                  ? activeSection === item.id
                  : location.pathname === `/${item.id}` ||
                    (item.id === "admissions" &&
                      location.pathname === "/admissions");
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors group ${isActive ? "text-primary" : "text-foreground/70 hover:text-primary"}`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent rounded-full transition-all duration-300 ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"}`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={goToAdmissions}
                className="px-5 py-2.5 rounded-full bg-accent text-sm font-semibold hover:bg-accent/90 transition-all duration-200 shadow-sm hover:shadow-md"
                style={{
                  color: "#1a1a1a",
                }}
              >
                Apply Now
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <nav
              className="container mx-auto px-6 py-4 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => {
                const isActive = isHome
                  ? activeSection === item.id
                  : location.pathname === `/${item.id}` ||
                    (item.id === "admissions" &&
                      location.pathname === "/admissions");
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`py-3 px-3 rounded-lg text-sm font-medium text-left transition-colors ${isActive ? "text-primary bg-muted" : "text-foreground/70 hover:text-primary hover:bg-muted"}`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={goToAdmissions}
                className="mt-3 py-3 px-3 rounded-full bg-accent text-center text-sm font-semibold transition-colors"
                style={{
                  color: "#1a1a1a",
                }}
              >
                Apply Now
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
