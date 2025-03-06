// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import  {getAuth, GoogleAuthProvider,getRedirectResult,signInWithRedirect} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZ9dGu0l7PMEwq5Z_2IOJHWV0L8t6TRXc",
  authDomain: "authenticaton-5b437.firebaseapp.com",
  projectId: "authenticaton-5b437",
  storageBucket: "authenticaton-5b437.firebasestorage.app",
  messagingSenderId: "253700268727",
  appId: "1:253700268727:web:f63dcee01a7300fb16a332",
  measurementId: "G-QQCHE5WPY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const  auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
export { auth, provider, getRedirectResult,signInWithRedirect};
