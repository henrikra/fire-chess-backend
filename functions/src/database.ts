import * as admin from "firebase-admin";
admin.initializeApp();

const database = admin.firestore();
export const roomsRef = database.collection("rooms"); 