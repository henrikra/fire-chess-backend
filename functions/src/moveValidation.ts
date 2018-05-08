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
        toIndex + 2 * lengthOfBoard === fromIndex && move.from.rank === 2;
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
        toIndex - 2 * lengthOfBoard === fromIndex && move.from.rank === 7;
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
    default:
      console.log("Could not find matching chess piece!");
      return false;
  }
};
