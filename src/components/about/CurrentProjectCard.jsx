import PropTypes from 'prop-types';
import { CardMedia, CardText, CardHighlight } from './CardParts';

// Screenshot and name of what I'm working on right now
const CurrentProjectCard = ({ item }) => (
  <div className="flex flex-col h-full">
    <CardMedia className="shadow-lg bg-neutral-800/50">
      <img
        src={item.image}
        alt={item.content}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </CardMedia>

    <CardText title={item.title} description={item.description}>
      <CardHighlight>{item.content}</CardHighlight>
    </CardText>
  </div>
);

CurrentProjectCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CurrentProjectCard;
