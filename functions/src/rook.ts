import {
  FileIndex,
  canMoveUpTo,
  canMoveDownTo,
  canMoveRightTo,
  canMoveLeftTo
} from "./moveValidation";

export const isValidRookMove = (
  move: Move,
  fromIndex: number,
  toIndex: number,
  board: number[]
) => {
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
};
