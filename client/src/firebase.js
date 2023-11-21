// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b1930.firebaseapp.com",
  projectId: "mern-auth-b1930",
  storageBucket: "mern-auth-b1930.appspot.com",
  messagingSenderId: "249648675368",
  appId: "1:249648675368:web:2a237f909fbd0b20a8531d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
