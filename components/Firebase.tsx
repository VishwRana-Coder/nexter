import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdgUwwpBAPIxXHVCPnWJsXqQGg9iWLqBM",
  authDomain: "nexter-500.firebaseapp.com",
  projectId: "nexter-500",
  storageBucket: "nexter-500.appspot.com",
  messagingSenderId: "690345712948",
  appId: "1:690345712948:web:ce5a4759549d4a2645d961",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app)
const storage = getStorage(app);


export {auth, googleProvider, db, storage}



