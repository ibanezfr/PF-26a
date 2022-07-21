import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// PONER EN .ENV

const firebaseConfig = {
  apiKey: "AIzaSyCreLpt5DXmEjy342aRiD85B-JAqigh1m4",

  authDomain: "ecommerce-2-8f2ef.firebaseapp.com",

  projectId: "ecommerce-2-8f2ef",

  storageBucket: "ecommerce-2-8f2ef.appspot.com",

  messagingSenderId: "26123366670",

  appId: "1:26123366670:web:49f997df48a3e7efeae75f",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
