// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZughKMLZg9BCjLVnjfi8q0JDlRZhFhDg",
  authDomain: "mezhaul-409d1.firebaseapp.com",
  projectId: "mezhaul-409d1",
  storageBucket: "mezhaul-409d1.appspot.com",
  messagingSenderId: "38113557519",
  appId: "1:38113557519:web:4d463bba151b9e2752f77a",
  measurementId: "G-FZQL2MQFCS"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, db, storage };
