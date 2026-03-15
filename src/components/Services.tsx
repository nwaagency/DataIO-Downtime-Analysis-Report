import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import FloatingBlueprintLines from "@/components/FloatingBlueprintLines";
import cncImage from "@/assets/cnc-milling.jpg";
import roboticsImage from "@/assets/Product_Development.jpg";
import cadImage from "@/assets/cad-design.jpg";
import camImage from "@/assets/cam-manufacturing.jpg";
import pneumaticsPhoto from "@/assets/IMG_0540.jpg";
import { ScrollAnimationWrapper } from "@/hooks/use-scroll-animation";
import SectionHeading from "@/components/SectionHeading";
import blueBackground from "@/assets/Blue Background.png";


import CNC_machine from "@/assets/machine_blue_strong.jpg"


import cncImg1 from "@/assets/Services/CNC/CNC_injection_molding_yellow.jpg";
import cncImg2 from "@/assets/Services/CNC/threading_smooth.jpg";
import cncImg3 from "@/assets/Services/CNC/CNC-machine.jpeg";

import cncCoverImage from "@/assets/cnc_coverImage.png";
import cncCoverImage1 from "@/assets/Services/CNC/Tool_Change_Cover.png";

import cncVideo from "@/assets/DSC_2714.mp4";
import cncVideo1 from "@/assets/Services/CNC/SS_CNC_tool_change_edited.mp4";

// Import product development assets

import productDevImg1 from "@/assets/Services/ProductDev/Drill_Head.jpg";
import productDevImg2 from "@/assets/Services/ProductDev/Skispot top view.png";
import productDevImg3 from "@/assets/Services/ProductDev/Product_Development.jpg";
import productDevImg4 from "@/assets/Services/ProductDev/Gibbon_In_Action.png";

import productDevCoverImage from "@/assets/Services/ProductDev/Sorting_System_Cover.png";
import productDevCoverImage2 from "@/assets/Services/ProductDev/Robot_Studio_Cover.png";
import productDevVideo from "@/assets/Services/ProductDev/Sorting_Machine_Vid.mp4";
import productDevVideo2 from "@/assets/Services/ProductDev/RobotStudio 1-28.mp4";

interface GalleryItem {
  type: "video" | "image";
  src: string;
  label?: string;
  coverImage?: string;
}

