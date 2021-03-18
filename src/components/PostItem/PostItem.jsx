import React from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import {createSearch, FILTERS, getCategoryByPath} from '../../utils/filters';
import pages from '../../pages';

const IMAGE_HEIGHT = 240;

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

const ChipsContainer = styled.div`
  position: absolute;
  display: flex;
  top: ${IMAGE_HEIGHT - 36}px;
  right: 0;
  z-index: 1;
`;

const Category = styled(Chip)`
  margin: 0 ${({theme}) => theme.spacing(1)}px;
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

const Likes = styled(Typography)`
  display: flex;
  > svg {
    margin-right: ${({theme}) => theme.spacing(1)}px;
  }
  && {
    margin-left: auto;
  }
`;

const PostItem = ({
  id,
  post,
  user,
  imageUrl,
  timestamp,
  likes,
  ...restProps
}) => {
  const history = useHistory();
  const Icon = getCategoryByPath(post.category).Icon;
  const cardMediaProps = imageUrl ? {image: imageUrl} : {component: Icon};

  return (
    <CardContainer {...restProps}>
      <StyledCard variant="outlined">
        <ChipsContainer>
          {post.closed && <Chip label="CERRADA" color="secondary" />}
          <Category label={post.category.toUpperCase()} />
        </ChipsContainer>
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
            color="primary"
            disableRipple
          >
            Ver mas
          </Button>
          <Likes variant="body1">
            <FavoriteBorderIcon fontSize="small" />
            {likes.count} sumados
          </Likes>
        </CardActions>
      </StyledCard>
    </CardContainer>
  );
};

export default PostItem;
