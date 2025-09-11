
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// IMPORTANT: This is a public configuration and is safe to expose.
// Security is managed by Firebase Security Rules.
const firebaseConfig = {
  "projectId": "studio-7035004687-ff43d",
  "appId": "1:88350858292:web:7a5d9f0bab5084ad013e61",
  "storageBucket": "studio-7035004687-ff43d.appspot.com",
  "apiKey": "AIzaSyCX-SDsKffSIPmpWW2qwJKmCsVAF7pD6JY",
  "authDomain": "studio-7035004687-ff43d.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "88350858292"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
