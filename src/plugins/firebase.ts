import firebase from 'firebase';

if (!firebase.apps.length) {
  // Please add your own API setting
  firebase.initializeApp({
    apiKey: "AIzaSyDQIjEz93LVLIS5sAenM5ytp2k6vRHn6mw",
    authDomain: "how-to-be-syotokutaishi.firebaseapp.com",
    projectId: "how-to-be-syotokutaishi",
    storageBucket: "how-to-be-syotokutaishi.appspot.com",
    messagingSenderId: "1088012081831",
    appId: "1:1088012081831:web:58fb841ac070827a475982",
    measurementId: "G-D351GSSKFJ"
  });
}

export default firebase;
