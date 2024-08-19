// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAAnMAibp-Spwirwiye4SKCn0UkDvmH7F0",
    authDomain: "lasertag-e5490.firebaseapp.com",
    projectId: "lasertag-e5490",
    storageBucket: "lasertag-e5490.appspot.com",
    messagingSenderId: "1019333102651",
    appId: "1:1019333102651:web:b4885497552ba1503b601e",
    measurementId: "G-1FKB33BD6V"
};

// Firebase uygulamasını başlatma
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firestore ve Storage referanslarını dışa aktarma
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
