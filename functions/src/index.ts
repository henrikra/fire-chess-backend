import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
import calculateNewBoard from "./calculateNewBoard";
import {
  checkIfMoveIsValid,
  isAnyBlackPiece,
  isAnyWhitePiece
} from "./moveValidation";
import { initialBoard } from "./initialBoard";
const cors = require("cors")({ origin: true });

admin.initializeApp();

const database = admin.firestore();
const roomsRef = database.collection("rooms");

exports.addRoom = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    roomsRef
      .add({
        title: "Chess room",
        isGameOver: false,
        moves: []
      })
      .then(doc => {
        console.log("Document written with ID: ", doc.id);
        res.send({ roomId: doc.id });
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        res.status(500).send("fucked up");
      });
  });
});

const isAnyPiece = piece => isAnyBlackPiece(piece) || isAnyWhitePiece(piece);

exports.movePiece = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { from, to, roomId }: MovePieceRequest = req.body;
    try {
      const doc = await roomsRef.doc(roomId).get();

      // 1. calculate new board from doc.data().moves
      const currentBoard = calculateNewBoard(initialBoard, doc.data().moves);
      // 2. check if move is valid
      const isMoveValid = checkIfMoveIsValid({ from, to }, currentBoard);
      // 3. add new row to moves

      if (isMoveValid) {
        const numberOfPiecesInCurrentTable = currentBoard.filter(isAnyPiece)
          .length;
        const boardAfterMove = calculateNewBoard(currentBoard, [{ from, to }]);
        const numberOfPiecesInTableAfterMove = boardAfterMove.filter(isAnyPiece)
          .length;
        const hasCaptureHappened =
          numberOfPiecesInTableAfterMove < numberOfPiecesInCurrentTable;

        try {
          const newMoves = [
            ...doc.data().moves,
            { from, to, hasCaptureHappened }
          ];
          await doc.ref.update({ moves: newMoves });
          res.send({ moves: newMoves });
        } catch (error) {
          console.error("Error updating moves", error);
          res.status(500).send({ error: "Error updating moves" });
        }
      } else {
        res.status(409).send({ error: "Invalid move" });
      }
    } catch (error) {
      console.error("Error getting document: ", error);
      res.status(500).send({ error: "Error getting document" });
    }
  });
});
