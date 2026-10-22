import PropTypes from 'prop-types';
import {
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
} from '@tabler/icons-react';

// Per-platform icon and accent colors
const PLATFORMS = {
  email: {
    Icon: IconMail,
    iconBg: 'bg-blue-500/20 group-hover:bg-blue-500/30',
    iconColor: 'text-blue-400',
    hoverBorder: 'hover:border-blue-400/50',
  },
  linkedin: {
    Icon: IconBrandLinkedin,
    iconBg: 'bg-blue-600/20 group-hover:bg-blue-600/30',
    iconColor: 'text-blue-500',
    hoverBorder: 'hover:border-blue-500/50',
  },
  github: {
    Icon: IconBrandGithub,
    iconBg: 'bg-gray-600/20 group-hover:bg-gray-600/30',
    iconColor: 'text-blue-400',
    hoverBorder: 'hover:border-blue-400/50',
  },
};

// One contact method: icon, title, description and a link button
const ContactCard = ({ contact }) => {
  const { Icon, iconBg, iconColor, hoverBorder } = PLATFORMS[contact.iconType];
  const isExternal = contact.iconType !== 'email';

  return (
    <div
      className={`group h-full bg-neutral-900/70 backdrop-blur-md rounded-xl border border-white/20 ${hoverBorder} p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 hover:-translate-y-2`}
    >
      <div className="flex flex-col items-center text-center h-full">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${iconBg} rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-colors duration-300`}
        >
          <Icon
            className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ${iconColor}`}
            stroke={2.5}
          />
        </div>

        <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight">
          {contact.title}
        </h3>
        <p className="text-sm sm:text-base text-white/70 mb-3 sm:mb-4 flex-grow leading-relaxed">
          {contact.description}
        </p>

        <a
          href={contact.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={`touch-friendly px-3 sm:px-4 py-2 bg-white/10 hover:bg-blue-500/20 border border-white/30 ${hoverBorder} rounded-lg text-white hover:text-blue-300 text-sm sm:text-base font-medium transition-all duration-300`}
        >
          {contact.buttonText}
        </a>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    iconType: PropTypes.oneOf(['email', 'linkedin', 'github']).isRequired,
  }).isRequired,
};

export default ContactCard;
