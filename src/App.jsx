import React, { useEffect, useState, useCallback } from 'react';
import './index.css';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import ExperienceSection from './components/experience/ExperienceSection';
import ProjectsSection from './components/projects/ProjectsSection';
import AboutSection from './components/about/AboutSection';
import ContactSection from './components/contact/ContactSection';
import StarfieldBackground from './components/hero/StarfieldBackground';

// Smooth scroll function with mobile navbar offset
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const isMobile = window.innerWidth < 768;
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

// Main application component
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [hasNavigatedToExperience, setHasNavigatedToExperience] =
    useState(false);

  // Throttled scroll handler for better performance
  const throttle = useCallback((func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(
          () => {
            func.apply(this, args);
            lastExecTime = Date.now();
          },
          delay - (currentTime - lastExecTime)
        );
      }
    };
  }, []);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(
    throttle(() => {
      const scrollThreshold = window.innerHeight * 0.1;
      setIsScrolled(window.scrollY > scrollThreshold);

      const sections = ['intro', 'experience', 'projects', 'about', 'contact'];
      const scrollPosition = window.scrollY + scrollThreshold / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);

            if (section === 'experience' && !hasNavigatedToExperience) {
              setHasNavigatedToExperience(true);
              return;
            }
            break;
          }
        }
      }
    }, 16),
    [hasNavigatedToExperience, throttle]
  ); // 60fps throttling

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on initial load

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const scrollToExperience = useCallback(() => {
    setHasNavigatedToExperience(true);
    scrollToSection('experience');
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
          scrollToExperience={scrollToExperience}
          setActiveSection={setActiveSection}
        />
        {/* Hero Section */}
        <HeroSection scrollToExperience={scrollToExperience} />
        {/* Experience Section */}
        <ExperienceSection
          hasNavigatedToExperience={hasNavigatedToExperience}
        />
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