const Services = () => {
  const cncGallery = useMemo<GalleryItem[]>(
    () => [
      { type: "video", src: cncVideo, label: "Facing", coverImage: cncCoverImage },
      { type: "video", src: cncVideo1, label: "4th Axis", coverImage: cncCoverImage1 },
      { type: "image", src: cncImg1, label: "Injection Mold" },
      { type: "image", src: cncImg2, label: "Threading" },
      { type: "image", src: cncImg3, label: "CNC Machine" },
    ],
    [],
  );

  const productDevGallery = useMemo<GalleryItem[]>(
    () => [
      { type: "video", src: productDevVideo, label: "Sorting Machine", coverImage: productDevCoverImage },
      { type: "video", src: productDevVideo2, label: "Robot Studio", coverImage: productDevCoverImage2 },
      { type: "image", src: productDevImg1, label: "Prototype Drill Head" },
      { type: "image", src: productDevImg2, label: "Ski Tracking Device" },
      { type: "image", src: productDevImg3, label: "Automated Assembly System" },
      { type: "image", src: productDevImg4, label: "Gutter Cleaner" },
    ],
    [],
  );

  const [cncFeaturedType, setCncFeaturedType] = useState<"video" | "image">("video");
  const [cncFeaturedImage, setCncFeaturedImage] = useState(cncGallery.find((item) => item.type === "image")?.src || cncImage);
  const [activeCncItem, setActiveCncItem] = useState<GalleryItem>(cncGallery[0]);
  
  const [productDevFeaturedType, setProductDevFeaturedType] = useState<"video" | "image">("video");
  const [productDevFeaturedImage, setProductDevFeaturedImage] = useState(productDevGallery.find((item) => item.type === "image")?.src || roboticsImage);
  const [activeProductDevItem, setActiveProductDevItem] = useState<GalleryItem>(productDevGallery[0]);
  
  const [, startTransition] = useTransition();
  const cncVideoRef = useRef<HTMLVideoElement | null>(null);
  const productDevVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleCncSelect = (item: GalleryItem) => {
    setActiveCncItem(item);
    if (item.type === "video") {
      setCncFeaturedType("video");
    } else {
      setCncFeaturedType("image");
      setCncFeaturedImage(item.src);
    }
  };

  const handleProductDevSelect = (item: GalleryItem) => {
    setActiveProductDevItem(item);
    if (item.type === "video") {
      setProductDevFeaturedType("video");
      setProductDevFeaturedImage(item.coverImage || productDevCoverImage);
    } else {
      setProductDevFeaturedType("image");
      setProductDevFeaturedImage(item.src);
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

    if (cncFeaturedType === "video" && cncVideoRef.current) {
      const vid = cncVideoRef.current;
      vid.pause();
      vid.currentTime = 0;
      vid.load();
      vid.play().catch(() => {
        window.setTimeout(() => vid.play().catch(() => undefined), 120);
      });
    }

    if (productDevFeaturedType === "video" && productDevVideoRef.current) {
      const vid = productDevVideoRef.current;
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
  }, [processProfiles, cncFeaturedType, productDevFeaturedType, activeCncItem, activeProductDevItem]);

  return (
    <section id="services" className="bg-white relative">
      <FloatingBlueprintLines className="z-[1]" opacity={0.05} />

      <div className="relative overflow-hidden bg-background text-white h-[180px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${blueBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f3f]/95 via-[#12356b]/90 to-[#0c1f3f]/96" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <SectionHeading
              title="Services"
              description="Product Development and CNC Solutions."
              align="center"
              variant="light"
              className="!-mb-5" // This overrides the bottom margin
            />
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 blueprint-pattern opacity-[0.025]" aria-hidden="true" />

        <div className="relative z-10 space-y-0 pt-0 pb-0 md:pt-0 md:pb-0">
          {/* CNC feature block */}
          <ScrollAnimationWrapper>
            <div id="cnc" className="relative overflow-hidden bg-white/80 border-y border-primary/10 shadow-none py-12 md:py-12 lg:py-12">
              <div className="container w-full px-4 max-w-6xl">
                <div className="text-left mb-6">
                  <SectionHeading
                    title="CNC Manufacturing"
                    className="!mb-0" // Override the default bottom margin
                  />
                </div>
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                  <div className="space-y-1]5 h-full">
                    <div>
                      <h3 className="text-2xl font-bold text-muted-foreground mb-2">
                        Contact us with your design or idea!
                        </h3>
                    </div>
                    <ul className="space-y-3 text-muted-foreground text-lg mb-2">
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
                      <li className="flex gap-3 items-baseline">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
                        <span>4th Axis CNC.</span>
                      </li>
                    </ul>
                    <div>              
                      <p className="text-lg text-muted-foreground leading-relaxed mb-2">
                        The 4th axis allows for rotation of the part whilst moving the cutting tool in the x-y-z plane relative to the part.
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        CNC stands for Computer Numerical Control, this allows for precise manufacturing.
                      </p>
                    </div>
                  </div>

                  <div className="relative w-full max-w-[520px] mx-auto aspect-[7/5]">
                    <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-2xl -z-10" aria-hidden="true" />
                    <div className="relative h-full rounded-2xl overflow-hidden border border-primary/20 shadow-[0_12px_36px_rgba(0,38,97,0.14)] bg-white">
                      {/*label div !!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                      <div className="absolute left-4 top-4 z-10 rounded-2xl bg-black/35 text-white text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                        {activeCncItem.label}
                      </div>
                      {cncFeaturedType === "video" ? (
                        <video
                          key={`cnc-video-${activeCncItem.src}`}
                          ref={cncVideoRef}
                          className="w-full h-full object-cover"
                          src={activeCncItem.src}
                          poster={activeCncItem.coverImage}
                          preload="auto"
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls={false}
                          aria-label="CNC process video"
                          onCanPlay={() => {
                            if (cncVideoRef.current && cncFeaturedType === "video") {
                              cncVideoRef.current.play().catch(() => undefined);
                            }
                          }}
                          onLoadedData={() => {
                            if (cncVideoRef.current) {
                              cncVideoRef.current
                                .play()
                                .catch(() => undefined);
                            }
                          }}
                        />
                      ) : (
                        <img
                          key={cncFeaturedImage}
                          src={cncFeaturedImage}
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
                          const active = (item.type === "video" && cncFeaturedType === "video" && activeCncItem.src === item.src) || 
                                        (item.type === "image" && cncFeaturedImage === item.src);
                          return (
                            <button
                              key={`${item.type}-${idx}`}
                              onClick={() => handleCncSelect(item)}
                              className={`relative w-28 h-20 sm:w-32 sm:h-[5.5rem] md:w-36 md:h-24 overflow-hidden rounded-2xl border transition ${
                                active ? "border-primary ring-2 ring-primary/60" : "border-slate-200"
                              }`}
                            >
                              {item.type === "video" ? (
                                <>
                                <img
                                  src={item.coverImage || cncCoverImage}
                                  alt={item.label || "CNC video"}
                                  className="h-full w-full object-cover opacity-90"
                                  loading="lazy"
                                  decoding="async"
                                />
                                  <div className="absolute inset-0 bg-black/35" />
                                  <Play className="absolute inset-0 m-auto text-white drop-shadow" size={28} />
                                  <span className="absolute bottom-2 left-2 text-[11px] font-semibold text-white">{item.label || "Video"}</span>
                                </>
                              ) : (
                                <img
                                  src={item.src}
                                  alt={item.label || "CNC gallery item"}
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

          {/* Product Development block - Replica of CNC section with all three videos */}
          <ScrollAnimationWrapper delay={80}>
            <div id="product-development" className="relative overflow-hidden bg-primary border-y border-primary/10 shadow-none py-10 md:py-12 lg:py-14">
              {/* Add the decorative elements for depth */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute right-[-10%] top-10 h-52 w-52 rounded-full bg-white/6 blur-3xl" />
                <div className="absolute inset-0 blueprint-pattern opacity-[0.08]" />
              </div>
              
              <div className="container w-full px-4 max-w-6xl relative z-10">
                <div className="text-center mb-6">
                  <SectionHeading
                    title="Product Development"
                    className="!mb-0" // Override the default bottom margin
                    variant="light"
                  />
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                  <div className="space-y-5 h-full">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Automate your system with our engineering expertise!
                      </h3>
                    </div>
                    <ul className="space-y-3 text-white text-lg">
                      <li className="flex gap-3 items-baseline">
                        <span className="h-2.5 w-2.5 rounded-full bg-white flex-shrink-0" />
                        <span>Computer aided design and manufacturing (CAD and CAM)</span>
                      </li>
                      <li className="flex gap-3 items-baseline">
                        <span className="h-2.5 w-2.5 rounded-full bg-white flex-shrink-0" />
                        <span>Rapid prototyping and iterative design.</span>
                      </li>
                      <li className="flex gap-3 items-baseline">
                        <span className="h-2.5 w-2.5 rounded-full bg-white flex-shrink-0" />
                        <span>Vendor coordination and quality control.</span>
                      </li>
                    </ul>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Competencies:</h3>
                      <p className="text-white leading-relaxed text-lg">
                        Robotics, Pneumatics, Ultrasonic Welding, 3d printing and more!
                      </p>
                    </div>
                  </div>

                  <div className="relative w-full max-w-[520px] mx-auto aspect-[7/5]">
                    <div className="absolute inset-0 rounded-2xl bg-white/20 blur-2xl -z-10" aria-hidden="true" />
                    <div className="relative h-full rounded-2xl overflow-hidden border border-white/30 shadow-[0_12px_36px_rgba(0,38,97,0.14)] bg-white">
                      {/*label div !!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                      <div className="absolute left-4 top-4 z-10 rounded-2xl bg-black/35 text-white text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                        {activeProductDevItem.label}
                      </div>
                      
                      {productDevFeaturedType === "video" ? (
                        <video
                          key={`product-dev-video-${activeProductDevItem.src}`}
                          ref={productDevVideoRef}
                          className="w-full h-full object-cover"
                          src={activeProductDevItem.src}
                          poster={activeProductDevItem.coverImage}
                          preload="auto"
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls={false}
                          aria-label={activeProductDevItem.label || "Product development process video"}
                          onCanPlay={() => {
                            if (productDevVideoRef.current && productDevFeaturedType === "video") {
                              productDevVideoRef.current.play().catch(() => undefined);
                            }
                          }}
                          onLoadedData={() => {
                            if (productDevVideoRef.current) {
                              productDevVideoRef.current
                                .play()
                                .catch(() => undefined);
                            }
                          }}
                        />
                      ) : (
                        <img
                          key={productDevFeaturedImage}
                          src={productDevFeaturedImage}
                          alt="Product development highlight"
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
                        {productDevGallery.map((item, idx) => {
                          const active = (item.type === "video" && productDevFeaturedType === "video" && activeProductDevItem.src === item.src) || 
                                        (item.type === "image" && productDevFeaturedImage === item.src);
                          return (
                            <button
                              key={`${item.type}-${idx}`}
                              onClick={() => handleProductDevSelect(item)}
                              className={`relative w-28 h-20 sm:w-32 sm:h-[5.5rem] md:w-36 md:h-24 overflow-hidden rounded-2xl border transition ${
                                active ? "border-white ring-2 ring-white/60" : "border-white/30"
                              }`}
                            >
                              {item.type === "video" ? (
                                <>
                                  <img
                                    src={item.coverImage || productDevCoverImage}
                                    alt={item.label || "Product development video"}
                                    className="h-full w-full object-cover opacity-90"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                  <div className="absolute inset-0 bg-black/35" />
                                  <Play className="absolute inset-0 m-auto text-white drop-shadow" size={28} />
                                  <span className="absolute bottom-2 left-2 text-[11px] font-semibold text-white">
                                    {item.label || "Video"}
                                  </span>
                                </>
                              ) : (
                                <img
                                  src={item.src}
                                  alt={item.label || "Product development gallery item"}
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
                    className="rounded-lg px-6 py-3 text-base font-semibold bg-white text-primary border border-transparent hover:bg-white/90 transition-colors"
                  >
                    <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                      Start your project
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