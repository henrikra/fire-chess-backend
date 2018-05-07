import { roomsRef } from "../database";
import calculateNewBoard from "../calculateNewBoard";
import { initialBoard } from "../initialBoard";
import {
  checkIfMoveIsValid,
  isAnyBlackPiece,
  isAnyWhitePiece,
  isAnyPiece,
  squareToIndexOnBoard
} from "../moveValidation";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
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
        .send({ error: "You can't move pieces until all players have joined" });
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

    const currentBoard = calculateNewBoard(initialBoard, currentMoves);

    const fromBoardIndex = squareToIndexOnBoard(from);
    const fromChessPiece = currentBoard[fromBoardIndex];
    if (
      (isWhiteTurn && !isAnyWhitePiece(fromChessPiece)) ||
      (isBlackTurn && !isAnyBlackPiece(fromChessPiece))
    ) {
      res
        .status(403)
        .send({ error: "You can only move your own chess pieces" });
      return;
    }

    const isMoveValid = checkIfMoveIsValid({ from, to }, currentBoard);

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
      res.status(409).send({ error: "You can't do move like that" });
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    res.status(500).send({ error: "Error getting document" });
  }
};
