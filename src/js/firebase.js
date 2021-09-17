import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore/lite";
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export const getCredentials = async () => {
  console.log("... getting credentials");
  const credentials = doc(db, "authentication/credentials");
  const response = await getDoc(credentials);
  return response.data();
};
