import { isValidBishopMove } from "./bishop";
import { isValidRookMove } from "./rook";
import { isValidKnightMove } from "./knight";
import { isValidWhitePawnMove, isValidBlackPawnMove } from "./pawn";

export enum ChessPiece {
  None,
  WhitePawn,
  WhiteRook,
  WhiteKnight,
  WhiteBishop,
  WhiteQueen,
  WhiteKing,
  BlackPawn,
  BlackRook,
  BlackKnight,
  BlackBishop,
  BlackQueen,
  BlackKing
}

export const FileIndex = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7
};

const bottomLeftIndex = 91;
export const lengthOfBoard = 10;
export const squareToIndexOnBoard = (square: Square) =>
  bottomLeftIndex - (square.rank - 1) * lengthOfBoard + FileIndex[square.file];
export const isBlackPiece = (piece: ChessPiece) =>
  [
    ChessPiece.BlackPawn,
    ChessPiece.BlackRook,
    ChessPiece.BlackKnight,
    ChessPiece.BlackBishop,
    ChessPiece.BlackQueen,
    ChessPiece.BlackKing
  ].includes(piece);
export const isWhitePiece = (piece: ChessPiece) =>
  [
    ChessPiece.WhitePawn,
    ChessPiece.WhiteRook,
    ChessPiece.WhiteKnight,
    ChessPiece.WhiteBishop,
    ChessPiece.WhiteQueen,
    ChessPiece.WhiteKing
  ].includes(piece);
export const isWhiteOrBlackPiece = (piece: ChessPiece) =>
  isBlackPiece(piece) || isWhitePiece(piece);

const isPieceOrOutOfBounds = (content: number) =>
  content === -1 || isWhiteOrBlackPiece(content);

export const canMoveRightTo = (
  fromIndex: number,
  toIndex: number,
  board: number[]
) => {
  for (let i = fromIndex + 1; i < toIndex; i++) {
    if (isPieceOrOutOfBounds(board[i])) {
      return false;
    }
  }
  return true;
};
export const canMoveLeftTo = (
  fromIndex: number,
  toIndex: number,
  board: number[]
) => {
  for (let i = fromIndex - 1; i > toIndex; i--) {
    if (isPieceOrOutOfBounds(board[i])) {
      return false;
    }
  }
  return true;
};
export const canMoveDownTo = (
  fromIndex: number,
  toIndex: number,
  board: number[]
) => {
  for (let i = fromIndex + lengthOfBoard; i < toIndex; i += lengthOfBoard) {
    if (isPieceOrOutOfBounds(board[i])) {
      return false;
    }
  }
  return true;
};
export const canMoveUpTo = (
  fromIndex: number,
  toIndex: number,
  board: number[]
) => {
  for (let i = fromIndex - lengthOfBoard; i > toIndex; i -= lengthOfBoard) {
    if (isPieceOrOutOfBounds(board[i])) {
      return false;
    }
  }
  return true;
};

export const canMoveUpLeft = (
  fromIndex: number,
  toIndex: number,
  board: number[]
) => {
  for (
    let i = fromIndex - (lengthOfBoard + 1);
    i > toIndex;
    i -= lengthOfBoard + 1
  ) {
    if (isPieceOrOutOfBounds(board[i])) {
      return false;
    }
  }
  return true;
};

export const canMoveUpRight = (
  fromIndex: number,
  toIndex: number,
  board: number[]
) => {
  for (
    let i = fromIndex - (lengthOfBoard - 1);
    i > toIndex;
    i -= lengthOfBoard - 1
  ) {
    if (isPieceOrOutOfBounds(board[i])) {
      return false;
    }
  }
  return true;
};

export const canMoveDownLeft = (
  fromIndex: number,
  toIndex: number,
  board: number[]
) => {
  for (
    let i = fromIndex + (lengthOfBoard - 1);
    i < toIndex;
    i += lengthOfBoard - 1
  ) {
    if (isPieceOrOutOfBounds(board[i])) {
      return false;
    }
  }
  return true;
};

export const canMoveDownRight = (
  fromIndex: number,
  toIndex: number,
  board: number[]
) => {
  for (
    let i = fromIndex + (lengthOfBoard + 1);
    i < toIndex;
    i += lengthOfBoard + 1
  ) {
    if (isPieceOrOutOfBounds(board[i])) {
      return false;
    }
  }
  return true;
};

export const checkIfMoveIsValid = (move: Move, board: number[]) => {
  const fromIndex = squareToIndexOnBoard(move.from);
  const toIndex = squareToIndexOnBoard(move.to);
  const chessPieceToBeMoved = board[fromIndex];
  const toSquareContent = board[toIndex];

  if (chessPieceToBeMoved === -1 || toSquareContent === -1) {
    return false;
  }
  if (
    (isWhitePiece(chessPieceToBeMoved) && isWhitePiece(toSquareContent)) ||
    (isBlackPiece(chessPieceToBeMoved) && isBlackPiece(toSquareContent))
  ) {
    return false;
  }

  switch (chessPieceToBeMoved) {
    case ChessPiece.WhitePawn: {
      return isValidWhitePawnMove(
        move,
        fromIndex,
        toIndex,
        board,
        toSquareContent
      );
    }
    case ChessPiece.BlackPawn: {
      return isValidBlackPawnMove(
        move,
        fromIndex,
        toIndex,
        board,
        toSquareContent
      );
    }
    case ChessPiece.BlackKnight:
    case ChessPiece.WhiteKnight: {
      return isValidKnightMove(move, fromIndex, toIndex, board);
    }
    case ChessPiece.BlackRook:
    case ChessPiece.WhiteRook: {
      return isValidRookMove(move, fromIndex, toIndex, board);
    }

    case ChessPiece.WhiteBishop:
    case ChessPiece.BlackBishop: {
      return isValidBishopMove(move, fromIndex, toIndex, board);
    }

    case ChessPiece.WhiteQueen:
    case ChessPiece.BlackQueen: {
      return (
        isValidRookMove(move, fromIndex, toIndex, board) ||
        isValidBishopMove(move, fromIndex, toIndex, board)
      );
    }

    default:
      console.log("Could not find matching chess piece!");
      return false;
  }
};
