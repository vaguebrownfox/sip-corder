import firebase from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import "firebase/storage";

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const stor = firebase.storage();
