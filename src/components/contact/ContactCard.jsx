import React from 'react';
import PropTypes from 'prop-types';
import {
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
} from '@tabler/icons-react';

// Reusable component that renders a single contact method card
const ContactCard = ({ contact }) => {
  // Icon components for different contact methods
  const renderIcon = (iconType) => {
    const iconSize = 'w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10';
    const iconClassName = `${iconSize} ${contact.colorTheme.iconColor} transition-transform duration-300`;

    // Return appropriate Tabler icon based on iconType
    switch (iconType) {
      case 'email':
        return <IconMail className={iconClassName} stroke={2.5} />;
      case 'linkedin':
        return <IconBrandLinkedin className={iconClassName} stroke={2.5} />;
      case 'github':
        return <IconBrandGithub className={iconClassName} stroke={2.5} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`group bg-neutral-900/70 backdrop-blur-md rounded-xl border ${contact.colorTheme.border} p-4 sm:p-5 lg:p-6 shadow-lg ${contact.colorTheme.shadow} transition-all duration-300 hover:-translate-y-2 ${contact.colorTheme.borderHover} h-full`}
    >
      <div className="flex flex-col items-center text-center h-full">
        {/* Icon container with hover effects */}
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${contact.colorTheme.bg} rounded-full flex items-center justify-center mb-3 sm:mb-4 ${contact.colorTheme.bgHover} transition-colors duration-300`}
        >
          {renderIcon(contact.iconType)}
        </div>

        {/* Contact information */}
        <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight">
          {contact.title}
        </h3>
        <p className="text-sm sm:text-base text-white/70 mb-3 sm:mb-4 flex-grow leading-relaxed">
          {contact.description}
        </p>

        {/* Contact link/button */}
        <a
          href={contact.href}
          target={contact.iconType !== 'email' ? '_blank' : undefined}
          rel={contact.iconType !== 'email' ? 'noopener noreferrer' : undefined}
          className={`touch-friendly px-3 sm:px-4 py-2 ${contact.colorTheme.buttonBg} border ${contact.colorTheme.buttonBorder} rounded-lg ${contact.colorTheme.buttonBgHover} ${contact.colorTheme.buttonBorderHover} transition-all duration-300 ${contact.colorTheme.buttonTextColor} ${contact.colorTheme.buttonTextColorHover} text-sm sm:text-base font-medium focus-visible:focus-visible`}
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
    colorTheme: PropTypes.shape({
      bg: PropTypes.string.isRequired,
      bgHover: PropTypes.string.isRequired,
      border: PropTypes.string.isRequired,
      borderHover: PropTypes.string.isRequired,
      shadow: PropTypes.string.isRequired,
      buttonBg: PropTypes.string.isRequired,
      buttonBgHover: PropTypes.string.isRequired,
      buttonBorder: PropTypes.string.isRequired,
      buttonBorderHover: PropTypes.string.isRequired,
      iconColor: PropTypes.string.isRequired,
      buttonTextColor: PropTypes.string.isRequired,
      buttonTextColorHover: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ContactCard;
