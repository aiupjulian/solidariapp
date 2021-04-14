// const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

var serviceAccount = require('./solidariapp-93cdb-firebase-adminsdk-c8l63-267c2986c3.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://solidariapp-93cdb.firebaseio.com',
});

var firestore = admin.firestore();
var postsRef = firestore.collection('posts');

postsRef
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      const data = doc.data();
      const keywords = data.post.title
        .toLowerCase()
        .replace(/[^0-9a-z ]/gi, '')
        .trim()
        .split(' ');
      const documentRef = firestore.doc(`posts/${doc.id}`);
      documentRef.update({'post.keywords': keywords});
    });
    return;
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

// const uid = 'PbMoaSEfp7bTKlKS2Ok6F8Ulllp2';
// admin
//   .auth()
//   .setCustomUserClaims(uid, {admin: true})
//   .then((res) => {
//     console.log(res);
//   });

// function listAllUsers(nextPageToken) {
//   admin
//     .auth()
//     .listUsers(1000, nextPageToken)
//     .then(function (listUsersResult) {
//       listUsersResult.users.forEach(function (userRecord) {
//         console.log('user', userRecord.toJSON());
//       });
//       if (listUsersResult.pageToken) {
//         listAllUsers(listUsersResult.pageToken);
//       }
//     })
//     .catch(function (error) {
//       console.log('Error listing users:', error);
//     });
// }

// listAllUsers();

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello world');
// });
