import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ExperienceCard from './ExperienceCard';

// Importing experience data from JSON file
import experiencesData from '../data/experiences.json';

// Experience section that displays all job experiences with timeline and scroll-triggered animations
const ExperienceSection = ({ hasNavigatedToExperience }) => {
  const [visibleCards, setVisibleCards] = useState(new Set());

  // Card visibility check function
  const checkCardVisibility = useCallback(() => {
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
  }, [hasNavigatedToExperience, visibleCards]);

  // If navigated via button, show first 3 cards immediately
  useEffect(() => {
    if (hasNavigatedToExperience) {
      setVisibleCards(new Set([0, 1, 2]));
    }
  }, [hasNavigatedToExperience]);

  // Scroll listener to trigger visibility checks
  useEffect(() => {
    const handleScroll = () => {
      checkCardVisibility();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    checkCardVisibility(); // Check on initial load

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [checkCardVisibility]);

  return (
    <div
      id="experience"
      className="min-h-screen flex flex-col items-center justify-center text-white px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-20"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-8 sm:mb-12 lg:mb-16 text-center px-2">
        Experience 👔
      </h1>
      <div className="max-w-full sm:max-w-3xl lg:max-w-4xl w-full relative">
        {/* Vertical timeline line - hidden on mobile, visible on sm+ */}
        <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 via-white/40 to-white/20 hidden sm:block"></div>

        {/* Loop through JSON to render each experience item */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
          {experiencesData.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              isVisible={visibleCards.has(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

ExperienceSection.propTypes = {
  hasNavigatedToExperience: PropTypes.bool.isRequired,
};

export default ExperienceSection;
