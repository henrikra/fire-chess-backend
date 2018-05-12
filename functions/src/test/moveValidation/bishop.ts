import { expect } from "chai";
import "mocha";
import { checkIfMoveIsValid } from "../../moveValidation";

describe("bishop", () => {
  const fourPawnsMovedOutOfTheWay = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 8, 9, 10, 11, 12, 10, 9, 8, -1, // 20 - 29
    -1, 7, 0, 7, 7, 7, 7, 0, 7, -1, // 30 - 39
    -1, 0, 7, 0, 0, 0, 0, 7, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 1, 0, 0, 0, 0, 1, 0, -1, // 70 - 79
    -1, 1, 0, 1, 1, 1, 1, 0, 1, -1, // 80 - 89
    -1, 2, 3, 4, 5, 6, 4, 3, 2, -1, // 90 - 99
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ]
  
  it("moves up left", () => {
    expect(
      checkIfMoveIsValid({
        from: { file: "c", rank: 1 },
        to: { file: "a", rank: 3 }
      }, fourPawnsMovedOutOfTheWay)
    ).equal(true);
  });

  it("moves up right", () => {
    expect(
      checkIfMoveIsValid({
        from: { file: "f", rank: 1 },
        to: { file: "h", rank: 3 }
      }, fourPawnsMovedOutOfTheWay)
    ).equal(true);
  });

  it("moves down left", () => {
    expect(
      checkIfMoveIsValid({
        from: { file: "c", rank: 8 },
        to: { file: "a", rank: 6 }
      }, fourPawnsMovedOutOfTheWay)
    ).equal(true);
  });

  it("moves down right", () => {
    expect(
      checkIfMoveIsValid({
        from: { file: "f", rank: 8 },
        to: { file: "h", rank: 6 }
      }, fourPawnsMovedOutOfTheWay)
    ).equal(true);
  });
});
