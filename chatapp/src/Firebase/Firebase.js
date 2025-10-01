
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAQ8Ur3750CIGq6mXqsKVS06IKrS_Ws1H0",
    authDomain: "chat-app---clone.firebaseapp.com",
    projectId: "chat-app---clone",
    storageBucket: "chat-app---clone.firebasestorage.app",
    messagingSenderId: "141515053319",
    appId: "1:141515053319:web:bcf09ec745a978ff804da2"
};

const app = initializeApp(firebaseConfig);

export const Store = getFirestore(app);
export const auth = getAuth(app);
