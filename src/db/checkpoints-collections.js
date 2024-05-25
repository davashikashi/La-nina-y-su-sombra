"use strict";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const checkpointsRef = collection(db, "checkpoints");

const createCheckpoint = async (checkpointData) => {
    try {
       const docRef = await addDoc(checkpointsRef, checkpointData);
       return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export { createCheckpoint };