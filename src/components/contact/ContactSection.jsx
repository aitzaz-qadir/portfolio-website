import ContactCard from './ContactCard';
import contactsData from '../../data/contacts.json';
import CanadaFlag from '../ui/CanadaFlag';
import Section from '../ui/Section';

// Intro line, contact cards from contacts.json, and a short footer note
const ContactSection = () => {
  return (
    <Section
      id="contact"
      title="Let's Connect! 📧"
      titleClassName="mb-4 sm:mb-6 lg:mb-8"
    >
      <p className="text-sm sm:text-base lg:text-lg text-center text-white/80 mb-8 sm:mb-12 lg:mb-16 max-w-sm sm:max-w-lg lg:max-w-2xl px-2">
        I&apos;m always open to discussing new opportunities, interesting
        projects, or just having a chat about technology.
      </p>

      <div className="max-w-full sm:max-w-2xl lg:max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {contactsData.map((contact) => (
          // A leftover last card fills its row in the 2-column layout
          <div
            key={contact.id}
            className="sm:last:odd:col-span-2 lg:last:odd:col-span-1"
          >
            <ContactCard contact={contact} />
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-12 lg:mt-16 text-center px-2">
        <p className="text-sm sm:text-base text-white/60 mb-2 sm:mb-4">
          Based in Toronto, Ontario <CanadaFlag />
        </p>
        <p className="text-sm sm:text-base text-white/60">
          Available for full-time opportunities
        </p>
      </div>
    </Section>
  );
};

export default ContactSection;
