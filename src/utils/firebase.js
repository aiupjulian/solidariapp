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

export default firebase;
