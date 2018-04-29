import { squareToIndexOnBoard } from "./moveValidation";

export default (board: number[], moves: Move[]) => {
  return moves.reduce((acc, move) => {
    acc[squareToIndexOnBoard(move.to)] = acc[squareToIndexOnBoard(move.from)];
    acc[squareToIndexOnBoard(move.from)] = 0;
    return acc;
  }, [...board]);
}