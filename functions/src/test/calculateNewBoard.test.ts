import { expect } from 'chai';
import 'mocha';

import calculateNewBoard from '../calculateNewBoard';
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