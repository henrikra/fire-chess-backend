import { lengthOfBoard } from "./moveValidation";

export const isValidKnightMove = (
  move: Move,
  fromIndex: number,
  toIndex: number,
  board: number[]
) => {
  const canMoveTwoUpOneLeft = fromIndex - 2 * lengthOfBoard - 1 === toIndex;
  const canMoveTwoUpOneRight = fromIndex - 2 * lengthOfBoard + 1 === toIndex;
  const canMoveTwoDownOneLeft = fromIndex + 2 * lengthOfBoard - 1 === toIndex;
  const canMoveTwoDownOneRight = fromIndex + 2 * lengthOfBoard + 1 === toIndex;
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
};
