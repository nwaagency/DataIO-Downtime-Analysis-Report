import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

const ServicesPage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const target = document.getElementById(id);
    if (!target) return;

    // Offset for the fixed nav; slight timeout lets layout settle.
    const scrollToTarget = () => {
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    const timeout = window.setTimeout(scrollToTarget, 80);
    return () => window.clearTimeout(timeout);
  }, [hash]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
