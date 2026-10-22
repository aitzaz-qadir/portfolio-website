import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Mirror the max-width media queries in animations.css
const TABLET_MAX = 768;
const PHONE_MAX = 480;

const STAR_COUNT = 80;

const randomBetween = (min, max) => min + Math.random() * (max - min);

/*
 * Builds the random star set once per mount.
 * Sizes are px, positions are % of the viewport, times are seconds unless named *Ms.
 */
const makeStars = () =>
  Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    x: randomBetween(0, 100),
    y: randomBetween(0, 100),
    size: randomBetween(1, 3.5),
    opacity: randomBetween(0.4, 1),
    twinkleDuration: randomBetween(2, 6),
    twinkleDelay: randomBetween(0, 8),
    floatDuration: randomBetween(25, 40),
    floatDelay: randomBetween(0, 15),
    cometChance: randomBetween(0.2, 0.3),
    firstCometMs: randomBetween(5000, 15000),
    cometDirection: randomBetween(0, 360),
    // Thinned out on smaller screens (see .star-hide-* in animations.css)
    hideOnTablet: i % 3 === 0,
    hideOnMobile: i % 2 === 0,
  }));

/*
 * One star plus its comet, which share a position.
 * Every 30-60s the star may turn into a comet: the star hides, the comet shoots
 * (2s animation), and the star stays hidden for 7-12s in total before returning.
 */
const Star = ({ star }) => {
  const [isComet, setIsComet] = useState(false);

  useEffect(() => {
    let timer;
    const next = (fn, ms) => (timer = setTimeout(fn, ms));

    const tryComet = () => {
      const wait = randomBetween(30000, 60000);
      const width = window.innerWidth;
      const hidden =
        (width <= TABLET_MAX && star.hideOnTablet) ||
        (width <= PHONE_MAX && star.hideOnMobile);

      if (hidden || Math.random() >= star.cometChance) {
        next(tryComet, wait);
        return;
      }

      // Show the comet, then restore the star and wait out the rest of the interval
      const shown = randomBetween(7000, 12000);
      setIsComet(true);
      next(() => {
        setIsComet(false);
        next(tryComet, wait - shown);
      }, shown);
    };

    next(tryComet, star.firstCometMs);
    return () => clearTimeout(timer);
  }, [star]);

  const radians = (star.cometDirection * Math.PI) / 180;

  return (
    <>
      <div
        className={`star ${star.hideOnTablet ? 'star-hide-tablet' : ''} ${star.hideOnMobile ? 'star-hide-mobile' : ''} ${isComet ? 'comet-hidden' : ''}`}
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
      <div
        className={`comet ${isComet ? '' : 'comet-inactive'}`}
        style={{
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: `${star.size * 1.5}px`,
          height: `${star.size * 1.5}px`,
          '--comet-distance': `${Math.cos(radians) * 300}px`,
          '--comet-distance-y': `${Math.sin(radians) * 300}px`,
          '--comet-angle': `${star.cometDirection}deg`,
        }}
      />
    </>
  );
};

Star.propTypes = {
  star: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    opacity: PropTypes.number.isRequired,
    twinkleDuration: PropTypes.number.isRequired,
    twinkleDelay: PropTypes.number.isRequired,
    floatDuration: PropTypes.number.isRequired,
    floatDelay: PropTypes.number.isRequired,
    cometChance: PropTypes.number.isRequired,
    firstCometMs: PropTypes.number.isRequired,
    cometDirection: PropTypes.number.isRequired,
    hideOnTablet: PropTypes.bool.isRequired,
    hideOnMobile: PropTypes.bool.isRequired,
  }).isRequired,
};

// Fixed, full-screen animated star field behind the page
const StarfieldBackground = () => {
  const [stars] = useState(makeStars);

  return (
    <div className="starfield-container">
      {stars.map((star) => (
        <Star key={star.id} star={star} />
      ))}
    </div>
  );
};

export default StarfieldBackground;
