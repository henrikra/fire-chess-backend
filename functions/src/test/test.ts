import { expect } from 'chai';
import 'mocha';

import calculateNewBoard from '../calculateNewBoard';
import {checkIfMoveIsValid} from '../moveValidation';
import { initialBoard } from '../initialBoard';

describe('calculateNewBoard', () => {
  it('one move', () => {
    const moves: Move[] = [{from: {file: 'e', rank: 2}, to: {file: 'e', rank: 4}}];
    expect(calculateNewBoard(initialBoard, moves)).deep.equal([
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
      -1, 7, 7, 7, 7, 7, 7, 7, 7, -1,
      -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
      -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
      -1, 0, 0, 0, 0, 1, 0, 0, 0, -1,
      -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
      -1, 1, 1, 1, 1, 0, 1, 1, 1, -1, // 80 - 89
      -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ]);
  });

  it('two moves', () => {
    const moves: Move[] = [
      {from: {file: 'e', rank: 2}, to: {file: 'e', rank: 4}},
      {from: {file: 'd', rank: 7}, to: {file: 'd', rank: 5}},
    ];
    expect(calculateNewBoard(initialBoard, moves)).deep.equal([
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
      -1, 7, 7, 7, 0, 7, 7, 7, 7, -1,
      -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
      -1, 0, 0, 0, 7, 0, 0, 0, 0, -1,
      -1, 0, 0, 0, 0, 1, 0, 0, 0, -1,
      -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
      -1, 1, 1, 1, 1, 0, 1, 1, 1, -1, // 80 - 89
      -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ]);
  });

  it('three moves', () => {
    const moves: Move[] = [
      {from: {file: 'e', rank: 2}, to: {file: 'e', rank: 4}},
      {from: {file: 'd', rank: 7}, to: {file: 'd', rank: 5}},
      {from: {file: 'e', rank: 4}, to: {file: 'd', rank: 5}},
    ];
    expect(calculateNewBoard(initialBoard, moves)).deep.equal([
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
      -1, 7, 7, 7, 0, 7, 7, 7, 7, -1,
      -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
      -1, 0, 0, 0, 1, 0, 0, 0, 0, -1,
      -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
      -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
      -1, 1, 1, 1, 1, 0, 1, 1, 1, -1, // 80 - 89
      -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ]);
  });
});

