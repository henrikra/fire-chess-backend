enum ChessPiece {
  None,
  WhitePawn
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

export const checkIfMoveIsValid = (
  { from, to }: { from: Square; to: Square },
  board: number[]
) => {
  const fromIndex = squareToIndexOnBoard(from);
  const toIndex = squareToIndexOnBoard(to);
  const chessPieceToBeMoved = board[fromIndex];
  const toSquareContent = board[toIndex];
  console.log("liikutetaan", chessPieceToBeMoved);
  switch (chessPieceToBeMoved) {
    case ChessPiece.WhitePawn:
      // if (toSquareContent === ChessPiece.None) {
      //   if (move.to === move.from + 8) {

      //   }
      // } else {

      // }
      console.log("valkoinen pawn");
      break;

    default:
      break;
  }
  return true;
};
