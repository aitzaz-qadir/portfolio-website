import React from 'react';
import AboutCard from './AboutCard';
import aboutData from '../data/about.json';
import { IconUser } from '@tabler/icons-react';

// About section that displays various glimpses into my world
const AboutSection = () => {
  return (
    <div
      id="about"
      className="min-h-screen flex flex-col items-center justify-center text-white px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-20"
    >
      {/* Section header */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-4 sm:mb-6 text-center px-2 flex items-center justify-center gap-3">
          About Me
          <IconUser className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-400" />
        </h1>
      </div>

      {/* About cards grid - responsive layout */}
      <div className="max-w-full sm:max-w-4xl lg:max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {aboutData.map((item) => (
          <div
            key={item.id}
            className={`${
              // Make certain cards span multiple columns for visual interest
              item.id === 'toolbox' ? 'sm:col-span-2 lg:col-span-2' : ''
            }`}
          >
            <AboutCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
