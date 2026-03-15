import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cog, Cpu, Layers, Wrench, ShieldCheck, Sparkles, Gauge, Ruler, PenTool, Award, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useAnimation, useInView } from "framer-motion";
import { ScrollAnimationWrapper } from "@/hooks/use-scroll-animation";
import cncImage from "@assets/cnc-milling.jpg";
//fix this code
import cadImage from "@assets/Slide_Show/SS_Drill_Head.jpg";
import skiSpotImage from "@assets/Skispot_Gen.png";
import armGenImage from "@assets/Arm_Gen.png";
import cncVideo from "@assets/DSC_2714.mov";
import machineBlueprint from "@assets/machine_blue_strong.jpg";
import SectionHeading from "@/components/SectionHeading";
import FloatingBlueprintLines from "@/components/FloatingBlueprintLines";
import icon_Gear from "@assets/icon_Gear.png";
import icon_Spanner from "@assets/icon_Spanner.png";


const Index = () => {
  const projectReels = [
    {
      title: "The Gibbon",
      blurb: "Easily guided gutter cleaner that rides the edge, blasting debris clear with a lightweight leaf-blower attachment.",
      video: "/videos/TheGibbonTrimmed.mp4",
      accent: "from-primary/60 via-background/40 to-background/80",
      slug: "gibbon"
    },
    {
      title: "SkiSpot",
      blurb: "Ski tracker to find your skis in deep snow, using BLE (Bluetooth Low Energy).",
      video: "/videos/SkiSpot_Edited_Fr.mp4",
      accent: "from-secondary/60 via-background/40 to-background/80",
      slug: "skispot"
    }
  ];

   const pageRef = useRef<HTMLDivElement | null>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const timerRef = useRef<number | null>(null);

  const resetTimer = () => {
    // Clear existing timer
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    // Start new timer
    timerRef.current = window.setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projectReels.length);
    }, 13500);
  };

  const next = () => {
    setCurrentProject((prev) => (prev + 1) % projectReels.length);
    resetTimer();
  };

  const prev = () => {
    setCurrentProject((prev) => (prev - 1 + projectReels.length) % projectReels.length);
    resetTimer();
  };

  const active = projectReels[currentProject];

  // Initial timer setup
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [projectReels.length]); // Add projectReels.length as dependency


  // useEffect(() => {
  //   const id = window.setInterval(() => {
  //     setCurrentProject((prev) => (prev + 1) % projectReels.length);
  //   }, 12000); // slower cycle to reduce flicker
  //   return () => window.clearInterval(id);
  // }, [projectReels.length]);

  const projectHeadingRef = useRef<HTMLDivElement | null>(null);
  const projectHeadingControls = useAnimation();
  const projectHeadingInView = useInView(projectHeadingRef, { amount: 0.35 });

  useEffect(() => {
    projectHeadingControls.start(projectHeadingInView ? "visible" : "hidden");
  }, [projectHeadingControls, projectHeadingInView]);

  // Simple once-only reveal for the services grid
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [cncAnimated, setCncAnimated] = useState(true);
  const [productAnimated, setProductAnimated] = useState(true);
  const cncCardRef = useRef<HTMLDivElement>(null);
  const productCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = servicesGridRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setServicesVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsDesktop(typeof window !== "undefined" && window.innerWidth >= 769);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop-only once-per-load animation for the two large cards.
  useEffect(() => {
    if (!isDesktop) {
      setCncAnimated(true);
      setProductAnimated(true);
      return;
    }
    setCncAnimated(false);
    setProductAnimated(false);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === cncCardRef.current) setCncAnimated(true);
            if (entry.target === productCardRef.current) setProductAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    if (cncCardRef.current) observer.observe(cncCardRef.current);
    if (productCardRef.current) observer.observe(productCardRef.current);
    return () => observer.disconnect();
  }, [isDesktop]);

  const glintKeyframes = `
    @keyframes glint {
      0% { transform: translateX(-120%); opacity: 0; }
      50% { opacity: 0.35; }
      100% { transform: translateX(140%); opacity: 0; }
    }
  `;

  return (
    <div ref={pageRef} className="min-h-screen bg-background text-foreground relative overflow-hidden pt-[80px] sm:pt-[82px] md:pt-[110px] lg:pt-[110px]">
      <style>{glintKeyframes}</style>
      <Navigation />
      <Hero />
      
      
      {/* Services Preview Section */}
      <ScrollAnimationWrapper>
        <section id="services" className="py-16 md:py-24 relative overflow-hidden bg-muted/30">
          <div className="absolute inset-0 blueprint-pattern opacity-[0.07] pointer-events-none" />
          <div className="absolute inset-0 bg-white/70 pointer-events-none" />
          <div className="absolute inset-0 animate-[float_14s_ease-in-out_infinite_alternate] blueprint-pattern opacity-[0.025] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
          <div className="mb-10 space-y-3 text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Services</h2>
            <div className="h-[3px] w-12 bg-primary/80 rounded-full" />
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
              The capabilities of our workshop.
            </p>
          </div>
          

            <div
              ref={servicesGridRef}
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 auto-rows-[minmax(170px,auto)] lg:auto-rows-[minmax(220px,auto)] transition-all duration-700 ease-out ${
                servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Link
                to="/services#cnc"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 lg:row-span-1 xl:row-span-2 rounded-2xl overflow-hidden border border-primary/20 shadow-lg transition-all duration-300 md:hover:shadow-[0_18px_38px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[320px] sm:min-h-[360px] md:min-h-[380px] active:scale-95"
              >
                <div className="relative h-full" ref={cncCardRef}>
                  {/* Full-bleed image so no band shows behind the overlay */}
                  <img
                    src={cncImage}
                    alt="CNC Manufacturing"
                    className={`absolute inset-0 w-full h-full object-cover object-center md:group-hover:-translate-y-[4px] ${
                      isDesktop
                        ? cncAnimated
                          ? "opacity-100 translate-y-0 transition-transform duration-\\[400ms\\] ease-out"
                          : "opacity-0 translate-y-5"
                        : "opacity-100 translate-y-0"
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 blueprint-pattern opacity-20 pointer-events-none" />
                  {/* Bottom overlay sits on top of the image */}
                  <div
                    className={`absolute inset-x-0 bottom-0 ${
                      isDesktop
                        ? cncAnimated
                          ? "opacity-100 transition-opacity duration-250 ease-out delay-\\[150ms\\]"
                          : "opacity-0"
                        : "opacity-100"
                    }`}
                  >
                    <div className="bg-[#0b1a2d]/80 md:group-hover:bg-[#0b1a2d]/90 p-4 sm:p-5 md:p-6 space-y-3 flex flex-col justify-between min-h-[210px]">
                      <div
                        className={`flex items-center gap-3 ${
                          isDesktop
                            ? cncAnimated
                              ? "opacity-100 translate-y-0 transition-all duration-250 ease-out delay-\\[200ms\\]"
                              : "opacity-0 translate-y-2"
                            : "opacity-100 translate-y-0"
                        }`}
                      >
                        <Cog className="text-primary drop-shadow-[0_0_14px_rgba(30,58,138,0.45)]" size={40} />
                        <h3 className="text-3xl font-bold text-white tracking-tight">CNC Manufacturing</h3>
                      </div>
                      <p className="text-slate-100 leading-relaxed">
                        4-axis precision machining of metal, plastic and other composites with micro metre accuracy.
                      </p>
                      <div className="inline-flex items-center text-white font-semibold text-lg gap-2">
                        <span>Learn More</span>
                        <ArrowRight size={28} className="transition-transform duration-200 md:group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                to="/services#product"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 lg:row-span-1 xl:row-span-2 rounded-2xl overflow-hidden border border-primary/20 shadow-lg transition-all duration-300 md:hover:shadow-[0_18px_38px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[320px] sm:min-h-[360px] md:min-h-[380px] active:scale-95"
              >
                <div className="relative h-full" ref={productCardRef}>
                  {/* Full-bleed image keeps the card background invisible */}
                  <img
                    src={cadImage}
                    alt="Product Development"
                    className={`absolute inset-0 w-full h-full object-cover object-center md:group-hover:-translate-y-[4px] ${
                      isDesktop
                        ? productAnimated
                          ? "opacity-100 translate-y-0 transition-transform duration-\\[400ms\\] ease-out"
                          : "opacity-0 translate-y-5"
                        : "opacity-100 translate-y-0"
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 blueprint-pattern opacity-20 pointer-events-none" />
                  <div
                    className={`absolute inset-x-0 bottom-0 ${
                      isDesktop
                        ? productAnimated
                          ? "opacity-100 transition-opacity duration-250 ease-out delay-\\[150ms\\]"
                          : "opacity-0"
                        : "opacity-100"
                    }`}
                  >
                    <div className="bg-[#0b1a2d]/80 md:group-hover:bg-[#0b1a2d]/90 p-4 sm:p-5 md:p-6 space-y-3 flex flex-col justify-between min-h-[210px]">
                      <div
                        className={`flex items-center gap-3 ${
                          isDesktop
                            ? productAnimated
                              ? "opacity-100 translate-y-0 transition-all duration-250 ease-out delay-\\[200ms\\]"
                              : "opacity-0 translate-y-2"
                            : "opacity-100 translate-y-0"
                        }`}
                      >
                        <Cpu className="text-primary drop-shadow-[0_0_14px_rgba(20,58,138,0.45)]" size={40} />
                        <h3 className="text-3xl font-bold text-white tracking-tight">Product Development</h3>
                      </div>
                      <p className="text-slate-100 leading-relaxed">
                        Computer aided design, rapid prototyping, and development of automated systems.
                      </p>
                      <div className="inline-flex items-center text-white font-semibold text-lg gap-2">
                        <span>Learn More</span>
                        <ArrowRight size={28} className="transition-transform duration-200 md:group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* Projects Preview Section */}
      <ScrollAnimationWrapper delay={100}>
        <section id="projects" className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 md:mb-12">
            <div className="space-y-3 text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Projects</h2>
              <div className="h-[3px] w-12 bg-primary/80 rounded-full" />
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
                A look at our previous projects that we have developed.
              </p>
            </div>
          </div>

          <Card className="bg-transparent border-none shadow-none p-0">
            <div className="relative overflow-hidden rounded-2xl bg-transparent">
              <div className="relative h-[220px] sm:h-[320px] md:h-[560px] w-full rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.title}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <video
                      className="w-full h-full object-cover"
                      src={active.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/45 to-black/75 z-[1] pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute inset-0 flex flex-col md:flex-row items-end md:items-center justify-end md:justify-between px-6 sm:px-10 pb-10 sm:pb-12 md:pb-10 z-[3] pointer-events-none md:pointer-events-auto">
                <div className="max-w-2xl text-white drop-shadow-lg space-y-3 pointer-events-auto">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">{active.title}</h3>
                  <p className="text-sm sm:text-base md:text-base text-white/80 leading-relaxed">{active.blurb}</p>
                  <div className="flex items-center gap-3 pt-1">
                    <Link
                      to={`/projects#${active.slug}`}
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="inline-flex items-center px-4 py-2 text-white border border-white/40 rounded-lg bg-white/5 hover:bg-white/10 transition font-semibold text-lg w-fit"
                    >
                      Learn More
                      <ArrowRight className="ml-2" size={28} />
                    </Link>
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-center gap-4 md:gap-6 self-center md:self-end pointer-events-auto">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/80 text-black hover:bg-white"
                      onClick={prev}
                      aria-label="Previous project"
                    >
                      <ChevronLeft size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/80 text-black hover:bg-white"
                      onClick={next}
                      aria-label="Next project"
                    >
                      <ChevronRight size={20} />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    {projectReels.map((_, index) => (
                      <span
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          currentProject === index
                            ? "bg-white shadow-[0_0_0_6px] shadow-white/15"
                            : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
          {/* Mobile-only navigation bar for projects */}
          <div className="mt-6 flex md:hidden flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white shadow-md shadow-black/20 text-black hover:bg-white w-12 h-12 border border-black/10"
                onClick={prev}
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white shadow-md shadow-black/20 text-black hover:bg-white w-12 h-12 border border-black/10"
                onClick={next}
                aria-label="Next project"
              >
                <ChevronRight size={18} />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              {projectReels.map((_, index) => (
                <span
                  key={index}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    currentProject === index
                      ? "bg-foreground shadow-[0_0_0_5px] shadow-foreground/15"
                      : "bg-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Mobile-only Explore all builds button */}
        <div className="mt-6 md:hidden flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full max-w-xs"
          >
            <Link to="/projects" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Explore all builds
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
      </ScrollAnimationWrapper>

      {/* About Preview Section */}
      <ScrollAnimationWrapper delay={200}>
        <section id="about" className="relative overflow-hidden bg-transparent p-0">
          {/* Blueprint hero background with text/video overlay */}
          <div
            className="relative w-full min-h-screen bg-cover bg-center flex items-center"
            style={{ backgroundImage: `url(${machineBlueprint})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f33]/85 via-[#0a2f55]/65 to-[#0a1f33]/45" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.18),transparent_60%)] pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10 min-h-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative w-full max-w-6xl rounded-2xl overflow-hidden border border-white/15 bg-[rgba(255,255,255,0.06)] backdrop-blur-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/12 via-white/6 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl blueprint-pattern opacity-[0.08] pointer-events-none" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch relative z-10 p-6 sm:p-7 md:p-8">
                  <div className="flex flex-col justify-center space-y-4">
                    <span className="self-start inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] md:text-xs font-semibold tracking-[0.22em] text-white shadow-sm uppercase">
                      Our Story
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">
                      Engineering, building with experience and purpose.
                    </h2>
                    <div className="h-[3px] w-20 bg-white/80 rounded-full" />
                    <p className="text-slate-100 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] max-w-2xl">
                      SCE is a Cape Town based engineering company specialising in product design, prototyping, and precision manufacturing. With over 25 years of hands-on experience, we build practical, reliable, custom solutions for the global market and our valued clients.
                    </p>
                    <div className="pt-1">
                      <Link
                        to="/services"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="inline-flex items-center px-5 py-2.5 text-white border border-white/40 rounded-2xl bg-white/5 hover:bg-white/10 transition"
                      >
                        Explore Our Services
                      </Link>
                    </div>
                  </div>
                  <div className="hidden md:block relative w-full h-full min-h-[260px] md:min-h-[360px] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.15)] shadow-lg bg-black/15 backdrop-blur-sm">
                    <div className="absolute inset-0 rounded-2xl bg-[#0a2f55]/10 mix-blend-color pointer-events-none" />
                    <div className="absolute inset-0 rounded-2xl bg-[#0a1f33]/20 mix-blend-multiply pointer-events-none" />
                    <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.04] bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
                    <div className="absolute left-4 top-4 z-10 rounded-2xl bg-black/35 text-white text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                      CNC Milling · SCE Workshop
                    </div>
                    <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-white/8" />
                    <motion.video
                      src={cncVideo}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="w-full h-full rounded-2xl object-cover object-center brightness-[0.55] mix-blend-soft-light transition-all duration-500 ease-out md:brightness-[0.65]"
                      initial={{ opacity: 0.1, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* Find Us Section with map embed */}
      <ScrollAnimationWrapper delay={300}>
        <section id="contact" className="pt-12 md:pt-14 pb-16 bg-background relative overflow-hidden">
          <div className="absolute inset-0 blueprint-pattern opacity-5" />
          <div className="container mx-auto px-4 relative z-10 flex flex-col gap-8">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Where we’re based</h2>
              <div className="h-[3px] w-12 bg-primary/80 rounded-full mx-auto" />
              <p className="text-muted-foreground leading-relaxed">
                Find us at Prime Park on Mocke Road, Diep River, Cape Town. This is where we build, refine, and engineer solutions in our workshop.
              </p>
            </div>

            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-2xl border border-border/60 w-full h-[320px] md:h-[420px] bg-white"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="absolute inset-0 blueprint-pattern opacity-[0.04] pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/70 via-white/30 to-transparent pointer-events-none" />
              <iframe
                src="https://www.google.com/maps?q=Prime%20Park%20Mocke%20Road%20Diep%20River%20Western%20Cape&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SC Engineering location map"
              />
            </motion.div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      <Footer />
    </div>
  );
};

export default Index;
