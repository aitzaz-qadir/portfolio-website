import PropTypes from 'prop-types';
import ToolCarousel from './ToolCarousel';
import {
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandJavascript,
  IconBrandReact,
  IconWind,
  IconBrandNodejs,
  IconBrandPython,
  IconDatabase,
  IconBrandGit,
  IconBrandGithub,
  IconSettings,
  IconBrandCpp,
  IconBrandKotlin,
  IconBrandUnity,
  IconBrandVisualStudio,
  IconBrandDocker,
  IconBrandAndroid,
  IconBrandFigma,
  IconTerminal2,
  IconBrandVite,
  IconBulb,
  IconClipboardList,
  IconTerminal,
  IconFileCode,
  IconChartBar,
  IconDiamond,
  IconBrandTypescript,
  IconLeaf,
  IconBrandFirebase,
  IconBrandAws,
} from '@tabler/icons-react';

// Icon for each tool name used in about.json
const iconMap = {
  HTML5: <IconBrandHtml5 size={28} />,
  CSS3: <IconBrandCss3 size={28} />,
  JavaScript: <IconBrandJavascript size={28} />,
  TypeScript: <IconBrandTypescript size={28} />,
  Java: <IconFileCode size={28} />,
  'Spring Boot': <IconLeaf size={28} />,
  C: <IconTerminal size={28} />,
  'C++': <IconBrandCpp size={28} />,
  'C#': <IconDiamond size={28} />,
  Python: <IconBrandPython size={28} />,
  React: <IconBrandReact size={28} />,
  R: <IconChartBar size={28} />,
  Kotlin: <IconBrandKotlin size={28} />,
  Tailwind: <IconWind size={28} />,
  Git: <IconBrandGit size={28} />,
  GitHub: <IconBrandGithub size={28} />,
  SQL: <IconDatabase size={28} />,
  PostgreSQL: <IconDatabase size={28} />,
  Firebase: <IconBrandFirebase size={28} />,
  AWS: <IconBrandAws size={28} />,
  Unity: <IconBrandUnity size={28} />,
  IntelliJ: <IconBulb size={28} />,
  'Visual Studio': <IconBrandVisualStudio size={28} />,
  JIRA: <IconClipboardList size={28} />,
  'Node.js': <IconBrandNodejs size={28} />,
  Vite: <IconBrandVite size={28} />,
  Linux: <IconTerminal2 size={28} />,
  Docker: <IconBrandDocker size={28} />,
  'Android Studio': <IconBrandAndroid size={28} />,
  Figma: <IconBrandFigma size={28} />,
};

// Pair tool names with their icons for the carousel
const toCarouselTools = (names) =>
  names.map((name) => ({ name, icon: iconMap[name] }));

// Header with a spinning gear, then two tool carousels scrolling opposite ways
const ToolboxCard = ({ item }) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center mb-4">
      <div className="group w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
        <IconSettings
          className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400 group-hover:animate-spin"
          stroke={2.5}
          style={{ animationDuration: '3s' }}
        />
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
        <p className="text-sm sm:text-base text-white/70">{item.description}</p>
      </div>
    </div>

    <div className="flex flex-col gap-4 flex-grow overflow-hidden justify-center">
      <ToolCarousel
        tools={toCarouselTools(item.tools)}
        direction="left"
        duration="44s"
      />
      <ToolCarousel
        tools={toCarouselTools(item.toolsSecond)}
        direction="right"
        duration="49s"
      />
    </div>
  </div>
);

ToolboxCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tools: PropTypes.arrayOf(PropTypes.string).isRequired,
    toolsSecond: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ToolboxCard;
