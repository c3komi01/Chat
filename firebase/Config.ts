// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import{getFirestore,Firestore,collection,addDoc,serverTimestamp} from "firebase/firestore" ;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS4HMFH04BABfOsoPs2JLid_LUlUcUzww",
  authDomain: "chat-53063.firebaseapp.com",
  projectId: "chat-53063",
  storageBucket: "chat-53063.firebasestorage.app",
  messagingSenderId: "606964086324",
  appId: "1:606964086324:web:390098c6f6d857b7293c61",
  measurementId: "G-65MEXZ8319"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore: Firestore=getFirestore(app);
export const ROOMS = "rooms";
const MESSAGES : string = "messages";


export {firestore,collection,addDoc,serverTimestamp,MESSAGES};

export const auth = getAuth(app); 
  
  