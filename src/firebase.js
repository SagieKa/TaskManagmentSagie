import firebase from 'firebase'

const  firebaseConfig = {
    apiKey: "AIzaSyBbPDsYiXHGRJmzUBLdG1zJIh4v4RedzeM",
    authDomain: "taskmangement-b26d9.firebaseapp.com",
    databaseURL: "https://taskmangement-b26d9-default-rtdb.firebaseio.com",
    projectId: "taskmangement-b26d9",
    storageBucket: "taskmangement-b26d9.appspot.com",
    messagingSenderId: "688555056146",
    appId: "1:688555056146:web:7565fd12f95fcbd350cccb",
    measurementId: "G-DTK2SG3RM1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;