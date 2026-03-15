import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

// Import your logo image
import SCEngineeringBranding from "@/assets/Branding_SCE.png"; // Adjust this path to match your actual logo file

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const location = useLocation();
  const isOffHome = location.pathname !== "/";
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
  ];

  const isHeroTop = !isScrolled && !isOffHome && !isMobileMenuOpen;
  const navBackgroundClass = "bg-background border-b border-border";
  const navTextClass = "text-foreground text-xl";
  const navHoverClass = "hover:text-primary";
  const brandAccentClass = "text-primary";
  const safeAreaBackground = "bg-background";

  useEffect(() => {
    // Track scroll to darken navbar and apply shadow once the user moves down the page.
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Treat widths below 858px as "mobile" to keep the hamburger menu and avoid nav crowding on mid-sized tablets.
      setIsMobileViewport(window.innerWidth < 1250);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Lock page scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackgroundClass}`}
      aria-label="Main navigation"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {/* <div
        className={`absolute top-0 left-0 right-0 h-[max(env(safe-area-inset-top),0px)] ${safeAreaBackground} pointer-events-none`}
      /> */}
      <div className="w-full px-4 md:px-4 lg:px-4 py-4 md:py-4 lg:py-4">
        <div className="flex items-center justify-between h-[clamp(50px,10vw,80px)] transition-all duration-300">
          <Link to="/" className="flex items-center space-x-2 lg:pl-0" onClick={scrollToTop}>
            {/* Replaced text heading with image logo */}
            <img 
              src={SCEngineeringBranding}
              alt="SC Engineering"
              className="w-auto object-contain transition-all duration-300"
              style={{ height: 'clamp(72px, 8vw, 80px)' }}
            />
          </Link>

          <div className="flex-1 min-w-[32px] md:min-w-[48px] lg:min-w-[64px]" />

          {/* Desktop Navigation (only when ample width) */}
          {!isMobileViewport && (
            <div className="flex items-center gap-8 lg:pr-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                const activeUnderline = "after:bg-primary";
                const inactiveUnderline = "after:bg-primary/70";
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    aria-current={isActive ? "page" : undefined}
                    onClick={scrollToTop}
                    className={`${navTextClass} ${navHoverClass} transition-colors font-medium transform-gpu hover:scale-[1.05] relative after:block after:h-[2px] after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 px-2 py-1 rounded-md ${
                      isActive ? `font-semibold after:scale-x-100 ${activeUnderline}` : inactiveUnderline
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button asChild variant="default" size="lg">
                <Link to="/contact" className={navTextClass}>Contact</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button (shows at <=857px) */}
          <button
            className={`${isMobileViewport ? navTextClass : "hidden"}`}
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            className="pt-6 pb-4 px-4 space-y-1 relative z-50 overflow-hidden bg-transparent mobile-menu-panel"
          >
            {navLinks.map((link, idx) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={location.pathname === link.to ? "page" : undefined}
                onClick={() => {
                  scrollToTop();
                  closeMobileMenu();
                }}
                className={`block w-full text-left transition-colors font-medium py-5 text-lg border-b border-border/30 last:border-b-0 ${
                  location.pathname === link.to
                    ? "text-primary font-semibold underline decoration-2"
                    : "text-foreground hover:text-primary"
                }`}
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              aria-current={location.pathname === "/contact" ? "page" : undefined}
              onClick={() => {
                scrollToTop();
                closeMobileMenu();
              }}
              className={`block w-full text-left transition-colors font-medium py-5 text-lg border-b border-border/30 ${
                location.pathname === "/contact"
                  ? "text-primary font-semibold underline decoration-2"
                  : "text-foreground hover:text-primary"
              }`}
              style={{ animationDelay: `${navLinks.length * 70}ms` }}
            >
              Contact
            </Link>
          </div>
        )}
      </div>

      {/* Mobile overlay to dim/blur background when menu is open (rendered to body to avoid layout constraints) */}
      {isMobileMenuOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/35 backdrop-blur-md z-40"
            onClick={closeMobileMenu}
          />,
          document.body
        )}
    </nav>
  );
};

export default Navigation;