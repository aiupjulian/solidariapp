import React from 'react';
import styled from 'styled-components';
import {
  AutoSizer,
  InfiniteLoader,
  WindowScroller,
  List,
} from 'react-virtualized';

import CircularProgress from '@material-ui/core/CircularProgress';

import {PostItem} from '../../../components';

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

const PostVirtualList = ({
  hasNextPage,
  isNextPageLoading,
  list,
  loadNextPage,
}) => {
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

    return <PostItem key={key} style={style} {...list[index]} />;
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
