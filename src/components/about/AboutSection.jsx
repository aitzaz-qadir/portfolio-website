import AboutCard from './AboutCard';
import Section from '../ui/Section';
import aboutData from '../../data/about.json';
import { IconUser } from '@tabler/icons-react';

// Grid of about cards from about.json; cards flagged `wide` span two columns
const AboutSection = () => {
  return (
    <Section
      id="about"
      title={
        <>
          About Me
          <IconUser
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-blue-400 font-bold"
            stroke={2.5}
          />
        </>
      }
      titleClassName="mb-12 sm:mb-18 lg:mb-22 flex items-center justify-center gap-3"
    >
      <div className="max-w-full sm:max-w-4xl lg:max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {aboutData.map((item) => (
          <div key={item.id} className={item.wide ? 'sm:col-span-2' : ''}>
            <AboutCard item={item} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default AboutSection;
