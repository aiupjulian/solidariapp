// listado de usuarios mas solidarios (top 10)
import React from 'react';
import {Link} from 'react-router-dom';

import {categories, createSearch, FILTERS} from '../../utils/filters';
import pages from '../../pages';
import {Hero} from '../../components';
import Card from '../../components/Card';
import styled from 'styled-components';
import OurMision from './components/OurMision';
import useIsDesktop from '../../hooks/useIsDesktop';

const Home = () => {
  const isDesktop = useIsDesktop();
  const categoriesLinks = (
    <CategoriesList>
      {Object.values(categories).map(({name, path, Icon}) => (
        <Link
          key={name}
          to={{
            pathname: pages.PostList.path,
            search: createSearch({[FILTERS.CATEGORY]: path}),
          }}
        >
          <StyledCard>
            <Icon />
            <span>{name}</span>
          </StyledCard>
        </Link>
      ))}
    </CategoriesList>
  );
  return (
    <>
      {isDesktop ? (
        <Hero image="https://images.unsplash.com/photo-1518914781460-a3ada465edec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80">
          <HeroContent>
            <h1>Solidariapp</h1>
            {categoriesLinks}
          </HeroContent>
        </Hero>
      ) : (
        <MobileCategories>
          <h2>Categorías</h2>
          {categoriesLinks}
        </MobileCategories>
      )}
      <OurMision />
    </>
  );
};

export default Home;

const CategoriesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: white;
  }
`;

const StyledCard = styled(Card)`
  background: #ffffff3d;
  > svg {
    width: 100px;
    height: 100px;
  }
  > span {
    margin-top: ${({theme}) => theme.spacing.sm};
    color: white;
  }
  ${({theme}) => theme.mediaQueries.md} {
    width: 100px;
    height: 100px;
    > svg {
      width: 50px;
      height: 50px;
    }
    > span {
      color: ${({theme}) => theme.colors.gray1};
    }
  }
`;

const MobileCategories = styled.div`
  margin-top: 60px;
  padding: ${({theme}) => theme.spacing.sm};
  display: flex;
  justify-content: center;
  flex-direction: column;
  > h2 {
    text-align: center;
    color: ${({theme}) => theme.colors.gray2};
  }
`;
