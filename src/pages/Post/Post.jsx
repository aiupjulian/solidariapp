// datos del usuario que publico
// datos de la publicacion: imagenes/texto
// personas que se "sumaron"
// posibilidad para el usuario que publica que pueda agradecer a los que elija de los que se sumaron
// reportar publicacion
// compartir en facebook?
import React, {useEffect, useState} from 'react';
import {useFirestore, useFirestoreDocData, useUser} from 'reactfire';
import styled, {css} from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import useQuery from '../../hooks/useQuery';
import {FILTERS, getCategoryByPath} from '../../utils/filters';
import {FacebookButton} from '../../components';
import UsersLikesModal from './components/UsersLikesModal';
import {useJoinModalSet} from '../../contexts/JoinModalContext';

const IMAGE_HEIGHT = 300;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  white-space: pre-wrap;
`;

const FacebookLink = styled.a`
  text-decoration: none;
  ${({theme}) => theme.breakpoints.down('sm')} {
    margin-top: ${({theme}) => theme.spacing(2)}px;
  }
`;

const PostImage = ({post, imageUrl}) => {
  const Icon = getCategoryByPath(post.category).Icon;

  return (
    <PostImageContainer imageUrl={imageUrl}>
      {!imageUrl && <Icon />}
    </PostImageContainer>
  );
};

const CommentsContainer = styled.div`
  margin: ${({theme}) => theme.spacing(4)}px auto
    ${({theme}) => theme.spacing(3)}px;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-around;
  ${({theme}) => theme.breakpoints.down('sm')} {
    align-items: center;
    flex-direction: column;
  }
`;

const loadFacebookScript = (callback) => {
  const existingScript = document.getElementById('facebook');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src =
      'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v10.0&appId=1331253950398350';
    script.id = 'facebook';
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
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
    user: postUser,
    timestamp,
    likes,
  } = useFirestoreDocData(postRef);
  const loggedUser = useUser();
  const [showUsersLikesModal, setShowUsersLikesModal] = useState(false);
  const setShowJoinModal = useJoinModalSet();

  useEffect(() => {
    loadFacebookScript(() => {
      if (window.FB) {
        window.FB.XFBML.parse();
      }
    });
  }, []);

  const handleUsersLikesModalOpen = () => {
    setShowUsersLikesModal(true);
  };

  const handleUsersLikesModalClose = () => {
    setShowUsersLikesModal(false);
  };

  const postBelongsToLoggedUser = loggedUser?.uid === postUser?.uid;
  const userLikesPost =
    !postBelongsToLoggedUser &&
    likes.users.find((user) => user?.uid === loggedUser?.uid);

  const handleLikeClick = () => {
    const newUsersLikes = userLikesPost
      ? likes.users.filter((user) => user?.uid !== loggedUser?.uid)
      : [
          ...likes.users,
          {
            displayName: loggedUser.displayName,
            email: loggedUser.email,
            photoURL: loggedUser.photoURL,
            uid: loggedUser.uid,
          },
        ];
    const newCountLikes = userLikesPost ? likes.count - 1 : likes.count + 1;
    postRef.update({
      'likes.count': newCountLikes,
      'likes.users': newUsersLikes,
    });
  };

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    window.location.href,
  )}&display=page`;

  return (
    <Container>
      <UsersLikesModal
        open={showUsersLikesModal}
        handleClose={handleUsersLikesModalClose}
        likes={likes}
        postRef={postRef}
      />
      <StyledPaper>
        {post ? (
          <>
            <Category label={post.category.toUpperCase()} />
            <PostImage post={post} imageUrl={imageUrl} />
            <PostContent>
              <Typography variant="h3" gutterBottom>
                {post.title}
              </Typography>
              <PostInfoLine variant="subtitle1">
                <StyledAvatar src={postUser.photoURL} />
                {postUser.displayName}
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
              <PostActions>
                {postBelongsToLoggedUser ? (
                  <Button
                    disableRipple
                    variant="contained"
                    color="primary"
                    startIcon={<FavoriteIcon />}
                    onClick={handleUsersLikesModalOpen}
                  >
                    Ver sumados {likes.count}
                  </Button>
                ) : (
                  <Button
                    disableRipple
                    variant={userLikesPost ? 'contained' : 'outlined'}
                    color="primary"
                    startIcon={
                      userLikesPost ? <FavoriteIcon /> : <FavoriteBorderIcon />
                    }
                    onClick={
                      loggedUser
                        ? handleLikeClick
                        : () => setShowJoinModal(true)
                    }
                  >
                    {userLikesPost ? 'Sumado' : 'Sumate'} {likes.count}
                  </Button>
                )}
                <FacebookLink
                  target="_blank"
                  rel="noreferrer"
                  href={facebookShareUrl}
                  className="fb-xfbml-parse-ignore"
                >
                  <FacebookButton label="Compartir en Facebook" />
                </FacebookLink>
              </PostActions>
            </PostContent>
          </>
        ) : (
          <Typography variant="h3">
            Ninguna publicacion encontrada con ese id.
          </Typography>
        )}
      </StyledPaper>
      {post && (
        <CommentsContainer
          className="fb-comments"
          data-width=""
          data-numposts="5"
        />
      )}
    </Container>
  );
};

export default Post;
