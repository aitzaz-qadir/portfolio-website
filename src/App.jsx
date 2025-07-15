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
      <div className="fixed inset-0 -z-50 overflow-hidde bg-black">
        <div className="relative w-full h-full filter-[url(#blurMe)] blur-3xl">
          <div className="absolute bg-[radial-gradient(circle_at_center,_rgba(255,0,128,0.5)_0%,_rgba(255,0,128,0)_60%)] w-[400px] h-[400px] top-[20%] left-[30%] animate-blob rounded-full opacity-70"></div>
          <div
            className="absolute bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.4)_0%,_rgba(0,255,255,0)_60%)] w-[300px] h-[300px] top-[60%] left-[20%] animate-blob rounded-full opacity-70"
            style={{ animationDelay: '5s' }}
          ></div>

          <div
            className="absolute bg-[radial-gradient(circle_at_center,_rgba(0,128,255,0.4)_0%,_rgba(0,128,255,0)_60%)] w-[350px] h-[350px] top-[40%] left-[65%] animate-blob rounded-full opacity-60"
            style={{ animationDelay: '10s' }}
          ></div>

          <div
            className="absolute bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.3)_0%,_rgba(255,0,0,0)_60%)] w-[500px] h-[500px] top-[10%] left-[10%] animate-blob rounded-full opacity-60"
            style={{ animationDuration: '30s' }}
          ></div>
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
