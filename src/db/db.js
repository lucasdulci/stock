import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAAuVTLT1G333oEXAltpZnD1RYVCnL2-cM",
  authDomain: "stock-montaje.firebaseapp.com",
  projectId: "stock-montaje",
  storageBucket: "stock-montaje.appspot.com",
  messagingSenderId: "491977800901",
  appId: "1:491977800901:web:01554ae489e840ca3404ac"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore()

export default db