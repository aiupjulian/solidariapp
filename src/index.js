import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
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

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
