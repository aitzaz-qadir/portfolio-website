import React, { useEffect, useState, useMemo } from 'react';

const StarfieldBackground = () => {
  const [isClient, setIsClient] = useState(false);
  const [cometStates, setCometStates] = useState({});

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
        // Comet properties
        cometChance: Math.random() * 0.1 + 0.2, // 20-30% chance to become comet
        nextCometTime: Math.random() * 10000 + 5000, // 5-15 seconds until first comet (staggered)
        cometDirection: Math.random() * 360, // Random direction in degrees
      });
    }

    return starArray;
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Comet management
  useEffect(() => {
    if (!isClient) return;

    const intervals = stars.map((star) => {
      return setTimeout(() => {
        const triggerComet = () => {
          // Skip comet for stars that are hidden on mobile/tablet
          const isHiddenOnTablet = (star.id + 1) % 3 === 1; // 3n + 1 pattern
          const isHiddenOnMobile = star.id % 2 === 0; // 2n pattern

          // Check screen size and skip if star would be hidden
          const screenWidth = window.innerWidth;
          if (
            (screenWidth <= 768 && isHiddenOnTablet) ||
            (screenWidth <= 480 && isHiddenOnMobile)
          ) {
            // Schedule next potential comet without triggering
            const nextInterval = Math.random() * 30000 + 30000; // 30-60 seconds
            setTimeout(triggerComet, nextInterval);
            return;
          }

          if (Math.random() < star.cometChance) {
            // Activate comet
            setCometStates((prev) => ({
              ...prev,
              [star.id]: { active: true, startTime: Date.now() },
            }));

            // Deactivate comet after 2 seconds and schedule next one
            setTimeout(
              () => {
                setCometStates((prev) => ({
                  ...prev,
                  [star.id]: { active: false, startTime: null },
                }));
              },
              2000 + Math.random() * 5000 + 5000
            ); // 7-12 seconds total (2s comet + 5-10s wait)
          }

          // Schedule next potential comet
          const nextInterval = Math.random() * 30000 + 30000; // 30-60 seconds
          setTimeout(triggerComet, nextInterval);
        };

        triggerComet();
      }, star.nextCometTime);
    });

    return () => {
      intervals.forEach((interval) => clearTimeout(interval));
    };
  }, [isClient, stars]);

  // Don't render on server to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <div className="starfield-container">
      {stars.map((star) => {
        const cometState = cometStates[star.id];
        const isComet = cometState?.active;

        return (
          <React.Fragment key={star.id}>
            {/* Regular Star */}
            <div
              className={`star ${isComet ? 'comet-hidden' : ''}`}
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

            {/* Comet - Always rendered but conditionally visible */}
            <div
              className={`comet ${!isComet ? 'comet-inactive' : ''}`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size * 1.5}px`,
                height: `${star.size * 1.5}px`,
                '--comet-distance': `${Math.cos((star.cometDirection * Math.PI) / 180) * 300}px`,
                '--comet-distance-y': `${Math.sin((star.cometDirection * Math.PI) / 180) * 300}px`,
                '--comet-angle': `${star.cometDirection}deg`,
              }}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StarfieldBackground;
