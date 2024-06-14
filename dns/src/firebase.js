// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBy4si0JyY9dr4uhHfkkUid9qEjEV0Sr4",
  authDomain: "trinadhexample.firebaseapp.com",
  projectId: "trinadhexample",
  storageBucket: "trinadhexample.appspot.com",
  messagingSenderId: "943444107515",
  appId: "1:943444107515:web:02c670111eef1a2bee105e",
  measurementId: "G-YSTY4FQ00J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics };