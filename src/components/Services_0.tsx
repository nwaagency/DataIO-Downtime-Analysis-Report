import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import FloatingBlueprintLines from "@/components/FloatingBlueprintLines";
import cncImage from "@/assets/cnc-milling.jpg";
import roboticsImage from "@/assets/Product_Development.jpg";
import pneumaticsImage from "@/assets/pneumatics.jpg";
import ultrasonicImage from "@/assets/ultrasonic-welding.jpg";
import cadImage from "@/assets/cad-design.jpg";
import camImage from "@/assets/cam-manufacturing.jpg";
import pneumaticsPhoto from "@/assets/IMG_0540.jpg";
import { ScrollAnimationWrapper } from "@/hooks/use-scroll-animation";
import SectionHeading from "@/components/SectionHeading";
import blueBackground from "@/assets/Blue Background.png";
import metalGearNoBg from "@/assets/metalGearnoBG.png";

import CNC_machine from "@/assets/machine_blue_strong.jpg"

import cncCoverImage from "@/assets/cnc_coverImage.png";
import cncImg1 from "@/assets/Services/CNC/CNC_injection_molding_yellow.jpg";
import cncImg2 from "@/assets/Services/CNC/threading_smooth.jpg";
import cncImg3 from "@/assets/Services/CNC/CNC-machine.jpeg";
import cncVideo from "@/assets/DSC_2714.mp4";

