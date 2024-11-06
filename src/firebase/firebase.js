import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhkjat0grj5JuM3HycN_h7c8z9XM_q-i8",
  authDomain: "mis-prestamos-ae93d.firebaseapp.com",
  projectId: "mis-prestamos-ae93d",
  storageBucket: "mis-prestamos-ae93d.appspot.com",
  messagingSenderId: "932807043555",
  appId: "1:932807043555:web:ab7cfa3da48c93975e18d6",
  measurementId: "G-WDNT7J55J2",
};

const fb = initializeApp(firebaseConfig);
export const { db, auth } = { db: getFirestore(fb), auth: getAuth(fb) };
