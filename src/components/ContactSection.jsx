import React from 'react';
import ContactCard from './ContactCard';
import contactsData from '../data/contacts.json';

// Contact section that displays all contact methods and additional info
const ContactSection = () => {
  return (
    <div
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center text-white px-4 py-20"
    >
      {/* Section header */}
      <h1 className="text-5xl font-extrabold drop-shadow-lg mb-8 text-center">
        Let&apos;s Connect! 📧
      </h1>
      <p className="text-lg text-center text-white/80 mb-16 max-w-2xl">
        I&apos;m always open to discussing new opportunities, interesting
        projects, or just having a chat about technology.
      </p>

      {/* Contact cards grid - data imported from contacts.json */}
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contactsData.map((contact) => (
          <div
            key={contact.id}
            className={
              contact.id === 'github' ? 'md:col-span-2 lg:col-span-1' : ''
            }
          >
            <ContactCard contact={contact} />
          </div>
        ))}
      </div>

      {/* Additional information */}
      <div className="mt-16 text-center">
        <p className="text-white/60 mb-4">Based in Toronto, Ontario 🇨🇦</p>
        <p className="text-white/60">Available for full-time opportunities</p>
      </div>
    </div>
  );
};

export default ContactSection;
