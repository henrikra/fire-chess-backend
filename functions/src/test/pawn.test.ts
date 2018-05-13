import { expect } from 'chai';
import { checkIfMoveIsValid } from '../moveValidation';
import { initialBoard } from '../initialBoard';

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
});