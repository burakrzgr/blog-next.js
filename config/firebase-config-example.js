// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getFirestore, initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "",

  authDomain: "",

  projectId: "",

  storageBucket: "",

  messagingSenderId: "",

  appId: "",

  measurementId: ""

};


// Initialize Firebase

export const FSapp = initializeApp(firebaseConfig);
export const database = initializeFirestore(FSapp, {
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false, // and this line
});
//const analytics = getAnalytics(app);