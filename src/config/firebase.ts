import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjK-7bPAHJ_7fu2cfzGKIc1hrVEA6oW18",
  authDomain: "okiapp-f58e0.firebaseapp.com",
  projectId: "okiapp-f58e0",
  storageBucket: "okiapp-f58e0.firebasestorage.app",
  messagingSenderId: "779119882429",
  appId: "1:779119882429:web:690db3e0b50ef97e0707d4",
  measurementId: "G-GRP4S4NB0K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 