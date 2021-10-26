// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxyU0Sj90wznnU0PHIAjQ3B2BkLoZYZxA",
  authDomain: "bad-bank-authentication-303b0.firebaseapp.com",
  projectId: "bad-bank-authentication-303b0",
  storageBucket: "bad-bank-authentication-303b0.appspot.com",
  messagingSenderId: "697815842797",
  appId: "1:697815842797:web:c7ecf92542a28358c731e4"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default {
  firebase, 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged
};