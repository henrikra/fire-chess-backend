import { initialBoard } from "./initialBoard";

export default (moves: Move[]) => {
  // return moves.reduce((acc, move) => {
  //   acc[move.to] = acc[move.from];
  //   acc[move.from] = 0;
  //   return acc;
  // }, initialBoard);
  return initialBoard
}