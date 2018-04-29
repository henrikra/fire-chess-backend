import { expect } from 'chai';
import 'mocha';

import calculateNewBoard from '../calculateNewBoard';
import {checkIfMoveIsValid} from '../moveValidation';
import { initialBoard } from '../initialBoard';

// describe('calculateNewBoard', () => {
//   it('one move', () => {
//     const moves = [{from: 8, to: 16}];
//     expect(calculateNewBoard(moves)).deep.equal([
//         2, 3, 4, 5, 6, 4, 3, 2,
//         0, 1, 1, 1, 1, 1, 1, 1,
//         1, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         0, 0, 0, 0, 0, 0, 0, 0,
//         7, 7, 7, 7, 7, 7, 7, 7,
//         8, 9, 10, 11, 12, 10, 9, 8,
//     ]);
//   });

//   it('two moves', () => {
//     const moves = [
//       {from: 8, to: 24},
//       {from: 1, to: 18}
//     ];
//     expect(calculateNewBoard(moves)).deep.equal([
//       2, 0, 4, 5, 6, 4, 3, 2,
//       0, 1, 1, 1, 1, 1, 1, 1,
//       0, 0, 3, 0, 0, 0, 0, 0,
//       1, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0,
//       7, 7, 7, 7, 7, 7, 7, 7,
//       8, 9, 10, 11, 12, 10, 9, 8,
//     ]);
//   });

//   it('three moves', () => {
//     const moves = [
//       {from: 12, to: 20},
//       {from: 5, to: 40}
//     ];
//     expect(calculateNewBoard(moves)).deep.equal([
//       2, 3, 4, 5, 6, 0, 3, 2,
//       1, 1, 1, 1, 0, 1, 1, 1,
//       0, 0, 0, 0, 1, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0,
//       4, 0, 0, 0, 0, 0, 0, 0,
//       7, 7, 7, 7, 7, 7, 7, 7,
//       8, 9, 10, 11, 12, 10, 9, 8,
//     ]);
//   });
// });

describe.only('checkIfMoveIsValid', () => {
  describe('white pawn', () => {
    it('one step forward', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'e', rank: 2}, to: {file: 'e', rank: 3}
      }, initialBoard)).equal(true);
    });

    it('moves two steps forward from starting rank', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'e', rank: 2}, to: {file: 'e', rank: 4}
      }, initialBoard)).equal(true);
    });

    it('cannot move two steps forward from other ranks', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'e', rank: 3}, to: {file: 'e', rank: 5}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 10, 12, 11, 10, 9, 8, -1,
        -1, 7, 7, 7, 7, 0, 7, 7, 7, -1,
        -1, 0, 0, 0, 0, 7, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 1, 0, 0, 0, -1,
        -1, 1, 1, 1, 1, 0, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 6, 5, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(false);
    });

    it('captures diagonal one step', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'd', rank: 4}, to: {file: 'e', rank: 5}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 10, 12, 11, 10, 9, 8, -1,
        -1, 7, 7, 7, 7, 0, 7, 7, 7, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 7, 0, 0, 0, -1,
        -1, 0, 0, 0, 1, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 1, 1, 1, 0, 1, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 6, 5, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(true);
    });

    it('cannot capture diagonal over one step', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'd', rank: 4}, to: {file: 'f', rank: 6}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 10, 12, 11, 10, 9, 8, -1,
        -1, 7, 7, 7, 7, 7, 0, 7, 7, -1,
        -1, 0, 0, 0, 0, 0, 7, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 1, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 1, 1, 1, 0, 1, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 6, 5, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(false);
    });
  })
})