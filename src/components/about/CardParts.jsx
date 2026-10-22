import PropTypes from 'prop-types';

// Fixed-height image frame at the top of an about card
export const CardMedia = ({ className = '', children }) => (
  <div
    className={`relative w-full h-40 sm:h-44 lg:h-48 mb-3 sm:mb-4 rounded-lg overflow-hidden ${className}`}
  >
    {children}
  </div>
);

// Centered title and description, with optional extra lines below
export const CardText = ({ title, description, children }) => (
  <div className="flex flex-col items-center text-center flex-grow justify-center">
    <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
    <p className="text-sm sm:text-base text-white/70 mb-2">{description}</p>
    {children}
  </div>
);

// Blue accent line under a card's description
export const CardHighlight = ({ className = '', children }) => (
  <div className={`text-lg sm:text-xl font-bold text-blue-400 ${className}`}>
    {children}
  </div>
);

CardMedia.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CardText.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  children: PropTypes.node,
};

CardHighlight.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
