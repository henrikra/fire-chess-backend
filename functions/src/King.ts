import { FileIndex } from "./moveValidation";

export const isValidKingMove = (
  move: Move,
  fromIndex: number,
  toIndex: number,
  board: number[]
) => {
  const fileDifference = FileIndex[move.from.file] - FileIndex[move.to.file];
  const rankDifference = move.from.rank - move.to.rank;
  console.log(Math.abs(fileDifference), Math.abs(rankDifference));
  if (Math.abs(fileDifference) <= 1 && Math.abs(rankDifference) <= 1) {
    return true
  }
  return false;
};