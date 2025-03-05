// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUkSSd1YkpulyFKotW7H-RgIiFY7PX35o",
  authDomain: "attendancewebapp-848d4.firebaseapp.com",
  projectId: "attendancewebapp-848d4",
  storageBucket: "attendancewebapp-848d4.firebasestorage.app",
  messagingSenderId: "87771413704",
  appId: "1:87771413704:web:aa97b47bdd0f49342df9fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized Firebase services
export { auth, db, app };