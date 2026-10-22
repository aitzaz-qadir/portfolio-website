import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sections from '../../data/sections.json';
import { useIsMobile } from '../../hooks/useIsMobile';

// Classes for each nav layout; active styling is shared
const LINK_STYLES = {
  desktop: {
    base: 'text-base px-3 py-1 rounded-md',
    inactive:
      'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-lg',
  },
  mobile: {
    base: 'touch-button block w-full text-left px-4 py-3 rounded-lg',
    inactive: 'text-white/70 hover:text-white hover:bg-white/10',
  },
};
const ACTIVE_LINK =
  'text-black bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)]';

// One section link; scrolls in-page instead of jumping
const NavLink = ({ name, layout, isActive, onSelect }) => {
  const sectionId = name.toLowerCase();
  const { base, inactive } = LINK_STYLES[layout];

  return (
    <a
      href={`#${sectionId}`}
      aria-current={isActive ? 'location' : undefined}
      onClick={(e) => {
        e.preventDefault();
        onSelect(sectionId);
      }}
      className={`${base} transition-all duration-200 ${isActive ? ACTIVE_LINK : inactive}`}
    >
      {name}
    </a>
  );
};

NavLink.propTypes = {
  name: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(['desktop', 'mobile']).isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

/*
 * Site navigation, rendered as one of two layouts:
 * - desktop: centered pill bar that docks to the top once the page scrolls
 * - mobile: top bar with a hamburger that opens a slide-out panel
 * Links smooth-scroll to their section and update the URL hash and active highlight.
 */
const Navbar = ({
  isScrolled,
  activeSection,
  scrollToSection,
  setActiveSection,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Panel's top edge in px: just under the bar, measured on open (the menu closes on scroll, so the bar can't move while open)
  const [panelTop, setPanelTop] = useState(0);
  const barRef = useRef(null);
  const isMobile = useIsMobile();

  // Close the mobile menu on any click outside it, or on scroll
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const close = () => setIsMobileMenuOpen(false);
    const handleClickOutside = (event) => {
      if (!event.target.closest('.mobile-nav')) close();
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', close);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', close);
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => {
    if (!isMobileMenuOpen) {
      setPanelTop(barRef.current.getBoundingClientRect().bottom + 8);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setActiveSection(sectionId);
    window.history.pushState(null, null, `#${sectionId}`);
    setIsMobileMenuOpen(false);
  };

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
        {sections.map((name) => (
          <NavLink
            key={name}
            name={name}
            layout="desktop"
            isActive={activeSection === name.toLowerCase()}
            onSelect={handleNavClick}
          />
        ))}
      </nav>
    );
  }

  // Mobile layers: top bar (z-50) > slide-out panel (z-40) > dim overlay (z-30)
  return (
    <>
      <nav
        ref={barRef}
        className={`mobile-nav fixed z-50 transition-all duration-200 ease-in-out bg-neutral-900/95 backdrop-blur-xl shadow-md
          ${isScrolled ? 'top-0' : 'top-4'} 
        left-4 right-4 px-4 py-3 flex items-center justify-between font-bold
          ${
            isScrolled
              ? 'rounded-b-lg border-l border-r border-b border-white/20'
              : 'rounded-lg border border-white/20'
          }`}
      >
        <div className="text-white font-bold text-lg">Portfolio</div>

        {/* Hamburger; its three bars morph into an X while open */}
        <button
          onClick={toggleMenu}
          className="touch-friendly text-white/70 hover:text-white transition-colors duration-200 p-2"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
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

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Panel floats under the bar; stays mounted so it can slide, inert keeps it out of tab order while closed */}
      <div
        id="mobile-menu"
        inert={!isMobileMenuOpen}
        style={{ top: panelTop }}
        className={`mobile-nav fixed z-40 right-4 bottom-4 w-64 bg-neutral-900/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-[calc(100%_+_1rem)]'
        }`}
      >
        <div className="p-4">
          <div className="space-y-4">
            {sections.map((name) => (
              <NavLink
                key={name}
                name={name}
                layout="mobile"
                isActive={activeSection === name.toLowerCase()}
                onSelect={handleNavClick}
              />
            ))}
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
  setActiveSection: PropTypes.func.isRequired,
};

export default Navbar;
