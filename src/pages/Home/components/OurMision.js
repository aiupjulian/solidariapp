import React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import {Love} from '../../../assets/icons';

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  > svg {
    width: 300px;
    height: 300px;
    /* padding: ${({theme}) => theme.spacing.md}; */
  }
  ${({theme}) => theme.breakpoints.down('md')} {
    flex-direction: column;
    > svg {
      width: 150px;
      height: 150px;
    }
  }
`;

const Content = styled.div`
  max-width: 800px;
  /* padding: ${({theme}) => theme.spacing.md}; */
  > h2 {
    text-align: center;
    color: ${({theme}) => theme.palette.secondary};
  }
`;

const OurMision = () => (
  <Section>
    <Love />
    <Content>
      <h2>Our Mision at Solidariapp</h2>
      <p>
        orem ipsum dolor sit amet, consectetur adipiscing elit. Duis in neque ut
        augue dictum vehicula. Curabitur elementum viverra purus, vel tempus
        velit. Proin elementum molestie congue. Duis feugiat elit enim, ut
        suscipit lacus facilisis sed. Ut scelerisque dolor a vulputate rutrum.
        Praesent nulla lorem, convallis eu justo gravida, volutpat rutrum augue.
      </p>
      <Button>See all</Button>
    </Content>
  </Section>
);

export default OurMision;
