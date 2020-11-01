import {css} from 'styled-components';

const sm = css`
  padding: 0 15px;
  ${(props) => props.theme.breakpoints.lg} {
    padding: 0;
    width: 540px;
    margin: 0 auto;
  }
`;

const lg = css`
  padding: 0 15px;
  ${(props) => props.theme.breakpoints.lg} {
    padding: 0;
    width: 900px;
    margin: 0 auto;
  }
`;

export default {
  sm,
  lg,
};
