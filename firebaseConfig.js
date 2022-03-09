import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDDHpn6jxO4NfVFkaZksXUsSqpLpRAiT_4",
  authDomain: "chat-app-b0e89.firebaseapp.com",
  projectId: "chat-app-b0e89",
  storageBucket: "chat-app-b0e89.appspot.com",
  messagingSenderId: "500014637265",
  appId: "1:500014637265:web:c33e911090c1cb86aa65f0",
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
// export const functions = firebase.app().functions("europe-west2"); //firebase.functions("europe-west2");
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
