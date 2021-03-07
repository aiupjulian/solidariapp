// datos del usuario que publico
// datos de la publicacion: imagenes/texto
// personas que se "sumaron"
// posibilidad para el usuario que publica que pueda agradecer a los que elija de los que se sumaron
// reportar publicacion
// compartir en facebook?
import React from 'react';
import {useFirestore, useFirestoreDocDataOnce} from 'reactfire';
import styled, {css} from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';

import useQuery from '../../hooks/useQuery';
import {FILTERS, getCategoryByPath} from '../../utils/filters';

const IMAGE_HEIGHT = 300;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 800px;
`;

const PostImageContainer = styled.div`
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  ${(props) =>
    props.imageUrl
      ? css`
          background-image: url(${props.imageUrl});
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        `
      : css`
          background-color: ${({theme}) => theme.palette.grey['600']};
          opacity: 0.6;
          > svg {
            display: block;
            height: ${IMAGE_HEIGHT}px;
            width: ${IMAGE_HEIGHT}px;
            margin: 0 auto;
          }
        `}
`;

const Category = styled(Chip)`
  position: absolute;
  top: ${IMAGE_HEIGHT - 36}px;
  right: 0;
  margin-right: ${({theme}) => theme.spacing(1)}px;
  z-index: 1;
`;

const PostContent = styled.div`
  padding: ${({theme}) => theme.spacing(1)}px ${({theme}) => theme.spacing(2)}px;
  ${({theme}) => theme.breakpoints.up('sm')} {
    padding: ${({theme}) => theme.spacing(2)}px
      ${({theme}) => theme.spacing(5)}px;
  }
`;

const StyledAvatar = styled(Avatar)`
  margin-right: ${({theme}) => theme.spacing(1)}px;
`;

const PostInfoLine = styled(Typography)`
  display: flex;
  align-items: center;
  padding: ${({theme}) => theme.spacing(1)}px 0;
  > svg {
    margin-right: ${({theme}) => theme.spacing(1)}px;
  }
`;

const Description = styled(Typography)`
  margin: ${({theme}) => theme.spacing(3)}px 0
    ${({theme}) => theme.spacing(3)}px;
`;

const PostImage = ({post, imageUrl}) => {
  const Icon = getCategoryByPath(post.category).Icon;

  return (
    <PostImageContainer imageUrl={imageUrl}>
      {!imageUrl && <Icon />}
    </PostImageContainer>
  );
};

// TODO: implement
// - si es de otro: sumarse o reportar
// - si es mia: agradecer sobre lista de usuarios sumados
const Post = () => {
  const query = useQuery();
  const postRef = useFirestore().collection('posts').doc(query.get(FILTERS.ID));
  const {post, imageUrl, user, timestamp} = useFirestoreDocDataOnce(postRef);

  return (
    <Container>
      <StyledPaper>
        {post ? (
          <>
            <Category gutterBottom label={post.category.toUpperCase()} />
            <PostImage post={post} imageUrl={imageUrl} />
            <PostContent>
              <Typography variant="h3" gutterBottom>
                {post.title}
              </Typography>
              <PostInfoLine variant="subtitle1">
                <StyledAvatar src={user.photoURL} />
                {user.displayName}
              </PostInfoLine>
              <PostInfoLine color="textSecondary">
                <LocationOnIcon />
                {post.city.locale_names[0]}, {post.city.administrative[0]}
              </PostInfoLine>
              <PostInfoLine color="textSecondary">
                <EventIcon />
                {timestamp.toDate().toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </PostInfoLine>
              <Description variant="body1">{post.description}</Description>
            </PostContent>
          </>
        ) : (
          <Typography variant="h3">
            Ninguna publicacion encontrada con ese id.
          </Typography>
        )}
      </StyledPaper>
    </Container>
  );
};

export default Post;
