import React from 'react';
import './index.css';

// Smooth scroll function
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
    });
  } else {
    console.error(`Section with id ${sectionId} not found.`);
  }
};

// Main application component
function App() {
  return (
    <>
      {/* SVG filter */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="30"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 40 -20"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      {/* Blob container */}
      <div className="fixed inset-0 -z-50 overflow-hidden bg-gradient-to-t from-[#0a0a0a] via-[#0e0e0e] to-[#121212]">
        <div className="relative w-full h-full filter-[url(#blurMe)] blob-wrapper">
          {/* Magenta Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(255,0,128,0.7)_40%,_rgba(255,255,0,0)_60%)] w-[600px] h-[600px] top-[30%] left-[10%] animate-move0 rounded-full opacity-80 mix-blend-multiply"></div>
          {/* Purple Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(180,100,255,0.7)_40%,_rgba(255,0,128,0)_60%)] w-[750px] h-[750px] top-[10%] left-[30%] animate-move1 rounded-full opacity-80 mix-blend-multiply"></div>
          {/* Cyan Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(0,200,200,0.7)_40%,_rgba(0,255,255,0)_60%)] w-[900px] h-[900px] top-[25%] left-[70%] animate-move2 rounded-full opacity-80 mix-blend-multiply"></div>
          {/* Blue Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(80,160,255,0.7)_40%,_rgba(0,128,255,0)_60%)] w-[700px] h-[700px] top-[60%] left-[80%] animate-move3 rounded-full opacity-80 mix-blend-multiply"></div>
          {/* Red Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(255,60,60,0.7)_40%,_rgba(255,0,0,0)_60%)] w-[800px] h-[800px] top-[70%] left-[50%] animate-move4 rounded-full opacity-80 mix-blend-multiply"></div>
        </div>
      </div>
      {/* Navbar */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-neutral-900/70 backdrop-blur-md rounded-lg px-2 py-2 flex space-x-2 border border-white/20 shadow-lg font-bold">
        {['Intro', 'Experience', 'Projects', 'About', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(item.toLowerCase());
              window.history.pushState(null, null, `#${item.toLowerCase()}`);
            }}
            className="text-white text-base px-3 py-1 rounded-md transition-all duration-300 hover:bg-white/10 hover:shadow-lg"
          >
            {item}
          </a>
        ))}
      </nav>
      {/* Main content */}
      <div
        id="intro"
        className="min-h-screen flex items-center justify-center text-white"
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg animate-pulse">
          Intro 👋
        </h1>
      </div>
      <div
        id="experience"
        className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg animate-pulse">
          Experience 👔
        </h1>
      </div>
      <div
        id="projects"
        className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-green-900/20 to-emerald-900/20"
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg animate-pulse">
          Projects 🚀
        </h1>
      </div>
      <div
        id="about"
        className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-orange-900/20 to-red-900/20"
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg animate-pulse">
          About Me 👤
        </h1>
      </div>
      <div
        id="contact"
        className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-indigo-900/20 to-purple-900/20"
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg animate-pulse">
          Contact 📧
        </h1>
      </div>
    </>
  );
}

export default App;
