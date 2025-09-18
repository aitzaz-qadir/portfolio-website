import React, { useEffect, useState, useCallback } from 'react';
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
              setVisibleCards(new Set([0, 1, 2]));
              return;
            }
            break;
          }
        }
      }

      // Optimized card visibility check
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
    }, 16),
    [hasNavigatedToExperience, visibleCards, throttle]
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
    setVisibleCards(new Set([0, 1, 2]));
    scrollToSection('experience');
  }, []);

  return (
    <div className="scroll-optimized min-h-screen bg-gradient-to-t from-[#0a0a0a] via-[#0e0e0e] to-[#121212]">
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
          const isAvailable = ['intro', 'experience', 'contact'].includes(
            sectionId
          );

          return (
            <a
              key={item}
              href={`#${sectionId}`}
              onClick={(e) => {
                e.preventDefault();
                if (!isAvailable) {
                  alert(`${item} section coming soon!`);
                  return;
                }
                if (sectionId === 'experience') {
                  scrollToExperience();
                } else {
                  scrollToSection(sectionId);
                }
                setActiveSection(sectionId);
                window.history.pushState(null, null, `#${sectionId}`);
              }}
              className={`text-base px-3 py-1 rounded-md transition-all duration-200 ${
                isActive && isAvailable
                  ? 'text-black bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)]'
                  : isAvailable
                    ? 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-lg'
                    : 'text-white/40 cursor-not-allowed opacity-50'
              }`}
            >
              {item}
            </a>
          );
        })}
      </nav>

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
            src="https://avatars.githubusercontent.com/u/71240832?v=4"
            alt="Profile"
            className="w-full h-full object-cover object-[50%_10%]"
            loading="eager"
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
          I&apos;m a recent Computer Science graduate with hands-on experience
          in web development, backend systems, and data-driven projects.
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

      {/* Experience Section */}
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

      {/* Contact Section */}
      <div
        id="contact"
        className="min-h-screen flex flex-col items-center justify-center text-white px-4 py-20"
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg mb-8 text-center">
          Let&apos;s Connect! 📧
        </h1>
        <p className="text-lg text-center text-white/80 mb-16 max-w-2xl">
          I&apos;m always open to discussing new opportunities, interesting
          projects, or just having a chat about technology.
        </p>

        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Email Card */}
          <div className="group bg-neutral-900/70 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 hover:-translate-y-2 hover:border-blue-400/50">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-white/70 mb-4">Drop me a line anytime</p>
              <a
                href="mailto:aitzazqk@gmail.com"
                className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-lg hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-300 text-blue-300 hover:text-blue-200"
              >
                aitzazqk@gmail.com
              </a>
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className="group bg-neutral-900/70 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">LinkedIn</h3>
              <p className="text-white/70 mb-4">
                Let&apos;s connect professionally
              </p>
              <a
                href="https://www.linkedin.com/in/aitzaz-qadir/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 hover:border-blue-500/50 transition-all duration-300 text-blue-400 hover:text-blue-300"
              >
                View Profile
              </a>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="group bg-neutral-900/70 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg hover:shadow-[0_0_30px_rgba(107,114,128,0.3)] transition-all duration-300 hover:-translate-y-2 hover:border-gray-400/50 md:col-span-2 lg:col-span-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-600/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-gray-600/30 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">GitHub</h3>
              <p className="text-white/70 mb-4">Check out my code</p>
              <a
                href="https://github.com/aitzaz-qadir"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-600/20 border border-gray-400/30 rounded-lg hover:bg-gray-600/30 hover:border-gray-400/50 transition-all duration-300 text-gray-300 hover:text-gray-200"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>

        {/* Additional Contact Info */}
        <div className="mt-16 text-center">
          <p className="text-white/60 mb-4">Based in Halifax, Nova Scotia 🇨🇦</p>
          <p className="text-white/60">Available for full-time opportunities</p>
        </div>
      </div>
    </div>
  );
}

export default App;
