// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO6rmsV7AuS7B6K-sc9tJD8CrCeM50c-k",
  authDomain: "asher-papart-finance-tracker.firebaseapp.com",
  projectId: "asher-papart-finance-tracker",
  storageBucket: "asher-papart-finance-tracker.firebasestorage.app",
  messagingSenderId: "38522687875",
  appId: "1:38522687875:web:f692824671f7da7b2e26b6",
  measurementId: "G-8LZPNG03Y8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };