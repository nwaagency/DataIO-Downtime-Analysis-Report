import Navigation from "@/components/Navigation";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import blueBackground from "@assets/Blue Background.png";
import metalGearNoBg from "@assets/metalGearnoBG.png";
import SectionHeading from "@/components/SectionHeading";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        {/* This section now contains both the blue background AND the Projects component */}
        <section className="relative bg-white">
          {/* Blue background header section */}
          <div className="relative overflow-hidden bg-background text-white h-[180px]">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${blueBackground})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f3f]/95 via-[#12356b]/90 to-[#0c1f3f]/96" />
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="container mx-auto px-4 text-center">
                <SectionHeading
                  title="Projects"
                  description="A look at our previous projects that we have developed."
                  align="center"
                  variant="light"
                  className="!-mb-5" // This overrides the bottom margin
                />
              </div>
            </div>
          </div>
          
          {/* Projects component - now inside the same section with no gap */}
          <Projects />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;