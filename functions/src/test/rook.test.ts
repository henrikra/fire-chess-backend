import { expect } from "chai";
import { checkIfMoveIsValid } from "../moveValidation";

describe('rook', () => {
  const whiteRookInMiddle = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
    -1, 7, 7, 7, 7, 0, 7, 0, 7, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 1, 0, 0, 2, 0, 7, 0, -1, // 50 - 59
    -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, // 60 - 69
    -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, // 70 - 79
    -1, 1, 0, 1, 1, 1, 1, 1, 1, -1, // 80 - 89
    -1, 0, 3, 4, 5, 6, 4, 3, 2, -1, // 90 - 99
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ];
  it('cannot move to all the way to the right', () => {
    expect(checkIfMoveIsValid({
      from: { file: 'e', rank: 5 },
      to: { file: 'h', rank: 5 }
    }, whiteRookInMiddle)).equal(false);
  });
  it('captures to right', () => {
    expect(checkIfMoveIsValid({
      from: { file: 'e', rank: 5 },
      to: { file: 'g', rank: 5 }
    }, whiteRookInMiddle)).equal(true);
  });
  it('cannot move to all the way to the left', () => {
    expect(checkIfMoveIsValid({
      from: { file: 'e', rank: 5 },
      to: { file: 'a', rank: 5 }
    }, whiteRookInMiddle)).equal(false);
  });
  it('can move left to empty square', () => {
    expect(checkIfMoveIsValid({
      from: { file: 'e', rank: 5 },
      to: { file: 'c', rank: 5 }
    }, whiteRookInMiddle)).equal(true);
  });
  it('can move down to empty square', () => {
    expect(checkIfMoveIsValid({
      from: { file: 'e', rank: 5 },
      to: { file: 'e', rank: 3 }
    }, whiteRookInMiddle)).equal(true);
  });
  it('cannot move down to capture own', () => {
    expect(checkIfMoveIsValid({
      from: { file: 'e', rank: 5 },
      to: { file: 'e', rank: 2 }
    }, whiteRookInMiddle)).equal(false);
  });
  it('can move up to empty square', () => {
    expect(checkIfMoveIsValid({
      from: { file: 'e', rank: 5 },
      to: { file: 'e', rank: 7 }
    }, whiteRookInMiddle)).equal(true);
  });
  const blackRookInMiddle = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 8, 9, 10, 0, 12, 10, 9, 8, -1,
    -1, 0, 0, 0, 0, 7, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 1, 0, 8, 0, 7, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 1, 0, 0, 0, -1, // 70 - 79
    -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, // 80 - 89
    -1, 2, 3, 4, 5, 6, 4, 3, 2, -1, // 90 - 99
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ];
  it('can capture to down', () => {
    expect(checkIfMoveIsValid({
      from: { file: 'e', rank: 5 },
      to: { file: 'e', rank: 3 }
    }, blackRookInMiddle)).equal(true);
  });
  it('can capture to left', () => {
    expect(checkIfMoveIsValid({
      from: { file: 'e', rank: 5 },
      to: { file: 'c', rank: 5 }
    }, blackRookInMiddle)).equal(true);
  });
  it('cannot move through own up', () => {
    expect(checkIfMoveIsValid({
      from: { file: 'e', rank: 5 },
      to: { file: 'e', rank: 8 }
    }, blackRookInMiddle)).equal(false);
  });
  it('cannot move through own right', () => {
    expect(checkIfMoveIsValid({
      from: { file: 'e', rank: 5 },
      to: { file: 'h', rank: 5 }
    }, blackRookInMiddle)).equal(false);
  });
  it('cannot capture diagonal', () => {
    expect(checkIfMoveIsValid({
      from: { file: 'h', rank: 6 },
      to: { file: 'f', rank: 4 }
    }, [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, 0, 9, 10, 11, 12, 10, 9, 8, -1,
      -1, 7, 7, 7, 7, 7, 7, 7, 7, -1,
      -1, 0, 0, 0, 0, 0, 0, 0, 8, -1,
      -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
      -1, 0, 0, 0, 0, 0, 1, 0, 0, -1,
      -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, // 70 - 79
      -1, 1, 1, 1, 1, 1, 0, 1, 1, -1, // 80 - 89
      -1, 2, 3, 4, 5, 6, 4, 3, 2, -1, // 90 - 99
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ])).equal(false);
  });

  it('cannot capture diagonal inverted', () => {
    expect(checkIfMoveIsValid({
      from: { file: 'h', rank: 3 },
      to: { file: 'f', rank: 5 }
    }, [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, 2, 3, 4, 5, 6, 4, 3, 2, -1, 
      -1, 1, 1, 1, 1, 1, 0, 1, 1, -1, 
      -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 
      -1, 0, 0, 0, 0, 0, 1, 0, 0, -1,
      -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
      -1, 0, 0, 0, 0, 0, 0, 0, 8, -1,
      -1, 7, 7, 7, 7, 7, 7, 7, 7, -1,
      -1, 0, 9, 10, 11, 12, 10, 9, 8, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ])).equal(false);
  });
});