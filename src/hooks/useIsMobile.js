import { useEffect, useState } from 'react';

// Matches Tailwind's `md` breakpoint: narrower than this counts as mobile
export const MOBILE_BREAKPOINT = 768;

const query = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

// True while the viewport is narrower than MOBILE_BREAKPOINT; updates only when that line is crossed
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isMobile;
};
