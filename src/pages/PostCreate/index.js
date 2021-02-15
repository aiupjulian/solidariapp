import React from 'react';
import {useHistory} from 'react-router-dom';
import 'firebase/firestore';
import {useFirestore, useUser} from 'reactfire';

import {FormProvider} from './PostContext';
import PostCreate from './components/index';
import {createSearch, FILTERS} from '../../utils/filters';
import pages from '../';

const PostCreateContainer = () => {
  const history = useHistory();
  const user = useUser();
  const posts = useFirestore().collection('posts');

  const createPost = (data) => {
    // if (data.dateInputType === 'singleDate') {
    //   data.date = data.date.format('DD/MM/YYYY');
    // }
    // if (data.dateInputType === 'rangeDate') {
    //   data.startDate = data.startDate.format('DD/MM/YYYY');
    //   data.endDate = data.endDate.format('DD/MM/YYYY');
    // }
    posts
      .add({
        ...data,
        // ...postData,
        user: {...user.providerData[0]},
        // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      // .then((postRef) => {
      //   const imagePath = userData.uid + '/' + postRef.id + '/' + image.name;
      //   return firebase
      //     .storage()
      //     .ref(imagePath)
      //     .put(image)
      //     .then((imageSnapshot) =>
      //       imageSnapshot.ref.getDownloadURL().then((url) =>
      //         postRef
      //           .update({
      //             imageUrl: url,
      //             storageUri: imageSnapshot.metadata.fullPath,
      //           })
      //           .then(() => postRef),
      //       ),
      //     );
      // })
      // .catch(function (error) {
      //   console.error(
      //     'There was an error uploading a file to Cloud Storage:',
      //     error,
      //   );
      // })
      .then((res) => {
        history.push(
          pages.Post.path.concat(createSearch({[FILTERS.ID]: res.id})),
        );
      });
  };

  return (
    <FormProvider>
      <PostCreate onSubmit={createPost} />
    </FormProvider>
  );
};

export default PostCreateContainer;
