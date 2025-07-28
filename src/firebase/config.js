import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiAoYf2Xk29eUVEDoYExU0om4W7_hok9M",
  authDomain: "poetry-app-2024.firebaseapp.com",
  databaseURL: "https://poetry-app-2024-default-rtdb.firebaseio.com",
  projectId: "poetry-app-2024",
  storageBucket: "poetry-app-2024.appspot.com",
  messagingSenderId: "464609590808",
  appId: "1:464609590808:web:3daea7ac8fbe88deca0d6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Realtime Database
export const db = getDatabase(app)

// Initialize Auth (for future authentication features)
export const auth = getAuth(app)

export default app 