import { expect } from 'chai';
import 'mocha';

import calculateNewBoard from '../src/calculateNewBoard';

describe('calculateNewBoard', () => {
  it('one move', () => {
    const moves = [{from: 8, to: 16}];
    expect(calculateNewBoard(moves)).deep.equal([
        2, 3, 4, 5, 6, 4, 3, 2,
        0, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        7, 7, 7, 7, 7, 7, 7, 7,
        8, 9, 10, 11, 12, 10, 9, 8,
    ]);
  });

  it('two moves', () => {
    const moves = [
      {from: 8, to: 24},
      {from: 1, to: 18}
    ];
    expect(calculateNewBoard(moves)).deep.equal([
      2, 0, 4, 5, 6, 4, 3, 2,
      0, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 3, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      7, 7, 7, 7, 7, 7, 7, 7,
      8, 9, 10, 11, 12, 10, 9, 8,
    ]);
  });

  it('three moves', () => {
    const moves = [
      {from: 12, to: 20},
      {from: 5, to: 40}
    ];
    expect(calculateNewBoard(moves)).deep.equal([
      2, 3, 4, 5, 6, 0, 3, 2,
      1, 1, 1, 1, 0, 1, 1, 1,
      0, 0, 0, 0, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 0, 0, 0, 0, 0,
      7, 7, 7, 7, 7, 7, 7, 7,
      8, 9, 10, 11, 12, 10, 9, 8,
    ]);
  });
});