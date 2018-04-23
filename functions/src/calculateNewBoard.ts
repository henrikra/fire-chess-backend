export default (moves: Move[]) => {
  const initialBoard = [
    2, 3, 4, 5, 6, 4, 3, 2,
    1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    7, 7, 7, 7, 7, 7, 7, 7,
    8, 9, 10, 11, 12, 10, 9, 8,
  ];
  return moves.reduce((acc, move) => {
    acc[move.to] = acc[move.from];
    acc[move.from] = 0;
    return acc;
  }, initialBoard);
}