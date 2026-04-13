import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handler = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Breakpoints for detached tool windows:
  // - xs: < 160px wide OR < 120px tall → only the core value (time, result)
  // - sm: < 240px wide OR < 200px tall → value + action buttons only
  // - md: < 340px wide OR < 300px tall → everything except secondary extras
  // - lg: >= 340px → full UI

  const isXs = size.width < 160 || size.height < 120;
  const isSm = !isXs && (size.width < 240 || size.height < 200);
  const isMd = !isXs && !isSm && (size.width < 340 || size.height < 300);

  return { ...size, isXs, isSm, isMd, isFull: !isXs && !isSm && !isMd };
}
