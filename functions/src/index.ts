import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from 'express';

import calculateNewBoard from "./calculateNewBoard";
import {
  checkIfMoveIsValid,
  isAnyBlackPiece,
  isAnyWhitePiece
} from "./moveValidation";
import { initialBoard } from "./initialBoard";
const cors = require("cors")({ origin: true });

admin.initializeApp();

const app = express();
app.use(cors)

const database = admin.firestore();
const roomsRef = database.collection("rooms");

app.get('/addRoom', (req, res) => {
  const isWhite = Math.random() < 0.5;

  roomsRef
    .add({
      moves: [],
      [isWhite ? 'whitePlayerId' : 'blackPlayerId']: 'ofdsofk'
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

const isAnyPiece = piece => isAnyBlackPiece(piece) || isAnyWhitePiece(piece);

app.post('/movePiece', async (req, res) => {
  const { from, to, roomId }: MovePieceRequest = req.body;
  try {
    const roomDoc = await roomsRef.doc(roomId).get();
    const currentMoves = roomDoc.data().moves;

    // 1. calculate new board from doc.data().moves
    const currentBoard = calculateNewBoard(initialBoard, currentMoves);
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
        const newMoves = [...currentMoves, { from, to, hasCaptureHappened }];
        await roomDoc.ref.update({ moves: newMoves });
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

exports.app = functions.https.onRequest(app);