describe('checkIfMoveIsValid', () => {
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
        -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
        -1, 7, 7, 7, 7, 0, 7, 7, 7, -1,
        -1, 0, 0, 0, 0, 7, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 1, 0, 0, 0, -1,
        -1, 1, 1, 1, 1, 0, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(false);
    });
    it('cannot move two steps forward though pieces', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'e', rank: 2}, to: {file: 'e', rank: 4}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
        -1, 7, 7, 7, 7, 0, 7, 7, 7, -1,
        -1, 0, 0, 0, 0, 7, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 2, 0, 0, 0, -1,
        -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(false);
    });

    it('cannot move more than two steps forward from starting rank', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'e', rank: 2}, to: {file: 'e', rank: 5}
      }, initialBoard)).equal(false);
    });

    it('captures diagonal one step', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'd', rank: 4}, to: {file: 'e', rank: 5}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
        -1, 7, 7, 7, 7, 0, 7, 7, 7, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 7, 0, 0, 0, -1,
        -1, 0, 0, 0, 1, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 1, 1, 1, 0, 1, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(true);
    });

    it('captures diagonal one step to left up', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'e', rank: 4}, to: {file: 'd', rank: 5}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
        -1, 7, 7, 7, 0, 7, 7, 7, 7, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 7, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 1, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 1, 1, 1, 1, 0, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
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
        -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
        -1, 7, 7, 7, 7, 7, 0, 7, 7, -1,
        -1, 0, 0, 0, 0, 0, 7, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 1, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 1, 1, 1, 0, 1, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(false);
    });

    it('cannot make some crazy move', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'd', rank: 4}, to: {file: 'e', rank: 4}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
        -1, 7, 7, 7, 7, 7, 0, 7, 7, -1,
        -1, 0, 0, 0, 0, 0, 7, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 1, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 1, 1, 1, 0, 1, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(false);
      expect(checkIfMoveIsValid({
        from: {file: 'd', rank: 4}, to: {file: 'c', rank: 4}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
        -1, 7, 7, 7, 7, 7, 0, 7, 7, -1,
        -1, 0, 0, 0, 0, 0, 7, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 1, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 1, 1, 1, 0, 1, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(false);
      expect(checkIfMoveIsValid({
        from: {file: 'c', rank: 8}, to: {file: 'c', rank: 9}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 1, 11, 12, 10, 9, 8, -1,
        -1, 7, 7, 0, 7, 7, 0, 7, 7, -1,
        -1, 0, 0, 0, 0, 0, 7, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 1, 1, 1, 0, 1, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(false);
    });
  });

  describe('black pawn', () => {
    it('one step forward', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'e', rank: 7}, to: {file: 'e', rank: 6}
      }, initialBoard)).equal(true);
    });

    it('moves two steps forward from starting rank', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'e', rank: 7}, to: {file: 'e', rank: 5}
      }, initialBoard)).equal(true);
    });

    it('cannot move two steps forward from other ranks', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'e', rank: 6}, to: {file: 'e', rank: 4}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
        -1, 7, 7, 7, 7, 0, 7, 7, 7, -1,
        -1, 0, 0, 0, 0, 7, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 1, 0, 1, 0, 0, 0, -1,
        -1, 1, 1, 0, 1, 0, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(false);
    });

    it('captures diagonal one step', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'e', rank: 5}, to: {file: 'd', rank: 4}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
        -1, 7, 7, 7, 7, 0, 7, 7, 7, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 7, 0, 0, 0, -1,
        -1, 0, 0, 0, 1, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 1, 1, 1, 0, 1, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(true);
    });

    it('cannot capture diagonal over one step', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'e', rank: 5}, to: {file: 'c', rank: 3}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
        -1, 7, 7, 7, 7, 0, 7, 7, 7, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 7, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 1, 0, 0, 0, 0, 0, -1,
        -1, 1, 1, 0, 1, 1, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(false);
    });

    it('cannot make some crazy move', () => {
      expect(checkIfMoveIsValid({
        from: {file: 'f', rank: 6}, to: {file: 'f', rank: 7}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
        -1, 7, 7, 7, 7, 7, 0, 7, 7, -1,
        -1, 0, 0, 0, 0, 0, 7, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 1, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 1, 1, 1, 0, 1, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(false);
      expect(checkIfMoveIsValid({
        from: {file: 'f', rank: 6}, to: {file: 'e', rank: 6}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 10, 11, 12, 10, 9, 8, -1,
        -1, 7, 7, 7, 7, 7, 0, 7, 7, -1,
        -1, 0, 0, 0, 0, 0, 7, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 1, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 1, 1, 1, 0, 1, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(false);
      expect(checkIfMoveIsValid({
        from: {file: 'f', rank: 6}, to: {file: 'f', rank: 9}
      }, [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, 8, 9, 1, 11, 12, 10, 9, 8, -1,
        -1, 7, 7, 0, 7, 7, 0, 7, 7, -1,
        -1, 0, 0, 0, 0, 0, 7, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 0, 0, 0, 0, 0, 0, 0, 0, -1,
        -1, 1, 1, 1, 0, 1, 1, 1, 1, -1, // 80 - 89
        -1, 2, 3, 4, 5, 6, 4, 3, 2, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      ])).equal(false);
    });
  });

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

    it('cannot capture diagonal', () => {
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
  })
})

// kun liikutat sotilas kaksi ruutu tsekkaa että välissä ei ole nappuloita