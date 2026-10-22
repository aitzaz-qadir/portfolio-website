import PropTypes from 'prop-types';
import { IconArrowDown } from '@tabler/icons-react';
import PulseDot from '../ui/PulseDot';

// Landing screen: photo, availability status, intro text and a scroll-down button
const HeroSection = ({ scrollToExperience }) => {
  return (
    <section
      id="intro"
      className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8 pt-20"
    >
      <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-45 md:h-45 overflow-hidden rounded-full mb-4 sm:mb-6 md:mb-7 shadow-[0_0_20px_rgba(255,255,255,0.1)] border-2 border-white/10">
        <img
          src="/assets/profile-pic.jpg"
          alt="Aitzaz Qadir"
          className="w-full h-full object-cover object-[50%_10%]"
        />
      </div>

      {/* Availability pill with a pulsing green dot */}
      <div className="flex items-center justify-center w-auto max-w-xs sm:max-w-sm md:max-w-75 h-10 sm:h-12 bg-neutral-900/70 backdrop-blur-md rounded-full border border-white/20 text-white shadow-lg space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 mb-4 sm:mb-5 md:mb-6">
        <PulseDot className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        <span className="text-sm sm:text-base font-semibold whitespace-nowrap">
          Seeking a Full-Time Role
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-2 sm:mt-4 md:mt-6 mb-3 sm:mb-4 drop-shadow-lg text-center px-2">
        Hi, I&apos;m Aitzaz!
        <span role="img" aria-label="waving hand" className="animate-wave ml-2">
          👋
        </span>
      </h1>

      <p className="text-base sm:text-lg text-center max-w-sm sm:max-w-lg md:max-w-xl mb-4 sm:mb-6 font-semibold px-2">
        I&apos;m a Computer Science graduate (Dalhousie, 2024) building clinical
        training tools and full-stack apps. Currently at Nova Scotia Health.
      </p>

      <button
        onClick={scrollToExperience}
        className="scroll-button absolute bottom-6 sm:bottom-8 md:bottom-10 px-4 sm:px-6 py-2.5 sm:py-3 font-semibold text-white backdrop-blur-md bg-neutral-900/70 border border-white/10 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] touch-friendly"
      >
        <span className="flex items-center gap-2">
          <span className="text-sm sm:text-base">Scroll to Explore</span>
          <IconArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce-up-down" />
        </span>
      </button>
    </section>
  );
};

HeroSection.propTypes = {
  scrollToExperience: PropTypes.func.isRequired,
};

export default HeroSection;
