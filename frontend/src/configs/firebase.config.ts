// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGMObLfkB-NVhHgL9tCId43RRU8ah_Tho",  
    authDomain: "aqinow-98820.firebaseapp.com",
    databaseURL: "https://aqinow-98820-default-rtdb.firebaseio.com",
    projectId: "aqinow-98820",
    storageBucket: "aqinow-98820.firebasestorage.app",
    messagingSenderId: "489709386440",
    appId: "1:489709386440:web:2ea6d17a6d5a591d1e03fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);