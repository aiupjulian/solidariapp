const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// admin.initializeApp();

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

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello world');
});
