import { roomsRef } from "../database";
import calculateNewBoard from "../calculateNewBoard";
import { initialBoard } from "../initialBoard";
import {
  checkIfMoveIsValid,
  isBlackPiece,
  isWhitePiece,
  isWhiteOrBlackPiece,
  squareToIndexOnBoard,
  ChessPiece
} from "../moveValidation";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const { from, to, roomId, userId }: MovePieceRequest = req.body;

  try {
    const roomDoc = await roomsRef.doc(roomId).get();
    const { moves, winnerColor } = roomDoc.data() as RoomModel;

    if (!!winnerColor) {
      res
        .status(403)
        .send({ error: "Can't move pieces in a game that is over" });
      return;
    }

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

    const isWhiteTurn = moves.length % 2 === 0;
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

    const currentBoard = calculateNewBoard(initialBoard, moves);

    const fromBoardIndex = squareToIndexOnBoard(from); // nämä kaksi riviä ovat identtiset moveValidation.ts kanssa
    const fromChessPiece = currentBoard[fromBoardIndex]; //
    if (
      (isWhiteTurn && !isWhitePiece(fromChessPiece)) ||
      (isBlackTurn && !isBlackPiece(fromChessPiece))
    ) {
      res
        .status(403)
        .send({ error: "You can only move your own chess pieces" });
      return;
    }

    const isMoveValid = checkIfMoveIsValid({ from, to }, currentBoard);

    if (isMoveValid) {
      const numberOfPiecesInCurrentTable = currentBoard.filter(
        isWhiteOrBlackPiece
      ).length;
      const boardAfterMove = calculateNewBoard(currentBoard, [{ from, to }]);
      const numberOfPiecesInTableAfterMove = boardAfterMove.filter(
        isWhiteOrBlackPiece
      ).length;
      const hasCaptureHappened =
        numberOfPiecesInTableAfterMove < numberOfPiecesInCurrentTable;

      const whiteKing = boardAfterMove.find(
        piece => piece === ChessPiece.WhiteKing
      );
      const blackKing = boardAfterMove.find(
        piece => piece === ChessPiece.BlackKing
      );

      try {
        const newMoves = [...moves, { from, to, hasCaptureHappened }];
        await roomDoc.ref.update(
          Object.assign(
            { moves: newMoves },
            !whiteKing || !blackKing
              ? { winnerColor: !!whiteKing ? "white" : "black" }
              : undefined
          )
        );
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
