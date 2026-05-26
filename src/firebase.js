// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYI-zaVDh1q3_UBL2_NSmYvL0exqQycpU",
  authDomain: "my-portfolio-app-ee795.firebaseapp.com",
  projectId: "my-portfolio-app-ee795",
  storageBucket: "my-portfolio-app-ee795.firebasestorage.app",
  messagingSenderId: "623855223893",
  appId: "1:623855223893:web:e2b34be30da983636f83ec"
};

// Initialize Firebase instance
const app = initializeApp(firebaseConfig);

// Export firestore instance for your views to query
export const db = getFirestore(app);