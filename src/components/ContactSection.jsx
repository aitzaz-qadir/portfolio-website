import React from 'react';
import ContactCard from './ContactCard';
import contactsData from '../data/contacts.json';

// Contact section that displays all contact methods and additional info
const ContactSection = () => {
  return (
    <div
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center text-white px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-20"
    >
      {/* Section header */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-4 sm:mb-6 lg:mb-8 text-center px-2">
        Let&apos;s Connect! 📧
      </h1>
      <p className="text-sm sm:text-base lg:text-lg text-center text-white/80 mb-8 sm:mb-12 lg:mb-16 max-w-sm sm:max-w-lg lg:max-w-2xl px-2">
        I&apos;m always open to discussing new opportunities, interesting
        projects, or just having a chat about technology.
      </p>

      {/* Contact cards grid - responsive layout */}
      <div className="max-w-full sm:max-w-2xl lg:max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {contactsData.map((contact) => (
          <div
            key={contact.id}
            className={`${
              contact.id === 'github' ? 'sm:col-span-2 lg:col-span-1' : ''
            }`}
          >
            <ContactCard contact={contact} />
          </div>
        ))}
      </div>

      {/* Additional information */}
      <div className="mt-8 sm:mt-12 lg:mt-16 text-center px-2">
        <p className="text-sm sm:text-base text-white/60 mb-2 sm:mb-4">
          Based in Toronto, Ontario 🇨🇦
        </p>
        <p className="text-sm sm:text-base text-white/60">
          Available for full-time opportunities
        </p>
      </div>
    </div>
  );
};

export default ContactSection;
