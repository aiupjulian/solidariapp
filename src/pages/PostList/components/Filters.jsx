import React from 'react';
import styled, {css} from 'styled-components';
import {useHistory} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import {categories, FILTERS, orderBy} from '../../../utils/filters';
import useQuery from '../../../hooks/useQuery';
import pages from '../../';
import CityInput from './CityInput';
import KeywordInput from './KeywordInput';

const Container = styled.div`
  width: 300px;
`;

const FilterContainer = styled.div`
  margin-bottom: ${({theme}) => theme.spacing(1)}px;
`;

const CategoriesList = styled(Typography)`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(({isActive, ...rest}) => <Link {...rest} />)`
  width: fit-content;
  ${(props) =>
    props.isActive &&
    css`
      font-weight: bold;
    `};
`;

const Filters = () => {
  const query = useQuery();
  const selectedCategory = query.get(FILTERS.CATEGORY);
  const [by = orderBy[0].by, order = orderBy[0].order] =
    query.get(FILTERS.ORDER_BY)?.split(',') || [];
  const history = useHistory();

  const selectedOrderBy = orderBy.find(
    (element) => element.by === by && element.order === order,
  );

  return (
    <Container>
      <FilterContainer>
        <Typography variant="h6" component="h3" gutterBottom>
          Palabras clave
        </Typography>
        <KeywordInput />
      </FilterContainer>
      <FilterContainer>
        <Typography variant="h6" component="h3" gutterBottom>
          Ordenar por
        </Typography>
        <Select
          value={selectedOrderBy}
          variant="outlined"
          fullWidth
          onChange={(event) => {
            const value = event.target.value;
            const orderBySearch = `${value.by},${value.order}`;
            query.delete(FILTERS.ORDER_BY);
            query.append(FILTERS.ORDER_BY, orderBySearch);
            history.push(pages.PostList.path.concat('?', query.toString()));
          }}
        >
          {orderBy.map((element, index) => (
            <MenuItem key={index} value={element}>
              {element.label}
            </MenuItem>
          ))}
        </Select>
      </FilterContainer>
      <FilterContainer>
        <Typography variant="h6" component="h3" gutterBottom>
          Categoría
        </Typography>
        <CategoriesList>
          {Object.values(categories).map((category) => (
            <StyledLink
              key={category.path}
              component="button"
              variant="body1"
              isActive={selectedCategory === category.path}
              onClick={() => {
                query.delete(FILTERS.CATEGORY);
                query.append(FILTERS.CATEGORY, category.path);
                history.push(pages.PostList.path.concat('?', query.toString()));
              }}
            >
              {category.name}
            </StyledLink>
          ))}
          <StyledLink
            component="button"
            variant="body1"
            isActive={!selectedCategory}
            onClick={() => {
              query.delete(FILTERS.CATEGORY);
              history.push(pages.PostList.path.concat('?', query.toString()));
            }}
          >
            Ver todas
          </StyledLink>
        </CategoriesList>
      </FilterContainer>
      <FilterContainer>
        <Typography variant="h6" component="h3" gutterBottom>
          Ciudad
        </Typography>
        <CityInput />
      </FilterContainer>
    </Container>
  );
};

export default Filters;
