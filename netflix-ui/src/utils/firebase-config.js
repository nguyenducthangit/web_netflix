// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyASgdtxoBDPnlO394y_ElRSXwc7LjUj4Hs",
  authDomain: "netflix-app-clone-46811.firebaseapp.com",
  projectId: "netflix-app-clone-46811",
  storageBucket: "netflix-app-clone-46811.appspot.com",
  messagingSenderId: "171940759911",
  appId: "1:171940759911:web:1b677c99debda071abc7c2",
  measurementId: "G-YNFTJWFD4W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
