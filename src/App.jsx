import React, { useEffect, useState, useCallback } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';

// Smooth scroll function
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
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

      const sections = ['intro', 'experience', 'contact'];
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
    <div className="scroll-optimized min-h-screen bg-gradient-to-t from-[#0a0a0a] via-[#0e0e0e] to-[#121212]">
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
      <ExperienceSection hasNavigatedToExperience={hasNavigatedToExperience} />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}

export default App;
