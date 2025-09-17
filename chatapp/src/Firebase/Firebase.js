
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAM6HK0mTMcUor6wsiP4LevagXpORxQmDE",
    authDomain: "chatapp-clone-b2629.firebaseapp.com",
    projectId: "chatapp-clone-b2629",
    storageBucket: "chatapp-clone-b2629.firebasestorage.app",
    messagingSenderId: "985435764792",
    appId: "1:985435764792:web:70befe56dc86fb32808ecd",
    measurementId: "G-H7W87JLR8Z"
};

const app = initializeApp(firebaseConfig);

export const Store = getFirestore(app);
export const auth = getAuth(app);
