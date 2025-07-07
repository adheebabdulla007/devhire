import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBD6LfAY7elgVW5grXlb-qVpm5BSMEUyQw",
  authDomain: "devhire-a74a2.firebaseapp.com",
  projectId: "devhire-a74a2",
  storageBucket: "devhire-a74a2.firebasestorage.app",
  messagingSenderId: "775892384175",
  appId: "1:775892384175:web:58b57e98ba4cc158fc975a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
export const db = getFirestore(app);
