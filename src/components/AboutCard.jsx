import React from 'react';
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
  IconMapPin,
  IconUser,
  IconBook,
  IconCode,
  IconSettings,
  IconSchool,
} from '@tabler/icons-react';

// Icon mapping for tools
const iconMap = {
  HTML5: <IconBrandHtml5 size={28} />,
  CSS3: <IconBrandCss3 size={28} />,
  JavaScript: <IconBrandJavascript size={28} />,
  React: <IconBrandReact size={28} />,
  Tailwind: <IconWind size={28} />,
  'Node.js': <IconBrandNodejs size={28} />,
  Python: <IconBrandPython size={28} />,
  MySQL: <IconDatabase size={28} />,
  Git: <IconBrandGit size={28} />,
  GitHub: <IconBrandGithub size={28} />,
};

// Transform tools to use Tabler icons
const transformTools = (tools) => {
  return tools.map((tool) => ({
    ...tool,
    icon: iconMap[tool.name] || tool.icon,
  }));
};

// Reusable component for displaying different aspects of my life/work
const AboutCard = ({ item }) => {
  // Render different content types based on the item type
  const renderContent = () => {
    switch (item.type) {
      case 'location':
        return (
          <div className="flex flex-col h-full">
            {/* Map Container */}
            <div className="relative w-full h-40 sm:h-44 lg:h-48 mb-3 sm:mb-4 rounded-lg overflow-hidden">
              {item.mapImage ? (
                <img
                  src={item.mapImage}
                  alt="Toronto Map"
                  className="h-full w-full object-cover"
                />
              ) : (
                // Fallback map placeholder
                <div className="h-full w-full bg-gradient-to-br from-blue-900/50 to-blue-700/50 flex items-center justify-center">
                  <IconMapPin className="w-12 h-12 text-blue-400/50" />
                </div>
              )}

              {/* Animated Location Pin with Profile Picture */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full outline-2 sm:outline-3 outline-blue-400 flex justify-center items-center">
                {/* Background circle */}
                <div className="absolute inset-0 rounded-full bg-blue-400 -z-10"></div>

                {/* Animated pulse ring */}
                <div
                  className="absolute inset-0 rounded-full bg-blue-400 -z-20 animate-ping"
                  style={{ animationDuration: '2s' }}
                ></div>

                {/* Profile Picture */}
                {item.profileImage ? (
                  <img
                    src={item.profileImage}
                    alt="Profile"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-500 flex items-center justify-center">
                    <IconUser className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Location Info */}
            <div className="flex flex-col items-center text-center flex-grow justify-center">
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-white/70 mb-2">
                {item.description}
              </p>
              <div className="text-lg sm:text-xl font-bold text-blue-400">
                {item.content}
              </div>
            </div>
          </div>
        );

      case 'book':
        return (
          <div className="flex flex-col h-full">
            {/* Book Cover Container - matching map window size */}
            <div className="relative w-full h-40 sm:h-44 lg:h-48 mb-3 sm:mb-4 rounded-lg overflow-hidden shadow-lg bg-neutral-800/50">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.content}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <IconBook className="w-8 h-8 text-white/50" />
                </div>
              )}
            </div>

            {/* Book Info */}
            <div className="flex flex-col items-center text-center flex-grow justify-center">
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-white/70 mb-2">
                {item.description}
              </p>
              <div className="text-lg sm:text-xl font-bold text-blue-400 mb-1">
                {item.content}
              </div>
              {item.author && (
                <div className="text-sm text-white/60">by {item.author}</div>
              )}
            </div>
          </div>
        );

      case 'project':
        return (
          <div className="flex flex-col items-center text-center h-full">
            <div className="w-full h-40 sm:h-44 lg:h-48 mb-3 sm:mb-4 rounded-lg overflow-hidden shadow-lg bg-neutral-800/50">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.content}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <IconCode className="w-12 h-12 text-white/50" />
                </div>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm sm:text-base text-white/70 mb-2">
              {item.description}
            </p>
            <div className="text-lg sm:text-xl font-bold text-blue-400">
              {item.content}
            </div>
          </div>
        );

      case 'toolbox':
        return (
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 group flex-shrink-0">
                <IconSettings
                  className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400 group-hover:animate-spin transition-transform duration-300 flex-shrink-0"
                  stroke={2.5}
                  style={{
                    animationDuration: '3s',
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
                <p className="text-sm sm:text-base text-white/70">
                  {item.description}
                </p>
              </div>
            </div>
            {/* Carousel Container */}
            <div className="flex flex-col gap-4 flex-grow overflow-hidden justify-center">
              <ToolCarousel
                tools={transformTools(item.tools)}
                direction="left"
                duration="40s"
              />
              <ToolCarousel
                tools={transformTools(item.tools)}
                direction="right"
                duration="35s"
              />
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="flex flex-col items-center text-center h-full">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-3 sm:mb-4 group">
              <IconSchool
                className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-400 group-hover:animate-spin transition-transform duration-300"
                stroke={2.5}
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm sm:text-base text-white/70 mb-3 flex-grow">
              {item.description}
            </p>
            {item.downloadUrl ? (
              <a
                href={item.downloadUrl}
                download
                className="touch-friendly px-3 sm:px-4 py-2 bg-white/10 border border-white/30 rounded-lg hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 text-white hover:text-blue-300 text-sm sm:text-base font-medium focus-visible:focus-visible inline-block"
              >
                {item.buttonText || 'Download Resume'}
              </a>
            ) : (
              <button className="touch-friendly px-3 sm:px-4 py-2 bg-white/10 border border-white/30 rounded-lg hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 text-white hover:text-blue-300 text-sm sm:text-base font-medium focus-visible:focus-visible">
                {item.buttonText || 'Download Resume'}
              </button>
            )}
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center text-center h-full">
            <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm sm:text-base text-white/70 flex-grow">
              {item.description}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-neutral-900/70 backdrop-blur-md rounded-xl border border-blue-400/30 p-4 sm:p-5 lg:p-6 shadow-lg shadow-blue-500/10 h-full">
      {renderContent()}
    </div>
  );
};

AboutCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'location',
      'book',
      'project',
      'toolbox',
      'education',
    ]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    content: PropTypes.string,
    image: PropTypes.string,
    author: PropTypes.string,
    mapImage: PropTypes.string,
    profileImage: PropTypes.string,
    buttonText: PropTypes.string,
    downloadUrl: PropTypes.string,
    tools: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default AboutCard;
