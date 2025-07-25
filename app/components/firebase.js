import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyACZU__jbP-tw6x8D81A2NrmH7E1yn8aTI",
    authDomain: "socketlink.io",
    projectId: "socketlink-830db",
    storageBucket: "socketlink-830db.appspot.com",
    messagingSenderId: "361357261532",
    appId: "1:361357261532:web:d706d1883ab5a593051219",
    measurementId: "G-SGP3J8PTY5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
