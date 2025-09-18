import React from 'react';
import PropTypes from 'prop-types';

// Navigation component that provides smooth scrolling between sections and visual feedback
const Navbar = ({
  isScrolled,
  activeSection,
  scrollToSection,
  scrollToExperience,
  setActiveSection,
}) => {
  return (
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
      {/* Loop through navigation items and create clickable links */}
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
  );
};

Navbar.propTypes = {
  isScrolled: PropTypes.bool.isRequired,
  activeSection: PropTypes.string.isRequired,
  scrollToSection: PropTypes.func.isRequired,
  scrollToExperience: PropTypes.func.isRequired,
  setActiveSection: PropTypes.func.isRequired,
};

export default Navbar;
