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
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import {createSearch, FILTERS, getCategoryByPath} from '../../../utils/filters';
import pages from '../..';

const IMAGE_HEIGHT = 240;

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
  position: relative;
  max-width: 550px;
  width: 100%;
`;

const Category = styled(Chip)`
  position: absolute;
  top: ${IMAGE_HEIGHT - 36}px;
  right: 0;
  margin-right: ${({theme}) => theme.spacing(1)}px;
  z-index: 1;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: ${({theme}) => theme.spacing(1)}px;
`;

const StyledCardMedia = styled(CardMedia)`
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  background-color: ${({theme}) => theme.palette.grey['600']};
  opacity: 0.6;
`;

const PostInfoLine = styled(Typography)`
  display: flex;
  align-items: center;
  padding: ${({theme}) => theme.spacing(1)}px 0;
  > svg {
    margin-right: ${({theme}) => theme.spacing(1)}px;
  }
`;

const PostInfoLineText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
          <Category label={post.category.toUpperCase()} />
          <StyledCardMedia title={post.title} {...cardMediaProps} />
          <CardContent>
            <Typography noWrap variant="h5">
              {post.title}
            </Typography>
            <PostInfoLine variant="subtitle1">
              <StyledAvatar src={user.photoURL} />
              <PostInfoLineText>{user.displayName}</PostInfoLineText>
            </PostInfoLine>
            <PostInfoLine color="textSecondary">
              <LocationOnIcon />
              <PostInfoLineText>
                {post.city.locale_names[0]}, {post.city.administrative[0]}
              </PostInfoLineText>
            </PostInfoLine>
            <PostInfoLine color="textSecondary">
              <EventIcon />
              <PostInfoLineText>
                {timestamp.toDate().toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </PostInfoLineText>
            </PostInfoLine>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() =>
                history.push(
                  pages.Post.path.concat(createSearch({[FILTERS.ID]: id})),
                )
              }
              disableRipple
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
                    rowHeight={510}
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
