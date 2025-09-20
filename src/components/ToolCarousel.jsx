import React from 'react';
import PropTypes from 'prop-types';

// ToolCarousel component to display a scrolling list of tools
const ToolCarousel = ({ tools, direction = 'left', duration = '40s' }) => {
  const animationClass =
    direction === 'left' ? 'animate-moveLeft' : 'animate-moveRight';

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex flex-none py-0.5 gap-6 pr-6 ${animationClass}`}
        style={{ animationDuration: duration }}
      >
        {tools &&
          tools.concat(tools).map((tool, index) => (
            <div
              key={`${direction}-${index}`}
              className="flex items-center bg-white/10 rounded-lg px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base flex-shrink-0"
            >
              <span className="text-blue-400 mr-2 sm:mr-3">{tool.icon}</span>
              <span className="font-semibold">{tool.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

ToolCarousel.propTypes = {
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  direction: PropTypes.oneOf(['left', 'right']),
  duration: PropTypes.string,
};

export default ToolCarousel;
