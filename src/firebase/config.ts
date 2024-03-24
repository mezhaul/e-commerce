// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAA85tOagdiaBpLdjY2kjoqUiy9D2FN0WI",
  authDomain: "sariah-39f84.firebaseapp.com",
  projectId: "sariah-39f84",
  storageBucket: "sariah-39f84.appspot.com",
  messagingSenderId: "857818955355",
  appId: "1:857818955355:web:e41a83420ec3de561c097e",
  measurementId: "G-82JGYK0D2Z"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, db, storage };
