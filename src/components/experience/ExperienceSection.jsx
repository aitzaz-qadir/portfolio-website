import { useState, useEffect, useRef } from 'react';
import ExperienceCard from './ExperienceCard';

// Importing experience data from JSON file
import experiencesData from '../../data/experiences.json';

// Experience section that displays all job experiences with timeline and scroll-triggered animations
const ExperienceSection = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const listRef = useRef(null);

  // Reveal each card once, when its top passes 80% of the viewport height
  useEffect(() => {
    const cards = [...listRef.current.querySelectorAll('.experience-card')];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = cards.indexOf(entry.target);
          setVisibleCards((prev) => new Set(prev).add(index));
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -20% 0px' }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="experience"
      className="min-h-screen flex flex-col items-center justify-center text-white px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-20"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-8 sm:mb-12 lg:mb-16 text-center px-2">
        Experience 👔
      </h1>
      <div className="max-w-full sm:max-w-3xl lg:max-w-4xl w-full relative">
        {/* Loop through JSON to render each experience item */}
        <div ref={listRef} className="space-y-6 sm:space-y-8 lg:space-y-12">
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

export default ExperienceSection;
