"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp();
const db = admin.firestore();
const roomsRef = db.collection("rooms");
exports.addRoom = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        roomsRef
            .add({
            title: "Chess room",
            isGameOver: false,
            board: [
                2, 3, 4, 5, 6, 4, 3, 2,
                1, 1, 1, 1, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                7, 7, 7, 7, 7, 7, 7, 7,
                8, 9, 10, 11, 12, 10, 9, 8,
            ]
        })
            .then(doc => {
            console.log("Document written with ID: ", doc.id);
            res.send({
                roomId: doc.id
            });
        })
            .catch(error => {
            console.error("Error adding document: ", error);
            res.status(500).send("fucked up");
        });
    });
});
exports.movePiece = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const { from, to, roomId } = req.body;
        roomsRef.doc(roomId).get().then(doc => {
            console.log('iha vaan jtn random paskaa');
            console.log(doc.data());
            res.send({ board: doc.data().board });
        }).catch(error => {
            console.error("Error adding document: ", error);
            res.status(500).send("fucked up");
        });
        // res.send(req.body);
    });
});
//# sourceMappingURL=index.js.map