import React from 'react';
import PropTypes from 'prop-types';

const ExperienceCard = ({ experience, isVisible }) => {
  return (
    <div
      className={`relative flex items-start space-x-8 experience-card ${isVisible ? 'animate' : ''}`}
      style={{ animationDelay: experience.animationDelay }}
    >
      {/* Timeline dot */}
      <div className="relative z-10 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] border-2 border-white/20 flex-shrink-0 mt-6"></div>

      {/* Content card */}
      <div className="flex-1 bg-neutral-900/70 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{experience.title}</h3>
            <p className="text-lg text-white/80 font-semibold">
              {experience.company}
            </p>
          </div>
          <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full mt-2 sm:mt-0 self-start">
            {experience.period}
          </span>
        </div>

        <ul className="text-white/70 space-y-2 mb-4">
          {experience.responsibilities.map((responsibility, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-white/40">•</span>
              <span>{responsibility}</span>
            </li>
          ))}
        </ul>

        {/* Skill list */}
        <div className="flex flex-wrap gap-2 mt-1">
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
