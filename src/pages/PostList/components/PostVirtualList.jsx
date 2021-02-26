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
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {createSearch, FILTERS} from '../../../utils/filters';
import pages from '../..';

const StyledList = styled(List)`
  outline: 0;
`;

const StyledCard = styled(Card)`
  margin-bottom: ${({theme}) => theme.spacing(6)}px;
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
    if (!isRowLoaded({index})) return 'Loading...';
    const {id, post, user, storageUri, timestamp} = list[index];

    return (
      <StyledCard key={key} style={style} variant="outlined">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {post.category}
          </Typography>
          <Typography variant="h5" component="h2">
            {post.title}
          </Typography>
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
    );
  };

  return (
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
                  rowHeight={400}
                  width={width}
                  overscanRowCount={2}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      )}
    </WindowScroller>
  );
};

export default PostVirtualList;
