// signup.js
import { auth, db, googleProvider } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification 
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// ── State ──────────────────────────────────────────────
let currentRole = 'listener';

// ── DOM refs ───────────────────────────────────────────
const signupBtn = document.getElementById('signupBtn');
const googleBtn = document.querySelector('.google-btn');
const listenerTab = document.getElementById('listenerTab');
const artistTab = document.getElementById('artistTab');
const artistFields = document.querySelectorAll('.artist-field');
const successBanner = document.getElementById('successBanner');

// ── Role switcher ──────────────────────────────────────
const switchRole = (role) => {
  currentRole = role;

  if (role === 'artist') {
    artistTab.classList.add('active');
    listenerTab.classList.remove('active');
    artistFields.forEach(f => f.classList.add('visible'));
    signupBtn.textContent = 'Create artist account';
  } else {
    listenerTab.classList.add('active');
    artistTab.classList.remove('active');
    artistFields.forEach(f => f.classList.remove('visible'));
    signupBtn.textContent = 'Create account';
  }
};

// expose switchRole to HTML onclick attributes
window.switchRole = switchRole;

// ── Error helper ───────────────────────────────────────
const showError = (id, show) => {
  document.getElementById(id).style.display = show ? 'block' : 'none';
};

// ── Save user to Firestore ─────────────────────────────
const saveUserToFirestore = async (user, extraData = {}) => {
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    displayName: user.displayName || extraData.name || '',
    role: currentRole,
    createdAt: serverTimestamp(),
    moodPreferences: [],
    ...extraData
  });
};

// ── Email signup ───────────────────────────────────────
const handleEmailSignup = async () => {
  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const password = document.getElementById('passwordInput').value;

  // validation
  let valid = true;
  if (!name) { showError('nameError', true); valid = false; }
  else showError('nameError', false);

  if (!email || !email.includes('@')) { showError('emailError', true); valid = false; }
  else showError('emailError', false);

  if (password.length < 8) { showError('passwordError', true); valid = false; }
  else showError('passwordError', false);

  if (!valid) return;

  // loading state
  signupBtn.textContent = 'Creating account...';
  signupBtn.disabled = true;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // build extra data based on role
    const extraData = { name };
    if (currentRole === 'artist') {
      extraData.artistName = document.getElementById('artistNameInput').value.trim();
      extraData.genre = document.getElementById('genreInput').value;
    }

    await saveUserToFirestore(user, extraData);
    await sendEmailVerification(user);

    successBanner.style.display = 'block';

  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      showError('emailError', true);
      document.getElementById('emailError').textContent = 'This email is already registered';
    } else {
      console.error(err); // internal only
    }
  } finally {
    // always reset button regardless of success or failure
    signupBtn.disabled = false;
    signupBtn.textContent = currentRole === 'artist'
      ? 'Create artist account'
      : 'Create account';
  }
};

// ── Google signup ──────────────────────────────────────
const handleGoogleSignup = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // only save if brand new user
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      await saveUserToFirestore(user);
    }

    window.location.href = '../moodify.html';

  } catch (err) {
    console.error(err);
  }
};

// ── Event listeners ────────────────────────────────────
signupBtn.addEventListener('click', handleEmailSignup);
googleBtn.addEventListener('click', handleGoogleSignup);