// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACSLXyO3HRuzELQr4Z8JJXWgowHSLpxJY",
  authDomain: "g2werse.firebaseapp.com",
  projectId: "g2werse",
  storageBucket: "g2werse.firebasestorage.app",
  messagingSenderId: "799288597839",
  appId: "1:799288597839:web:8b5622d0e2c39e4198f93a",
  measurementId: "G-HYL6DTR361"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
