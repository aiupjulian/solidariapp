import React from 'react';
import {useHistory} from 'react-router-dom';
import 'firebase/firestore';
import * as firebase from 'firebase/app';
import {useFirestore, useUser, useStorage} from 'reactfire';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';

import {FormProvider} from './utils/PostContext';
import PostForm from './components/PostForm';
import {createSearch, FILTERS} from '../../utils/filters';
import pages from '../';

const StyledPaper = styled(Paper)`
  padding: ${({theme}) => theme.spacing(3)}px;
`;

const PostCreateContainer = () => {
  const history = useHistory();
  const user = useUser();
  const posts = useFirestore().collection('posts');
  const storage = useStorage();

  const createPost = ({image, ...postData}) => {
    // if (data.dateInputType === 'singleDate') {
    //   data.date = data.date.format('DD/MM/YYYY');
    // }
    // if (data.dateInputType === 'rangeDate') {
    //   data.startDate = data.startDate.format('DD/MM/YYYY');
    //   data.endDate = data.endDate.format('DD/MM/YYYY');
    // }
    posts
      .add({
        post: {closed: false, ...postData},
        user: {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        },
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((postRef) => {
        if (!image?.[0]) return postRef;
        const uploadImage = image[0];
        const imagePath = user.uid + '/' + postRef.id + '/' + uploadImage.name;
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
      <FormProvider>
        <PostForm onSubmit={createPost} />
      </FormProvider>
    </StyledPaper>
  );
};

export default PostCreateContainer;
