import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";

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
app.use(cors);

const database = admin.firestore();
const roomsRef = database.collection("rooms");

app.post("/addRoom", async (req, res) => {
  const { userId }: CreateRoomRequest = req.body;
  if (!userId) {
    res.status(400).send({ error: "User is missing" });
    return;
  }

  try {
    const isWhite = Math.random() < 0.5;
    const doc = await roomsRef.add({ moves: [] });
    await doc
      .collection("roomPlayers")
      .doc(doc.id)
      .set({
        [isWhite ? "whitePlayerId" : "blackPlayerId"]: userId
      });
    res.send({ roomId: doc.id });
  } catch (error) {
    console.error("Error creating room", error);
    res.status(500).send({ error: "Error creating room" });
  }
});

app.post("/joinGame", async (req, res) => {
  const { roomId, userId }: JoinGameRequest = req.body;
  if (!roomId) {
    res.status(400).send({ error: "No room specified" });
    return;
  }
  if (!userId) {
    res.status(400).send({ error: "No user specified" });
    return;
  }

  try {
    const roomPlayersRef = roomsRef
      .doc(roomId)
      .collection("roomPlayers")
      .doc(roomId);
    const roomPlayers = await roomPlayersRef.get();
    const {
      whitePlayerId,
      blackPlayerId
    } = roomPlayers.data() as RoomPlayersModel;
    if (whitePlayerId === userId || blackPlayerId === userId) {
      res.status(403).send({ error: "You have already joined the game" });
      return;
    }
    if (whitePlayerId && blackPlayerId) {
      res.status(403).send({ error: "Can't join a full game" });
      return;
    }
    await roomPlayersRef.update({
      [whitePlayerId ? "blackPlayerId" : "whitePlayerId"]: userId
    });
    res.send({ success: "You have joined the game" });
  } catch (error) {
    console.error("Error getting document: ", error);
    res.status(500).send({ error: "Error getting document" });
  }
});

const isAnyPiece = piece => isAnyBlackPiece(piece) || isAnyWhitePiece(piece);

app.post("/movePiece", async (req, res) => {
  const { from, to, roomId, userId }: MovePieceRequest = req.body;
  if (!userId) {
    res.status(400).send({ error: "User is missing" });
    return;
  }

  try {
    const roomDoc = await roomsRef.doc(roomId).get();
    const currentMoves = roomDoc.data().moves;

    const roomPlayersDoc = await roomDoc.ref
      .collection("roomPlayers")
      .doc(roomDoc.id)
      .get();
    const {
      blackPlayerId,
      whitePlayerId
    } = roomPlayersDoc.data() as RoomPlayersModel;

    if (!blackPlayerId || !whitePlayerId) {
      res
        .status(403)
        .send({ error: "You can\'t move pieces until all players have joined" });
      return;
    }

    const isWhiteTurn = currentMoves.length % 2 === 0;
    const isBlackTurn = !isWhiteTurn;
    if (isWhiteTurn && userId !== whitePlayerId) {
      res
        .status(403)
        .send({ error: "You have to wait until white makes its move" });
      return;
    }
    if (isBlackTurn && userId !== blackPlayerId) {
      res
        .status(403)
        .send({ error: "You have to wait until black makes its move" });
      return;
    }
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
