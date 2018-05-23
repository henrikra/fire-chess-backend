import { expect } from "chai";
import { checkIfMoveIsValid } from "../moveValidation";

describe('king', () => {
  const kingInTheMiddle = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
    -1, 7, 7, 7, 0, 7, 0, 7, 7, -1,
    -1, 0, 0, 0, 7, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 7, 6, 7, 0, 0, -1,
    -1, 0, 0, 0, 0, 1, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, // 70 - 79
    -1, 1, 1, 1, 1, 0, 1, 1, 1, -1, // 80 - 89
    -1, 2, 3, 4, 5, 0, 4, 3, 2, -1, // 90 - 99
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ];

  it('moves one step up', () => {
    expect(checkIfMoveIsValid({ 
      from: { file: 'e', rank: 5 }, 
      to: { file: 'e', rank: 6 }
    }, kingInTheMiddle)).equal(true);
  });

  it('cannot capture up like a rook', () => {
    expect(checkIfMoveIsValid({ 
      from: { file: 'e', rank: 5 }, 
      to: { file: 'e', rank: 7 }
    }, kingInTheMiddle)).equal(false);
  });

  it('cannot move down to own piece', () => {
    expect(checkIfMoveIsValid({ 
      from: { file: 'e', rank: 5 }, 
      to: { file: 'e', rank: 4 }
    }, kingInTheMiddle)).equal(false);
  });

  it('captures to right', () => {
    expect(checkIfMoveIsValid({ 
      from: { file: 'e', rank: 5 }, 
      to: { file: 'f', rank: 5 }
    }, kingInTheMiddle)).equal(true);
  });

  it('cannot move through enemy', () => {
    expect(checkIfMoveIsValid({ 
      from: { file: 'e', rank: 5 }, 
      to: { file: 'g', rank: 5 }
    }, kingInTheMiddle)).equal(false);
  });

  it('moves diagonal', () => {
    expect(checkIfMoveIsValid({ 
      from: { file: 'e', rank: 5 }, 
      to: { file: 'f', rank: 6 }
    }, kingInTheMiddle)).equal(true);
  });
});