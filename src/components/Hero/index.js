import React from 'react';
import styled from 'styled-components';

const HeroImage = styled.div`
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: ${({height}) => height};
  background-image: url(${({image}) => image});
  position: relative;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100%;
  background: #00000036;
`;

const Hero = ({height = '500px', image, children}) => {
  return (
    <HeroImage height={height} image={image}>
      <Backdrop />
      {children && <Content>{children}</Content>}
    </HeroImage>
  );
};

export default Hero;
