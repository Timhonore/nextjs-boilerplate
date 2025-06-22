// lib/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3BpGfRXl4UgcM7QOVGOTiwi3W48AZSYQ",
  authDomain: "skaermstyring.firebaseapp.com",
  projectId: "skaermstyring",
  storageBucket: "skaermstyring.firebasestorage.app",
  messagingSenderId: "866646922629",
  appId: "1:866646922629:web:2a3b092049a2975fe2e0ec",
  measurementId: "G-N91KNQ5MRL"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Eksportér Firestore og Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
