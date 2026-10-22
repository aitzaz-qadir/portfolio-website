import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import ExperienceSection from './components/experience/ExperienceSection';
import ProjectsSection from './components/projects/ProjectsSection';
import AboutSection from './components/about/AboutSection';
import ContactSection from './components/contact/ContactSection';
import StarfieldBackground from './components/layout/StarfieldBackground';
import sections from './data/sections.json';
import { MOBILE_BREAKPOINT } from './hooks/useIsMobile';

// Section ids in page order (each matches a section element id)
const SECTION_IDS = sections.map((name) => name.toLowerCase());

// Smooth-scroll to a section; on mobile, stop short so the fixed top bar doesn't cover it
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const navbarHeight = isMobile ? 60 : 0;

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

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  /*
   * Scroll tracking for the navbar, throttled to one update per animation frame.
   * isScrolled: past 10% of the viewport height (nav docks to the top).
   * activeSection: the section containing a point just below the top of the viewport.
   */
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
    <div className="min-h-screen bg-black relative">
      <StarfieldBackground />
      {/* Content stacks above the fixed starfield */}
      <div className="relative z-10">
        <Navbar
          isScrolled={isScrolled}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          setActiveSection={setActiveSection}
        />
        <main>
          <HeroSection scrollToExperience={scrollToExperience} />
          <ExperienceSection />
          <ProjectsSection />
          <AboutSection />
          <ContactSection />
        </main>
      </div>
    </div>
  );
}

export default App;
