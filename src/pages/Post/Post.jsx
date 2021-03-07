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

import useQuery from '../../hooks/useQuery';
import {FILTERS, getCategoryByPath} from '../../utils/filters';

const IMAGE_HEIGHT = 300;

const StyledPaper = styled(Paper)`
  position: relative;
  overflow: hidden;
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
  const {
    post,
    imageUrl,
    // user,
    // timestamp,
  } = useFirestoreDocDataOnce(postRef);

  return (
    <StyledPaper>
      {post ? (
        <>
          <Category gutterBottom label={post.category.toUpperCase()} />
          <PostImage post={post} imageUrl={imageUrl} />
          <Typography variant="h2" gutterBottom>
            {post.title}
          </Typography>
        </>
      ) : (
        <Typography variant="h2">
          Ninguna publicacion encontrada con ese id.
        </Typography>
      )}
    </StyledPaper>
  );
};

export default Post;
