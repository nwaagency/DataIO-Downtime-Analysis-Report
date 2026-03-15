import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Pause, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

//import logo
import Logo from "@/assets/SCE_Logo_0.png"


//import pictures
import SS_workshop from "@/assets/Slide_Show/SS_workshop.jpg";
import SS_Drill_Head from "@/assets/Slide_Show/SS_Drill_Head.jpg";
import SS_intricate_CNC from "@/assets/Slide_Show/SS_Intricate_CNC.jpg";
import SS_Robodrill from "@/assets/Slide_Show/SS_Robodrill.jpg";

//import videos
import SS_CNC_facing_vid from "@/assets/Slide_Show/CNC_facing.mp4";
import SS_CNC_tool_change_vid from "@/assets/Slide_Show/SS_CNC_tool_change_edited.mp4";
import SS_gears_vid from "@/assets/Slide_Show/SS_CNC_gears.mp4";


import FloatingBlueprintLines from "@/components/FloatingBlueprintLines";

// Slideshow delay constant (3.5 seconds)
const SS_DELAY = 4000;
// Text change delay (also 3.5 seconds but with 0.5s offset)
const TEXT_DELAY = SS_DELAY;

// Define media item type (without text)
type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  muted?: boolean;
};

// Define text item type for independent text slideshow
type TextItem = {
  id: string;
  text: string;
};

