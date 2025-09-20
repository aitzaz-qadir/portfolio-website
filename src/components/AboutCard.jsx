import React from 'react';
import PropTypes from 'prop-types';
import ToolCarousel from './ToolCarousel';

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
                  <svg
                    className="w-12 h-12 text-blue-400/50"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
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
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
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
                  <svg
                    className="w-8 h-8 text-white/50"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
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
                  <svg
                    className="w-12 h-12 text-white/50"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
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
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
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
                tools={item.tools}
                direction="left"
                duration="40s"
              />
              <ToolCarousel
                tools={item.tools}
                direction="right"
                duration="35s"
              />
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="flex flex-col items-center text-center h-full">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm sm:text-base text-white/70 mb-3 flex-grow">
              {item.description}
            </p>
            <button className="touch-friendly px-3 sm:px-4 py-2 bg-white/10 border border-white/30 rounded-lg hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 text-white hover:text-blue-300 text-sm sm:text-base font-medium focus-visible:focus-visible">
              {item.buttonText || 'Download Resume'}
            </button>
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
    tools: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default AboutCard;
