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
  ];
  
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

  const bishopInTheMiddle = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
    -1, 7, 7, 7, 7, 7, 7, 0, 7, -1,
    -1, 0, 0, 0, 0, 0, 7, 0, 0, -1,
    -1, 0, 0, 0, 0, 4, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 1, 0, 0, -1,
    -1, 0, 0, 1, 0, 0, 0, 0, 0, -1, // 70 - 79
    -1, 1, 0, 1, 1, 1, 0, 1, 1, -1, // 80 - 89
    -1, 2, 3, 0, 5, 6, 4, 3, 2, -1, // 90 - 99
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ];
  it("cannot move through own", () => {
    expect(
      checkIfMoveIsValid({
        from: { file: "e", rank: 5 },
        to: { file: "b", rank: 2 }
      }, bishopInTheMiddle)
    ).equal(false);
  });

  it("cannot move through own when own is right next to", () => {
    expect(
      checkIfMoveIsValid({
        from: { file: "e", rank: 5 },
        to: { file: "g", rank: 3 }
      }, bishopInTheMiddle)
    ).equal(false);
  });

  it("cannot move horizontal", () => {
    expect(
      checkIfMoveIsValid({
        from: { file: "e", rank: 5 },
        to: { file: "a", rank: 5 }
      }, bishopInTheMiddle)
    ).equal(false);
  });

  it("cannot capture through enemy", () => {
    expect(
      checkIfMoveIsValid({
        from: { file: "e", rank: 5 },
        to: { file: "g", rank: 8 }
      }, bishopInTheMiddle)
    ).equal(false);
  });

  it("captures enemy pieces", () => {
    expect(
      checkIfMoveIsValid({
        from: { file: "e", rank: 5 },
        to: { file: "c", rank: 7 }
      }, bishopInTheMiddle)
    ).equal(true);
  });

  const thisDoesNotWork = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 8, 9, 0, 11, 12, 10, 9, 8, -1,
    -1, 7, 7, 7, 10, 0, 7, 7, 7, -1,
    -1, 4, 0, 0, 7, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 7, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 4, 1, 0, 0, 1, 0, 0, 0, -1,
    -1, 1, 0, 1, 1, 0, 1, 1, 1, -1,
    -1, 2, 3, 0, 5, 6, 0, 3, 2, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
  ]

  it("cannot capture enemy pieces like this", () => {
    expect(
      checkIfMoveIsValid({
        from: { file: "d", rank: 7 },
        to: { file: "a", rank: 6 }
      }, thisDoesNotWork)
    ).equal(false);
  });

  it("cannot capture enemy pieces like this other side", () => {
    const thisDoesNotWorkSecond = [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, 8, 9, 0, 11, 12, 10, 9, 8, -1,
      -1, 7, 7, 7, 0, 10, 7, 7, 7, -1,
      -1, 0, 0, 0, 7, 0, 0, 0, 4, -1,
      -1, 0, 0, 0, 0, 7, 0, 0, 0, -1,
      -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
      -1, 4, 1, 0, 0, 1, 0, 0, 0, -1,
      -1, 1, 0, 1, 1, 0, 1, 1, 1, -1,
      -1, 2, 3, 0, 5, 6, 0, 3, 2, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
    ]
    expect(
      checkIfMoveIsValid({
        from: { file: "e", rank: 7 },
        to: { file: "h", rank: 6 }
      }, thisDoesNotWorkSecond)
    ).equal(false);
  });

  it.only("cannot capture enemy pieces like this mirrored", () => {
    expect(
      checkIfMoveIsValid({
        from: { file: "d", rank: 2 },
        to: { file: "a", rank: 3 }
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 2, 3, 0, 5, 6, 0, 3, 2, -1,
        -1, 1, 0, 1, 1, 0, 1, 1, 1, -1,
        -1, 4, 1, 0, 0, 1, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 7, 0, 0, 0, -1,
        -1, 4, 0, 0, 7, 0, 0, 0, 0, -1,
        -1, 7, 7, 7, 10, 0, 7, 7, 7, -1,
        -1, 8, 9, 0, 11, 12, 10, 9, 8, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])
    ).equal(false);
  });

  // it.only("cannot capture enemy pieces like this other side", () => {
  //   const thisDoesNotWorkSecond = [
  //     -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  //     -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  //     -1, 8, 9, 0, 11, 12, 10, 9, 8, -1,
  //     -1, 7, 7, 7, 0, 10, 7, 7, 7, -1,
  //     -1, 0, 0, 0, 7, 0, 0, 0, 4, -1,
  //     -1, 0, 0, 0, 0, 7, 0, 0, 0, -1,
  //     -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
  //     -1, 4, 1, 0, 0, 1, 0, 0, 0, -1,
  //     -1, 1, 0, 1, 1, 0, 1, 1, 1, -1,
  //     -1, 2, 3, 0, 5, 6, 0, 3, 2, -1,
  //     -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  //     -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
  //   ]
  //   expect(
  //     checkIfMoveIsValid({
  //       from: { file: "e", rank: 7 },
  //       to: { file: "h", rank: 6 }
  //     }, thisDoesNotWorkSecond)
  //   ).equal(false);
  // });
});
