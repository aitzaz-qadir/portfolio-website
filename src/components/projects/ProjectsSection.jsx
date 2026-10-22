import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ProjectCard from './ProjectCard';
import Section from '../ui/Section';
import projectsData from '../../data/projects.json';
import {
  IconCode,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';

// Side arrow for the strip; hidden on phones, where swiping replaces it
const ArrowButton = ({ direction, disabled, onClick }) => {
  const Icon = direction === 'left' ? IconChevronLeft : IconChevronRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Previous projects' : 'Next projects'}
      className="hidden sm:flex shrink-0 w-10 h-10 items-center justify-center rounded-full bg-neutral-900/70 border border-white/20 text-white/70 hover:text-white hover:bg-white/10 active:scale-90 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
    >
      <Icon className="w-6 h-6" />
    </button>
  );
};

ArrowButton.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Horizontal strip of project cards from projects.json, with side arrows
const ProjectsSection = () => {
  const stripRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Enable each arrow only while there is more to scroll that way
  const updateArrows = () => {
    const el = stripRef.current;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, []);

  // Scroll by one card plus its gap
  const scrollByCard = (dir) => {
    const el = stripRef.current;
    const step =
      el.firstElementChild.offsetWidth +
      parseFloat(getComputedStyle(el).columnGap);
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <Section
      id="projects"
      title={
        <>
          My Projects
          <IconCode
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-green-400 font-bold"
            stroke={2.5}
          />
        </>
      }
      titleClassName="mb-12 sm:mb-18 lg:mb-22 flex items-center justify-center gap-3"
    >
      <div className="w-full max-w-full sm:max-w-5xl lg:max-w-7xl flex items-center gap-2 sm:gap-3">
        <ArrowButton
          direction="left"
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
        />
        <div
          ref={stripRef}
          onScroll={updateArrows}
          className="carousel-strip flex-1 min-w-0 flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 lg:gap-8 px-3 py-4 scroll-px-3"
        >
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="flex shrink-0 snap-start w-[85%] sm:w-[calc((100%_-_1.5rem)/2)] lg:w-[calc((100%_-_4rem)/3)]"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        <ArrowButton
          direction="right"
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
        />
      </div>
    </Section>
  );
};

export default ProjectsSection;
