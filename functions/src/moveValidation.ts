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
const squareToIndexOnBoard = (square: Square) =>
  bottomLeftIndex - (square.rank - 1) * lengthOfBoard + FileIndex[square.file];
const isAnyBlackPiece = (piece: ChessPiece) =>
  [
    ChessPiece.BlackPawn,
    ChessPiece.BlackRook,
    ChessPiece.BlackKnight,
    ChessPiece.BlackBishop,
    ChessPiece.BlackQueen,
    ChessPiece.BlackKing
  ].includes(piece);

export const checkIfMoveIsValid = (move: Move, board: number[]) => {
  const fromIndex = squareToIndexOnBoard(move.from);
  const toIndex = squareToIndexOnBoard(move.to);
  const chessPieceToBeMoved = board[fromIndex];
  const toSquareContent = board[toIndex];

  if (chessPieceToBeMoved === -1 || toSquareContent === -1) {
    return false;
  }

  switch (chessPieceToBeMoved) {
    case ChessPiece.WhitePawn:
      const canMoveOneStepToEmptySquare =
        toIndex + lengthOfBoard === fromIndex &&
        toSquareContent === ChessPiece.None;
      const canMoveTwoStepToEmptySquareWhenAtStartingPosition =
        toIndex + 2 * lengthOfBoard === fromIndex && move.from.rank === 2;
      const canCaptureDiagonalOneStep =
        isAnyBlackPiece(toSquareContent) &&
        (toIndex + 9 === fromIndex || toIndex + 11 === fromIndex);
      return (
        canMoveOneStepToEmptySquare ||
        canMoveTwoStepToEmptySquareWhenAtStartingPosition ||
        canCaptureDiagonalOneStep
      );
    default:
      console.log("Could not find matching chess piece!");
      return false;
  }
};
