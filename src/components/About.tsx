import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollAnimationWrapper } from "@/hooks/use-scroll-animation";
import SectionHeading from "@/components/SectionHeading";
import FloatingBlueprintLines from "@/components/FloatingBlueprintLines";
import roboticsImg from "@/assets/robotics.jpg";
import ultrasonicImg from "@/assets/ultrasonic-welding.jpg";
import machineBlueStrong from "@/assets/machine_blue_strong.jpg";
import heroEngineering from "@/assets/hero-engineering.jpg";
import blueBackground from "@/assets/Blue Background.png";
import boltImg from "@/assets/bolt_blueprint.png";
import metalGearNoBg from "@/assets/metalGearnoBG.png";
import mechatronicDesign from "@/assets/Mechatronic_design.jpg";

const About = () => {
  return (
    <section id="about" className="bg-white relative">
      <FloatingBlueprintLines className="z-[1]" opacity={0.05} />

      {/* Hero */}
      <div className="relative overflow-hidden bg-background text-white h-[180px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${blueBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f3f]/95 via-[#12356b]/90 to-[#0c1f3f]/96" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <SectionHeading
              title="About Us"
              
              align="center"
              variant="light"
              className="!-mb-5" // This overrides the bottom margin
            />
          </div>
        </div>
      </div>

      <div className="bg-white text-foreground">
        <div className="container mx-auto px-4 py-14 md:py-18 space-y-12 md:space-y-14">
          {/* Section 1: Image left, text right */}
          <ScrollAnimationWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-center">
              <div className="relative overflow-hidden rounded-2xl shadow-lg border border-white/10 bg-white/5 h-full border border-slate-200 bg-white">
                <div className="aspect-[12/10] w-full relative rounded-2xl">
                  <img
                    src={heroEngineering}
                    alt="Precision engineering machinery"
                    className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                  />
                </div>
              </div>
              <div className="space-y-4 md:space-y-5">
                <h3 className="text-3xl font-bold text-foreground tracking-tight">Meet the team</h3>
                <div className="space-y-3 text-muted-foreground text-lg leading-[1.7]">
                  <p>
                    Murray Paton, Mechanical engineer with ... years of experience in automating systems.
                  </p>
                  <p>
                    Lawrence Hawke, Bsc (Eng) Mechatronics undergraduate student. 
                  </p>
                </div>
                <Button size="lg" className="mt-2" asChild>
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </div>
          </ScrollAnimationWrapper>

          {/* Section 2: Text left, image right */}
          <ScrollAnimationWrapper delay={120}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-center">
              <div className="space-y-4 md:space-y-5 order-2 md:order-1">
                <h3 className="text-3xl font-bold text-foreground tracking-tight">History</h3>
                <div className="space-y-3 text-muted-foreground text-lg leading-[1.7]">
                  <p>
                    Since 1978, Southern Composite Engineering has been involved in product development in the of fields robotics and industrial automation.
                  </p>
                  <p>
                    It started with a gutter full of leaves at home - 'The Gibbon' gutter cleaner was later listed on Amazon.
                  </p>
                  <p>
                    Today, Southern Composite is still developing high quality automated systems and now operating in the field of CNC manufacturing.
                  </p>
                </div>
                <Button size="lg" className="mt-2" asChild>
                  <a href="/services">View our services</a>
                </Button>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg order-1 md:order-2 border border-slate-200 bg-white">
                <div className="aspect-[12/10] w-full relative rounded-2xl">
                  <img
                    src={machineBlueStrong}
                    alt="Collaborative engineering workspace"
                    className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
};

export default About;