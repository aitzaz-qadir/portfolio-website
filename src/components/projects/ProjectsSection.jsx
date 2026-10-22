import ProjectCard from './ProjectCard';
import Section from '../ui/Section';
import projectsData from '../../data/projects.json';
import { IconCode } from '@tabler/icons-react';

// Grid of project cards from projects.json
const ProjectsSection = () => {
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
      <div className="max-w-full sm:max-w-4xl lg:max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
        {projectsData.map((project) => (
          <div key={project.id} className="flex">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ProjectsSection;
