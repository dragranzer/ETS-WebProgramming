import * as firebase from "firebase/app";
import "firebase/storage";
import 'firebase/firestore';

export const app = firebase.initializeApp({
  "projectId": "frb-upload-imgs",
  "appId": "1:58529684126:web:f6c53110fdd75dfd97398f",
  "storageBucket": "frb-upload-imgs.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyC2CLhDX1sSCJO9faD3_FjWNYuPwUylPZo",
  "authDomain": "frb-upload-imgs.firebaseapp.com",
  "messagingSenderId": "58529684126"
});
