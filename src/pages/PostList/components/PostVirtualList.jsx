// filtros: categoria, ciudad
// order by: fecha, cantidad sumados
// listado: ciudad, imagen, cantidad sumados, sumarse, creador, denunciar
import React from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {
  AutoSizer,
  InfiniteLoader,
  WindowScroller,
  List,
} from 'react-virtualized';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import {createSearch, FILTERS, getCategoryByPath} from '../../../utils/filters';
import pages from '../..';

const ListWrapper = styled.div`
  flex: 1 1 auto;
  max-width: 620px;
`;

const StyledList = styled(List)`
  outline: 0;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled(Card)`
  max-width: 550px;
  width: 100%;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 240px;
  background-color: grey;
  opacity: 0.6;
  > g {
    transform: translate(250px, 0);
  }
`;

const PostVirtualList = ({
  hasNextPage,
  isNextPageLoading,
  list,
  loadNextPage,
}) => {
  const history = useHistory();
  const rowCount = hasNextPage ? list.length + 1 : list.length;
  const loadMoreRows = isNextPageLoading ? () => {} : loadNextPage;
  const isRowLoaded = ({index}) => !hasNextPage || index < list.length;

  const rowRenderer = ({index, key, style}) => {
    if (!isRowLoaded({index}))
      return (
        <CardContainer key={key} style={style}>
          <CircularProgress />
        </CardContainer>
      );
    const {id, post, user, imageUrl, timestamp} = list[index];
    const Icon = getCategoryByPath(post.category).Icon;
    const cardMediaProps = imageUrl ? {image: imageUrl} : {component: Icon};

    return (
      <CardContainer key={key} style={style}>
        <StyledCard variant="outlined">
          <StyledCardMedia title={post.title} {...cardMediaProps} />
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {post.category}
            </Typography>
            <Typography variant="h5">{post.title}</Typography>
            <Typography color="textSecondary">
              {post.city.locale_names[0]}, {post.city.administrative[0]}
            </Typography>
            <Typography variant="body2" component="p">
              {post.description}
              <br />
              {user.displayName}
              <br />
              {timestamp.toDate().toDateString()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() =>
                history.push(
                  pages.Post.path.concat(createSearch({[FILTERS.ID]: id})),
                )
              }
            >
              Ver mas
            </Button>
          </CardActions>
        </StyledCard>
      </CardContainer>
    );
  };

  return (
    <ListWrapper>
      <WindowScroller>
        {({height, isScrolling, onChildScroll, scrollTop}) => (
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={rowCount}
            minimumBatchSize={1}
            threshold={1}
          >
            {({onRowsRendered, registerChild}) => (
              <AutoSizer disableHeight>
                {({width}) => (
                  <StyledList
                    autoHeight
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    ref={registerChild}
                    onRowsRendered={onRowsRendered}
                    rowRenderer={rowRenderer}
                    rowCount={rowCount}
                    rowHeight={480}
                    width={width}
                    overscanRowCount={2}
                    noRowsRenderer={() => <div>No hay publicaciones</div>}
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        )}
      </WindowScroller>
    </ListWrapper>
  );
};

export default PostVirtualList;