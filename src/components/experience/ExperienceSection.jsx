import { useState, useEffect, useRef } from 'react';
import ExperienceCard from './ExperienceCard';
import Section from '../ui/Section';
import experiencesData from '../../data/experiences.json';

// Job list; each card slides in as it scrolls into view
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
    <Section
      id="experience"
      title="Experience 👔"
      titleClassName="mb-8 sm:mb-12 lg:mb-16"
    >
      <div className="max-w-full sm:max-w-3xl lg:max-w-4xl w-full relative">
        <div ref={listRef} className="space-y-6 sm:space-y-8 lg:space-y-12">
          {experiencesData.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              isVisible={visibleCards.has(index)}
              delay={`${(index + 1) * 0.1}s`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ExperienceSection;
