import React from 'react';
import ProjectCard from './ProjectCard';
import projectsData from '../../data/projects.json';
import { IconCode } from '@tabler/icons-react';

// Projects section that displays my portfolio projects
const ProjectsSection = () => {
  return (
    <div
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center text-white px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-20"
    >
      {/* Section header */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-4 sm:mb-6 text-center px-2 flex items-center justify-center gap-3">
          My Projects
          <IconCode
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-green-400 font-bold"
            stroke={2.5}
          />
        </h1>
      </div>

      {/* Projects grid - responsive layout */}
      <div className="max-w-full sm:max-w-4xl lg:max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {projectsData.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
