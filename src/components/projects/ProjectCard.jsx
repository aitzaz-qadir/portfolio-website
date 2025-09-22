import React from 'react';
import PropTypes from 'prop-types';
import { IconExternalLink, IconBrandGithub } from '@tabler/icons-react';

// Individual project card component
const ProjectCard = ({ project }) => {
  const {
    title,
    description,
    technologies,
    githubUrl,
    liveUrl,
    imageUrl,
    status,
  } = project;

  return (
    <div className="group bg-neutral-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-4 sm:p-6 hover:border-white/20 hover:bg-neutral-900/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10">
      {/* Project Image */}
      {imageUrl && (
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {status && (
            <div className="absolute top-2 right-2">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  status === 'completed'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : status === 'in-progress'
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}
              >
                {status.replace('-', ' ')}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Project Title */}
      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors duration-300">
        {title}
      </h3>

      {/* Project Description */}
      <p className="text-white/70 mb-4 text-sm sm:text-base leading-relaxed">
        {description}
      </p>

      {/* Technologies */}
      {technologies && technologies.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-md border border-white/20 hover:bg-white/20 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 hover:scale-105 focus-visible:focus-visible"
          >
            <IconBrandGithub className="w-4 h-4" />
            <span className="text-sm font-medium">Code</span>
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded-lg transition-all duration-200 hover:scale-105 focus-visible:focus-visible"
          >
            <IconExternalLink className="w-4 h-4" />
            <span className="text-sm font-medium">Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string),
    githubUrl: PropTypes.string,
    liveUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    status: PropTypes.oneOf(['completed', 'in-progress', 'planned']),
  }).isRequired,
};

export default ProjectCard;
