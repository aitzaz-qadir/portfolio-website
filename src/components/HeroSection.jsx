import React from 'react';
import PropTypes from 'prop-types';

// Hero section with profile, status, introduction text, and scroll button
const HeroSection = ({ scrollToExperience }) => {
  return (
    <div
      id="intro"
      className="relative min-h-screen flex flex-col items-center justify-center text-white px-4"
    >
      {/* Profile picture */}
      <div
        id="profile"
        className="w-45 h-45 overflow-hidden rounded-full mb-7 shadow-[0_0_20px_rgba(255,255,255,0.1)] border-2 border-white/10"
      >
        <img
          src="https://avatars.githubusercontent.com/u/71240832?v=4"
          alt="Profile"
          className="w-full h-full object-cover object-[50%_10%]"
          loading="eager"
        />
      </div>
      {/* Status indicator */}
      <div
        id="status"
        className="flex items-center justify-center w-75 h-12 bg-neutral-900/70 backdrop-blur-md rounded-full border border-white/20 text-white shadow-lg space-x-3 px-4 py-2"
      >
        <div className="relative w-3 h-3">
          <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
          <span className="absolute inline-flex w-full h-full rounded-full bg-green-500"></span>
        </div>
        <span className="text-base font-semibold">
          Seeking a Full-Time Role
        </span>
      </div>
      {/* Main introduction */}
      <h1 className="text-5xl font-extrabold mt-6 mb-4 drop-shadow-lg ">
        Hi, I&apos;m Aitzaz!
        <span role="img" aria-label="waving hand" className="animate-pulse">
          👋
        </span>
      </h1>
      <p className="text-lg text-center max-w-xl mb-6 font-semibold ">
        I&apos;m a recent Computer Science graduate with hands-on experience in
        web development, backend systems, and data-driven projects.
      </p>
      {/* Animated button to experience section */}
      <button
        onClick={scrollToExperience}
        className="scroll-button group absolute bottom-10 px-6 py-3 font-semibold text-white backdrop-blur-md bg-neutral-900/70 border border-white/10 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
      >
        <span className="flex items-center gap-2 relative z-10">
          Scroll to Explore
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="w-5 h-5 animate-bounce-up-down"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

HeroSection.propTypes = {
  scrollToExperience: PropTypes.func.isRequired,
};

export default HeroSection;
