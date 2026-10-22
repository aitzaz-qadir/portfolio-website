import PropTypes from 'prop-types';
import LocationCard from './LocationCard';
import BooksCard from './BooksCard';
import CurrentProjectCard from './CurrentProjectCard';
import ResumeCard from './ResumeCard';
import ToolboxCard from './ToolboxCard';

// Card body for each about.json `type`
const CARD_TYPES = {
  location: LocationCard,
  book: BooksCard,
  project: CurrentProjectCard,
  resume: ResumeCard,
  toolbox: ToolboxCard,
};

// Shared card frame; the body is picked by the item's type
const AboutCard = ({ item }) => {
  const Card = CARD_TYPES[item.type];

  return (
    <div className="bg-neutral-900/70 backdrop-blur-md rounded-xl border border-blue-400/30 p-4 sm:p-5 lg:p-6 shadow-lg shadow-blue-500/10 h-full">
      <Card item={item} />
    </div>
  );
};

AboutCard.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.oneOf(Object.keys(CARD_TYPES)).isRequired,
  }).isRequired,
};

export default AboutCard;
