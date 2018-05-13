import {
  lengthOfBoard,
  canMoveUpTo,
  isBlackPiece,
  ChessPiece,
  canMoveDownTo,
  isWhitePiece
} from "./moveValidation";

export const isValidWhitePawnMove = (
  move: Move,
  fromIndex: number,
  toIndex: number,
  board: number[],
  toSquareContent: number
) => {
  const canMoveOneStepToEmptySquare =
    toIndex + lengthOfBoard === fromIndex &&
    toSquareContent === ChessPiece.None;
  const canMoveTwoStepToEmptySquareWhenAtStartingPosition =
    canMoveUpTo(fromIndex, toIndex, board) &&
    toIndex + 2 * lengthOfBoard === fromIndex &&
    move.from.rank === 2;
  const canCaptureDiagonalOneStep =
    isBlackPiece(toSquareContent) &&
    (toIndex + 9 === fromIndex || toIndex + 11 === fromIndex);
  return (
    canMoveOneStepToEmptySquare ||
    canMoveTwoStepToEmptySquareWhenAtStartingPosition ||
    canCaptureDiagonalOneStep
  );
};

export const isValidBlackPawnMove = (
  move: Move,
  fromIndex: number,
  toIndex: number,
  board: number[],
  toSquareContent: number
) => {
  const canMoveOneStepToEmptySquare =
    toIndex - lengthOfBoard === fromIndex &&
    toSquareContent === ChessPiece.None;
  const canMoveTwoStepToEmptySquareWhenAtStartingPosition =
    canMoveDownTo(fromIndex, toIndex, board) &&
    toIndex - 2 * lengthOfBoard === fromIndex &&
    move.from.rank === 7;
  const canCaptureDiagonalOneStep =
    isWhitePiece(toSquareContent) &&
    (toIndex - 9 === fromIndex || toIndex - 11 === fromIndex);
  return (
    canMoveOneStepToEmptySquare ||
    canMoveTwoStepToEmptySquareWhenAtStartingPosition ||
    canCaptureDiagonalOneStep
  );
};
