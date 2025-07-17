import React from 'react';
import './index.css';

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
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      {/* Blob container */}
      <div className="fixed inset-0 -z-50 overflow-hidden bg-black">
        <div className="relative w-full h-full filter-[url(#blurMe)] blob-wrapper">
          {/* Yellow Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(255,255,0,0.7)_40%,_rgba(255,255,0,0)_60%)] w-[400px] h-[400px] top-[30%] left-[10%] animate-move0 rounded-full opacity-80"></div>
          {/* Pink Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(255,0,128,0.7)_40%,_rgba(255,0,128,0)_60%)] w-[550px] h-[550px] top-[20%] left-[30%] animate-move1 rounded-full opacity-80"></div>
          {/* Cyan Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.7)_40%,_rgba(0,255,255,0)_60%)] w-[650px] h-[650px] top-[60%] left-[20%] animate-move2 rounded-full opacity-80"></div>
          {/* Blue Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(0,128,255,0.7)_40%,_rgba(0,128,255,0)_60%)] w-[700px] h-[700px] top-[40%] left-[65%] animate-move3 rounded-full opacity-80"></div>
          {/* Red Blob */}
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.7)_40%,_rgba(255,0,0,0)_60%)] w-[800px] h-[800px] top-[10%] left-[10%] animate-move4 rounded-full opacity-80"></div>
        </div>
      </div>
      {/* Main content */}
      <div className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-5xl font-extrabold drop-shadow-lg animate-pulse">
          Hello, World! 🌍
        </h1>
      </div>
    </>
  );
}

export default App;
