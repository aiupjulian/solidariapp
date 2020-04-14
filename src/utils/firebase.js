import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

firebase.initializeApp({
  apiKey: "AIzaSyDhGPu3R2zrXsocYOaBGtUJ2PNaTGLX-wY",
  authDomain: "solidariapp-93cdb.firebaseapp.com",
  databaseURL: "https://solidariapp-93cdb.firebaseio.com",
  projectId: "solidariapp-93cdb",
  storageBucket: "solidariapp-93cdb.appspot.com",
  messagingSenderId: "742811527896",
  appId: "1:742811527896:web:ecf99cd3b693a2f76d85ad"
});

export const savePost = ({ image, ...postData }, userData) =>
  firebase
    .firestore()
    .collection("posts")
    .add({
      ...postData,
      ...userData,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(postRef => {
      const imagePath = userData.uid + "/" + postRef.id + "/" + image.name;
      return firebase
        .storage()
        .ref(imagePath)
        .put(image)
        .then(imageSnapshot =>
          imageSnapshot.ref.getDownloadURL().then(url =>
            postRef.update({
              imageUrl: url,
              storageUri: imageSnapshot.metadata.fullPath
            })
          )
        );
    })
    .catch(function(error) {
      console.error(
        "There was an error uploading a file to Cloud Storage:",
        error
      );
    });

export default firebase;
