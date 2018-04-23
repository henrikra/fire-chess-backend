import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
import calculateNewBoard from "./calculateNewBoard";
import { checkIfMoveIsValid } from "./moveValidation";
const cors = require("cors")({ origin: true });

admin.initializeApp();

const database = admin.firestore();
const roomsRef = database.collection("rooms");

const initialBoard = [
  2, 3, 4, 5, 6, 4, 3, 2, // 0-7
  1, 1, 1, 1, 1, 1, 1, 1, // 8-15
  0, 0, 0, 0, 0, 0, 0, 0, // 16-23
  0, 0, 0, 0, 0, 0, 0, 0, // 24-31
  0, 0, 0, 0, 0, 0, 0, 0, // 32-39
  0, 0, 0, 0, 0, 0, 0, 0, // 40-47
  7, 7, 7, 7, 7, 7, 7, 7, // 48-55
  8, 9, 10, 11, 12, 10, 9, 8, // 56-63
];

exports.addRoom = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    roomsRef
      .add({
        title: "Chess room",
        isGameOver: false,
        moves: [],
      })
      .then(doc => {
        console.log("Document written with ID: ", doc.id);
        res.send({roomId: doc.id});
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        res.status(500).send("fucked up");
      });
  });
});

exports.movePiece = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const {from, to, roomId} = req.body;
    try {
      const doc = await roomsRef.doc(roomId).get();

      // 1. calculate new board from doc.data().moves
      const newBoard = calculateNewBoard(doc.data().moves)
      // 2. check if move is valid
      const isMoveValid = checkIfMoveIsValid({from, to}, newBoard);
      // 3. add new row to moves

      if (isMoveValid) {
        try {
          const newMoves = [...doc.data().moves, {from, to}];
          await doc.ref.update({moves: newMoves})
          res.send({moves: newMoves});
        } catch (error) {
          console.error('Error updating moves', error);
          res.status(500).send({error: 'Error updating moves'});
        }
      } else {
        res.status(409).send({error: 'Invalid move'});
      }
    } catch (error) {
      console.error("Error getting document: ", error);
      res.status(500).send({error: 'Error getting document'});
    }
  })
})
