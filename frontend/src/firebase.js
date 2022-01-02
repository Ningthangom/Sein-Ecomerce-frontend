// Import the functions you need from the SDKs you need
/* import firebase from "firebase/app"; */
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANVAVzL0ER64BX05s30Q7vuTRBSwMddx4",
  authDomain: "mimi-ecomerce.firebaseapp.com",
  projectId: "mimi-ecomerce",
  storageBucket: "mimi-ecomerce.appspot.com",
  messagingSenderId: "596618547387",
  appId: "1:596618547387:web:1f265ac0938bacf2a4999e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export
// export default firebase;
export const auth = getAuth(app);
 
export const googleAuthProvider = new GoogleAuthProvider();

