import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA0RqQGZCroER9khVPlNXxLEnAZ5axkVQU",
  authDomain: "eventos-appbd.firebaseapp.com",
  projectId: "eventos-appbd",
  storageBucket: "eventos-appbd.firebasestorage.app",
  messagingSenderId: "180398572872",
  appId: "1:180398572872:web:92b2e7e01838e402b71f7d"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);






