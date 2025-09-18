import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ExperienceCard from './ExperienceCard';
import experiencesData from '../data/experiences.json';

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

  // Handle navigation to experience section
  useEffect(() => {
    if (hasNavigatedToExperience) {
      setVisibleCards(new Set([0, 1, 2]));
    }
  }, [hasNavigatedToExperience]);

  // Add scroll listener for card visibility
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
