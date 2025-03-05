// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importe o Firebase Authentication


const firebaseConfig = {
  apiKey: "AIzaSyDcw8U1hJBCY46IzZciVS-TIkRPgHaxaZo",
  authDomain: "tela-de-login-e5bc8.firebaseapp.com",
  projectId: "tela-de-login-e5bc8",
  storageBucket: "tela-de-login-e5bc8.firebasestorage.app",
  messagingSenderId: "151393136076",
  appId: "1:151393136076:web:612d0f6f65adacd7658169",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Inicialize o Firebase Authentication

export { db, auth }; // Exporte o auth