import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import {categories, FILTERS, createSearch} from '../../../utils/filters';
import useQuery from '../../../hooks/useQuery';
import pages from '../../';

const Container = styled.div`
  width: 300px;
`;

const CategoryFilter = styled.div``;

const CategoriesList = styled(Typography)`
  display: flex;
  flex-direction: column;
`;

const Filters = () => {
  const query = useQuery();
  const selectedCategory = query.get(FILTERS.CATEGORY);

  return (
    <Container>
      <CategoryFilter>
        <Typography variant="h6" component="h3" gutterBottom>
          Categoría
        </Typography>
        <CategoriesList>
          {Object.values(categories).map((category) => (
            <Link
              key={category.path}
              component={NavLink}
              isActive={() => selectedCategory === category.path}
              to={{
                pathname: pages.PostList.path,
                search: createSearch({[FILTERS.CATEGORY]: category.path}),
              }}
              activeStyle={{fontWeight: 'bold'}}
            >
              {category.name}
            </Link>
          ))}
          <Link
            component={NavLink}
            isActive={() => !selectedCategory}
            to={pages.PostList.path}
            activeStyle={{fontWeight: 'bold'}}
          >
            Ver todas
          </Link>
        </CategoriesList>
      </CategoryFilter>
    </Container>
  );
};

export default Filters;
