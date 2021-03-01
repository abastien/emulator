import { useState, useEffect } from 'react';

interface windowDimensionsInterface {
  width: number;
  height: number;
}

function getWindowDimensions(): windowDimensionsInterface {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

export default function useWindowDimensions(): windowDimensionsInterface {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}