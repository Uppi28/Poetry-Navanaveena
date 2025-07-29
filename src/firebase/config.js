import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL2hiEeLmXKPlEn9kBd4Im-aZlQkF_5TE",
  authDomain: "poetry-app-2024.firebaseapp.com",
  databaseURL: "https://poetry-app-2024-default-rtdb.firebaseio.com",
  projectId: "poetry-app-2024",
  storageBucket: "poetry-app-2024.firebasestorage.app",
  messagingSenderId: "337165000420",
  appId: "1:337165000420:web:f55a80a23ee9cb58edd6f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Realtime Database
export const db = getDatabase(app)

// Initialize Auth (for future authentication features)
export const auth = getAuth(app)

export default app 