import React, { useEffect, useState, useMemo } from 'react';

const StarfieldBackground = () => {
  const [isClient, setIsClient] = useState(false);

  // Generate stars with random properties
  const stars = useMemo(() => {
    const starCount = 80; // Reduced for better performance
    const starArray = [];

    for (let i = 0; i < starCount; i++) {
      starArray.push({
        id: i,
        x: Math.random() * 100, // Position as percentage
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1, // Size between 1-3.5px
        twinkleDuration: Math.random() * 4 + 2, // 2-6 seconds
        twinkleDelay: Math.random() * 8, // Stagger the animations
        floatDuration: Math.random() * 15 + 25, // 25-40 seconds for more noticeable float
        floatDelay: Math.random() * 15,
        opacity: Math.random() * 0.6 + 0.4, // Base opacity 0.4-1
      });
    }

    return starArray;
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render on server to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <div className="starfield-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.twinkleDuration}s, ${star.floatDuration}s`,
            animationDelay: `${star.twinkleDelay}s, ${star.floatDelay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarfieldBackground;