const Hero = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia("(max-width: 600px)").matches : false,
  );
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const mediaIntervalRef = useRef<NodeJS.Timeout>();
  const textIntervalRef = useRef<NodeJS.Timeout>();

  // Define your media slides
  const mediaSlides = useMemo<MediaItem[]>(
    () => [
      {
        id: "workshop",
        type: 'image',
        src: SS_workshop,
        alt: "SCE Workshop",
      },
      {
        id: "cnc",
        type: 'image',
        src: SS_intricate_CNC,
        alt: "CNC Stock",
      },
      {
        id: "drillHead",
        type: 'image',
        src: SS_Drill_Head,
        alt: "Drill Head",
      },
      {
        id: "Robodrill",
        type: 'image',
        src: SS_Robodrill,
        alt: "Robodrill",
      },
      {
        id: "CNC_facing",
        type: 'video',
        src: SS_CNC_facing_vid,
        alt: "CNC facing",
        muted: true,
      },
      {
        id: "CNC_tool_change",
        type: 'video',
        src: SS_CNC_tool_change_vid,
        alt: "CNC tool change",
        muted: true,
      },
    ],
    [],
  );

  // Define your independent text slides
  const textSlides = useMemo<TextItem[]>(
    () => [
      {
        id: "text-1",
        text: "",
      },
      {
        id: "text-2",
        text: "CNC Machining",
      },
      {
        id: "text-3",
        text: "Design and Development",
      },
      {
        id: "text-4",
        text: "Advanced Technology",
      },
      {
        id: "text-5",
        text: "Automation",
      },
      {
        id: "text-6",
        text: "Precision",
      },
      {
        id: "text-7",
        text: "27 Years Experience",
      },
    ],
    [],
  );

  // Track mobile breakpoint
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  // Handle video playback when switching slides
  useEffect(() => {
    // Pause all videos first
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0; // Reset video to start
      }
    });

    // Play current video if it exists and autoplay is enabled
    const currentMedia = mediaSlides[activeMediaIndex];
    if (currentMedia.type === 'video' && isPlaying) {
      const currentVideo = videoRefs.current[activeMediaIndex];
      if (currentVideo) {
        // Ensure video plays with a small delay to allow DOM to update
        const playPromise = currentVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Auto-play was prevented, try again with a delay
            setTimeout(() => {
              currentVideo.play().catch(e => 
                console.log('Video autoplay prevented after retry:', e)
              );
            }, 100);
          });
        }
      }
    }
  }, [activeMediaIndex, isPlaying, mediaSlides]);

  // Auto-advance media slides
  const startMediaAdvance = useCallback(() => {
    if (!isPlaying) return;
    
    // Clear any existing interval
    if (mediaIntervalRef.current) {
      clearInterval(mediaIntervalRef.current);
    }
    
    // Start new interval for media
    mediaIntervalRef.current = setInterval(() => {
      setActiveMediaIndex((prev) => (prev + 1) % mediaSlides.length);
    }, SS_DELAY);
  }, [isPlaying, mediaSlides.length]);

  // Auto-advance text slides (same delay but independent)
  const startTextAdvance = useCallback(() => {
    if (!isPlaying) return;
    
    // Clear any existing interval
    if (textIntervalRef.current) {
      clearInterval(textIntervalRef.current);
    }
    
    // Start new interval for text with 0.5s initial delay
    textIntervalRef.current = setInterval(() => {
      setActiveTextIndex((prev) => (prev + 1) % textSlides.length);
    }, TEXT_DELAY);
  }, [isPlaying, textSlides.length]);

  // Handle manual slide change with timer reset
  const changeSlide = useCallback((newIndex: number) => {
    setActiveMediaIndex(newIndex);
    setActiveTextIndex(newIndex); // Sync text with media on manual change
    // Reset the auto-advance timers
    startMediaAdvance();
    startTextAdvance();
  }, [startMediaAdvance, startTextAdvance]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setActiveMediaIndex((prev) => {
      const next = (prev + 1) % mediaSlides.length;
      setActiveTextIndex(next); // Sync text with media
      return next;
    });
    startMediaAdvance(); // Reset timer on manual navigation
    startTextAdvance();
  }, [mediaSlides.length, startMediaAdvance, startTextAdvance]);

  const prevSlide = useCallback(() => {
    setActiveMediaIndex((prev) => {
      const next = (prev - 1 + mediaSlides.length) % mediaSlides.length;
      setActiveTextIndex(next); // Sync text with media
      return next;
    });
    startMediaAdvance(); // Reset timer on manual navigation
    startTextAdvance();
  }, [mediaSlides.length, startMediaAdvance, startTextAdvance]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Manage auto-advance intervals
  useEffect(() => {
    startMediaAdvance();
    
    // Start text advance with 0.5s delay
    const textStartTimeout = setTimeout(() => {
      startTextAdvance();
    }, 500); // 0.5 second delay
    
    // Cleanup on unmount or when dependencies change
    return () => {
      if (mediaIntervalRef.current) {
        clearInterval(mediaIntervalRef.current);
      }
      if (textIntervalRef.current) {
        clearInterval(textIntervalRef.current);
      }
      clearTimeout(textStartTimeout);
    };
  }, [startMediaAdvance, startTextAdvance]);

  // Handle play/pause changes
  useEffect(() => {
    if (!isPlaying) {
      if (mediaIntervalRef.current) {
        clearInterval(mediaIntervalRef.current);
        mediaIntervalRef.current = undefined;
      }
      if (textIntervalRef.current) {
        clearInterval(textIntervalRef.current);
        textIntervalRef.current = undefined;
      }
    } else {
      startMediaAdvance();
      // Restart text with 0.5s delay
      setTimeout(() => {
        startTextAdvance();
      }, 500);
    }
  }, [isPlaying, startMediaAdvance, startTextAdvance]);

  // Ken Burns animation variants
  const kenBurnsVariants = {
    initial: {
      scale: 1,
      x: 0,
      y: 0,
    },
    animate: {
      scale: 1.15,
      x: [0, -2, -4, -6, -8, -10], // Subtle panning effect
      y: [0, -2, -4, -6, -8, -10], // Subtle panning effect
      transition: {
        duration: SS_DELAY / 1000, // Match the slideshow delay
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    },
    exit: {
      scale: 1.2,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Text animation variants
  const textVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  // Render media based on type
  const renderMedia = (slide: MediaItem, index: number) => {
    if (slide.type === 'video') {
      return (
        <video
          ref={el => videoRefs.current[index] = el}
          src={slide.src}
          className="absolute inset-0 w-full h-full object-cover"
          muted={slide.muted ?? true}
          loop
          playsInline
          preload="auto"
          onLoadedData={(e) => {
            // If this is the active video and playing is enabled, play it
            if (index === activeMediaIndex && isPlaying) {
              e.currentTarget.play().catch(console.log);
            }
          }}
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
        exit="exit"
        key={`kenburns-${slide.id}-${index}`}
      >
        <img
          src={slide.src}
          alt={slide.alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    );
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Media Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mediaSlides[activeMediaIndex].id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {renderMedia(mediaSlides[activeMediaIndex], activeMediaIndex)}
          
          {/* Dark overlay for better button and text visibility */}
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      <FloatingBlueprintLines className="z-[1]" />

      {/* Center Logo */}
      <motion.div 
        className="relative inset-0 z-10 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <img 
          src={Logo}
          alt="Company Logo"
          className="w-auto max-w-[100px] md:max-w-[200px] lg:max-w-[300px] h-auto drop-shadow-2xl"
        />
      </motion.div>

      {/* Independent Text Overlay Slideshow - Delayed by 0.5s */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-4xl px-4">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`text-${activeTextIndex}`}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-white text-4xl md:text-6xl lg:text-7xl font-medium drop-shadow-2xl"
              style={{ fontFamily: "'Franklin Gothic Medium', 'Franklin Gothic', 'ITC Franklin Gothic', sans-serif" }}
            >
              {textSlides[activeTextIndex].text}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-6 right-6 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* Navigation Buttons - Previous/Next */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20"
        aria-label="Previous slide"
      >
        <span className="text-xl">←</span>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20"
        aria-label="Next slide"
      >
        <span className="text-xl">→</span>
      </button>

      {/* Simple Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {mediaSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => changeSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeMediaIndex 
                ? "w-8 bg-white" 
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative Blueprint Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
};

export default Hero;