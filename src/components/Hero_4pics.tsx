import { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

//import logo
import Logo from "@/assets/SCE_Logo_0.png"

//import pictures
import SS_workshop from "@/assets/Slide_Show/SS_workshop.jpg";
import SS_Drill_Head from "@/assets/Slide_Show/SS_Drill_Head.jpg";
import SS_intricate_CNC from "@/assets/Slide_Show/threading_smooth.jpg";
import SS_Robodrill from "@/assets/Slide_Show/machine_blue_strong.jpg";

//import videos
import SS_CNC_facing_vid from "@/assets/Slide_Show/CNC_facing.mp4";
import SS_CNC_tool_change_vid from "@/assets/Slide_Show/SS_CNC_tool_change_edited.mp4";
import SS_gears_vid from "@/assets/Slide_Show/SS_CNC_gears.mp4";

import FloatingBlueprintLines from "@/components/FloatingBlueprintLines";

// Define media item type
type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  muted?: boolean;
  gridArea: string; // For bento box layout
};

// Ken Burns animation variants
const kenBurnsVariants = {
  initial: {
    scale: 1,
    x: 0,
    y: 0,
  },
  animate: {
    scale: 1.15,
    x: [0, -2, -4, -6, -8, -10],
    y: [0, -2, -4, -6, -8, -10],
    transition: {
      duration: 8, // Slower zoom for bento boxes
      ease: "easeInOut",
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      repeat: 0
    },
  },
};

const Hero = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false,
  );
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Define bento box media items with grid areas
  const bentoItems = useMemo<MediaItem[]>(
    () => [
      {
        id: "workshop",
        type: 'image',
        src: SS_workshop,
        alt: "SCE Workshop",
        gridArea: "workshop",
      },
      // {
      //   id: "cnc",
      //   type: 'image',
      //   src: SS_intricate_CNC,
      //   alt: "CNC Threading",
      //   gridArea: "cnc",
      // },
      {
        id: "drillHead",
        type: 'image',
        src: SS_Drill_Head,
        alt: "Prototyping and Product Development",
        gridArea: "drillHead",
      },
      // {
      //   id: "Robodrill",
      //   type: 'image',
      //   src: SS_Robodrill,
      //   alt: "Fanuc Robodrill",
      //   gridArea: "robodrill",
      // },
      {
        id: "CNC_facing",
        type: 'video',
        src: SS_CNC_facing_vid,
        alt: "CNC Machining",
        muted: true,
        gridArea: "cncFacing",
      },
      {
        id: "CNC_tool_change",
        type: 'video',
        src: SS_CNC_tool_change_vid,
        alt: "4-axis CNC",
        muted: true,
        gridArea: "cncToolChange",
      },
      // Commented out because we only need 6 items
      // {
      //   id: "Gears",
      //   type: 'video',
      //   src: SS_gears_vid,
      //   alt: "Precision",
      //   muted: true,
      //   gridArea: "gears",
      // },
    ],
    [],
  );

  // Track mobile breakpoint
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  // Handle video playback
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && bentoItems[index].type === 'video') {
        video.play().catch(e => console.log('Video autoplay prevented:', e));
      }
    });
  }, [bentoItems]);

  // Render media based on type
  const renderMedia = (item: MediaItem, index: number) => {
    if (item.type === 'video') {
      return (
        <video
          ref={el => videoRefs.current[index] = el}
          src={item.src}
          className="absolute inset-0 w-full h-full object-cover"
          muted={item.muted ?? true}
          loop
          playsInline
          autoPlay
          preload="auto"
        />
      );
    }
    
    // For images, apply Ken Burns effect
    return (
      <motion.div
        className="absolute inset-0 overflow-hidden"
        variants={kenBurnsVariants}
        initial="initial"
        animate="animate"
        // Add this to prevent re-animation on rerenders
        key={item.id} // Make sure key is stable
      >
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    );
  };

  // Grid layout styles
  // Grid layout styles
const gridStyle = {
  display: 'grid',
  gap: '1rem',
  padding: '1rem',
  height: '100vh',
  width: '100%',
  gridTemplateAreas: isMobile 
    ? `
      "workshop"
      "drillHead"
      "cncFacing"
      "cncToolChange"
    `
    : `
      "workshop workshop drillHead drillHead"
      "workshop workshop drillHead drillHead"
      "cncFacing cncFacing cncToolChange cncToolChange"
      "cncFacing cncFacing cncToolChange cncToolChange"
    `,
  gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
  gridTemplateRows: isMobile ? 'repeat(4, 1fr)' : 'repeat(4, 1fr)',
};

  return (
    <section id="home" className="relative h-screen overflow-hidden bg-black">
      {/* Bento Grid */}
      {/* Bento Grid */}
      <div style={gridStyle} className="relative z-10">
        {bentoItems.map((item, index) => {
          // Define which items should be clickable
          const isClickable = ['drillHead', 'CNC_facing', 'CNC_tool_change'].includes(item.id);
          
          return (
            <motion.div
              key={item.id}
              className={`relative overflow-hidden rounded-xl border border-primary/20 shadow-2xl ${
                isClickable ? 'cursor-pointer' : ''
              }`}
              style={{ gridArea: item.gridArea }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={isClickable ? { 
                scale: 1.02,
                borderColor: 'rgba(0, 255, 255, 0.5)',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
                transition: { duration: 0.2 }
              } : {}}
            >
              {isClickable ? (
                <Link 
                  to="/services" 
                  className="block w-full h-full relative"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {renderMedia(item, index)}
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute left-4 bottom-4 z-10 rounded-2xl bg-black/35 text-white text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                      {item.alt}
                  </div>
                  <div className="absolute top-2 right-2 text-white/70 text-xs bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-primary/30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    View Services →
                  </div>
                </Link>
              ) : (
                <>
                  {renderMedia(item, index)}
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute left-4 bottom-4 z-10 rounded-2xl bg-black/35 text-white text-s font-semibold px-3 py-1.5 backdrop-blur-sm">
                      {item.alt}
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      <FloatingBlueprintLines className="z-[5]" />

      {/* Logo and Branding Overlay */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-4">
        <img src={Logo} alt="SCE Logo" className="h-20 w-auto" />
      </div>

      {/* CTA Button */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <Button 
          asChild 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-white border-2 border-white/20 shadow-2xl backdrop-blur-sm"
        >
          <Link to="/contact" className="flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {/* Decorative Blueprint Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent z-20" />
    </section>
  );
};

export default Hero;