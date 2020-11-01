import {useState, useEffect} from 'react';

import breakpoints from '../constants/breakpoints';

const useIsDesktop = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handler = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return screenWidth >= breakpoints.lg;
};

export default useIsDesktop;
