import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyAgB8YC-h4c8o_zKsLdbHe1WLgTamoFkFI",
  authDomain: "vanlife-8842f.firebaseapp.com",
  projectId: "vanlife-8842f",
  storageBucket: "vanlife-8842f.firebasestorage.app",
  messagingSenderId: "510860928116",
  appId: "1:510860928116:web:6466c8b04aeb913913dd21"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getAllVans() {
  const querySnapshot = await getDocs(vansCollectionRef)
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return dataArr
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id)
  const vanSnapshot = await getDoc(docRef)
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id
  }
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"))
  const querySnapshot = await getDocs(q)
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return dataArr
}