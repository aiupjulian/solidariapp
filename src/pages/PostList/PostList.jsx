import React, {useEffect, useState, useRef, useMemo} from 'react';
import styled from 'styled-components';
import {useFirestore, useUser} from 'reactfire';
import {Link} from 'react-router-dom';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

import {FILTERS, orderBy} from '../../utils/filters';
import useQuery from '../../hooks/useQuery';
import pages from '../';
import PostVirtualList from './components/PostVirtualList';
import Filters from './components/Filters';
import {useJoinModalSet} from '../../contexts/JoinModalContext';

const PAGE_SIZE = 2;

const PageTitle = styled(Typography)`
  margin-bottom: ${({theme}) => theme.spacing(2)}px;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  ${({theme}) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

const FabContainer = styled.div`
  width: 56px;
  margin-left: auto;
  ${({theme}) => theme.breakpoints.down('sm')} {
    position: absolute;
    margin-right: -80px;
    height: 100%;
    right: 0;
  }
  @media (max-width: 725px) {
    margin-right: 0;
  }
  ${({theme}) => theme.breakpoints.down('xs')} {
    margin-right: 0;
  }
`;

const StyledFab = styled(Fab)`
  position: sticky;
  top: 85vh;
  margin-bottom: ${({theme}) => theme.spacing(2)}px;
`;

const PostList = () => {
  const query = useQuery();
  const selectedCategory = query.get(FILTERS.CATEGORY);
  const [by = orderBy[0].by, order = orderBy[0].order] =
    query.get(FILTERS.ORDER_BY)?.split(',') || [];
  const selectedCity = query.get(FILTERS.CITY);
  const keywords = query.get(FILTERS.KEYWORDS);
  const [startAtPostSnapshot, setStartAtPostSnapshot] = useState();
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const postsRef = useFirestore().collection('posts');
  const [allPosts, setAllPosts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const nextStartAtPostSnapshotRef = useRef();
  const setShowJoinModal = useJoinModalSet();
  const user = useUser();

  useEffect(() => {
    setStartAtPostSnapshot();
    nextStartAtPostSnapshotRef.current = undefined;
    setIsNextPageLoading(false);
    setAllPosts([]);
    setHasNextPage(true);
  }, [selectedCategory, by, order, selectedCity, keywords]);

  useEffect(() => {
    if (
      hasNextPage &&
      (!nextStartAtPostSnapshotRef.current ||
        (nextStartAtPostSnapshotRef.current &&
          startAtPostSnapshot &&
          nextStartAtPostSnapshotRef.current.id === startAtPostSnapshot.id))
    ) {
      const get = async () => {
        let posts = [];
        let postsSnapshot = postsRef;
        postsSnapshot = postsSnapshot.where('post.closed', '==', false);
        if (selectedCategory) {
          postsSnapshot = postsSnapshot.where(
            'post.category',
            '==',
            selectedCategory,
          );
        }
        if (selectedCity) {
          postsSnapshot = postsSnapshot.where(
            'post.city.objectID',
            '==',
            selectedCity,
          );
        }
        if (keywords) {
          const keywordsArray = keywords.toLowerCase().split(' ');
          postsSnapshot = postsSnapshot.where(
            'post.keywords',
            'array-contains-any',
            keywordsArray,
          );
        }
        postsSnapshot = postsSnapshot.orderBy(by, order);
        if (startAtPostSnapshot)
          postsSnapshot = postsSnapshot.startAt(startAtPostSnapshot);
        postsSnapshot = await postsSnapshot.limit(PAGE_SIZE).get();
        postsSnapshot.forEach((doc) => {
          posts = posts.concat({id: doc.id, ...doc.data()});
        });
        const newHasNextPage = posts.length === PAGE_SIZE;
        if (newHasNextPage) posts = posts.slice(0, posts.length - 1);
        nextStartAtPostSnapshotRef.current =
          postsSnapshot.docs[postsSnapshot.size - 1];
        setHasNextPage(newHasNextPage);
        setAllPosts([...allPosts, ...posts]);
        setIsNextPageLoading(false);
      };
      get();
    }
  }, [
    allPosts,
    startAtPostSnapshot,
    postsRef,
    hasNextPage,
    selectedCategory,
    by,
    order,
    selectedCity,
    keywords,
  ]);

  const createPostProps = useMemo(
    () =>
      user
        ? {component: Link, to: pages.PostCreate.path}
        : {onClick: () => setShowJoinModal(true)},
    [user, setShowJoinModal],
  );

  const loadNextPage = () => {
    setIsNextPageLoading(true);
    setStartAtPostSnapshot(nextStartAtPostSnapshotRef.current);
  };

  return (
    <>
      <PageTitle variant="h4" component="h2">
        Listado de publicaciones
      </PageTitle>
      <Container>
        <Filters />
        <PostVirtualList
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          list={allPosts}
          loadNextPage={loadNextPage}
        />
        <FabContainer>
          <StyledFab color="primary" aria-label="add" {...createPostProps}>
            <AddIcon />
          </StyledFab>
        </FabContainer>
      </Container>
    </>
  );
};

export default PostList;
