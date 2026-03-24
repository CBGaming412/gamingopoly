import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD4_w7rlghpdf_cOmX9FP4ieenBDDLy8NM",
  authDomain: "cb-monopoly-game.firebaseapp.com",
  projectId: "cb-monopoly-game",
  storageBucket: "cb-monopoly-game.firebasestorage.app",
  messagingSenderId: "43807589217",
  appId: "1:43807589217:web:133fc70d3232451f9e3b20",
  measurementId: "G-EMMGHSZRSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };
