interface Square {
  file: string;
  rank: number;
}

interface MovePieceRequest {
  from: Square;
  to: Square;
  roomId: string;
}

interface Move {
  from: Square;
  to: Square;
}