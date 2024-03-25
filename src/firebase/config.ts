// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfguZ7K40vp0Svw5R4pT-S0EpJ7Ws2Zpg",
  authDomain: "mezhaul-32f36.firebaseapp.com",
  projectId: "mezhaul-32f36",
  storageBucket: "mezhaul-32f36.appspot.com",
  messagingSenderId: "782408261445",
  appId: "1:782408261445:web:9bcaa45aff687508d4282c",
  measurementId: "G-ECYE9DMPEG"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, db, storage };
