import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD-CMiEy0Cz8YMiOEWltdfzLh4uI1yCwbQ",
	authDomain: "whatsapp-2-ae833.firebaseapp.com",
	projectId: "whatsapp-2-ae833",
	storageBucket: "whatsapp-2-ae833.appspot.com",
	messagingSenderId: "1026982065208",
	appId: "1:1026982065208:web:d5967fa7dd1cf67928e2cd",
	measurementId: "G-1Z2FHXDEJ0"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {
	db,
	auth,
	provider
}