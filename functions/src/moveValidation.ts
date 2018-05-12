enum ChessPiece {
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

const FileIndex = {
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
const lengthOfBoard = 10;
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

const canMoveRightTo = (
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
const canMoveLeftTo = (fromIndex: number, toIndex: number, board: number[]) => {
  for (let i = fromIndex - 1; i > toIndex; i--) {
    if (isPieceOrOutOfBounds(board[i])) {
      return false;
    }
  }
  return true;
};
const canMoveDownTo = (fromIndex: number, toIndex: number, board: number[]) => {
  for (let i = fromIndex + lengthOfBoard; i < toIndex; i += lengthOfBoard) {
    if (isPieceOrOutOfBounds(board[i])) {
      return false;
    }
  }
  return true;
};
const canMoveUpTo = (fromIndex: number, toIndex: number, board: number[]) => {
  for (let i = fromIndex - lengthOfBoard; i > toIndex; i -= lengthOfBoard) {
    if (isPieceOrOutOfBounds(board[i])) {
      return false;
    }
  }
  return true;
};

const canMoveUpLeft = (fromIndex: number, toIndex: number, board: number[]) => {
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

const canMoveUpRight = (
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

const canMoveDownLeft = (
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

const canMoveDownRight = (
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
    }
    case ChessPiece.BlackPawn: {
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
    }
    case ChessPiece.BlackKnight:
    case ChessPiece.WhiteKnight: {
      const canMoveTwoUpOneLeft = fromIndex - 2 * lengthOfBoard - 1 === toIndex;
      const canMoveTwoUpOneRight =
        fromIndex - 2 * lengthOfBoard + 1 === toIndex;
      const canMoveTwoDownOneLeft =
        fromIndex + 2 * lengthOfBoard - 1 === toIndex;
      const canMoveTwoDownOneRight =
        fromIndex + 2 * lengthOfBoard + 1 === toIndex;
      const canMoveTwoLeftOneUp = fromIndex - 2 - lengthOfBoard === toIndex;
      const canMoveTwoLeftOneDown = fromIndex - 2 + lengthOfBoard === toIndex;
      const canMoveTwoRightOneUp = fromIndex + 2 - lengthOfBoard === toIndex;
      const canMoveTwoRightOneDown = fromIndex + 2 + lengthOfBoard === toIndex;
      return (
        canMoveTwoUpOneLeft ||
        canMoveTwoUpOneRight ||
        canMoveTwoDownOneLeft ||
        canMoveTwoDownOneRight ||
        canMoveTwoLeftOneUp ||
        canMoveTwoLeftOneDown ||
        canMoveTwoRightOneUp ||
        canMoveTwoRightOneDown
      );
    }
    case ChessPiece.BlackRook:
    case ChessPiece.WhiteRook: {
      if (move.from.file === move.to.file) {
        if (move.from.rank < move.to.rank) {
          return canMoveUpTo(fromIndex, toIndex, board);
        }
        return canMoveDownTo(fromIndex, toIndex, board);
      } else if (move.from.rank === move.to.rank) {
        if (FileIndex[move.from.file] < FileIndex[move.to.file]) {
          return canMoveRightTo(fromIndex, toIndex, board);
        }
        return canMoveLeftTo(fromIndex, toIndex, board);
      }
      return false;
    }

    case ChessPiece.WhiteBishop:
    case ChessPiece.BlackBishop: {
      if (move.from.file !== move.to.file && move.from.rank !== move.to.rank) {
        if (fromIndex - toIndex < 0) {
          return (
            canMoveDownLeft(fromIndex, toIndex, board) ||
            canMoveDownRight(fromIndex, toIndex, board)
          );
        } else {
          return (
            canMoveUpLeft(fromIndex, toIndex, board) ||
            canMoveUpRight(fromIndex, toIndex, board)
          );
        }
      }

      return false;
    }
    default:
      console.log("Could not find matching chess piece!");
      return false;
  }
};


