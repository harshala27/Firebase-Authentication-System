// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF--vL_srJYmuB3hTwx6BaMFIEOPbr7_c",
  authDomain: "login-auth-a4fca.firebaseapp.com",
  projectId: "login-auth-a4fca",
  storageBucket: "login-auth-a4fca.firebasestorage.app",
  messagingSenderId: "1037020094534",
  appId: "1:1037020094534:web:b4bbdbde89b17de2e2aa47",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
