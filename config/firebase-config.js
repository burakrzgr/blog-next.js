// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getFirestore, initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAg35LHw4W4CUYMRGM8nVRT7MBU-dyfsD4",

  authDomain: "myblogapp-3fd57.firebaseapp.com",

  projectId: "myblogapp-3fd57",

  storageBucket: "myblogapp-3fd57.appspot.com",

  messagingSenderId: "895414192254",

  appId: "1:895414192254:web:9089d7a85e19aaa485302f",

  measurementId: "G-D0Y9WBHMDJ"

};


// Initialize Firebase

export const FSapp = initializeApp(firebaseConfig);
export const database = initializeFirestore(FSapp, {
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false, // and this line
});
//const analytics = getAnalytics(app);