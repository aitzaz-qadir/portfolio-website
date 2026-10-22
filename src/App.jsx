import { useEffect, useState } from 'react';
import './index.css';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import ExperienceSection from './components/experience/ExperienceSection';
import ProjectsSection from './components/projects/ProjectsSection';
import AboutSection from './components/about/AboutSection';
import ContactSection from './components/contact/ContactSection';
import StarfieldBackground from './components/hero/StarfieldBackground';
import sections from './data/sections.json';
import { MOBILE_BREAKPOINT } from './hooks/useIsMobile';

// Section ids in page order (each matches a section element id)
const SECTION_IDS = sections.map((name) => name.toLowerCase());

// Smooth scroll function with mobile navbar offset
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const navbarHeight = isMobile ? 60 : 0; // Reduced mobile navbar offset

    const elementPosition = section.offsetTop;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  } else {
    console.error(`Section with id ${sectionId} not found.`);
  }
};

const scrollToExperience = () => scrollToSection('experience');

// Main application component
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  // Track nav docking and active section, updating at most once per frame
  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      const scrollThreshold = window.innerHeight * 0.1;
      setIsScrolled(window.scrollY > scrollThreshold);

      const scrollPosition = window.scrollY + scrollThreshold / 2;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (
          el &&
          scrollPosition >= el.offsetTop &&
          scrollPosition < el.offsetTop + el.offsetHeight
        ) {
          setActiveSection(id);
          break;
        }
      }
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="scroll-optimized min-h-screen bg-black relative">
      {/* Animated Starfield Background */}
      <StarfieldBackground />
      {/* Main Content Wrapper */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar
          isScrolled={isScrolled}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          setActiveSection={setActiveSection}
        />
        {/* Hero Section */}
        <HeroSection scrollToExperience={scrollToExperience} />
        {/* Experience Section */}
        <ExperienceSection />
        {/* Projects Section */}
        <ProjectsSection />
        {/* About Section */}
        <AboutSection />
        {/* Contact Section */}
        <ContactSection />
      </div>
    </div>
  );
}

export default App;
