import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBE6XWbOIUQLGl7OakN0junXI8JzTp-nDU",
  authDomain: "auto-test-540d9.firebaseapp.com",
  projectId: "auto-test-540d9",
  storageBucket: "auto-test-540d9.appspot.com",
  messagingSenderId: "370991498405",
  appId: "1:370991498405:web:afd7ae8dfcd1a1c582794c",
  measurementId: "G-P8486NNB3X",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Initialize firestore
export const firestore = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
