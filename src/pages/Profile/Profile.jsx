// ver si se puede traer foto y datos de FB
// puntos de solidaridad
// listado de publicaciones creadas (para editar/borrar/cerrar)
// listado de publicaciones a las que te sumaste (?)
import React from 'react';
import {useFirestore, useUser, useFirestoreCollectionData} from 'reactfire';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import Chip from '@material-ui/core/Chip';

import {createSearch, FILTERS, getCategoryByPath} from '../../utils/filters';
import pages from '..';

const IMAGE_HEIGHT = 240;

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

const CardContainer = styled.div`
  height: 510px;
  width: 100%;
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

const StyledPostAvatar = styled(Avatar)`
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

const Post = ({id, post, user, imageUrl, timestamp}) => {
  const history = useHistory();
  const Icon = getCategoryByPath(post.category).Icon;
  const cardMediaProps = imageUrl ? {image: imageUrl} : {component: Icon};

  return (
    <CardContainer>
      <StyledCard variant="outlined">
        <Category label={post.category.toUpperCase()} />
        <StyledCardMedia title={post.title} {...cardMediaProps} />
        <CardContent>
          <Typography noWrap variant="h5">
            {post.title}
          </Typography>
          <PostInfoLine variant="subtitle1">
            <StyledPostAvatar src={user.photoURL} />
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

// TODO: show user profile and posts to edit/close
const Profile = () => {
  const user = useUser();
  const postsRef = useFirestore()
    .collection('posts')
    .where('user.uid', '==', user.uid)
    .orderBy('timestamp', 'desc');
  const posts = useFirestoreCollectionData(postsRef, {idField: 'id'});

  return (
    <Container>
      <UserData>
        <StyledAvatar src={user.photoURL} />
        <Typography variant="h4">{user.displayName}</Typography>
      </UserData>
      <Typography variant="h5">Publicaciones del usuario:</Typography>
      {posts.length ? (
        posts.map((post) => <Post key={post.id} {...post} />)
      ) : (
        <Typography variant="h6">No tenes publicaciones.</Typography>
      )}
    </Container>
  );
};

export default Profile;