const Services = () => {
  const cncGallery = useMemo(
    () => [
      { type: "video" as const, src: cncVideo, label: "Process Video" },
      { type: "image" as const, src: cncImg1 },
      { type: "image" as const, src: cncImg2 },
      { type: "image" as const, src: cncImg3 },
    ],
    [],
  );

  const [featuredType, setFeaturedType] = useState<"video" | "image">("video");
  const [featuredImage, setFeaturedImage] = useState(cncGallery.find((item) => item.type === "image")?.src || cncImage);
  const [, startTransition] = useTransition();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleSelect = (item: { type: "video" | "image"; src: string }) => {
    if (item.type === "video") {
      setFeaturedType("video");
    } else {
      setFeaturedType("image");
      setFeaturedImage(item.src);
    }
  };

  const processProfiles = useMemo(
    () => [
      {
        key: "product-dev",
        title: "Product Development",
        description:
          "We can design, prototype and develop unique products for you. We coordinate vendors, build and control. You'll get a system that is testable and clearly documented, ready for the next revision.",
        image: roboticsImage,
      },
      {
        key: "cnc",
        title: "CNC Manufacturing",
        description:
          "Our 4-axis CNC machine allows us to rapidly prototype your system, creating unique and durable parts.",
        image: cncImage,
      },
      {
        key: "ultrasonic",
        title: "Ultrasonic Welding",
        description:
          "We tune horns, fixtures, and energy directors so joints land cleanly without scorching or flash. Plastics, thin metals, and hybrids are fair game; we prototype weld schedules quickly, then lock them down once parts stop moving. We design nests that actually support your geometry and include go/no-go checks so operators can trust the result. If something shifts on your line, we’ll retune amplitudes and pressure instead of asking for new tooling.",
        image: ultrasonicImage,
      },
      {
        key: "cad",
        title: "CAD Design",
        description:
          "Solid CAD that survives handoff: clean assemblies, named features, and drawings with tolerances your machinist won’t roll their eyes at. We tidy imported models, resolve interferences, and set up exploded views and BOMs that make sense. Need change control? We version thoughtfully and document why a dimension moved. We also think about fixturing, fasteners, and access early so the downstream work—machining, welding, wiring—goes smoother. We’ll package PDFs, STEP, and callouts the shop actually needs.",
        image: cadImage,
      },
      {
        key: "cam",
        title: "CAM Manufacturing",
        description:
          "We program like we have to run the job ourselves: verified posts, safe retracts, and simulations to catch dumb crashes. Feeds and speeds are tuned to your machine, holders, and coolant—not just a spreadsheet. We balance cycle time with tool life and keep surface finish in mind. We share setups, offsets, and fixture notes so your operator isn’t guessing, and we stay close for tweaks when parts hit the table.",
        image: camImage,
      },
      {
        key: "pneumatics",
        title: "Pneumatics",
        description:
          "We size valves, cylinders, and flow paths so motion is consistent and safe, not just fast. We design manifolds and routing that keep leaks down and maintenance sane, with clear labeling and service access. Sensors, regulators, and exhaust are placed deliberately so cycles repeat without hammering your hardware. If you need controls or interlocks, we can integrate them and prove the sequence on a bench rig before you commit to production.",
        image: pneumaticsPhoto,
      },
    ],
    [],
  );

  const [activeProcessKey, setActiveProcessKey] = useState(processProfiles[0].key);
  const activeProcess = processProfiles.find((p) => p.key === activeProcessKey) ?? processProfiles[0];

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (featuredType === "video" && videoRef.current) {
      const vid = videoRef.current;
      vid.pause();
      vid.currentTime = 0;
      vid.load();
      vid.play().catch(() => {
        window.setTimeout(() => vid.play().catch(() => undefined), 120);
      });
    }

    // Preload process hero images so switching tabs does not wait on decode.
    const sources = Array.from(new Set(processProfiles.map((process) => process.image)));
    const timeoutId = window.setTimeout(() => {
      sources.forEach((src) => {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
        img.decode?.().catch(() => undefined);
      });
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [processProfiles, featuredType]);

  return (
    <section id="services" className="bg-white relative">
      <FloatingBlueprintLines className="z-[1]" opacity={0.05} />

      <div className="relative overflow-hidden bg-background text-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${blueBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute -left-10 -top-10 md:-left-14 md:-top-16 lg:-left-20 lg:-top-20 opacity-70 pointer-events-none select-none">
          <motion.img
            src={metalGearNoBg}
            alt="Metal gear accent"
            className="h-48 w-auto md:h-64 lg:h-80 xl:h-96 object-contain drop-shadow-2xl"
            initial={{ opacity: 0, y: -24, scale: 0.95, rotate: -6 }}
            animate={{ opacity: 1, y: [-6, 0, -6], rotate: [-2, 2, -2], scale: 1 }}
            transition={{
              opacity: { duration: 0.8, ease: "easeOut", delay: 0.3 },
              y: { duration: 6.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 0.85 },
              rotate: { duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 0.85 },
              scale: { duration: 0.9, ease: "easeOut", delay: 0.3 },
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f3f]/95 via-[#12356b]/90 to-[#0c1f3f]/96" />
        <div className="container mx-auto px-4 relative z-10 py-12 md:py-16 lg:py-18 min-h-[240px] flex flex-col items-center justify-center text-center">
          <SectionHeading
            title="Services"
            description="Product Development and CNC Solutions."
            align="center"
            variant="light"
          />
        </div>
      </div>

      <div className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 blueprint-pattern opacity-[0.025]" aria-hidden="true" />

        <div className="relative z-10 space-y-0 pt-0 pb-0 md:pt-0 md:pb-0">
          {/* CNC feature block */}
          <ScrollAnimationWrapper>
            <div id="cnc" className="relative overflow-hidden bg-white/80 border-y border-primary/10 shadow-none py-10 md:py-12 lg:py-14">
              <div className="container w-full px-4 max-w-6xl">
                <div className="text-center mb-10">
                  <SectionHeading
                    title="CNC Manufacturing"
                    description="4-axis precision machining."
                  />
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                  <div className="space-y-5 h-full">
                    <div>
                      <h3 className="text-2xl font-bold text-muted-foreground mb-2">
                        Contact us with your design or idea!
                        </h3>
                    </div>
                    <ul className="space-y-3 text-muted-foreground text-lg">
                      <li className="flex gap-3 items-baseline">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
                        <span>Multi-material: aluminum, steels, engineering plastics, and other composites.</span>
                      </li>
                      <li className="flex gap-3 items-baseline">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
                        <span>Complex geometries.</span>
                      </li>
                      <li className="flex gap-3 items-baseline">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
                        <span>Micron-level accuracy.</span>
                      </li>
                    </ul>
                    <div>
                      <h3 className="text-lg font-bold text-muted-foreground mb-2">4-axis CNC (Computer Numerical Control):</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        The 4th axis allows for rotation of the part whilst moving the cutting tool in the x-y-z plane relative to the part.
                      </p>
                    </div>
                  </div>

                  <div className="relative w-full max-w-[520px] mx-auto aspect-[7/5]">
                    <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-2xl -z-10" aria-hidden="true" />
                    <div className="relative h-full rounded-2xl overflow-hidden border border-primary/20 shadow-[0_12px_36px_rgba(0,38,97,0.14)] bg-white">
                      {featuredType === "video" ? (
                        <video
                          key="cnc-video"
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          src={cncGallery[0].src}
                          poster={cncCoverImage}
                          preload="auto"
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls={false}
                          aria-label="CNC process video"
                          onCanPlay={() => {
                            if (videoRef.current && featuredType === "video") {
                              videoRef.current.play().catch(() => undefined);
                            }
                          }}
                          onLoadedData={() => {
                            if (videoRef.current) {
                              videoRef.current
                                .play()
                                .catch(() => undefined);
                            }
                          }}
                        />
                      ) : (
                        <img
                          key={featuredImage}
                          src={featuredImage}
                          alt="CNC highlight"
                          className="w-full h-full object-cover"
                          decoding="async"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="max-w-5xl mx-auto px-2 sm:px-4">
                    <div className="overflow-x-auto scrollbar-hide min-[1094px]:overflow-visible">
                      <div className="flex flex-nowrap w-max gap-2.5 sm:gap-3.5 min-[1094px]:w-auto min-[1094px]:flex-wrap min-[1094px]:justify-center">
                        {cncGallery.map((item, idx) => {
                          const active = (item.type === "video" && featuredType === "video") || (item.type === "image" && featuredImage === item.src);
                          return (
                            <button
                              key={`${item.type}-${idx}`}
                              onClick={() => handleSelect(item)}
                              className={`relative w-28 h-20 sm:w-32 sm:h-[5.5rem] md:w-36 md:h-24 overflow-hidden rounded-2xl border transition ${
                                active ? "border-primary ring-2 ring-primary/60" : "border-slate-200"
                              }`}
                            >
                              {item.type === "video" ? (
                                <>
                                <img
                                  src={cncCoverImage}
                                  alt="CNC video"
                                  className="h-full w-full object-cover opacity-90"
                                  loading="lazy"
                                  decoding="async"
                                />
                                  <div className="absolute inset-0 bg-black/35" />
                                  <Play className="absolute inset-0 m-auto text-white drop-shadow" size={28} />
                                  <span className="absolute bottom-2 left-2 text-[11px] font-semibold text-white">Video</span>
                                </>
                              ) : (
                                <img
                                  src={item.src}
                                  alt="CNC gallery item"
                                  className="h-full w-full object-cover transition duration-200 ease-out hover:scale-[1.04]"
                                  decoding="async"
                                  loading="lazy"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-lg px-6 py-3 text-base font-semibold bg-primary text-white border border-transparent hover:bg-primary/90 transition-colors"
                  >
                    <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                      Get a quote
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>

          {/* Project Development combinational block */}
          <ScrollAnimationWrapper delay={80}>
          <div id="product-development" className="relative overflow-hidden bg-[hsl(var(--primary))] text-white border-y border-primary/30 shadow-none py-10 md:py-12 lg:py-14 space-y-8">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute right-[-10%] top-10 h-52 w-52 rounded-full bg-white/6 blur-3xl" />
              <div className="absolute inset-0 blueprint-pattern opacity-[0.08]" />
            </div>

            <div className="container mx-auto px-4 max-w-6xl space-y-8 relative z-[1]">
              <div className="text-center">
                <SectionHeading
                  title="Product Development"
                  description="Enhance your business or life by choosing us to build your automated system."
                  variant="light"
                  className="mb-2"
                />
              </div>

              {/* Selector menu under heading, single row wrap */}
              <div className="relative z-[1]">
                <div className="flex flex-wrap justify-center gap-2.5 sm:gap-2.5 md:gap-3 w-full max-w-[360px] sm:max-w-[520px] md:max-w-4xl lg:max-w-5xl mx-auto md:grid md:grid-cols-3 md:justify-items-center md:content-center lg:flex lg:flex-nowrap">
                  {processProfiles.map((process) => {
                    const isActive = process.key === activeProcessKey;
                    return (
                      <button
                        key={process.key}
                        onClick={() => startTransition(() => setActiveProcessKey(process.key))}
                        className={`group w-36 sm:w-40 md:w-40 lg:w-40 xl:w-44 min-h-[68px] sm:min-h-[74px] flex items-center gap-2.5 sm:gap-2.5 px-2.5 sm:px-3 py-2 focus:outline-none transition-all duration-300 cursor-pointer rounded-xl border ${
                          isActive
                            ? "bg-white/95 text-primary shadow-lg border-primary/20"
                            : "bg-white/10 text-white/85 border-white/20 hover:bg-white/15 hover:border-white/35"
                        }`}
                        aria-label={process.title}
                      >
                        <div
                          className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden border flex-shrink-0 ${
                            isActive ? "border-primary/30 ring-2 ring-primary/15 bg-white" : "border-white/30 group-hover:border-white/60"
                          } transition-all duration-300`}
                        >
                          <img
                            src={process.image}
                            alt={process.title}
                            className="w-full h-full object-cover"
                            decoding="async"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                        </div>
                        <span
                          className={`text-[10px] sm:text-xs font-semibold leading-snug text-left transition-colors ${
                            isActive ? "text-primary" : "text-white"
                          }`}
                        >
                          {process.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-6 lg:gap-10 lg:grid-cols-2 items-center justify-items-center lg:justify-items-start relative z-[1] mt-2">
                {/* Text block */}
                <div className="text-center lg:text-left space-y-3 max-w-xl h-full flex flex-col justify-center w-full mx-auto">
                  <p className="text-xl font-semibold text-white">{activeProcess.title}</p>
                  <p className="text-white/85 leading-relaxed">{activeProcess.description}</p>
                  <p className="text-white/70 text-sm">Combine it with any other capability to match your build plan.</p>
                </div>

                {/* Active process visual */}
                <div className="flex justify-center lg:justify-end w-full">
                  <div
                    className="relative w-full max-w-[520px] mx-auto aspect-[19/10] rounded-2xl overflow-hidden border border-white/50 shadow-[0_14px_38px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out"
                    key={activeProcess.key}
                  >
                    <img
                      src={activeProcess.image}
                      alt={activeProcess.title}
                      className="w-full h-full object-cover"
                      decoding="async"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                  </div>
                </div>
              </div>

              <div className="text-center relative z-[1]">
                <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    Start Your Project
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
};

export default Services;
