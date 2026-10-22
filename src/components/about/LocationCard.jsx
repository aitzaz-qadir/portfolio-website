import PropTypes from 'prop-types';
import { CardMedia, CardText, CardHighlight } from './CardParts';
import CanadaFlag from '../ui/CanadaFlag';

// Map with a pulsing profile-photo pin, plus the current city
const LocationCard = ({ item }) => (
  <div className="flex flex-col h-full">
    <CardMedia>
      <img
        src={item.mapImage}
        alt={`Map of ${item.content}`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />

      {/* Pin: solid circle, ping ring behind it, photo on top */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full outline-2 sm:outline-3 outline-blue-400 flex justify-center items-center">
        <div className="absolute inset-0 rounded-full bg-blue-400 -z-10"></div>
        <div
          className="absolute inset-0 rounded-full bg-blue-400 -z-20 animate-ping"
          style={{ animationDuration: '2s' }}
        ></div>
        <img
          src={item.profileImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white"
        />
      </div>
    </CardMedia>

    <CardText
      title={item.title}
      description={
        <>
          {item.description} <CanadaFlag />
        </>
      }
    >
      <CardHighlight>{item.content}</CardHighlight>
    </CardText>
  </div>
);

LocationCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    mapImage: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default LocationCard;
