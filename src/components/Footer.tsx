import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

import Branding from "@/assets/Branding_SCE.png"

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-gradient-to-b from-[#1d2a35] via-[#1f2f3c] to-[#223444] text-secondary-foreground py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-pattern opacity-5" />
      {/* Soft overlay keeps the blueprint texture subtle behind content. */}
      <div className="absolute inset-0 bg-[#0f1926]/40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-14">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src={Branding} // Using your existing logo import
                alt="SCE Branding" 
                className="h-auto w-auto" // Adjust height as needed
              />
            </div>
            <p className="text-secondary-foreground/80 text-sm">
              Product Development and CNC Solutions.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 font-mono">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={scrollToTop}
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  onClick={scrollToTop}
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={scrollToTop}
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={scrollToTop}
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 font-mono">SERVICES</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              {["CNC Manufacturing", "Product Development"].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    onClick={scrollToTop}
                    className="hover:text-primary transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 text-center text-sm text-secondary-foreground/60">
          <p>© {new Date().getFullYear()} Southern Composite Engineering. All rights reserved.</p>
          <p className="mt-2 font-mono text-xs"> Delivered by FuzionIQ (Pty) Ltd</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
