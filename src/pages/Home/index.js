import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
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
  justify-content: space-between;
  margin-bottom: ${({theme}) => theme.spacing(5)}px;
`;

const CardContainer = styled.div`
  flex-basis: 24%;
  margin-bottom: ${({theme}) => theme.spacing(3)}px;
  ${({theme}) => theme.breakpoints.down('md')} {
    flex-basis: 49%;
  }
  ${({theme}) => theme.breakpoints.down('sm')} {
    flex-basis: 100%;
  }
`;

const StyledCard = styled(Card)`
  margin: 0 auto;
  max-width: 290px;
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

const SeeAllCategories = styled(Button)`
  margin-left: ${({theme}) => theme.spacing(7)}px;
`;

const Category = ({name, path, Icon, className}) => (
  <CardContainer>
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
          Ver {name}
        </Button>
      </StyledCardActions>
    </StyledCard>
  </CardContainer>
);

const Home = () => (
  <>
    <OurMision />
    <Typography variant="h4" gutterBottom>
      Categorías
      <SeeAllCategories
        color="primary"
        component={Link}
        to={pages.PostList.path}
      >
        Ver todas
      </SeeAllCategories>
    </Typography>
    <CategoriesList>
      {Object.values(categories).map(({name, path, Icon}) => (
        <Category key={path} name={name} path={path} Icon={Icon} />
      ))}
    </CategoriesList>
  </>
);

export default Home;
