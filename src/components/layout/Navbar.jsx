import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Navigation component that provides smooth scrolling between sections and visual feedback
const Navbar = ({
  isScrolled,
  activeSection,
  scrollToSection,
  scrollToExperience,
  setActiveSection,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile/tablet
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close mobile menu when clicking outside or on scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (item, sectionId) => {
    const isAvailable = [
      'intro',
      'experience',
      'projects',
      'about',
      'contact',
    ].includes(sectionId);

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
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const navigationItems = [
    'Intro',
    'Experience',
    'Projects',
    'About',
    'Contact',
  ];

  // Desktop Navigation
  if (!isMobile) {
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
        {navigationItems.map((item) => {
          const sectionId = item.toLowerCase();
          const isActive = activeSection === sectionId;
          const isAvailable = [
            'intro',
            'experience',
            'projects',
            'about',
            'contact',
          ].includes(sectionId);

          return (
            <a
              key={item}
              href={`#${sectionId}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item, sectionId);
              }}
              className={`text-base px-3 py-1 rounded-md transition-all duration-200 focus-visible:focus-visible ${
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
  }

  // Mobile Navigation
  return (
    <>
      {/* Mobile Navbar */}
      <nav
        className={`mobile-nav fixed z-50 transition-all duration-200 ease-in-out bg-neutral-900/95 backdrop-blur-xl shadow-md
          ${isScrolled ? 'top-0' : 'top-4'} 
        left-4 right-4 px-4 py-3 flex items-center justify-between font-bold
          ${
            isScrolled
              ? 'rounded-b-lg border-l border-r border-b border-white/20'
              : 'rounded-lg border border-white/20'
          }`}
      >
        {/* Logo/Brand */}
        <div className="text-white font-bold text-lg">Portfolio</div>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="touch-friendly text-white/70 hover:text-white focus-visible:focus-visible transition-colors duration-200 p-2"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-200 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-opacity duration-200 mt-1 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-200 mt-1 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`mobile-nav fixed z-50 top-0 right-0 h-full w-64 bg-neutral-900/95 backdrop-blur-xl border-l border-white/20 shadow-2xl transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 pt-20">
          <div className="space-y-4">
            {navigationItems.map((item) => {
              const sectionId = item.toLowerCase();
              const isActive = activeSection === sectionId;
              const isAvailable = [
                'intro',
                'experience',
                'projects',
                'about',
                'contact',
              ].includes(sectionId);

              return (
                <a
                  key={item}
                  href={`#${sectionId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item, sectionId);
                  }}
                  className={`touch-button block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 focus-visible:focus-visible ${
                    isActive && isAvailable
                      ? 'text-black bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)]'
                      : isAvailable
                        ? 'text-white/70 hover:text-white hover:bg-white/10'
                        : 'text-white/40 cursor-not-allowed opacity-50'
                  }`}
                >
                  {item}
                  {!isAvailable && (
                    <span className="block text-xs text-white/40 mt-1">
                      Coming Soon
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
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
