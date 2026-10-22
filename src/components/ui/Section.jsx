import PropTypes from 'prop-types';

// Full-height page section with a centered heading; titleClassName sets the heading's spacing
const Section = ({ id, title, titleClassName = '', children }) => (
  <section
    id={id}
    className="min-h-screen flex flex-col items-center justify-center text-white px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-20"
  >
    <h2
      className={`text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg text-center px-2 ${titleClassName}`}
    >
      {title}
    </h2>
    {children}
  </section>
);

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  titleClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Section;
