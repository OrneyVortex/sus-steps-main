// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS5MpMkzyQ3fE-OM0RVtvzgRTkDuXoyWg",
  authDomain: "sustaintheglobe-db1b9.firebaseapp.com",
  projectId: "sustaintheglobe-db1b9",
  storageBucket: "sustaintheglobe-db1b9.appspot.com",
  messagingSenderId: "609215970977",
  appId: "1:609215970977:web:9ca180d51e4fe18d583ae0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();