import { FirebaseApp, initializeApp } from 'firebase/app'
import { Auth, AuthProvider, getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import { useGlobalContext } from './Context/store';

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
let token = '';

if (typeof window !== 'undefined') {
  const messaging = getMessaging();
  getToken(messaging, {
    vapidKey:
      'BII5N5rp0KDQJph2RIO8Yw57nJ3cZUsBrS4Nq8hxTdlvtJgHHt-ODIzd4XLh7tRyV64GKge6ejCZFhruXWzRskM'
  }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log(currentToken)
      token = currentToken;
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
}

export { db, auth, provider, token };