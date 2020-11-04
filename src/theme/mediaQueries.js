import breakpoints from '../constants/breakpoints';

const mediaQueries = {
  lg: `@media screen and (min-width: ${breakpoints.lg}px)`,
  md: `@media screen and (max-width: ${breakpoints.md}px)`,
  sm: `@media screen and (max-width: ${breakpoints.sm}px)`,
};

export default mediaQueries;
