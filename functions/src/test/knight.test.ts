import { expect } from 'chai';
import { checkIfMoveIsValid } from '../moveValidation';
import { initialBoard } from '../initialBoard';

describe("knight", () => {
  const whiteHorseInMiddle = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
    -1, 7, 7, 7, 7, 7, 7, 7, 7, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 3, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, // 70 - 79
    -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, // 80 - 89
    -1, 2, 0, 4, 5, 6, 4, 3, 2, -1, // 90 - 99
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ];
  it("two up, one left", () => {
    expect(checkIfMoveIsValid({ 
      from: { file: "b", rank: 1 }, 
      to: { file: "a", rank: 3 } 
    }, initialBoard)).equal(true);
  });
  it("two up, one right", () => {
    expect(checkIfMoveIsValid({ 
      from: { file: "b", rank: 1 }, 
      to: { file: "c", rank: 3 } 
    }, initialBoard)).equal(true);
  });
  it("two down, one left", () => {
    expect(checkIfMoveIsValid({ 
      from: { file: "b", rank: 8 }, 
      to: { file: "a", rank: 6 } 
    }, initialBoard)).equal(true);
  });
  it("two down, one right", () => {
    expect(checkIfMoveIsValid({ 
      from: { file: "b", rank: 8 }, 
      to: { file: "c", rank: 6 } 
    }, initialBoard)).equal(true);
  });
  it("two left, one up", () => {
    expect(checkIfMoveIsValid({ 
      from: { file: "d", rank: 5 }, 
      to: { file: "b", rank: 6 } 
    }, whiteHorseInMiddle)).equal(true);
  });
  it("two left, one down", () => {
    expect(checkIfMoveIsValid({ 
      from: { file: "d", rank: 5 }, 
      to: { file: "b", rank: 4 } 
    }, whiteHorseInMiddle)).equal(true);
  });
  it("two right, one up", () => {
    expect(checkIfMoveIsValid({ 
      from: { file: "d", rank: 5 }, 
      to: { file: "f", rank: 6 } 
    }, whiteHorseInMiddle)).equal(true);
  });
  it("two right, one down", () => {
    expect(checkIfMoveIsValid({ 
      from: { file: "d", rank: 5 }, 
      to: { file: "f", rank: 4 } 
    }, whiteHorseInMiddle)).equal(true);
  });
});