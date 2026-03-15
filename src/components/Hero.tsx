import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import machineBlueprint from "@/assets/machine_blue_strong.jpg";
import blueBackground from "@/assets/Blue Background.png"

import { useState, useEffect, useMemo, useCallback, useRef } from "react";

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

// Slideshow delay constant (4 seconds)
const SS_DELAY = 5000;

// Define media item type with text
type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  title: string; // Title for the text box
  description: string; // Description for the text box
  muted?: boolean;
};

const HeroStory = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const mediaIntervalRef = useRef<NodeJS.Timeout>();

  // Define your media slides with text
  const mediaSlides = useMemo<MediaItem[]>(
    () => [
      {
        id: "workshop",
        type: 'image',
        src: SS_workshop,
        alt: "SCE Workshop",
        title: "State-of-the-Art Workshop",
        description: "Our Cape Town facility is equipped with the latest CNC machinery and staffed by experienced technicians.",
      },
      {
        id: "drillHead",
        type: 'image',
        src: SS_Drill_Head,
        alt: "Drill Head",
        title: "Advanced Tooling Systems",
        description: "Custom drill heads and tooling solutions designed for optimal performance.",
      },
      {
        id: "Robodrill",
        type: 'image',
        src: SS_Robodrill,
        alt: "Robodrill",
        title: "Automated Robotic Drilling",
        description: "High-speed robotic drilling for consistent, repeatable precision.",
      },
      {
        id: "CNC_facing",
        type: 'video',
        src: SS_CNC_facing_vid,
        alt: "CNC facing",
        title: "CNC Facing Operations",
        description: "Smooth surface finishing with our advanced CNC facing capabilities.",
        muted: true,
      },
      {
        id: "CNC_tool_change",
        type: 'video',
        src: SS_CNC_tool_change_vid,
        alt: "CNC tool change",
        title: "Automated Tool Changes",
        description: "Rapid, precise tool changes for uninterrupted production runs.",
        muted: true,
      },
    ],
    [],
  );

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle video playback when switching slides
  useEffect(() => {
    // Pause all videos first
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });

    // Play current video if it exists and autoplay is enabled
    const currentMedia = mediaSlides[activeMediaIndex];
    if (currentMedia.type === 'video' && isPlaying) {
      const currentVideo = videoRefs.current[activeMediaIndex];
      if (currentVideo) {
        const playPromise = currentVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
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
    
    if (mediaIntervalRef.current) {
      clearInterval(mediaIntervalRef.current);
    }
    
    mediaIntervalRef.current = setInterval(() => {
      setActiveMediaIndex((prev) => (prev + 1) % mediaSlides.length);
    }, SS_DELAY);
  }, [isPlaying, mediaSlides.length]);

  // Handle manual slide change
  const changeSlide = useCallback((newIndex: number) => {
    setActiveMediaIndex(newIndex);
    startMediaAdvance();
  }, [startMediaAdvance]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setActiveMediaIndex((prev) => (prev + 1) % mediaSlides.length);
    startMediaAdvance();
  }, [mediaSlides.length, startMediaAdvance]);

  const prevSlide = useCallback(() => {
    setActiveMediaIndex((prev) => (prev - 1 + mediaSlides.length) % mediaSlides.length);
    startMediaAdvance();
  }, [mediaSlides.length, startMediaAdvance]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Manage auto-advance intervals
  useEffect(() => {
    startMediaAdvance();
    
    return () => {
      if (mediaIntervalRef.current) {
        clearInterval(mediaIntervalRef.current);
      }
    };
  }, [startMediaAdvance]);

  // Handle play/pause changes
  useEffect(() => {
    if (!isPlaying) {
      if (mediaIntervalRef.current) {
        clearInterval(mediaIntervalRef.current);
        mediaIntervalRef.current = undefined;
      }
    } else {
      startMediaAdvance();
    }
  }, [isPlaying, startMediaAdvance]);

  // Ken Burns animation variants for images
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
        duration: SS_DELAY / 1000,
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

  // Text animation variants for the bottom box
  const textBoxVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3,
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
    <section id="story" className="relative overflow-hidden bg-transparent p-0">
      {/* Blueprint hero background */}
      <div
        className="relative w-full bg-cover bg-center flex items-start"
        style={{ 
          backgroundImage: `url(${blueBackground})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: isMobile ? 'auto' : 'calc(100vh - 82px)',
          minHeight: 'calc(100vh - 82px)',
        }}
      >
        {/* Add a conditional height style */}
        <style>{`
          @media (min-width: 1024px) {
            #story > div {
              height: auto !important;
              min-height: calc(100vh - 82px) !important;
            }
          }
          @media (max-width: 1023px) {
            #story > div {
              height: auto !important;
              min-height: calc(100vh - 82px) !important;
            }
          }
        `}</style>
        
        {/* Multiple overlay layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f33]/90 via-[#0a2f55]/75 to-[#0a1f33]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,150,255,0.06),transparent_70%)] pointer-events-none" />
        
        {/* Animated blueprint grid overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,160,255,0.05)_2px,transparent_2px),linear-gradient(rgba(0,160,255,0.05)_2px,transparent_2px)] bg-[size:128px_128px]" />
        </div>

        <FloatingBlueprintLines className="z-[1]" />

        {/* Main content container - FULL WIDTH with padding only on sides */}
        <div className="w-full px-4 sm:px-6 md:px-8 relative z-10 pt-0 md:pt-0">
          {/* Single column layout - Text first, then video */}
          <div className="flex flex-col items-start min-h-[80vh] md:min-h-screen py-20 pt-4 md:pt-0">
            {/* Text content - FULL WIDTH */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col justify-start space-y-3 text-white mt-2 md:mt-5 w-full"
            >
              
              {/* Main heading with animated underline - full width */}
              <div className="space-y-3 w-full">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-slate-100 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight w-full"
                >
                  Engineering with experience
                </motion.h1>

                {/* Decorative line */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100px" }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="h-1 bg-gradient-to-r from-primary to-primary/40 rounded-full"
                />
              </div>

              {/* Description with animated words - full width */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed w-full drop-shadow-lg"
              >
                Based in Cape Town, Southern Composite Engineering specialises in{' '}
                <span className="text-white font-bold">Design</span>,{' '}
                <span className="text-white font-bold">Prototyping</span>, and{' '}
                <span className="text-white font-bold">CNC manufacturing</span>. 
              </motion.p>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed w-full drop-shadow-lg"
              > 
                Building reliable, custom solutions for the global market, since 1997.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-wrap gap-4 pt-4 w-full"
              >
                <Link
                  to="/services"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group relative inline-flex items-center px-3 py-2 bg-primary text-white font-semibold rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Our Services
                    <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>                
                </Link>
                
                <Link
                  to="/about"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group inline-flex items-center px-3 py-2 text-primary border-2 border-white/30 rounded-lg bg-white backdrop-blur-sm transition-all duration-300 font-semibold"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Meet The Team
                    <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span> 
                </Link>
              </motion.div>
            </motion.div>

            {/* Slideshow/Media - FULL WIDTH */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl mt-10 sm:mt-12 md:mt-16"
              style={{ 
                height: '75vh',
                maxHeight: '800px'
              }}
            >
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
                </motion.div>
              </AnimatePresence>

              {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0 bg-black/30 pointer-events-none" />

              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 backdrop-blur-sm border border-white/20"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              {/* Navigation Buttons - Previous/Next */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 backdrop-blur-sm border border-white/20"
                aria-label="Previous slide"
              >
                <span className="text-lg">←</span>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 backdrop-blur-sm border border-white/20"
                aria-label="Next slide"
              >
                <span className="text-lg">→</span>
              </button>

              {/* Simple Slide Indicators */}
              <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center gap-2">
                {mediaSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => changeSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeMediaIndex 
                        ? "w-6 bg-white" 
                        : "w-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Changing Text Box - Updates with media */}
              <div className="absolute bottom-4 left-4 right-4 z-30">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${activeMediaIndex}`}
                    variants={textBoxVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="bg-black/70 backdrop-blur-md text-white p-4 rounded-lg border border-white/20 max-w-2xl"
                  >
                    <h3 className="text-lg md:text-xl font-bold mb-1">
                      {mediaSlides[activeMediaIndex].title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-200">
                      {mediaSlides[activeMediaIndex].description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-300">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      {mediaSlides[activeMediaIndex].type === 'video' ? 'Video' : 'Image'} · SCE Workshop
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroStory;