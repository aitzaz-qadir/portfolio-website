import React, { useEffect, useState } from 'react';
import './index.css';

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
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [hasNavigatedToExperience, setHasNavigatedToExperience] =
    useState(false);

  // Custom hook to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // 60% of viewport height
      const scrollThreshold = window.innerHeight * 0.1;
      setIsScrolled(window.scrollY > scrollThreshold);

      // Determine active section based on scroll position
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

            // If user navigated to experience section, show all cards immediately
            if (section === 'experience' && !hasNavigatedToExperience) {
              setHasNavigatedToExperience(true);
              setVisibleCards(new Set([0, 1, 2])); // Show all 3 cards
              return; // Skip the individual card visibility check
            }
            break;
          }
        }
      }

      // Check for experience cards visibility (only if not navigated directly)
      if (!hasNavigatedToExperience) {
        const experienceCards = document.querySelectorAll('.experience-card');
        experienceCards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8;

          if (isVisible && !visibleCards.has(index)) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Check on initial load
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleCards, hasNavigatedToExperience]);

  // Modified scroll function to handle experience section specially
  const scrollToExperience = () => {
    setHasNavigatedToExperience(true);
    setVisibleCards(new Set([0, 1, 2])); // Show all cards immediately
    scrollToSection('experience');
  };

  return (
    <>
      {/* SVG filter */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="30"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 40 -20"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      {/* Blob container */}
      <div className="fixed inset-0 -z-50 overflow-hidden bg-gradient-to-t from-[#0a0a0a] via-[#0e0e0e] to-[#121212]">
        <div className="relative w-full h-full filter-[url(#blurMe)] blob-wrapper">
          {/* Magenta Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(255,0,128,0.65)_40%,_rgba(255,255,0,0)_60%)] w-[600px] h-[600px] top-[30%] left-[10%] animate-move0 rounded-full opacity-80 mix-blend-multiply"></div>
          {/* Purple Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(180,100,255,0.65)_40%,_rgba(255,0,128,0)_60%)] w-[750px] h-[750px] top-[10%] left-[30%] animate-move1 rounded-full opacity-80 mix-blend-multiply"></div>
          {/* Cyan Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(0,200,200,0.65)_40%,_rgba(0,255,255,0)_60%)] w-[900px] h-[900px] top-[25%] left-[70%] animate-move2 rounded-full opacity-80 mix-blend-multiply"></div>
          {/* Blue Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(80,160,255,0.65)_40%,_rgba(0,128,255,0)_60%)] w-[700px] h-[700px] top-[60%] left-[80%] animate-move3 rounded-full opacity-80 mix-blend-multiply"></div>
          {/* Red Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(255,60,60,0.65)_40%,_rgba(255,0,0,0)_60%)] w-[800px] h-[800px] top-[70%] left-[50%] animate-move4 rounded-full opacity-80 mix-blend-multiply"></div>
        </div>
      </div>
      {/* Navbar */}
      <nav
        className={`fixed z-50 transition-all duration-200 ease-in-out bg-neutral-900/90 backdrop-blur-xl shadow-md
          ${isScrolled ? 'top-0' : 'top-8'} 
        left-1/2 -translate-x-1/2 px-2 py-2 flex space-x-2 font-bold
          ${
            isScrolled
              ? 'rounded-b-lg border-l border-r border-b border-white/20'
              : 'rounded-lg border border-white/20'
          }`}
      >
        {['Intro', 'Experience', 'Projects', 'About', 'Contact'].map((item) => {
          const sectionId = item.toLowerCase();
          const isActive = activeSection === sectionId;

          return (
            <a
              key={item}
              href={`#${sectionId}`}
              onClick={(e) => {
                e.preventDefault();
                if (sectionId === 'experience') {
                  scrollToExperience();
                } else {
                  scrollToSection(sectionId);
                }
                setActiveSection(sectionId);
                window.history.pushState(null, null, `#${sectionId}`);
              }}
              className={`text-base px-3 py-1 rounded-md transition-all duration-200 ${
                isActive
                  ? 'text-black bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)]'
                  : 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-lg'
              }`}
            >
              {item}
            </a>
          );
        })}
      </nav>
      {/* Main content */}
      {/* Hero Section */}
      <div
        id="intro"
        className="relative min-h-screen flex flex-col items-center justify-center text-white px-4"
      >
        <div
          id="profile"
          className="w-45 h-45 overflow-hidden rounded-full mb-7 shadow-[0_0_20px_rgba(255,255,255,0.1)] border-2 border-white/10"
        >
          <img
            src="/assets/profilePic.jpg"
            alt="Profile"
            className="w-full h-full object-cover object-[50%_10%]"
          />
        </div>
        <div
          id="status"
          className="flex items-center justify-center w-75 h-12 bg-neutral-900/70 backdrop-blur-md rounded-full border border-white/20 text-white shadow-lg space-x-3 px-4 py-2"
        >
          <div className="relative w-3 h-3">
            <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
            <span className="absolute inline-flex w-full h-full rounded-full bg-green-500"></span>
          </div>
          <span className="text-base font-semibold">
            Seeking a Full-Time Role
          </span>
        </div>
        <h1 className="text-5xl font-extrabold mt-6 mb-4 drop-shadow-lg ">
          Hi, I&apos;m Aitzaz!
          <span role="img" aria-label="waving hand" className="animate-pulse">
            👋
          </span>
        </h1>
        <p className="text-lg text-center max-w-xl mb-6 font-semibold ">
          I’m a recent Computer Science graduate with hands-on experience in web
          development, backend systems, and data-driven projects.
        </p>
        <button
          onClick={scrollToExperience}
          className="scroll-button group absolute bottom-10 px-6 py-3 font-semibold text-white backdrop-blur-md bg-neutral-900/70 border border-white/10 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          <span className="flex items-center gap-2 relative z-10">
            Scroll to Explore
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-5 h-5 animate-bounce-up-down"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </span>
        </button>
      </div>
      <div
        id="experience"
        className="min-h-screen flex flex-col items-center justify-center text-white px-4 py-20"
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg mb-16 text-center">
          Experience 👔
        </h1>
        <div className="max-w-4xl w-full relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 via-white/40 to-white/20"></div>
          {/* Experience items */}
          <div className="space-y-12">
            {/* Experience #1 */}
            <div
              className={`relative flex items-start space-x-8 experience-card ${visibleCards.has(0) ? 'animate' : ''}`}
              style={{ animationDelay: '0.1s' }}
            >
              {/* Timeline dot */}
              <div className="relative z-10 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] border-2 border-white/20 flex-shrink-0 mt-6"></div>
              {/* Content card */}
              <div className="flex-1 bg-neutral-900/70 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Junior Web Development Consultant
                    </h3>
                    <p className="text-lg text-white/80 font-semibold">
                      Content Bloom (Co-op)
                    </p>
                  </div>
                  <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full mt-2 sm:mt-0 self-start">
                    Sept 2021 — Dec 2021
                  </span>
                </div>
                <ul className="text-white/70 space-y-2 mb-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-white/40">•</span>
                    <span>
                      Identified and remediated 1,300+ accessibility violations
                      across 15+ enterprise websites, boosting WCAG compliance
                      scores by over 85% using WAVE and semantic HTML
                      optimization.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-white/40">•</span>
                    <span>
                      Engineered 12+ dynamic PDF/HTML forms with auto-fill,
                      validation, and conditional logic using Adobe LiveCycle
                      and JavaScript, reducing form error rates by 60%.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-white/40">•</span>
                    <span>
                      Partnered with cross-functional teams and clients to
                      deploy accessibility fixes and iterate on financial form
                      requirements, cutting delivery timelines by 30%.
                    </span>
                  </li>
                </ul>
                {/* Skill list */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {[
                    'HTML/CSS',
                    'JavaScript',
                    'CMS',
                    'Adobe LiveCycle',
                    'Git',
                    'JIRA',
                    'Agile Methodologies',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded-md border border-white/10 hover:bg-white/20 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Experience #2 */}
            <div
              className={`relative flex items-start space-x-8 experience-card ${visibleCards.has(1) ? 'animate' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              <div className="relative z-10 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] border-2 border-white/20 flex-shrink-0 mt-6"></div>
              <div className="flex-1 bg-neutral-900/70 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Residence Assistant
                    </h3>
                    <p className="text-lg text-white/80 font-semibold">
                      Dalhousie University
                    </p>
                  </div>
                  <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full mt-2 sm:mt-0 self-start">
                    Sept 2021 — April 2022
                  </span>
                </div>
                <ul className="text-white/70 space-y-2 mb-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-white/40">•</span>
                    <span>
                      Selected to provide leadership, support, and mentoring to
                      students living in on-campus residences.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-white/40">•</span>
                    <span>
                      Organized social/educational events, responded to
                      emergencies, and maintained order within the residence.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-white/40">•</span>
                    <span>
                      Successfully fostered a safe and supportive living
                      environment, enhancing resident satisfaction and
                      compliance with university policies through the use of
                      conflict resolution and crisis management skills.
                    </span>
                  </li>
                </ul>
                {/* Skill list */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {[
                    'Leadership',
                    'Conflict Resolution',
                    'Crisis Management',
                    'Event Planning',
                    'Communication',
                    'Teamwork',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded-md border border-white/10 hover:bg-white/20 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Experience #3 */}
            <div
              className={`relative flex items-start space-x-8 experience-card ${visibleCards.has(2) ? 'animate' : ''}`}
              style={{ animationDelay: '0.3s' }}
            >
              <div className="relative z-10 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] border-2 border-white/20 flex-shrink-0 mt-6"></div>
              <div className="flex-1 bg-neutral-900/70 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Store Clerk
                    </h3>
                    <p className="text-lg text-white/80 font-semibold">
                      Atlantic Superstore
                    </p>
                  </div>
                  <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full mt-2 sm:mt-0 self-start">
                    Jan 2025 — June 2025
                  </span>
                </div>
                <ul className="text-white/70 space-y-2 mb-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-white/40">•</span>
                    <span>
                      Worked night shifts to ensure shelves were fully stocked
                      and organized for daily operations.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-white/40">•</span>
                    <span>
                      Collaborated with a team to unload, sort, and stock
                      inventory accurately and efficiently.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-white/40">•</span>
                    <span>
                      Maintained back storage areas, ensuring organization and
                      cleanliness for smooth inventory flow.
                    </span>
                  </li>
                </ul>
                {/* Skill list */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {[
                    'Customer Service',
                    'Inventory Management',
                    'Team Collaboration',
                    'Time Management',
                    'Problem Solving',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded-md border border-white/10 hover:bg-white/20 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="projects"
        className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-green-900/20 to-emerald-900/20"
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg animate-pulse">
          Projects 🚀
        </h1>
      </div>
      <div
        id="about"
        className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-orange-900/20 to-red-900/20"
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg animate-pulse">
          About Me 👤
        </h1>
      </div>
      <div
        id="contact"
        className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-indigo-900/20 to-purple-900/20"
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg animate-pulse">
          Contact 📧
        </h1>
      </div>
    </>
  );
}

export default App;
