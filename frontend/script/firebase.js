// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCVgXctbRgbwyROZ60jJy9PL5QWEZzpDk0",
  authDomain: "moodify-68806.firebaseapp.com",
  projectId: "moodify-68806",
  storageBucket: "moodify-68806.firebasestorage.app",
  messagingSenderId: "964969133988",
  appId: "1:964969133988:web:8d53c08af53bdb0e77f331"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();