import React from 'react';
import {useHistory} from 'react-router-dom';
import 'firebase/firestore';
import {
  useFirestore,
  useUser,
  useStorage,
  useFirestoreDocData,
} from 'reactfire';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';

import {FormProvider} from './utils/PostContext';
import PostForm from './components/PostForm';
import {createSearch, FILTERS} from '../../utils/filters';
import pages from '..';
import useQuery from '../../hooks/useQuery';

const StyledPaper = styled(Paper)`
  padding: ${({theme}) => theme.spacing(3)}px;
`;

const PostCreateContainer = () => {
  const query = useQuery();
  const postId = query.get(FILTERS.ID);
  const history = useHistory();
  const user = useUser();
  const posts = useFirestore().collection('posts');
  const storage = useStorage();

  const postRef = posts.doc(postId);
  const {post, imageUrl} = useFirestoreDocData(postRef);

  const postDefaultValues = post ? {...post, defaultImageUrl: imageUrl} : null;

  const createPost = ({image, defaultImageUrl, ...postData}) => {
    postRef
      .update({
        post: {...post, ...postData},
      })
      .then(() => {
        if (imageUrl && !defaultImageUrl && !image?.[0]) {
          return postRef.update({
            imageUrl: '',
          });
        } else if (image?.[0]) {
          const uploadImage = image[0];
          const imagePath =
            user.uid + '/' + postRef.id + '/' + uploadImage.name;
          return storage
            .ref(imagePath)
            .put(uploadImage)
            .then((imageSnapshot) =>
              imageSnapshot.ref.getDownloadURL().then((url) =>
                postRef
                  .update({
                    imageUrl: url,
                    storageUri: imageSnapshot.metadata.fullPath,
                  })
                  .then(() => postRef),
              ),
            );
        } else {
          return postRef;
        }
      })
      .then((res) => {
        history.push(
          pages.Post.path.concat(createSearch({[FILTERS.ID]: res.id})),
        );
      })
      .catch(function (error) {
        console.error(
          'There was an error uploading a file to Cloud Storage:',
          error,
        );
      });
  };

  return (
    <StyledPaper>
      {postDefaultValues && (
        <FormProvider>
          <PostForm
            onSubmit={createPost}
            postDefaultValues={postDefaultValues}
          />
        </FormProvider>
      )}
    </StyledPaper>
  );
};

export default PostCreateContainer;
