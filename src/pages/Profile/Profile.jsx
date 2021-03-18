// ver si se puede traer foto y datos de FB
// puntos de solidaridad
// listado de publicaciones creadas (para editar/borrar/cerrar)
// listado de publicaciones a las que te sumaste (?)
import React from 'react';
import {
  useFirestore,
  useUser,
  useFirestoreCollectionData,
  useFirestoreDocDataOnce,
} from 'reactfire';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import {PostItem} from '../../components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserData = styled(Paper)`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({theme}) => theme.spacing(5)}px 0;
  margin-bottom: ${({theme}) => theme.spacing(3)}px;
`;

const StyledAvatar = styled(Avatar)`
  width: ${({theme}) => theme.spacing(14)}px;
  height: ${({theme}) => theme.spacing(14)}px;
  margin-bottom: ${({theme}) => theme.spacing(3)}px;
`;

// TODO: show posts to edit
const Profile = () => {
  const user = useUser();
  const postsRef = useFirestore()
    .collection('posts')
    .where('user.uid', '==', user.uid)
    .orderBy('timestamp', 'desc');
  const posts = useFirestoreCollectionData(postsRef, {idField: 'id'});
  const userAcknowledgementsRef = useFirestore()
    .collection('acknowledgements')
    .doc(user.uid);
  const {acknowledgements = 0} = useFirestoreDocDataOnce(
    userAcknowledgementsRef,
  );

  return (
    <Container>
      <UserData>
        <StyledAvatar src={user.photoURL} />
        <Typography variant="h4" gutterBottom>
          {user.displayName}
        </Typography>
        <Typography variant="h5">
          Agradecimientos recibidos: {acknowledgements}
        </Typography>
      </UserData>
      <Typography variant="h5">Publicaciones del usuario:</Typography>
      {posts.length ? (
        posts.map((post) => <PostItem key={post.id} {...post} />)
      ) : (
        <Typography variant="h6">No tenes publicaciones.</Typography>
      )}
    </Container>
  );
};

export default Profile;
