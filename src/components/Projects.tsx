import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Expand, Maximize2, Minimize2 } from "lucide-react";
import { ScrollAnimationWrapper } from "@/hooks/use-scroll-animation";
import SectionHeading from "@/components/SectionHeading";

type ProjectShowcase = {
  title: string;
  category: string;
  blurb: string;
  video: string;
  image: string;
  technologies: string[];
};

const projects: ProjectShowcase[] = [
  {
    title: "The Gibbon",
    category: "Robotics & Precision Fabrication",
    blurb:
      "Easy to use gutter cleaner, powered with a leaf blower, it rides along gutters and blasts debris clear. No need for a ladder!",
    video: "/videos/TheGibbonTrimmed.mp4",
    image: encodeURI("/photos/gibbon amazon 01.JPG"),
    technologies: ["Pnuematics", "Mechanics"],
  },
  {
    title: "SkiSpot",
    category: "Autonomous Inspection",
    blurb: "Tracking system for snow skis. With a mobile app and a skispot device, find your skis anywhere. This compact and durable device has a range of applications.",
    video: "/videos/SkiSpot_Edited_Fr.mp4",
    image: "/photos/Skispot side view.png",
    technologies: ["Bluetooth Low Energy (BLE)", "Electronics"],
  },
];

const ProjectCard = ({ project, index }: { project: ProjectShowcase; index: number }) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleOverlay = () => setShowOverlay((prev) => !prev);

  const enterFullscreen = async () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }
      
      // Try standard fullscreen API first
      if (videoEl.requestFullscreen) {
        await videoEl.requestFullscreen();
      } 
      // iOS Safari fallback for video elements
      else if ((videoEl as any).webkitEnterFullscreen) {
        (videoEl as any).webkitEnterFullscreen();
      } 
      // Fallback for other browsers
      else if ((videoEl as any).webkitRequestFullscreen) {
        (videoEl as any).webkitRequestFullscreen();
      }
      
      // Force landscape orientation hint on mobile
      if (screen.orientation && screen.orientation.lock) {
        try {
          await screen.orientation.lock('landscape');
        } catch (e) {
          // Orientation lock not supported or failed - that's ok
          console.log('Orientation lock not available');
        }
      }
    } catch (error) {
      console.error("Fullscreen request failed", error);
    }
  };

  // Handle fullscreen change events
  const handleFullscreenChange = () => {
    if (!document.fullscreenElement && videoRef.current) {
      // Optionally unlock orientation when exiting fullscreen
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    }
  };

  // Add event listener for fullscreen changes
  useState(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <Card
      className={`relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_90px_rgba(0,0,0,0.25)] transition-all duration-500 ${
        showOverlay ? "" : "scale-[1.02]"
      }`}
    >
      <style>{`
        /* Fullscreen video styles */
        video:-webkit-full-screen {
          width: 100vw;
          height: 100vh;
          object-fit: contain;
          background-color: black;
        }
        
        video:fullscreen {
          width: 100vw;
          height: 100vh;
          object-fit: contain;
          background-color: black;
        }
        
        /* Ensure video is the only visible element in fullscreen */
        :-webkit-full-screen {
          background-color: black;
        }
        
        :fullscreen {
          background-color: black;
        }
      `}</style>
      
      <div
        className={`relative w-full ${
          showOverlay ? "h-[720px] sm:h-[560px]" : "h-[800px] sm:h-[660px]"
        }`}
      >
        <button
          onClick={toggleOverlay}
          className="absolute right-4 top-4 z-20 hidden md:inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary text-primary-foreground p-2 hover:bg-primary/90 transition"
        >
          {showOverlay ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
        </button>
        <button
          onClick={enterFullscreen}
          className="absolute right-4 top-14 z-20 inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary text-primary-foreground p-2 hover:bg-primary/90 transition md:hidden"
          aria-label="Play fullscreen"
        >
          <Expand size={18} />
        </button>

        <video
          ref={videoRef}
          key={project.title}
          className={`absolute inset-0 h-full w-full transition duration-500 ${
            showOverlay ? "brightness-[0.55] object-cover" : "brightness-100 object-cover"
          }`}
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          controls={!showOverlay}
        />

        {showOverlay && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a2f]/85 via-[#0a1a2f]/70 to-[#0a1a2f]/60" />
            <div className="absolute inset-0 bg-black/30" />
          </>
        )}

        {showOverlay && (
            <div className="absolute inset-0 flex flex-col justify-between px-6 sm:px-8 lg:px-10 pt-10 sm:pt-12 lg:pt-12 pb-6 sm:pb-8 lg:pb-10 text-white">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <img
                src={project.image}
                alt={`${project.title} overlay`}
                className="order-1 lg:order-2 w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover border border-white/30 shadow-lg self-start"
              />
              <div className="order-2 lg:order-1 space-y-4 max-w-3xl">
                <p className="text-white/85 leading-relaxed">{project.blurb}</p>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white mb-2 font-mono">
                    KEY TECHNOLOGIES
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex justify-center rounded-full border border-white/50 bg-white/10 px-3 py-1 text-xs font-semibold text-white whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="h-1" />
          </div>
        )}
      </div>
    </Card>
  );
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative overflow-hidden py-12 md:py-12 bg-white text-foreground"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-14">
          {projects.map((project, index) => {
            return (
              <ScrollAnimationWrapper key={project.title} delay={index * 140}>
                <div className="space-y-5 md:space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <div className="h-[3px] w-12 rounded-full bg-primary/80" />
                  </div>
                  <ProjectCard project={project} index={index} />
                </div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;