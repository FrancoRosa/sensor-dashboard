import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
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
      message: null,
      timestamp: null,
    },
    reservoirs: [false, false, false, false],
    last_measurement: { timestamp: Math.round(Date.now() / 1000) },
  });
  return nodesDoc;
};

export const deleteNode = async (node) => {
  const { id } = node;
  await deleteDoc(doc(db, "nodes", id));
};

export const getMeasurement = async (node_id, date) => {
  const docRef = doc(db, "nodes", node_id, "measurements", date);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().values;
  } else {
    return [null, null, null, null];
  }
};

export const getAllMeasurements = async (node_id) => {
  const collectionRef = collection(db, "nodes", node_id, "measurements");
  const docs = await getDocs(collectionRef);
  const records = [];
  docs.forEach((doc) => {
    records.push([doc.id, ...doc.data().values]);
  });
  console.log(records);
  return records;
};
