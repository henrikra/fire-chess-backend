interface Square {
  file: string;
  rank: number;
}

interface MovePieceRequest {
  from: Square;
  to: Square;
  roomId: string;
  userId: string;
}

interface CreateRoomRequest {
  userId: string;
}

interface JoinGameRequest {
  roomId: string;
  userId: string;
}

interface Move {
  from: Square;
  to: Square;
}

interface RoomPlayersModel {
  whitePlayerId?: string;
  blackPlayerId?: string;
}

interface WhoAmIRequest {
  roomId: string;
  userId: string;
}