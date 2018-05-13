import {
  canMoveDownRight,
  canMoveDownLeft,
  canMoveUpRight,
  canMoveUpLeft,
  FileIndex
} from "./moveValidation";

export const isValidBishopMove = (
  move: Move,
  fromIndex: number,
  toIndex: number,
  board: number[]
) => {
  const fileDifference = FileIndex[move.from.file] - FileIndex[move.to.file];
  const rankDifference = move.from.rank - move.to.rank;
  if (Math.abs(fileDifference) === Math.abs(rankDifference)) {
    const isGoingRight = fileDifference < 0;
    const isGoingDown = rankDifference > 0;
    if (isGoingDown) {
      if (isGoingRight) {
        return canMoveDownRight(fromIndex, toIndex, board);
      }
      return canMoveDownLeft(fromIndex, toIndex, board);
    } else {
      if (isGoingRight) {
        return canMoveUpRight(fromIndex, toIndex, board);
      }
      return canMoveUpLeft(fromIndex, toIndex, board);
    }
  }

  return false;
};
