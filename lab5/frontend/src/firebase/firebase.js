// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7DimbP8Ej-pA10UQdORM1CUB3l6G1tw4",
  authDomain: "lab4-6ab48.firebaseapp.com",
  projectId: "lab4-6ab48",
  storageBucket: "lab4-6ab48.firebasestorage.app",
  messagingSenderId: "245948965801",
  appId: "1:245948965801:web:69aca227a7eb09ffce1ab8",
  measurementId: "G-8S46B4FX62"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);