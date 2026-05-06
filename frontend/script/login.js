// login.js
import { auth, googleProvider } from '../.env/firebase.js';
import { 
  signInWithEmailAndPassword,
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

const form = document.querySelector('.auth-form');
const googleBtn = document.querySelector('.google-btn');
const errorDisplay = document.querySelector('.error-message');

// email + password login
const handleEmailLogin = async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === '' || password === '') {
    errorDisplay.textContent = 'Please fill in all fields';
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = './moodify.html';

  } catch (err) {
    // deliberately vague — don't tell attackers which part was wrong
    if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
      errorDisplay.textContent = 'Invalid email or password';
    } else if (err.code === 'auth/too-many-requests') {
      errorDisplay.textContent = 'Too many attempts. Try again later.';
    } else {
      errorDisplay.textContent = 'Something went wrong. Try again.';
      console.error(err);
    }
  }
};

// google login — same flow as signup
const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    window.location.href = './moodify.html';

  } catch (err) {
    errorDisplay.textContent = 'Google sign in failed. Try again.';
    console.error(err);
  }
};

form.addEventListener('submit', handleEmailLogin);
googleBtn.addEventListener('click', handleGoogleLogin);