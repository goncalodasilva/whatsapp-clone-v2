import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, AuthProvider, getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAqwQ9ecLv_VFXSrGpJmGYMXyoXP2uXyrc",
  authDomain: "whatsapp-mern-74fe7.firebaseapp.com",
  projectId: "whatsapp-mern-74fe7",
  storageBucket: "whatsapp-mern-74fe7.appspot.com",
  messagingSenderId: "646519100370",
  appId: "1:646519100370:web:fb743029075c73faa6ee0b"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);
const provider: AuthProvider = new GoogleAuthProvider();

export { db, auth, provider };