import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {FirebaseAppProvider} from 'reactfire';
import 'fontsource-roboto';

import './index.css';
import App from './App';

const firebaseConfig = {
  apiKey: 'AIzaSyDhGPu3R2zrXsocYOaBGtUJ2PNaTGLX-wY',
  authDomain: 'solidariapp-93cdb.firebaseapp.com',
  databaseURL: 'https://solidariapp-93cdb.firebaseio.com',
  projectId: 'solidariapp-93cdb',
  storageBucket: 'solidariapp-93cdb.appspot.com',
  messagingSenderId: '742811527896',
  appId: '1:742811527896:web:ecf99cd3b693a2f76d85ad',
};

ReactDOM.unstable_createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </StrictMode>,
);
