import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import {categories, createSearch, FILTERS} from '../../utils/filters';
import pages from '../../pages';
import OurMision from './components/OurMision';

const CategoriesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;

const StyledCard = styled(Card)`
  min-width: 260px;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCardActions = styled(CardActions)`
  margin-top: ${({theme}) => theme.spacing(1)}px;
  display: flex;
  justify-content: flex-end;
`;

const Category = ({name, path, Icon, className}) => (
  <StyledCard className={className} variant="outlined">
    <StyledCardContent>
      <CardHeader title={name} />
      <Icon width={100} height={100} />
    </StyledCardContent>
    <StyledCardActions>
      <Button
        component={Link}
        to={{
          pathname: pages.PostList.path,
          search: createSearch({[FILTERS.CATEGORY]: path}),
        }}
        color="primary"
      >
        Ver publicaciones
      </Button>
    </StyledCardActions>
  </StyledCard>
);

const Home = () => {
  return (
    <>
      <h2>Categorías</h2>
      <CategoriesList>
        {Object.values(categories).map(({name, path, Icon}) => (
          <Category key={path} name={name} path={path} Icon={Icon} />
        ))}
      </CategoriesList>
      <OurMision />
    </>
  );
};

export default Home;
