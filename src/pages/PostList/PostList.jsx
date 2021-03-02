// filtros: categoria, ciudad
// order by: fecha, cantidad sumados
// listado: ciudad, imagen, cantidad sumados, sumarse, creador, denunciar
import React, {useEffect, useState, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {useFirestore} from 'reactfire';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

import {FILTERS} from '../../utils/filters';
import useQuery from '../../hooks/useQuery';
import pages from '../';
import PostVirtualList from './components/PostVirtualList';
import Filters from './components/Filters';

const PAGE_SIZE = 2;

const PageTitle = styled(Typography)`
  margin-top: ${({theme}) => theme.spacing(4)}px;
  margin-bottom: ${({theme}) => theme.spacing(2)}px;
`;

const Container = styled.div`
  display: flex;
`;

const FabContainer = styled.div`
  width: 56px;
  margin-left: auto;
`;

const StyledFab = styled(Fab)`
  position: sticky;
  top: 85vh;
  margin-bottom: ${({theme}) => theme.spacing(2)}px;
`;

// TODO: implement filters (categoria/ciudad) and order (fecha/sumados)
const PostList = () => {
  const query = useQuery();
  const history = useHistory();
  const selectedCategory = query.get(FILTERS.CATEGORY);
  const [startAtPostSnapshot, setStartAtPostSnapshot] = useState();
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const postsRef = useFirestore().collection('posts');
  const [allPosts, setAllPosts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const nextStartAtPostSnapshotRef = useRef();

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
        if (selectedCategory)
          postsSnapshot = postsSnapshot.where(
            'post.category',
            '==',
            selectedCategory,
          );
        postsSnapshot = postsSnapshot.orderBy('timestamp', 'desc');
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
  }, [allPosts, startAtPostSnapshot, postsRef, hasNextPage, selectedCategory]);

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
          <StyledFab
            color="primary"
            aria-label="add"
            onClick={() => history.push(pages.PostCreate.path)}
          >
            <AddIcon />
          </StyledFab>
        </FabContainer>
      </Container>
    </>
  );
};

export default PostList;
