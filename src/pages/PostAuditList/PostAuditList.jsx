import React from 'react';
import styled from 'styled-components';
import {useFirestore, useFirestoreCollectionData} from 'reactfire';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {PostItem} from '../../components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CancelButton = styled(Button)`
  margin-right: ${({theme}) => theme.spacing(1)}px;
`;

const PostAuditList = () => {
  const postsRef = useFirestore().collection('posts');
  const postsQuery = postsRef
    .where('post.closed', '==', false)
    .where('post.reported', '==', true)
    .orderBy('timestamp', 'desc');
  const posts = useFirestoreCollectionData(postsQuery, {idField: 'id'});

  const handleCancelClick = (postId) => {
    postsRef.doc(postId).update({'post.reported': false});
  };

  const handleDeleteClick = (postId) => {
    postsRef.doc(postId).delete();
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Publicaciones reportadas:
      </Typography>
      {posts.length ? (
        posts.map((post) => (
          <PostItem
            key={post.id}
            actions={
              <>
                <CancelButton
                  color="primary"
                  variant="outlined"
                  onClick={() => handleCancelClick(post.id)}
                  disableRipple
                >
                  Cancelar
                </CancelButton>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => handleDeleteClick(post.id)}
                  disableRipple
                >
                  Eliminar
                </Button>
              </>
            }
            {...post}
          />
        ))
      ) : (
        <Typography variant="h6">No hay publicaciones reportadas.</Typography>
      )}
    </Container>
  );
};

export default PostAuditList;
