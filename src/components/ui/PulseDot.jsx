import PropTypes from 'prop-types';

// Green status dot with a fading ping ring; size comes from className (e.g. "w-3 h-3")
const PulseDot = ({ className = 'w-2 h-2' }) => (
  <span className={`relative inline-flex ${className}`}>
    <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
    <span className="absolute inline-flex w-full h-full rounded-full bg-green-500"></span>
  </span>
);

PulseDot.propTypes = {
  className: PropTypes.string,
};

export default PulseDot;
