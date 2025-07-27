import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwozOzex9LcrF0_bQoXCiJPdJDvpK4II0",
  authDomain: "uppi-poetry.firebaseapp.com",
  databaseURL: "https://uppi-poetry.firebaseio.com",
  projectId: "uppi-poetry",
  storageBucket: "uppi-poetry.firebasestorage.app",
  messagingSenderId: "1021509100889",
  appId: "1:1021509100889:web:b93e1ce6a0ad061c499848",
  measurementId: "G-V47Q14SB8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Realtime Database
export const db = getDatabase(app)

// Initialize Auth (for future authentication features)
export const auth = getAuth(app)

export default app 