import * as firebase from 'firebase/app';

export const savePost = ({image, ...postData}, userData) =>
  firebase
    .firestore()
    .collection('posts')
    .add({
      ...postData,
      ...userData,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((postRef) => {
      const imagePath = userData.uid + '/' + postRef.id + '/' + image.name;
      return firebase
        .storage()
        .ref(imagePath)
        .put(image)
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
    .catch(function (error) {
      console.error(
        'There was an error uploading a file to Cloud Storage:',
        error,
      );
    });
