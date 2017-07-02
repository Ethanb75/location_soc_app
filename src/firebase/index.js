import * as firebase from 'firebase';
// Initialize Firebase
//adds a ton of request headers to authenticate
try {
  let config = {
    apiKey: "AIzaSyBmzTY_zGkyGcvLNI-I5FQ_BWCZoHa88mI",
    authDomain: "location-app-feefd.firebaseapp.com",
    databaseURL: "https://location-app-feefd.firebaseio.com",
    projectId: "location-app-feefd",
    storageBucket: "location-app-feefd.appspot.com",
    messagingSenderId: "508037513741"
  };

    firebase.initializeApp(config);
} catch(e) {
    console.log(e);
}

// var firebaseRef = firebase.database().ref()
export default firebase;