import React from 'react';
import PropTypes from 'prop-types';

// Reusable component that renders a single experience item with timeline dot and content card
const ExperienceCard = ({ experience, isVisible }) => {
  return (
    <div
      className={`relative flex items-start space-x-4 sm:space-x-6 lg:space-x-8 experience-card ${isVisible ? 'animate' : ''}`}
      style={{ animationDelay: experience.animationDelay }}
    >
      {/* Timeline dot - smaller on mobile */}
      <div className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] border-2 border-white/20 flex-shrink-0 mt-4 sm:mt-6"></div>

      {/* Content card*/}
      <div className="flex-1 bg-neutral-900/70 backdrop-blur-md rounded-xl border border-white/20 p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1">
        {/* Job details */}
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
              {experience.title}
            </h3>
            <p className="text-base sm:text-lg text-white/80 font-semibold">
              {experience.company}
            </p>
          </div>
          <span className="text-xs sm:text-sm text-white/60 bg-white/10 px-2 sm:px-3 py-1 rounded-full self-start sm:self-center flex-shrink-0">
            {experience.period}
          </span>
        </div>

        {/* Job responsibilities */}
        <ul className="text-sm sm:text-base text-white/70 space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          {experience.responsibilities.map((responsibility, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-white/40 flex-shrink-0 mt-0.5">•</span>
              <span className="leading-relaxed">{responsibility}</span>
            </li>
          ))}
        </ul>

        {/* Skills list */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
          {experience.skills.map((skill) => (
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
  );
};

// Props to validate structure and types
ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    animationDelay: PropTypes.string.isRequired,
  }).isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default ExperienceCard;
