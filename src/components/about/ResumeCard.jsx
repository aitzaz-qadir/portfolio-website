import PropTypes from 'prop-types';
import { IconSchool } from '@tabler/icons-react';
import { CardText } from './CardParts';

// School icon, short blurb and a resume download button
const ResumeCard = ({ item }) => (
  <div className="flex flex-col items-center text-center h-full">
    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
      <IconSchool
        className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-400"
        stroke={2.5}
      />
    </div>

    <CardText title={item.title} description={item.description} />

    <a
      href={item.downloadUrl}
      className="touch-friendly inline-block mt-1 px-3 sm:px-4 py-2 bg-white/10 hover:bg-blue-500/20 border border-white/30 hover:border-blue-400/50 rounded-lg text-white hover:text-blue-300 text-sm sm:text-base font-medium transition-all duration-300"
    >
      {item.buttonText}
    </a>
  </div>
);

ResumeCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    downloadUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResumeCard;
