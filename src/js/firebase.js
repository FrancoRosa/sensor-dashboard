import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
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

export const getNodes = async () => {
  console.log("... getting nodes");
  const nodesDoc = await getDocs(collection(db, "nodes"));
  const nodes = [];
  nodesDoc.forEach((doc) => {
    nodes.push({ ...doc.data(), id: doc.id });
  });
  return nodes;
};

export const createNode = async (node) => {
  console.log("... creating node");
  const {
    id,
    address,
    company,
    contactName,
    contactPhone,
    description,
    lat,
    lng,
  } = node;
  const nodesDoc = await setDoc(doc(db, "nodes", id), {
    id,
    info: {
      address,
      company,
      contactName,
      contactPhone,
      description,
      id,
      lat,
      lng,
    },
    notification: {
      message: "",
      timestamp: null,
    },
    reservoirs: [0, 0, 0, 0],
  });
  return nodesDoc;
};
