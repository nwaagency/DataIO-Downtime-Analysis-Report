import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import machineBlueprint from "@/assets/machine_blue_strong.jpg";
import cncVideo from "@/assets/DSC_2714.mov";
import blueBackground from "@/assets/Blue Background.png"

import { useState, useEffect } from 'react';

const HeroStory = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
        
        {/* Animated blueprint grid overlay ESSEntial */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,160,255,0.05)_2px,transparent_2px),linear-gradient(rgba(0,160,255,0.05)_2px,transparent_2px)] bg-[size:128px_128px]" />
        </div>


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

            {/* Video/Media - FULL WIDTH */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl mt-10 sm:mt-12 md:mt-16"
              style={{ 
                height: '85vh'
              }}
            >

              {/* Video */}
              <motion.video
                src={cncVideo}
                muted
                loop
                autoPlay
                playsInline
                className="w-full h-full object-cover object-center"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />

              {/* Location badge */}
              <div className="absolute bottom-4 left-4 z-30">
                <div className="bg-black backdrop-blur-md text-white text-sm px-4 py-2 rounded-lg border border-white/20">
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    CNC Manufacturing · SCE Workshop
                  </span>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroStory;